
export function createTextInput(onChange) {
  const input = document.createElement("input"); // crear input
  input.type = "text";                            // tipo texto
  input.placeholder = "Valor...";                // placeholder genérico

  // Evento de cambio: ejecuta callback con valor actual
  input.addEventListener("input", () => onChange(input.value));

  return input; // devolver elemento listo para insertar
}
