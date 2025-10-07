import { getState, setState, subscribe } from "../../../state/stateManager.js";
import { FormView } from "./formView.js";
import { validateInvoiceForm } from "./helpers/validators.js";
import { refsFormInputs } from "./formConsts/formConsts.js";

/**
 * FormController
 * - Handles invoice form interactions, validation, and state updates
 * - Connects the FormView with global state management
 */
export function FormController() {
  const view = FormView();

  // ======================
  // === INTERNAL FUNCTIONS ===
  // ======================

  /**
   * Validates the form using the helper
   * - Adds 'valid' or 'invalid' CSS classes for visual feedback
   * @returns {boolean} True if form is valid
   */
  function validateForm() {
    const { isValid, errors } = validateInvoiceForm(view.refsFormInputs);

    Object.entries(view.refsFormInputs).forEach(([id, input]) => {
      if (errors[id]) {
        input.classList.add("invalid");
        input.classList.remove("valid");
      } else {
        input.classList.add("valid");
        input.classList.remove("invalid");
      }
    });

    return isValid;
  }

  /**
   * Saves form data into global state
   * - Only saves if form passes validation
   * - Updates both form state and table data
   */
  function saveData() {
    if (!validateForm()) return console.warn("Form is invalid");

    const { stateForm, stateTable } = getState();

    // Build data object from input values
    const data = Object.values(view.refsFormInputs).reduce((acc, input) => {
      acc[input.id] = input.value;
      return acc;
    }, {});

    // Update global state
    setState({
      stateForm: {
        ...stateForm,
        isOpen: false,
        isReadonly: false,
        currentData: data,
      },
      stateTable: {
        ...stateTable,
        data: [...stateTable.data, data],
      },
    });
  }

  /**
   * Renders the form based on global state
   * - Shows/hides form
   * - Loads current data
   * - Toggles input readonly state
   */
  function render() {
    const { stateForm } = getState();
    const { isOpen, isReadonly, currentData } = stateForm;

    if (!isOpen) {
      view.formInvoice.style.display = "none";
      return;
    }

    // Show form and populate data
    view.formInvoice.style.display = "block";
    view.load(currentData);
    view.toggleFormInputs(isReadonly);
  }

  // ======================
  // === EVENT LISTENERS ===
  // ======================

  // Auto-calculate fields when subtotal or IVA percentage changes
  view.subtotal.addEventListener("input", view.calculateFields);
  view.percentageIVA.addEventListener("input", view.calculateFields);

  // Form submission
  view.formInvoice.addEventListener("submit", e => {
    e.preventDefault();
    saveData();
  });

  // Cancel button closes the form and resets current data
  view.btnCancell.addEventListener("click", e => {
    e.preventDefault();
    setState({
      stateForm: {
        ...getState().stateForm,
        isOpen: false,
        isReadonly: false,
        currentData: null,
      },
    });
  });

  // Edit button enables inputs and opens the form
  view.btnEdit.addEventListener("click", e => {
    e.preventDefault();
    view.toggleFormInputs(false);
    setState({
      stateForm: {
        ...getState().stateForm,
        isOpen: true,
        isReadonly: false,
      },
    });

  });

  // ======================
  // === REACTIVE SUBSCRIPTION ===
  // ======================

  // Automatically re-render form when state changes
  subscribe(render);

  // ======================
  // === EXPOSED METHODS ===
  // ======================
  return {
    render,
    saveData,
    validateForm,
  };
}
