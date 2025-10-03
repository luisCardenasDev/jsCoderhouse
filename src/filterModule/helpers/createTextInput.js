/**
 * createTextInput
 * Crea un input de texto genérico para usar en filtros o formularios dinámicos.
 *
 * @param {Function} onChange - Callback que se ejecuta cada vez que cambia el valor del input.
 *                               Recibe como argumento el valor actual del input.
 * @returns {HTMLInputElement} - Elemento input de tipo "text" listo para insertar en el DOM.
 *
 * Ejemplo de uso:
 * const input = createTextInput(value => console.log("Valor actual:", value));
 * document.body.appendChild(input);
 */
export function createTextInput(onChange) {
  const input = document.createElement("input"); // crear input
  input.type = "text";                            // tipo texto
  input.placeholder = "Valor...";                // placeholder genérico

  // Evento de cambio: ejecuta callback con valor actual
  input.addEventListener("input", () => onChange(input.value));

  return input; // devolver elemento listo para insertar
}
