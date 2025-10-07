import { FilterModel } from "./filterModel.js";
import { FilterView } from "./filterView.js";
import { renderRows } from "../tableModule/helpers/renderRow.js";
import { subscribe, getState } from "../../../state/stateManager.js";

export function FilterController(onFilter) {
  FilterView();

  const tbody = document.getElementById("tbody");
  if (tbody) tbody.innerHTML = renderRows(FilterModel.getFilteredData());

  // Suscripción global para actualizar tabla cuando cambia el filtro
  subscribe(({ stateTable, stateFilter }) => {
    const filteredData = FilterModel.getFilteredData();
    if (tbody) tbody.innerHTML = renderRows(filteredData);

    if (typeof onFilter === "function") onFilter(filteredData);
  });

  // Método público para forzar un filtro desde fuera
  const applyFilter = (filter) => {
    FilterModel.setFilter(filter);
  };

  return { applyFilter };
}