// formController.js
import { getState, setState, subscribe } from "../../../state/stateManager.js";
import { FormView } from "./formView.js";
import { validateInvoiceForm } from "./helpers/validators.js";

export function FormController() {
  const view = FormView();

  // ======================
  // === FUNCIONES INTERNAS ===
  // ======================

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



  function saveData() {
    if (!validateForm()) return console.warn("Formulario inválido");

    const { stateForm, stateTable } = getState();

    // Construye el objeto con los valores del formulario
    const data = Object.values(view.refsFormInputs).reduce((acc, input) => {
      acc[input.id] = input.value;
      return acc;
    }, {});

    // Actualiza el estado
    setState({
      stateForm: {
        ...stateForm,
        isOpen: false,
        isReadonly:false,
        currentData: data,
      },
      stateTable: {
        ...stateTable,
        data: [...stateTable.data, data],
      },
    });
  }

function render() {


  const { stateForm } = getState();

  const { isOpen, isReadonly, currentData } = stateForm;

  // Si el formulario no está abierto, ocultar y salir
  if (!isOpen) {

    view.formInvoice.style.display = "none";
    return;
  }

  // Mostrar formulario y cargar datos
  view.formInvoice.style.display = "block";
  view.load(currentData);
  view.toggleFormInputs(isReadonly);

  
}
  

  // ======================
  // === EVENTOS ===
  // ======================

  view.subtotal.addEventListener("input", view.calculateFields);
  view.percentageIVA.addEventListener("input", view.calculateFields);

  view.formInvoice.addEventListener("submit", e => {
    e.preventDefault();
    saveData();
  });

  view.btnCancell.addEventListener("click", e => {
    e.preventDefault();
    setState({
      stateForm: {
        ...getState().stateForm,
        isOpen: false,
        isReadonly:false,
        currentData: null,
      },
    });
  });

  view.btnEdit.addEventListener("click", e => {
    e.preventDefault();
    view.toggleFormInputs(false)
    setState({
      stateForm: {
        ...getState().stateForm,
        isOpen: true,
        isReadonly: false,
      },
    });
    console.log("llega btnEdit")
    console.log(getState().stateForm) 
  });

  // ======================
  // === SUSCRIPCIÓN REACTIVA ===
  // ======================
  subscribe(render);

  // ======================
  // === MÉTODOS EXPUESTOS ===
  // ======================
  return {
    render,
    saveData,
    validateForm,
  };
}