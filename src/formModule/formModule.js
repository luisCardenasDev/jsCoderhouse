import { formatNumber, generateId, parseNumberFormatted } from "../utils/utils.js";

export function FormModule({ containerId, onSave }) {
  const container = document.getElementById(containerId);
  const form = container.querySelector("#formInvoice");
  let invoiceEditingId = null;

  const refs = {
    idDocument: form.querySelector("#idDocument"),
    nroDocument: form.querySelector("#nroDocument"),
    ruc: form.querySelector("#ruc"),
    legalName: form.querySelector("#legalName"),
    date: form.querySelector("#date"),
    subtotal: form.querySelector("#subtotal"),
    percentageIVA: form.querySelector("#percentageIVA"),
    iva: form.querySelector("#iva"),
    total: form.querySelector("#total"),
    centerCost: form.querySelector("#centerCost"),
    user: form.querySelector("#user"),
    description: form.querySelector("#description")
  };

  function clearForm(hide = true) {
    invoiceEditingId = null;
    Object.values(refs).forEach(input => {
      if (input.tagName === "SELECT") input.selectedIndex = 0;
      else input.value = "";
      input.classList.remove("valid", "invalid");
    });
    refs.idDocument.value = generateId();
    if (hide) form.style.display = "none";
  }

  function openForm(factura = null) {
    if (factura) {
      invoiceEditingId = factura.idDocument;
      Object.keys(refs).forEach(k => {
        if (factura[k] !== undefined) refs[k].value = factura[k];
      });
    } else {
      clearForm(false); // abrir vacío
    }
    form.style.display = "block"; // asegurar que siempre se muestre
  }

  function calculateIVAanTotal() {
    let subtotal = parseFloat(refs.subtotal.value) || 0;
    subtotal = parseFloat(subtotal.toFixed(2));
    const percentage = parseFloat(refs.percentageIVA.value) || 0;
    const iva = +(subtotal * (percentage / 100));
    refs.iva.value = formatNumber(iva);
    refs.total.value = formatNumber(subtotal + iva);
  }

  function validateVisualForm() {
    const requireds = ["nroDocument","ruc","legalName","date","subtotal","description","centerCost","user"];
    let allValid = true;
    requireds.forEach(id => {
      const input = refs[id];
      const value = String(input?.value || "").trim();
      if (!value) {
        input.classList.add("invalid");
        input.classList.remove("valid");
        allValid = false;
      } else if (id === "ruc" && input.value.replace(/\D/g,'').length !== 11) {
        input.classList.add("invalid");
        input.classList.remove("valid");
        allValid = false;
        alert("RUC inválido: debe tener 11 dígitos");
      } else {
        input.classList.add("valid");
        input.classList.remove("invalid");
      }
    });
    return allValid;
  }

  // Eventos
  refs.subtotal.addEventListener("input", calculateIVAanTotal);
  refs.percentageIVA.addEventListener("change", calculateIVAanTotal);
  form.querySelector("#btnCancell").addEventListener("click", () => clearForm());

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!validateVisualForm()) return;
    const factura = {};
    Object.keys(refs).forEach(k => factura[k] = refs[k].value);
    factura.idDocument = invoiceEditingId || generateId();
    onSave(factura);
    clearForm();
  });

  return { openForm, clearForm };
}
