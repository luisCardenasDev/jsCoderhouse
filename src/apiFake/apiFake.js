// Estado global
// getInvoices.js
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

export function getInvoices() {
  return invoices;
}

// Almacenamiento
export function postInvoices(invoicesPosted) {
  localStorage.setItem("invoices", JSON.stringify(invoicesPosted));
}