/**
 * main.js
 * 
 * Punto de entrada de la aplicación de facturas.
 * Coordina los módulos de formulario, tabla y filtros.
 * Gestiona el almacenamiento en localStorage y sincroniza la UI.
 */

// ==========================
// Módulos importados
// ==========================
import { FormModule } from "./formModule/formModule.js";
import { TableModule } from "./tableModule/tableModule.js";
import { FilterModule } from "./filterModule/filterModule.js";

// ==========================
// Estado global
// ==========================
/**
 * Array de facturas cargadas desde localStorage
 * @type {Array<Object>}
 */
let facturas = JSON.parse(localStorage.getItem("facturas")) || [];

// ==========================
// Funciones de almacenamiento
// ==========================
/**
 * Guarda el estado actual de las facturas en localStorage
 */
function guardarEnStorage() {
  localStorage.setItem("facturas", JSON.stringify(facturas));
}

// ==========================
// Inicialización de módulos
// ==========================
/**
 * Módulo de formulario
 * Maneja la creación y edición de facturas
 */
const formModule = FormModule({
  onSave: handleSave
});

/**
 * Módulo de tabla
 * Renderiza las facturas y permite ver, editar o eliminar
 */
const tableModule = TableModule({
  onEdit: handleEdit,
  onDelete: handleDelete,
  onAdd: () => formModule.openForm()
});

/**
 * Módulo de filtro
 * Permite filtrar y ordenar facturas dinámicamente
 */
const filterModule = FilterModule({
  data: facturas,
  onFiltered: (result) => tableModule.render(result)
});

// ==========================
// Handlers / Callbacks
// ==========================
/**
 * Callback al guardar una factura
 * @param {Object} data - Datos de la factura
 */
function handleSave(data) {
  const index = facturas.findIndex(f => f.idDocument === data.idDocument);
  if (index >= 0) facturas[index] = data;  // actualizar existente
  else facturas.push(data);                 // agregar nueva

  guardarEnStorage();
  filterModule.setData(facturas); // actualiza datos en el filtro
  applyFiltersAndRender();
}

/**
 * Callback al abrir una factura en modo lectura/edición
 * @param {Object} item - Factura
 * @param {boolean} readonly - Si true, bloquea campos no críticos
 */
function handleEdit(item, readonly = false) {
  lockUI();
  formModule.openForm(item, readonly);
}

/**
 * Callback al eliminar una factura
 * @param {string} id - ID de la factura a eliminar
 */
function handleDelete(id) {
  facturas = facturas.filter(f => f.idDocument !== id);
  guardarEnStorage();
  filterModule.setData(facturas);
  applyFiltersAndRender();
}

// ==========================
// Funciones de filtro y render
// ==========================
/**
 * Aplica los filtros actuales y renderiza la tabla
 */
function applyFiltersAndRender() {
  filterModule.apply();
}

// ==========================
// Bloqueo / desbloqueo UI
// ==========================
/**
 * Bloquea todos los módulos interactivos mientras se edita/crea una factura
 */
function lockUI() {
  filterModule.lock();
  tableModule.lock?.(); // opcional si TableModule implementa lock
}

/**
 * Desbloquea todos los módulos interactivos
 */
function unlockUI() {
  filterModule.unlock();
  tableModule.unlock?.(); // opcional si TableModule implementa unlock
}

// ==========================
// Sobreescritura de métodos del formModule
// para manejo automático de bloqueo/desbloqueo
// ==========================
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
