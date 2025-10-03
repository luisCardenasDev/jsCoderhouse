import { formatNumber } from "../../utils/utils.js";
import tableFields from "../mocks/tableFields.js";

/**
 * renderRow
 * 
 * Genera un elemento <tr> de tabla para representar una factura.
 * Incluye:
 * - Checkbox para selección de fila
 * - Celdas con los datos de la factura
 * - Cálculo automático del total (subtotal + IVA)
 * - Enlace a archivo adjunto si existe
 * - Botones "Ver" y "Eliminar"
 *
 * @param {Object} item - Objeto factura
 * @param {string} item.idDocument - ID único de la factura
 * @param {string|number} item.subtotal - Subtotal de la factura
 * @param {string|number} item.percentageIVA - Porcentaje de IVA
 * @param {string} item.iva - Valor del IVA (opcional, se calcula si no existe)
 * @param {string} item.currency - Moneda de la factura
 * @param {string} item.documentFile - Ruta de archivo adjunto (opcional)
 * @returns {HTMLTableRowElement} - Elemento <tr> listo para insertar en la tabla
 *
 * @example
 * const invoice = {
 *   idDocument: "FAC001",
 *   nroDocument: "001-000123",
 *   ruc: "20123456789",
 *   legalName: "Empresa S.A.",
 *   subtotal: 1000,
 *   percentageIVA: 18,
 *   currency: "PEN",
 *   documentFile: "./uploads/factura.pdf"
 * };
 * 
 * const tr = renderRow(invoice);
 * document.querySelector("#invoiceTable tbody").appendChild(tr);
 */
export function renderRow(item) {
  const tr = document.createElement("tr");
  tr.dataset.id = item.idDocument;

  const subtotal = parseFloat(item.subtotal) || 0;
  const iva = parseFloat(item.iva) || subtotal * ((parseFloat(item.percentageIVA) || 0)/100);
  const total = subtotal + iva;

  const rowHtml = `<td><input type="checkbox" class="row-checkbox"></td>` +
    tableFields
      .filter(f => !["idDocument","subtotal","percentageIVA","iva"].includes(f.id))
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
  return tr;
}

