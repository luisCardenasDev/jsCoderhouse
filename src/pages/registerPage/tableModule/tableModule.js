// TableModule.js
import { renderRow } from "./helpers/renderRow.js";
import { applyZebraEffect } from "./helpers/ZebraEffect.js";
import { calculateTotalsByCurrency } from "./helpers/calcTotalByCurrent.js";
import { formatNumber } from "../../../utils/utils.js";
import { getTableRefs } from "./tableConsts/tableConsts.js";

export function TableModule({ onEdit, onDelete, onAdd }) {

  const {tbody,container,recordCount,currencyTotal,selectAll,addButton}=getTableRefs()

  let tableModuleData = [];

  function render(data = []) {
    tableModuleData = data;
    tbody.innerHTML = "";
    data.forEach(item => tbody.appendChild(renderRow(item)));
    applyZebraEffect(tbody);
    updateSummary();
  }

  function updateSummary() {
    const visibleRows = Array.from(tbody.querySelectorAll("tr"))
      .filter(r => r.style.display !== "none");

    recordCount.textContent = visibleRows.length;
    const totalsByCurrency = calculateTotalsByCurrency(visibleRows);
    currencyTotal.innerHTML = Object.entries(totalsByCurrency)
      .map(([c, t]) => `${c} ${formatNumber(t)}`)
      .join(" | ");
  }

  function lock() {
    container.querySelectorAll("button, input, select").forEach(el => {
      el.disabled = true;
      el.style.pointerEvents = "none";
    });
  }

  function unlock() {
    container.querySelectorAll("button, input, select").forEach(el => {
      el.disabled = false;
      el.style.pointerEvents = "auto";
    });
  }

  // Eventos
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
      onEdit?.(factura, true);
    }
  });

  selectAll.addEventListener("change", () => {
    const visibleRows = Array.from(refs.tbody.querySelectorAll("tr"))
      .filter(r => r.style.display !== "none");
    visibleRows.forEach(r => {
      const cb = r.querySelector(".row-checkbox");
      if (cb) cb.checked = selectAll.checked;
    });
  });

  tbody.addEventListener("change", e => {
    if (!e.target.classList.contains("row-checkbox")) return;
    const visibleRows = Array.from(refs.tbody.querySelectorAll("tr"))
      .filter(r => r.style.display !== "none");
    selectAll.checked = visibleRows.every(r => r.querySelector(".row-checkbox").checked);
  });

  addButton.addEventListener("click", () => onAdd?.());

  return { render, updateSummary, lock, unlock };
}
