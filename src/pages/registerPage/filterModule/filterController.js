import { FilterModel } from "./filterModel.js";
import { FilterView } from "./filterView.js";
import { renderRows } from "../tableModule/helpers/renderRow.js";
import { subscribe, getState } from "../../../state/stateManager.js";

/**
 * Filter Controller
 * - Initializes the filter view
 * - Subscribes to global state changes to update table rows
 * - Provides a public method to apply filters programmatically
 * @param {Function} onFilter - Optional callback triggered after filtering
 */
export function FilterController(onFilter) {
  // Initialize filter UI
  FilterView();

  // Render initial table rows
  const tbody = document.getElementById("tbody");
  if (tbody) {
    tbody.innerHTML = renderRows(FilterModel.getFilteredData());
  }

  // Subscribe to global state changes to update the table dynamically
  subscribe(({ stateTable, stateFilter }) => {
    const filteredData = FilterModel.getFilteredData();

    if (tbody) {
      tbody.innerHTML = renderRows(filteredData);
    }

    // Trigger external callback if provided
    if (typeof onFilter === "function") {
      onFilter(filteredData);
    }
  });

  /**
   * Public method to apply a filter from outside the module
   * @param {Object} filter - Filter criteria to apply
   */
  const applyFilter = (filter) => {
    FilterModel.setFilter(filter);
  };

  // Expose public API
  return { applyFilter };
}
