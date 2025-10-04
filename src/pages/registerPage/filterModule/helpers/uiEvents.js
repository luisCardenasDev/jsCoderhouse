import { filterRefs } from "../filterConsts/filterConsts.js";
import { setSort } from "./sortUtils.js";
import { resetFilters } from "./filterUtils.js";

export function initUIEvents({ apply, renderValueInput, originalData }) {
  const { fieldSelect, sortButtonsWrapper } = filterRefs;

  // Select principal
  fieldSelect.addEventListener("change", () => {
    resetFilters();
    renderValueInput(fieldSelect.value, originalData, apply);
    apply();
  });

  // Botones de orden
  if (sortButtonsWrapper) {
    sortButtonsWrapper.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        const field = btn.dataset.sort;
        const order = btn.dataset.order;
        setSort(field, order);
        apply();
      });
    });
  }
}
