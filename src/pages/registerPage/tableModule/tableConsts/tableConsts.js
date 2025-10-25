// tableConsts.js

/**
 * refsTableElements
 * - References to HTML elements of the invoices table and related controls
 */
export const refsTableElements = {  
  container: document.getElementById("tableContainer"),   // Wrapper container for the table
  table: document.getElementById("invoicesTable"),        // <table> element
  tbody: document.getElementById("tbody"),               // <tbody> where rows will be rendered
  selectAll: document.getElementById("selectAll"),       // Checkbox to select/deselect all rows
  recordCount: document.getElementById("recordCount"),   // Element to show number of records
  currencyTotal: document.getElementById("currencyTotal"), // Container to show totals by currency
  addButton: document.getElementById("btnAddInvoice")    // Button to add a new invoice
};

/**
 * refsTableInvoice
 * - Keys corresponding to invoice object properties
 * - Useful for mapping data to table columns
 */
export const refsTableInvoice = {
  idDocument: "idDocument",
  nroDocument: "nroDocument",
  ruc: "ruc",
  legalName: "legalName",
  date: "date",
  description: "description",
  centerCost: "centerCost",
  user: "user",
  currency: "currency",
  documentFile: "documentFile",
  subtotal: "subtotal",
  percentageIVA: "percentageIVA",
  iva: "iva",
  total: "total",
};

/**
 * refsTableHeader
 * - Display labels for each column in the table header
 * - Order defines the rendering sequence in renderRows
 */
export const refsTableHeader = {
  nroDocument: "N° Documento",
  ruc: "RUC",
  legalName: "Razón Social",
  date: "Fecha",
  total: "Total",
  currency: "Moneda",
  centerCost: "Centro de Costo",
  user: "Usuario",
  description: "Descripción",
  documentFile: "Archivo",
};

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