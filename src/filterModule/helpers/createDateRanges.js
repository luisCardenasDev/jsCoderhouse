/**
 * createDateRangeInputs
 * Crea un contenedor con dos inputs de tipo fecha para representar un rango "Desde - Hasta".
 *
 * @param {Function} onChange - Callback que se ejecuta cada vez que se cambia alguna fecha.
 *                              Recibe un objeto con la estructura: { from: string, to: string },
 *                              donde `from` y `to` son fechas en formato yyyy-mm-dd.
 * @returns {HTMLDivElement} - Contenedor <div> que contiene los dos inputs de fecha.
 *
 * Ejemplo de uso:
 * const dateRange = createDateRangeInputs(range => console.log("Rango seleccionado:", range));
 * document.body.appendChild(dateRange);
 *
 * Características:
 * - Permite capturar un rango de fechas para filtros.
 * - Cada input dispara el callback al cambiar, enviando el rango completo actual.
 * - Ideal para integrarlo en un módulo de filtrado dinámico (FilterModule).
 */
export function createDateRangeInputs(onChange) {
  const wrapper = document.createElement("div");

  const inputFrom = document.createElement("input");
  inputFrom.type = "date";
  inputFrom.placeholder = "Desde";

  const inputTo = document.createElement("input");
  inputTo.type = "date";
  inputTo.placeholder = "Hasta";

  // Al cambiar cualquiera de los inputs, se envía el rango actual
  inputFrom.addEventListener("change", () => onChange({ from: inputFrom.value, to: inputTo.value }));
  inputTo.addEventListener("change", () => onChange({ from: inputFrom.value, to: inputTo.value }));

  wrapper.appendChild(inputFrom);
  wrapper.appendChild(inputTo);

  return wrapper;
}
