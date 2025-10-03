/**
 * formValidation.js
 * 
 * Funciones de validación de formularios de factura.
 */

/**
 * Valida que los campos requeridos tengan valor.
 *
 * @param {Object} refsForm - Objeto con referencias a los inputs del formulario.
 * @param {Array<string>} requiredFields - Array con los IDs de los campos obligatorios.
 * @returns {boolean} - true si todos los campos obligatorios tienen valor, false en caso contrario.
 *
 * @example
 * const isValid = validateRequiredFields(refsForm, [
 *   "nroDocument", "ruc", "legalName", "date"
 * ]);
 * if (!isValid) console.log("Faltan campos requeridos");
 */
export function validateRequiredFields(refsForm, requiredFields) {
  let allValid = true;

  requiredFields.forEach(id => {
    const input = refsForm[id];
    const value = String(input?.value || "").trim();

    if (!value) {
      input.classList.add("invalid");
      input.classList.remove("valid");
      allValid = false;
    } else {
      input.classList.add("valid");
      input.classList.remove("invalid");
    }
  });

  return allValid;
}

/**
 * Valida un RUC peruano de 11 dígitos.
 *
 * @param {string} ruc - Valor del RUC a validar.
 * @param {HTMLInputElement} inputEl - Elemento input correspondiente.
 * @returns {boolean} - true si el RUC es válido, false si no lo es.
 *
 * @example
 * const isRUCValid = validateRUC(refsForm.ruc.value, refsForm.ruc);
 * if (!isRUCValid) alert("RUC inválido");
 */
export function validateRUC(ruc, inputEl) {
  const isValid = ruc.replace(/\D/g, "").length === 11;
  if (!isValid) {
    inputEl.classList.add("invalid");
    inputEl.classList.remove("valid");
    alert("RUC inválido: debe tener 11 dígitos");
  } else {
    inputEl.classList.add("valid");
    inputEl.classList.remove("invalid");
  }
  return isValid;
}
