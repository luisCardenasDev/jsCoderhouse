import { formatNumber } from "../../../../utils/utils.js";
import {tableFields} from "../tableConsts/tableConsts.js";

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

