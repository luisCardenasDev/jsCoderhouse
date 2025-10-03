// filterModule/filterModule.js
import { createDateRangeInputs } from "./helpers/createDateRanges.js";
import { createTextInput } from "./helpers/createTextInput.js";
import { createSelect } from "./helpers/createSelect.js";

/**
 * FilterModule
 * Módulo de filtrado dinámico para facturas.
 * Primer select fijo, segundo select/input dinámico según el campo.
 *
 * @param {Object} options
 * @param {Array<Object>} options.data - Array de facturas
 * @param {Function} options.onFiltered - Callback con resultados filtrados
 * @returns {Object} - Métodos públicos: setFilters, setSort, apply, reset, lock, unlock, setData
 */
export function FilterModule({ data = [], onFiltered }) {
  let originalData = data;
  let filters = {};
  let sortField = null;
  let sortOrder = "asc";

  // ==============================
  // Referencias fijas en DOM
  // ==============================
  const fieldSelect = document.getElementById("filterField");       // Primer select fijo
  const valueWrapper = document.getElementById("filterValueWrapper"); // Contenedor dinámico

  // Campos filtrables y tipo
  const filterFields = [
    { id: "nroDocument", label: "N° Doc", type: "text" },
    { id: "ruc", label: "RUC", type: "text" },
    { id: "legalName", label: "Razón Social", type: "text" },
    { id: "date", label: "Fecha", type: "date" },
    { id: "currency", label: "Moneda", type: "select" },
    { id: "centerCost", label: "Centro de Costo", type: "select" },
    { id: "user", label: "Usuario", type: "select" }
  ];

  // ==============================
  // UI dinámico
  // ==============================
  function renderValueInput(fieldId) {
    valueWrapper.innerHTML = "";
    if (!fieldId) return;

    const fieldInfo = filterFields.find(f => f.id === fieldId);
    if (!fieldInfo) return;

    if (fieldInfo.type === "select") {
      const uniqueValues = [...new Set(originalData.map(f => f[fieldId]).filter(Boolean))];
      const select = createSelect(uniqueValues, value => {
        filters[fieldId] = value;
        apply();
      });
      valueWrapper.appendChild(select);
    } else if (fieldInfo.type === "date") {
      const dateInputs = createDateRangeInputs(range => {
        filters[fieldId] = range;
        apply();
      });
      valueWrapper.appendChild(dateInputs);
    } else {
      const input = createTextInput(value => {
        filters[fieldId] = value;
        apply();
      });
      valueWrapper.appendChild(input);
    }
  }

  // Evento cambio del primer select
  fieldSelect.addEventListener("change", () => {
    filters = {}; // reset filtro anterior
    renderValueInput(fieldSelect.value);
    apply();
  });

  // ==============================
  // Lógica de filtros
  // ==============================
  function setFilters(newFilters) { filters = { ...filters, ...newFilters }; }
  function setSort(field, order = "asc") { sortField = field; sortOrder = order.toLowerCase() === "desc" ? "desc" : "asc"; }

  function apply() {
    let result = [...originalData];

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;

      if (typeof value === "object" && value.from !== undefined) {
        // rango de fechas
        result = result.filter(item => {
          const itemDate = item[key] || "";
          return (!value.from || itemDate >= value.from) &&
                 (!value.to || itemDate <= value.to);
        });
      } else {
        const searchValue = value.toString().toLowerCase();
        result = result.filter(item => (item[key] || "").toString().toLowerCase().includes(searchValue));
      }
    });

    if (sortField) {
      result.sort((a, b) => {
        const valA = a[sortField] ?? "";
        const valB = b[sortField] ?? "";
        if (!isNaN(valA) && !isNaN(valB)) return sortOrder === "asc" ? valA - valB : valB - valA;
        return sortOrder === "asc"
          ? valA.toString().localeCompare(valB.toString())
          : valB.toString().localeCompare(valA.toString());
      });
    }

    onFiltered?.(result);
    return result;
  }

  function reset() {
    filters = {};
    fieldSelect.value = "";
    renderValueInput("");
    apply();
  }

  function lock() {
    valueWrapper.querySelectorAll("input, select, button").forEach(el => {
      el.disabled = true;
      el.style.pointerEvents = "none";
    });
    fieldSelect.disabled = true;
  }

  function unlock() {
    valueWrapper.querySelectorAll("input, select, button").forEach(el => {
      el.disabled = false;
      el.style.pointerEvents = "auto";
    });
    fieldSelect.disabled = false;
  }

  function setData(newData) {
    originalData = newData;
    apply();
  }

  // ==============================
  // Inicialización
  // ==============================
  renderValueInput(fieldSelect.value);

  return { setFilters, setSort, apply, reset, lock, unlock, setData };
}
