import { refsFormElements, refsFormInputs, selectOptions } from "./formConsts/formConsts.js";
import { calculateIVAandTotal } from "./helpers/calculations.js";
import { formatNumber } from "../../../utils/utils.js";

/**
 * FormView
 * - Handles rendering, input management, validation, and calculations for the invoice form
 * - Provides methods to clear, load, toggle, and validate form inputs
 */
export function FormView() {
  const { formInvoice, btnCancell, btnEdit } = refsFormElements;
  const { idDocument, subtotal, percentageIVA} = refsFormInputs;

  /**
   * Clears all form inputs
   * - Resets input values and selects
   * - Enables/disables calculated fields
   * - Removes validation classes
   */
  function clear(inputs = refsFormInputs) {
    Object.values(inputs).forEach(input => {
      if (input.tagName === "SELECT") input.selectedIndex = 0;
      else input.value = "";

      if (["idDocument", "iva", "total"].includes(input.id)) input.disabled = true;
      else input.disabled = false;

      input.classList.remove("is-valid", "is-invalid");
    });
  }

  /**
   * Loads data into form inputs
   * - Skips file inputs and non-existing keys
   * data - Data object to populate the form
   */
  function load(data) {
    Object.keys(refsFormInputs).forEach(key => {
      const input = refsFormInputs[key];
      if (!input || input.type === "file") return;
      if (data[key] !== undefined) input.value = data[key];
    });

    ["idDocument", "iva", "total"].forEach(id => {
      if (refsFormInputs[id]) refsFormInputs[id].disabled = true;
    });
  }

  /**
   * Enables or disables form inputs
   * - Keeps calculated fields disabled
   *  isDisabled - Whether inputs should be disabled
   */
  function toggleFormInputs(isDisabled = false) {
    Object.values(refsFormInputs).forEach(input => {
      if (!input) return;
      input.disabled = isDisabled;
    });

    ["idDocument", "iva", "total"].forEach(id => {
      if (refsFormInputs[id]) refsFormInputs[id].disabled = true;
    });
  }

  /**
   * Calculates IVA and total fields based on subtotal and IVA percentage
   * - Updates the corresponding input values
   */
  function calculateFields() {
    const { ivaCalc, totalCalc } = calculateIVAandTotal(subtotal.value, percentageIVA.value);
    refsFormInputs.iva.value = formatNumber(ivaCalc);
    refsFormInputs.total.value = formatNumber(totalCalc);
  }

  /**
   * Populates <select> elements with predefined options
   */
  function populateSelects() {
    Object.entries(selectOptions).forEach(([key, options]) => {
      const select = refsFormInputs[key];
      if (!select) return;

      select.innerHTML = "";
      options.forEach(({ value, label }) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = label;
        select.appendChild(option);
      });
    });
  }

  // Initialize select elements on load
  populateSelects();

  /**
   * Generic form validation
   * - Adds .is-valid or .is-invalid classes to inputs
   * - Returns true if all required fields are filled
   */
  function validateForm() {
    let isValid = true;

    Object.values(refsFormInputs).forEach(input => {
      if (!input || input.disabled || input.type === "file") return;

      input.classList.remove("is-valid", "is-invalid");

      if (!input.value.trim()) {
        input.classList.add("is-invalid");
        isValid = false;
      } else {
        input.classList.add("is-valid");
      }
    });

    if (!isValid) {
      alert("The form contains errors. Please correct the highlighted fields.");
    }

    return isValid;
  }

  // ======================
  // === EVENT LISTENERS ===
  // ======================

  formInvoice.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop submission if invalid

    // Valid submission: calculate totals, alert, reset form
    calculateFields();
    alert("Form is valid and ready to submit.");
    formInvoice.reset();
    clear();
  });

  return {
    formInvoice,
    btnCancell,
    btnEdit,
    subtotal,
    percentageIVA,
    idDocument,
    clear,
    load,
    calculateFields,
    toggleFormInputs,
    refsFormInputs,
    validateForm,
  };
}
