// renderRows.js
import { formatNumber } from "../../../../utils/utils.js";
import { refsTableHeader } from "../tableConsts/tableConsts.js";

/**
 * Recibe un array de items y devuelve un string HTML con todas las filas
 * usando el orden de campos definido en refsTableHeader
 */
export function renderRows(items) {

  return items
    .map(item => {
      const subtotal = parseFloat(item.subtotal) || 0;
      const iva = parseFloat(item.iva) || subtotal * ((parseFloat(item.percentageIVA) || 0) / 100);
      const total = subtotal + iva;

      // Checkbox inicial
      let rowHtml = `<td><input type="checkbox" class="row-checkbox"></td>`;

      // Itera sobre las keys de refsTableHeader para mantener el orden correcto
      Object.keys(refsTableHeader).forEach(key => {
        if (key === "total") rowHtml += `<td class="td-total">${formatNumber(total)}</td>`;
        else if (key === "currency") rowHtml += `<td class="td-currency">${item.currency || ""}</td>`;
        else if (key === "documentFile") rowHtml += `<td>${item.documentFile ? `<a href="${item.documentFile}" target="_blank">Ver</a>` : ""}</td>`;
        else rowHtml += `<td>${item[key] || ""}</td>`;
      });

      // Botones de acción por fila
      rowHtml += `<td>
        <button class="btn-view" data-id="${item.idDocument}">Ver</button>
        <button class="btn-delete" data-id="${item.idDocument}">Eliminar</button>
      </td>`;

      return `<tr data-id="${item.idDocument}">${rowHtml}</tr>`;
    })
    .join(""); // Une todas las filas en un único string HTML
}


