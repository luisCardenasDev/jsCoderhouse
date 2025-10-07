// tableView.js
import { refsTableElements } from "./tableConsts/tableConsts.js";
import { formatNumber } from "../../../utils/utils.js";
import { renderRows } from "./helpers/renderRow.js";

export function TableView() {
  const { container, tbody, recordCount, currencyTotal, addButton } = refsTableElements;

  function renderAll(data) {

    tbody.innerHTML = renderRows(data); // inyecta todas las filas de golpe
  }

  function updateSummary(data) {
    recordCount.textContent = data.length;
    const totalsByCurrency = data.reduce((acc, item) => {
      const t = parseFloat(item.total) || 0;
      acc[item.currency] = (acc[item.currency] || 0) + t;
      return acc;
    }, {});
    currencyTotal.textContent = Object.entries(totalsByCurrency)
      .map(([c, t]) => `${c} ${formatNumber(t)}`)
      .join(" | ");
  }

  function lock() {
    container.style.pointerEvents = "none";
    container.style.opacity = "0.5";
  }

  function unlock() {
    container.style.pointerEvents = "auto";
    container.style.opacity = "1";
  }

  return { renderAll, updateSummary, lock, unlock, tbody, addButton};
}
