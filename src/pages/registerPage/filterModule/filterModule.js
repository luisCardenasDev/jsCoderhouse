import { renderValueInput } from "./helpers/renderValueInput.js";
import { applyFilters } from "./helpers/applyFilters.js";
import { setSort, getSort } from "./helpers/sortUtils.js";
import { setFilters, getFilters, resetFilters } from "./helpers/filterUtils.js";
import { lock, unlock } from "./helpers/lockUtils.js";
import { initUIEvents } from "./helpers/uiEvents.js";
import { filterRefs } from "./filterConsts/filterConsts.js";

export function FilterModule({ data = [], onFiltered }) {
  let originalData = data;

  // ==============================
  // Función apply central
  // ==============================
  function apply() {
    const result = applyFilters({
      data: originalData,
      filters: getFilters(),
      sort: getSort()
    });
    onFiltered?.(result);
    return result;
  }

  function setData(newData) {
    originalData = newData;
    apply();
  }

  function reset() {
    resetFilters();
    filterRefs.fieldSelect.value = "";
    renderValueInput("", originalData, apply);
    apply();
  }

  // ==============================
  // Inicialización UI
  // ==============================
  renderValueInput(filterRefs.fieldSelect.value, originalData, apply);
  initUIEvents({ apply, renderValueInput, originalData });

  return { 
    setFilters, 
    setSort, 
    apply, 
    reset, 
    lock: () => lock(filterRefs), 
    unlock: () => unlock(filterRefs), 
    setData 
  };
}

