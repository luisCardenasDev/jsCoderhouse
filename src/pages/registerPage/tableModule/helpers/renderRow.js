import { formatNumber } from "../../../../utils/utils.js";
import { refsTableHeader } from "../tableConsts/tableConsts.js";

/**
 * Renders table rows as HTML string from an array of items.
 * - Uses the order of fields defined in refsTableHeader
 * - Calculates total per row based on subtotal and IVA
 * - Adds action buttons for view/delete
 */
export function renderRows(items) {
  return items
    .map(item => {
      const subtotal = parseFloat(item.subtotal) || 0;
      const iva = parseFloat(item.iva) || subtotal * ((parseFloat(item.percentageIVA) || 0) / 100);
      const total = subtotal + iva;

      // Start row with a checkbox
      let rowHtml = `<td><input type="checkbox" class="row-checkbox"></td>`;

      // Add cells in the order defined by refsTableHeader
      Object.keys(refsTableHeader).forEach(key => {
        if (key === "total") {
          rowHtml += `<td class="td-total">${formatNumber(total)}</td>`;
        } else if (key === "currency") {
          rowHtml += `<td class="td-currency">${item.currency || ""}</td>`;
        } else if (key === "documentFile") {
          rowHtml += `<td>${item.documentFile ? `<a href="${item.documentFile}" target="_blank">View</a>` : ""}</td>`;
        } else {
          rowHtml += `<td>${item[key] || ""}</td>`;
        }
      });

      // Add action buttons for each row
      rowHtml += `<td>
        <button class="btn-view" data-id="${item.idDocument}">View</button>
        <button class="btn-delete" data-id="${item.idDocument}">Delete</button>
      </td>`;

      return `<tr data-id="${item.idDocument}">${rowHtml}</tr>`;
    })
    .join(""); // Combine all rows into a single HTML string
}


