import {refsForm} from "./formConsts/formConsts.js";
import { calculateIVAandTotal } from "./helpers/calculations.js";
import { validateInvoiceForm } from "./helpers/validators.js";
import { generateId, formatNumber } from "../../../utils/utils.js";

export function FormModule({ onSave }) {
  let invoiceEditingId = null;
  let existingDocumentFile = null;
  let isReadonly = false;

  function clearForm(hide = true) {
    invoiceEditingId = null;
    existingDocumentFile = null;
    isReadonly = false;

    Object.values(refsForm).forEach(input => {
      if (input.tagName === "SELECT") input.selectedIndex = 0;
      else input.value = "";

      if (input === refsForm.idDocument || input === refsForm.iva) input.disabled = true;
      else input.disabled = false;

      input.classList.remove("valid", "invalid");
    });

    refsForm.idDocument.value = generateId();

    if (hide) refsForm.formInvoice.style.display = "none";

    // Emitimos evento de cierre
    refsForm.formInvoice.dispatchEvent(new CustomEvent("formClosed"));
  }

  function openForm(invoiceItem = null, readonly = false) {
    isReadonly = readonly;

    if (invoiceItem) {
      invoiceEditingId = invoiceItem.idDocument;
      existingDocumentFile = invoiceItem.documentFile || null;

      Object.keys(refsForm).forEach(k => {
        if (k === "documentFile") return;
        if (invoiceItem[k] !== undefined) refsForm[k].value = invoiceItem[k];

        if (k === "idDocument" || k === "iva") refsForm[k].disabled = true;
        else refsForm[k].disabled = readonly;
      });
    } else {
      clearForm(false);
    }

    refsForm.formInvoice.style.display = "block";

    // Emitimos evento de apertura
    refsForm.formInvoice.dispatchEvent(new CustomEvent("formOpened"));
  }

  function calculateFields() {
    const { iva, total } = calculateIVAandTotal(refsForm.subtotal.value, refsForm.percentageIVA.value);
    refsForm.iva.value = formatNumber(iva);
    refsForm.total.value = formatNumber(total);
  }

  refsForm.subtotal.addEventListener("input", calculateFields);
  refsForm.percentageIVA.addEventListener("change", calculateFields);

  refsForm.btnCancell.addEventListener("click", clearForm);

  refsForm.formInvoice.addEventListener("submit", e => {
    e.preventDefault();
    if (isReadonly) return;
    if (!validateInvoiceForm(refsForm)) return;

    const invoiceItem = {};
    Object.keys(refsForm).forEach(k => {
      if (k !== "documentFile") invoiceItem[k] = refsForm[k].value;
    });

    invoiceItem.idDocument = invoiceEditingId || generateId();
    const file = refsForm.documentFile.files[0];
    invoiceItem.documentFile = file ? `./uploads/${file.name}` : existingDocumentFile;

    onSave(invoiceItem);
    clearForm();
  });

  return { openForm, clearForm };
}
