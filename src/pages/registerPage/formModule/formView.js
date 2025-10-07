// formView.js
import { refsFormElements, refsFormInputs } from "./formConsts/formConsts.js";
import { calculateIVAandTotal } from "./helpers/calculations.js";
import { formatNumber } from "../../../utils/utils.js";

export function FormView() {
  const {  formInvoice, btnCancell, btnEdit } = refsFormElements;
  const { idDocument, subtotal, percentageIVA } = refsFormInputs;

  function clear(inputs = refsFormInputs) {
    Object.values(inputs).forEach(input => {
      if (input.tagName === "SELECT") input.selectedIndex = 0;
      else input.value = "";
      if (["idDocument", "iva", "total"].includes(input.id)) input.disabled = true;
      else input.disabled = false;
    });
  }

function load(data) {
  console.log("llega load")
  console.log(data)

  Object.keys(refsFormInputs).forEach(key => {
    console.log("ejecutando load")
    console.log(key)
    const input = refsFormInputs[key];
    if (!input) return;

    // Evita asignar valor a los inputs tipo "file"
    if (input.type === "file") return;

    // Asigna el valor si existe en data

    if (data[key] !== undefined) {
      input.value = data[key];
    }
  });

  // Desactiva los campos calculados o no editables
  ["idDocument", "iva", "total"].forEach(id => {
    if (refsFormInputs[id]) {
      refsFormInputs[id].disabled = true;
    }
  });
}

  function toggleFormInputs(isDisabled = false) {
  // Habilita o deshabilita todos los inputs
  Object.values(refsFormInputs).forEach(input => {
    if (!input) return;
    input.disabled = isDisabled;
  });

  // Siempre mantener deshabilitados los campos calculados
  ["idDocument", "iva", "total"].forEach(id => {
    if (refsFormInputs[id]) {
      refsFormInputs[id].disabled = true;
    }
  });
}


  function calculateFields() {
    const { ivaCalc, totalCalc } = calculateIVAandTotal(subtotal.value, percentageIVA.value);
  
    refsFormInputs.iva.value = formatNumber(ivaCalc);
    refsFormInputs.total.value = formatNumber(totalCalc);
  }



  return {
    formInvoice, btnCancell, btnEdit, subtotal, percentageIVA,
    idDocument, clear, load, calculateFields, refsFormInputs, toggleFormInputs
  };
}
