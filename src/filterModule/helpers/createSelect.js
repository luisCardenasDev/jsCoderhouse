/**
 * createSelect
 * Crea un elemento <select> dinámico con opciones únicas.
 *
 * @param {Array<string>} options - Array de valores que se usarán como opciones del select.
 * @param {Function} onChange - Callback que se ejecuta cuando se selecciona un valor.
 *                              Recibe como argumento el valor seleccionado.
 * @returns {HTMLSelectElement} - Elemento <select> listo para insertar en el DOM.
 *
 * Ejemplo de uso:
 * const select = createSelect(["USD", "PEN", "ARS"], value => console.log("Seleccionado:", value));
 * document.body.appendChild(select);
 *
 * Características:
 * - Incluye una opción inicial "--Todos--" con valor vacío.
 * - Cada opción se genera automáticamente a partir del array `options`.
 * - Se puede usar para filtros dinámicos en módulos como FilterModule.
 */
export function createSelect(options, onChange) {
  const select = document.createElement("select");

  // Opción por defecto
  select.innerHTML = `<option value="">--Todos--</option>` + 
    options.map(v => `<option value="${v}">${v}</option>`).join("");

  // Evento cambio: ejecutar callback con valor seleccionado
  select.addEventListener("change", () => onChange(select.value));

  return select; // devolver elemento listo para usar
}
