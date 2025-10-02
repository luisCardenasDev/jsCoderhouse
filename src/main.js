import { FormModule } from "../src/formModule/formModule.js";
import { TableModule } from "../src/tableModule/tableModule.js";

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

function handleEdit(item) {
  formModule.openForm(item);
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
  containerId: "formContainer",
  onSave: handleSave
});

const tableModule = TableModule({
  containerId: "tableContainer",
  onEdit: handleEdit,
  onDelete: handleDelete,
  onAdd: () => {
    // Abrir formulario vacío y asegurar que se muestre
    formModule.openForm();
  }
});

// ==========================
// Render inicial
// ==========================
tableModule.render(facturas);
