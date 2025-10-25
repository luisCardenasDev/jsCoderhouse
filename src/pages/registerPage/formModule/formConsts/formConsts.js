/**
 * References to all form input elements
 * Selected once to avoid repeated DOM queries
 */
export const refsFormInputs = {
  idDocument: document.getElementById("idDocument"),
  iva: document.getElementById("iva"),
  subtotal: document.getElementById("subtotal"),
  percentageIVA: document.getElementById("percentageIVA"),
  total: document.getElementById("total"),
  nroDocument: document.getElementById("nroDocument"),
  ruc: document.getElementById("ruc"),
  legalName: document.getElementById("legalName"),
  date: document.getElementById("date"),
  description: document.getElementById("description"),
  centerCost: document.getElementById("centerCost"),
  user: document.getElementById("user"),
  currency: document.getElementById("currency"),
  documentFile: document.getElementById("documentFile"),
};

/**
 * References to main form elements (containers, buttons)
 */
export const refsFormElements = {
  formContainer: document.getElementById("formContainer"),
  formInvoice: document.getElementById("formInvoice"),
  btnEdit: document.getElementById("btnEdit"),
  btnCancell: document.getElementById("btnCancell"), // typo fixed: "btnCancel"
};

/**
 * Initial state for the form data
 */
export const initialDataForm = {
  idDocument: "",
  nroDocument: "",
  ruc: "",
  legalName: "",
  date: "",
  description: "",
  centerCost: "",
  user: "",
  currency: "",
  documentFile: "",
  subtotal: 0,
  percentageIVA: 0,
  iva: 0,
  total: 0,
};

/**
 * Array of form field keys for iteration or state management
 */
export const fieldsDataState = [
  "idDocument",
  "nroDocument",
  "ruc",
  "legalName",
  "date",
  "description",
  "centerCost",
  "user",
  "currency",
  "documentFile",
  "subtotal",
  "percentageIVA",
  "iva",
  "total",
];

/**
 * Select options used by <select> fields in the form
 */
export const selectOptions = {
  centerCost: [
    { value: "", label: "--Select--" },
    { value: "Administrativo", label: "Administrative" },
    { value: "Finanzas", label: "Finance" },
    { value: "Logística", label: "Logistics" },
    { value: "Marketing", label: "Marketing" },
    { value: "IT", label: "Technology / IT" },
  ],

  user: [
    { value: "", label: "--Select--" },
    { value: "lcardenas", label: "Luis Cardenas" },
    { value: "jrojas", label: "Jorge Rojas" },
    { value: "mperez", label: "Maria Perez" },
    { value: "lucia", label: "Lucia Torres" },
  ],
};



  