import { FormModule } from "./formModule/formModule.js";
import { TableModule } from "./tableModule/tableModule.js";

// ==========================
// Estado global
// ==========================
let facturas = JSON.parse(localStorage.getItem("facturas")) || [];

// ==========================
// Storage
// ==========================
function guardarEnStorage() {
  localStorage.setItem("facturas", JSON.stringify(facturas));
}

// ==========================
// Handlers
// ==========================
function handleSave(data) {
  const index = facturas.findIndex(f => f.idDocument === data.idDocument);
  if (index >= 0) {
    facturas[index] = data; // actualizar
  } else {
    data.idDocument = data.idDocument || Date.now().toString();
    facturas.push(data); // agregar nueva
  }
  guardarEnStorage();
  tableModule.render(facturas);
}

function handleEdit(item, readonly = false) {
  formModule.openForm(item, readonly);
}

function handleDelete(id) {
  facturas = facturas.filter(f => f.idDocument !== id);
  guardarEnStorage();
  tableModule.render(facturas);
}

// ==========================
// Inicialización módulos
// ==========================
const formModule = FormModule({
  onSave: handleSave
});

const tableModule = TableModule({
  onEdit: handleEdit,
  onDelete: handleDelete,
  onAdd: () => formModule.openForm()
});

// ==========================
// Render inicial
// ==========================
tableModule.render(facturas);
