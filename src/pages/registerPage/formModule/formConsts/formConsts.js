// refsForm.js
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

export const refsFormElements = {
  formContainer: document.getElementById("formContainer"),
  formInvoice: document.getElementById("formInvoice"),
  btnEdit: document.getElementById("btnEdit"),
  btnCancell: document.getElementById("btnCancell"),  
}

export const initialDataForm={
  idDocument: "",
  nroDocument:"",
  ruc:"",
  legalName:"",
  date:"",
  description:"",
  centerCost:"",
  user:"",
  currency:"",
  documentFile:"",
  subtotal:0,
  percentageIVA:0,
  iva:0,
  total:0,
}

export const fieldsDataState=[  idDocument,
  nroDocument,
  ruc,
  legalName,
  date,
  description,
  centerCost,
  user,
  currency,
  documentFile,
  subtotal,
  percentageIVA,
  iva,
  total]







  