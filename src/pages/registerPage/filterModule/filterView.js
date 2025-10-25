import { FilterModel } from "./filterModel.js";

/**
 * Filter View
 * - Dynamically renders input/select elements based on selected filter field
 * - Updates FilterModel values on user interaction
 */
export function FilterView() {
  const filterField = document.getElementById("filterField");
  const filterValueWrapper = document.getElementById("filterValueWrapper");

  /**
   * Clears all filter input elements from the wrapper
   */
  const clearWrapper = () => {
    filterValueWrapper.innerHTML = "";
  };

  /**
   * Creates an input element and binds it to the FilterModel
   * @param {string} type - Input type (text, date, etc.)
   * @param {string} placeholder - Placeholder text
   * @param {string} key - Key to update in FilterModel.values
   * @returns {HTMLInputElement} The created input element
   */
  const createInput = (type, placeholder, key) => {
    const input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
    input.dataset.key = key;

    input.addEventListener("input", () => {
      const current = FilterModel.getFilter();
      FilterModel.setFilter({ values: { ...current.values, [key]: input.value } });
    });

    return input;
  };

  /**
   * Creates a select element and binds it to the FilterModel
   * @param {Array} options - Array of option strings
   * @param {string} key - Key to update in FilterModel.values
   * @returns {HTMLSelectElement} The created select element
   */
  const createSelect = (options, key) => {
    const select = document.createElement("select");
    select.dataset.key = key;

    select.innerHTML =
      `<option value="">--Select--</option>` +
      options.map(o => `<option value="${o}">${o}</option>`).join("");

    select.addEventListener("change", () => {
      const current = FilterModel.getFilter();
      FilterModel.setFilter({ values: { ...current.values, [key]: select.value } });
    });

    return select;
  };

  /**
   * Returns unique values for a specific field from the filtered table data
   * @param {string} field - The field to extract unique values from
   * @returns {Array} Unique values
   */
  const getUniqueValues = (field) => {
    const tableData = FilterModel.getFilteredData();
    return [...new Set(tableData.map(r => r[field]).filter(Boolean))];
  };

  /**
   * Handles filter field selection changes
   * Dynamically renders corresponding input/select elements
   */
  filterField.addEventListener("change", () => {
    clearWrapper();

    const field = filterField.value;
    if (!field) return FilterModel.setFilter({ field: null, values: {} });

    switch (field) {
      case "date":
      case "total":
        filterValueWrapper.appendChild(createInput("date", "Start", "start"));
        filterValueWrapper.appendChild(createInput("date", "End", "end"));
        break;

      case "user":
      case "currency":
      case "legalName":
      case "centerCost":
        filterValueWrapper.appendChild(createSelect(getUniqueValues(field), "value"));
        break;

      case "ruc":
      case "nroDocument":
        filterValueWrapper.appendChild(createInput("text", "Search...", "value"));
        break;
    }

    // Reset filter values whenever the field changes
    FilterModel.setFilter({ field, values: {} });
  });
}
