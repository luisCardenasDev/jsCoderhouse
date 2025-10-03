// TableModule.js
import { renderRow } from "./helpers/rowRenderer.js";
import { applyZebraEffect, calculateTotalsByCurrency } from "./helpers/tableHelpers.js";
import { formatNumber } from "../utils/utils.js";

/**
 * TableModule
 * 
 * Módulo que maneja la visualización y manipulación de la tabla de facturas.
 * Permite:
 * - Renderizar filas
 * - Actualizar resúmenes
 * - Selección de filas
 * - Eliminar facturas
 * - Abrir facturas en modo lectura/edición
 * - Agregar nuevas facturas
 *
 * @param {Object} callbacks - Callbacks para interactuar con el módulo
 * @param {Function} callbacks.onEdit - Se ejecuta al abrir una factura en modo lectura/edición
 * @param {Function} callbacks.onDelete - Se ejecuta al eliminar una factura
 * @param {Function} callbacks.onAdd - Se ejecuta al agregar una nueva factura
 * @returns {Object} - Métodos públicos:
 *   - {Function} render(data) - Renderiza la tabla con un array de facturas
 *   - {Function} updateSummary() - Actualiza cantidad de registros visibles y totales por moneda
 *
 * @example
 * const tableModule = TableModule({
 *   onEdit: (invoice, readonly) => FormModule.openForm(invoice, readonly),
 *   onDelete: (id) => { console.log("Eliminar factura", id); },
 *   onAdd: () => { FormModule.openForm(null, false); }
 * });
 * 
 * // Renderizar tabla con datos iniciales
 * tableModule.render(facturas);
 * 
 * // Actualizar resúmenes después de filtrar
 * tableModule.updateSummary();
 */
export function TableModule({ onEdit, onDelete, onAdd }) {
  // ==============================
  // Referencias al DOM
  // ==============================
  const container = document.getElementById("tableContainer");
  const table = container.querySelector("#invoiceTable");
  const tbody = table.querySelector("tbody");
  const selectAllCheckbox = table.querySelector("#selectAll");
  const recordCountEl = document.getElementById("recordCount");
  const currencyTotalEl = document.getElementById("currencyTotal");
  const addButton = document.getElementById("btnAddInvoice");

  /**
   * Estado interno: array que guarda todas las facturas visibles
   * @type {Array<Object>}
   */
  let tableModuleData = [];

  // ==============================
  // Funciones internas
  // ==============================

  /**
   * Renderiza la tabla con los datos proporcionados
   * @param {Array<Object>} data - Array de facturas
   */
  function render(data = []) {
    tableModuleData = data;
    tbody.innerHTML = "";
    data.forEach(item => tbody.appendChild(renderRow(item)));
    applyZebraEffect(tbody);
    updateSummary();
  }

  /**
   * Actualiza el resumen de la tabla:
   * - Cantidad de registros visibles
   * - Total por moneda
   */
  function updateSummary() {
    const visibleRows = Array.from(tbody.querySelectorAll("tr"))
      .filter(r => r.style.display !== "none");

    recordCountEl.textContent = visibleRows.length;

    const totalsByCurrency = calculateTotalsByCurrency(visibleRows);

    currencyTotalEl.innerHTML = Object.entries(totalsByCurrency)
      .map(([c, t]) => `${c} ${formatNumber(t)}`)
      .join(" | ");
  }

  // ==============================
  // Eventos del módulo
  // ==============================

  // Click en botones "Ver" y "Eliminar" de cada fila
  tbody.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const id = btn.dataset.id;
    if (!id) return;

    if (btn.classList.contains("btn-delete")) {
      if (confirm("⚠️ ¿Eliminar factura?")) onDelete?.(id);
      return;
    }

    if (btn.classList.contains("btn-view")) {
      const factura = tableModuleData.find(f => f.idDocument === id);
      if (!factura) return;
      onEdit?.(factura, true);
    }
  });

  // Checkbox "Seleccionar todo"
  selectAllCheckbox.addEventListener("change", () => {
    const visibleRows = Array.from(tbody.querySelectorAll("tr"))
      .filter(r => r.style.display !== "none");

    visibleRows.forEach(r => {
      const cb = r.querySelector(".row-checkbox");
      if (cb) cb.checked = selectAllCheckbox.checked;
    });
  });

  // Actualiza checkbox "Seleccionar todo" al marcar/desmarcar filas individuales
  tbody.addEventListener("change", e => {
    if (!e.target.classList.contains("row-checkbox")) return;

    const visibleRows = Array.from(tbody.querySelectorAll("tr"))
      .filter(r => r.style.display !== "none");

    selectAllCheckbox.checked = visibleRows.every(r => r.querySelector(".row-checkbox").checked);
  });

  // Botón agregar factura
  addButton.addEventListener("click", () => onAdd());

  // ==============================
  // API pública
  // ==============================
  return { render, updateSummary };
}
