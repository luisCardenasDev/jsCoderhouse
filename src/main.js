// ==========================
// Módulos importados
// ==========================
import { FormModule } from "./formModule/formModule.js";
import { TableModule } from "./tableModule/tableModule.js";
import { FilterModule } from "./filterModule/filterModule.js";

// ==========================
// Estado global
// ==========================
let facturas = JSON.parse(localStorage.getItem("facturas")) || [];

// ==========================
// Funciones de almacenamiento
// ==========================
function guardarEnStorage() {
  localStorage.setItem("facturas", JSON.stringify(facturas));
}

// ==========================
// Inicialización de módulos
// ==========================
const formModule = FormModule({
  onSave: handleSave
});

const tableModule = TableModule({
  onEdit: handleEdit,
  onDelete: handleDelete,
  onAdd: () => formModule.openForm()
});

const filterModule = FilterModule({
  data: facturas,
  onFiltered: (result) => tableModule.render(result)
});

// ==========================
// Handlers / Callbacks
// ==========================
function handleSave(data) {
  const index = facturas.findIndex(f => f.idDocument === data.idDocument);
  if (index >= 0) facturas[index] = data;
  else facturas.push(data);

  guardarEnStorage();
  filterModule.setData(facturas); // actualiza datos en el filtro
  applyFiltersAndRender();
}

function handleEdit(item, readonly = false) {
  lockUI();
  formModule.openForm(item, readonly);
}

function handleDelete(id) {
  facturas = facturas.filter(f => f.idDocument !== id);
  guardarEnStorage();
  filterModule.setData(facturas);
  applyFiltersAndRender();
}

// ==========================
// Funciones de filtro y render
// ==========================
function applyFiltersAndRender() {
  filterModule.apply();
}

// ==========================
// Bloqueo / desbloqueo UI
// ==========================
function lockUI() {
  filterModule.lock();
  tableModule.lock?.(); // si TableModule implementa lock
}

function unlockUI() {
  filterModule.unlock();
  tableModule.unlock?.(); // si TableModule implementa unlock
}

// Sobreescribir métodos del formModule para desbloqueo automático
const originalOpenForm = formModule.openForm;
formModule.openForm = (item = null, readonly = false) => {
  lockUI();
  originalOpenForm(item, readonly);
};

const originalClearForm = formModule.clearForm;
formModule.clearForm = (hide = true) => {
  unlockUI();
  originalClearForm(hide);
};

// ==========================
// Render inicial
// ==========================
filterModule.setData(facturas);
applyFiltersAndRender();
