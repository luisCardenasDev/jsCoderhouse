import { parseNumberFormatted } from "../../../../utils/utils.js";

/**
 * calculateTotalsByCurrency
 * 
 * Calcula el total acumulado por cada moneda en las filas visibles de la tabla.
 * Se basa en las celdas con clase `.td-total` y `.td-currency`.
 *
 * @param {HTMLTableRowElement[]} rows - Array de filas <tr> de la tabla
 * @returns {Object} - Objeto con totales por moneda, ej. { "PEN": 1500, "USD": 300 }
 *
 * @example
 * const rows = Array.from(document.querySelectorAll("#invoiceTable tbody tr"));
 * const totals = calculateTotalsByCurrency(rows);
 * console.log(totals); // { "PEN": 1500, "USD": 300 }
 */
export function calculateTotalsByCurrency(rows) {
  const totalsByCurrency = {};

  rows.forEach(tr => {
    const totalCell = tr.querySelector(".td-total");
    const total = parseNumberFormatted(totalCell.textContent);
    const currencyCell = tr.querySelector(".td-currency");
    const currency = currencyCell.textContent || "S/";

    if (!totalsByCurrency[currency]) totalsByCurrency[currency] = 0;
    totalsByCurrency[currency] += total;
  });

  return totalsByCurrency;
}

