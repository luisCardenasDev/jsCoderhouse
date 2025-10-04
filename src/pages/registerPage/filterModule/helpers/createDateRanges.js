
export function createDateRangeInputs(onChange) {
  const wrapper = document.createElement("div");
  const inputTo = document.createElement("input");
  const inputFrom = document.createElement("input");

  inputFrom.type = "date";
  inputTo.type = "date";
  wrapper.appendChild(inputFrom);
  wrapper.appendChild(inputTo);

  // Al cambiar cualquiera de los inputs, se envía el rango actual
  inputFrom.addEventListener("change", () => onChange({ from: inputFrom.value, to: inputTo.value }));
  inputTo.addEventListener("change", () => onChange({ from: inputFrom.value, to: inputTo.value }));
  return wrapper;
}
