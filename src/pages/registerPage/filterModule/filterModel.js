import { getState, setState } from "../../../state/stateManager.js";
import { calculateIVAandTotal } from "../formModule/helpers/calculations.js";

export const FilterModel = {
  getFilter: () => getState().stateFilter,

  setFilter: (newFilter) => {
    setState({
      stateFilter: {
        ...getState().stateFilter,
        ...newFilter
      }
    });
  },

  getFilteredData: () => {
    const { stateTable, stateFilter } = getState();
    const tableData = stateTable.data;
    const { field, values } = stateFilter;

    if (!field) return tableData;

    let filtered = [...tableData];

    switch (field) {
      case "date":
        if (values.start) filtered = filtered.filter(r => r.date >= values.start);
        if (values.end) filtered = filtered.filter(r => r.date <= values.end);
        break;

      case "total":
        filtered = filtered.filter(r => {
          const { totalCalc } = calculateIVAandTotal(r.subtotal, r.percentageIVA);
          if (values.start && totalCalc < parseFloat(values.start)) return false;
          if (values.end && totalCalc > parseFloat(values.end)) return false;
          return true;
        });
        break;

      case "user":
      case "currency":
      case "legalName":
      case "centerCost":
        if (values.value) filtered = filtered.filter(r => r[field] === values.value);
        break;

      case "ruc":
      case "nroDocument":
        if (values.value) filtered = filtered.filter(r => (r[field] || "").toLowerCase().includes(values.value.toLowerCase()));
        break;
    }

    return filtered;
  }
};