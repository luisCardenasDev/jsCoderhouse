import { FilterModel } from "./filterModel.js";

export function FilterView() {
  const filterField = document.getElementById("filterField");
  const filterValueWrapper = document.getElementById("filterValueWrapper");

  const clearWrapper = () => filterValueWrapper.innerHTML = "";

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

  const createSelect = (options, key) => {
    const select = document.createElement("select");
    select.dataset.key = key;
    select.innerHTML = `<option value="">--Seleccione--</option>` + options.map(o => `<option value="${o}">${o}</option>`).join("");
    select.addEventListener("change", () => {
      const current = FilterModel.getFilter();
      FilterModel.setFilter({ values: { ...current.values, [key]: select.value } });
    });
    return select;
  };

  const getUniqueValues = (field) => {
    const tableData = FilterModel.getFilteredData(); 
    return [...new Set(tableData.map(r => r[field]).filter(Boolean))];
  };

  filterField.addEventListener("change", () => {
    clearWrapper();
    const field = filterField.value;
    if (!field) return FilterModel.setFilter({ field: null, values: {} });

    switch (field) {
      case "date":
      case "total":
        filterValueWrapper.appendChild(createInput("date", "Inicio", "start"));
        filterValueWrapper.appendChild(createInput("date", "Fin", "end"));
        break;
      case "user":
      case "currency":
      case "legalName":
      case "centerCost":
        filterValueWrapper.appendChild(createSelect(getUniqueValues(field), "value"));
        break;
      case "ruc":
      case "nroDocument":
        filterValueWrapper.appendChild(createInput("text", "Buscar...", "value"));
        break;
    }

    FilterModel.setFilter({ field, values: {} });
  });
}