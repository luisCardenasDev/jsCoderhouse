import { formatNumber, parseNumberFormatted } from "../utils/utils.js";
import tableFields from "./mocks/tableFields.js";

/**
 * TableModule
 * Módulo que maneja la visualización y manipulación de la tabla de facturas.
 * Permite renderizar filas, actualizar resúmenes, manejar selección de filas,
 * eliminar facturas y abrir facturas en modo lectura.
 * 
 * @param {Object} callbacks
 * @param {Function} callbacks.onEdit - Callback al abrir una factura en modo lectura/edición
 * @param {Function} callbacks.onDelete - Callback al eliminar una factura
 * @param {Function} callbacks.onAdd - Callback al agregar una nueva factura
 * @returns {Object} - Métodos públicos: render, updateSummary
 */

export function TableModule({ onEdit, onDelete, onAdd }) {

  // ==============================
  // Referencias principales del DOM
  // ==============================
  const container = document.getElementById("tableContainer");        // Contenedor principal de la tabla
  const table = container.querySelector("#invoiceTable");             // Tabla de facturas
  const tbody = table.querySelector("tbody");                         // Cuerpo de la tabla donde se agregan filas

  const selectAllCheckbox = table.querySelector("#selectAll");        // Checkbox de seleccionar todas las filas
  const recordCountEl = document.getElementById("recordCount");       // Elemento que muestra la cantidad de registros visibles
  const currencyTotalEl = document.getElementById("currencyTotal");   // Elemento que muestra el total por moneda
  const addButton = document.getElementById("btnAddInvoice");         // Botón para agregar una nueva factura

  let tableModuleData = []; // Array que guarda la data completa de la tabla (estado interno)

  // ==============================
  // Funciones internas
  // ==============================

  /**
   * Renderiza la tabla con los datos proporcionados
   * @param {Array} data - Array de objetos factura
   */
  function render(data) {
    tableModuleData = data;  // Guardar la data completa
    tbody.innerHTML = "";    // Limpiar filas existentes

    data.forEach(item => {
      const tr = document.createElement("tr");
      tr.dataset.id = item.idDocument;

      const subtotal = parseFloat(item.subtotal) || 0;
      const iva = parseFloat(item.iva) || subtotal * ((parseFloat(item.percentageIVA) || 0)/100);
      const total = subtotal + iva;

      // Construye el HTML de cada fila excluyendo ciertos campos
      const rowHtml = `<td><input type="checkbox" class="row-checkbox"></td>` +
        tableFields
          .filter(f => !["idDocument","subtotal","percentageIVA","iva"].includes(f.id)) // ocultar campos internos
          .map(f => {
            if (f.id === "total") return `<td class="td-total">${formatNumber(total)}</td>`;
            if (f.id === "currency") return `<td class="td-currency">${item.currency || ""}</td>`;
            if (f.id === "documentFile") return `<td>${item.documentFile ? `<a href="${item.documentFile}" target="_blank">Ver</a>` : ""}</td>`;
            return `<td>${item[f.id] || ""}</td>`;
          }).join("") +
        `<td>
          <button class="btn-view" data-id="${item.idDocument}">Ver</button>
          <button class="btn-delete" data-id="${item.idDocument}">Eliminar</button>
        </td>`;

      tr.innerHTML = rowHtml;
      tbody.appendChild(tr);
    });

    applyZebra();     // Aplica efecto de filas alternadas
    updateSummary();  // Actualiza los resúmenes de registros y totales
  }

  /**
   * Aplica efecto "zebra" alternando el color de las filas
   */
  function applyZebra() {
    Array.from(tbody.querySelectorAll("tr")).forEach((tr, i) => {
      tr.classList.toggle("zebra", i % 2 === 0);
    });
  }

  /**
   * Actualiza el resumen de la tabla
   * - Cantidad de registros visibles
   * - Total por moneda
   */
  function updateSummary() {
    const visibleRows = Array.from(tbody.querySelectorAll("tr")).filter(r => r.style.display !== "none");
    recordCountEl.textContent = visibleRows.length;

    const totalsByCurrency = {};
    visibleRows.forEach(tr => {
    const totalCell = tr.querySelector(".td-total");
    const total = parseNumberFormatted(totalCell.textContent);
    const currencyCell = tr.querySelector(".td-currency");
    const currency = currencyCell.textContent || "S/";
    
    if (!totalsByCurrency[currency]) totalsByCurrency[currency] = 0;
    totalsByCurrency[currency] += total;
    });

    currencyTotalEl.innerHTML = Object.entries(totalsByCurrency)
      .map(([c, t]) => `${c} ${formatNumber(t)}`)
      .join(" | ");
  }

  // ==============================
  // Eventos
  // ==============================

  /**
   * Manejo de click en botones "Ver" y "Eliminar" de cada fila
   */
  tbody.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const id = btn.dataset.id;
    if (!id) return;

    // Botón eliminar
    if (btn.classList.contains("btn-delete")) {
      if (confirm("⚠️ ¿Eliminar factura?")) onDelete && onDelete(id);
      return;
    }

    // Botón ver/abrir en modo lectura
    if (btn.classList.contains("btn-view")) {
      const factura = tableModuleData.find(f => f.idDocument === id);
      if (!factura) return;

      onEdit && onEdit(factura, true); // abrir en modo lectura
    }
  });

  /**
   * Manejo del checkbox "Seleccionar todo"
   */
  selectAllCheckbox.addEventListener("change", () => {
    const visibleRows = Array.from(tbody.querySelectorAll("tr")).filter(r => r.style.display !== "none");
    visibleRows.forEach(r => {
      const cb = r.querySelector(".row-checkbox");
      if (cb) cb.checked = selectAllCheckbox.checked;
    });
  });

  /**
   * Actualiza el checkbox "Seleccionar todo" si se marcan/desmarcan filas individualmente
   */
  tbody.addEventListener("change", e => {
    if (!e.target.classList.contains("row-checkbox")) return;
    const visibleRows = Array.from(tbody.querySelectorAll("tr")).filter(r => r.style.display !== "none");
    selectAllCheckbox.checked = visibleRows.every(r => r.querySelector(".row-checkbox").checked);
  });

  /**
   * Botón agregar factura
   */
  addButton.addEventListener("click", () => onAdd());

  // ==============================
  // API pública del módulo
  // ==============================
  return { render, updateSummary };
}