/**
 * FilterModule
 * Módulo de filtrado dinámico para facturas.
 * Permite filtrar datos según un campo y un valor, incluyendo:
 * - Inputs de texto
 * - Selects con valores únicos
 * - Rangos de fecha (desde / hasta)
 * Además, permite bloquear la UI cuando el formulario está abierto.
 * 
 * @param {Object} options
 * @param {Array<Object>} options.data - Array inicial de facturas a filtrar
 * @param {Function} options.onFiltered - Callback que recibe el resultado filtrado
 * @returns {Object} Métodos públicos:
 *   - setFilters(newFilters) → agrega o reemplaza filtros
 *   - setSort(field, order) → ordena por campo y dirección
 *   - apply() → aplica filtros y orden, devuelve array filtrado
 *   - reset() → limpia filtros y segunda UI
 *   - lock() → bloquea la UI de filtros
 *   - unlock() → desbloquea la UI de filtros
 *   - setData(newData) → actualiza los datos originales
 */
export function FilterModule({ data = [], onFiltered }) {

  // ==============================
  // Estado interno
  // ==============================
  let originalData = data;   // copia de los datos originales
  let filters = {};          // filtros actuales { campo: valor }
  let sortField = null;      // campo de ordenamiento
  let sortOrder = "asc";     // ascendente o descendente

  const container = document.getElementById("filterContainer"); // contenedor principal

  // Definición de campos filtrables y su tipo
  const filterFields = [
    { id: "nroDocument", label: "N° Doc", type: "text" },
    { id: "ruc", label: "RUC", type: "text" },
    { id: "legalName", label: "Razón Social", type: "text" },
    { id: "date", label: "Fecha", type: "date" },
    { id: "currency", label: "Moneda", type: "select" },
    { id: "centerCost", label: "Centro de Costo", type: "select" },
    { id: "user", label: "Usuario", type: "select" }
  ];

  let fieldSelect, valueWrapper; // referencias a select de campo y contenedor de valor dinámico

  // ==============================
  // Creación de la UI
  // ==============================
  function createUI() {
    container.innerHTML = "";

    // 1️⃣ Primer select: elegir campo a filtrar
    const fieldDiv = document.createElement("div");
    const fieldLabel = document.createElement("label");
    fieldLabel.textContent = "Filtrar por:";
    fieldSelect = document.createElement("select");
    fieldSelect.innerHTML = `<option value="">--Seleccione campo--</option>` +
      filterFields.map(f => `<option value="${f.id}">${f.label}</option>`).join("");
    fieldDiv.appendChild(fieldLabel);
    fieldDiv.appendChild(fieldSelect);
    container.appendChild(fieldDiv);

    // 2️⃣ Contenedor dinámico: segundo select o input
    valueWrapper = document.createElement("div");
    container.appendChild(valueWrapper);

    // 3️⃣ Botón de reset
    const btnReset = document.createElement("button");
    btnReset.type = "button";
    btnReset.textContent = "Limpiar filtros";
    btnReset.addEventListener("click", reset);
    container.appendChild(btnReset);

    // 4️⃣ Evento: cuando se cambia el campo a filtrar
    fieldSelect.addEventListener("change", () => {
      filters = {}; // limpiar filtro anterior
      renderValueInput(fieldSelect.value); // renderizar input/select correspondiente
      apply(); // aplicar filtro inicial
    });
  }

  // ==============================
  // Render dinámico del segundo input
  // ==============================
  function renderValueInput(fieldId) {
    valueWrapper.innerHTML = ""; // limpiar contenedor
    if (!fieldId) return;

    const fieldInfo = filterFields.find(f => f.id === fieldId);
    if (!fieldInfo) return;

    if (fieldInfo.type === "select") {
      // Crear select con valores únicos
      const uniqueValues = [...new Set(originalData.map(f => f[fieldId]).filter(Boolean))];
      const select = createSelect(uniqueValues, (value) => { 
        filters[fieldId] = value; 
        apply(); 
      });
      valueWrapper.appendChild(select);
    } else if (fieldInfo.type === "date") {
      // Crear rango de fechas desde-hasta
      const dateInputs = createDateRangeInputs((range) => { 
        filters[fieldId] = range; 
        apply(); 
      });
      valueWrapper.appendChild(dateInputs);
    } else {
      // Input de texto
      const input = createTextInput((value) => { 
        filters[fieldId] = value; 
        apply(); 
      });
      valueWrapper.appendChild(input);
    }
  }

  // ==============================
  // Lógica de filtrado y orden
  // ==============================
  function setFilters(newFilters) { filters = { ...filters, ...newFilters }; }

  function setSort(field, order = "asc") { 
    sortField = field; 
    sortOrder = order.toLowerCase() === "desc" ? "desc" : "asc"; 
  }

  function apply() {
    let result = [...originalData];

    // Aplicar filtros
    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;

      // rango de fechas
      if (typeof value === "object" && value.from !== undefined) {
        result = result.filter(item => {
          const itemDate = item[key] || "";
          return (!value.from || itemDate >= value.from) &&
                 (!value.to || itemDate <= value.to);
        });
      } else {
        // filtro texto/select
        const searchValue = value.toString().toLowerCase();
        result = result.filter(item => (item[key] || "").toString().toLowerCase().includes(searchValue));
      }
    });

    // Aplicar ordenamiento
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

    onFiltered?.(result); // callback con resultado filtrado
    return result;
  }

  // ==============================
  // Reset UI y filtros
  // ==============================
  function reset() {
    filters = {};
    fieldSelect.value = "";
    renderValueInput("");
    apply();
  }

  // ==============================
  // Bloqueo / desbloqueo
  // ==============================
  function lock() {
    container.querySelectorAll("input, select, button").forEach(el => {
      el.disabled = true;
      el.style.pointerEvents = "none";
    });
  }

  function unlock() {
    container.querySelectorAll("input, select, button").forEach(el => {
      el.disabled = false;
      el.style.pointerEvents = "auto";
    });
  }

  // ==============================
  // Actualizar datos
  // ==============================
  function setData(newData) {
    originalData = newData;
    apply();
  }

  // ==============================
  // Inicialización
  // ==============================
  createUI();

  // ==============================
  // API pública
  // ==============================
  return { setFilters, setSort, apply, reset, lock, unlock, setData };
}
