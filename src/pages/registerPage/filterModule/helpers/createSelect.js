
export function createSelect(options, onChange) {
  const select = document.createElement("select");

  // Opción por defecto
  select.innerHTML = `<option value="">--Todos--</option>` + 
    options.map(v => `<option value="${v}">${v}</option>`).join("");

  // Evento cambio: ejecutar callback con valor seleccionado
  select.addEventListener("change", () => onChange(select.value));

  return select; // devolver elemento listo para usar
}
