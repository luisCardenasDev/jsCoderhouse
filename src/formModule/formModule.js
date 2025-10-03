import { formatNumber } from "../utils/utils.js";
import refsForm from "./mocks/refsForm.js";

import { validateRequiredFields, validateRUC } from "./helpers/formValidation.js";
import { calculateIVA } from "./helpers/calculate.js";
import { lockContainer, unlockContainer } from "./helpers/lockContainer.js";
import { getUploadedFilePath } from "./helpers/fileHelper.js";
import { getInvoiceId } from "./helpers/idHelper.js";

/**
 * FormModule
 * Módulo que maneja la lógica del formulario de facturas.
 * Permite abrir, limpiar, validar y guardar facturas.
 * @param {Object} options
 * @param {Function} options.onSave - Callback que se ejecuta cuando se guarda una factura.
 * @returns {Object} - Métodos públicos: openForm, clearForm
 */
export function FormModule({ onSave }) {

  // ==============================
  // Referencias principales
  // ==============================
  const container = document.getElementById("formContainer");
  const form = container.querySelector("#formInvoice");
  const tableContainer = document.getElementById("tableContainer");
  const editButton = document.getElementById("btnEdit");

  // ==============================
  // Estado interno
  // ==============================
  let invoiceEditingId = null;
  let existingDocumentFile = null;
  let isReadonly = false;

  // ==============================
  // Funciones internas
  // ==============================

  /**
   * Limpia y reinicia el formulario
   * @param {boolean} hide - Si true, oculta el formulario al limpiar
   */
  function clearForm(hide = true) {
    invoiceEditingId = null;
    existingDocumentFile = null;
    isReadonly = false;

    Object.values(refsForm).forEach(input => {
      if (input.tagName === "SELECT") input.selectedIndex = 0;
      else input.value = "";
      input.disabled = false;
      input.classList.remove("valid", "invalid");
    });

    refsForm.idDocument.value = getInvoiceId(null);

    if (hide) form.style.display = "none";
    unlockContainer(tableContainer); // desbloquear tabla al cerrar
  }

  /**
   * Abre el formulario en modo edición o creación
   * @param {Object|null} invoiceItem - Factura existente si se está editando
   * @param {boolean} readonly - Si true, abre el formulario en solo lectura
   */
  function openForm(invoiceItem = null, readonly = false) {
    isReadonly = readonly;

    unlockContainer(tableContainer);  // asegurarse de que la tabla esté desbloqueada
    form.style.display = "block";    // mostrar formulario

    if (invoiceItem) {
      invoiceEditingId = invoiceItem.idDocument;
      existingDocumentFile = invoiceItem.documentFile || null;

      Object.keys(refsForm).forEach(k => {
        if (k === "documentFile") return;
        if (invoiceItem[k] !== undefined) refsForm[k].value = invoiceItem[k];
        refsForm[k].disabled = readonly;
      });
    } else {
      clearForm(false); // limpiar y mostrar formulario para nueva factura
    }

    lockContainer(tableContainer); // bloquear tabla mientras el formulario está abierto
  }

  /**
   * Calcula IVA y total
   */
  function calculateIVAandTotal() {
    const subtotal = parseFloat(refsForm.subtotal.value) || 0;
    const percentage = parseFloat(refsForm.percentageIVA.value) || 0;
    const { iva, total } = calculateIVA(subtotal, percentage);
    refsForm.iva.value = formatNumber(iva);
    refsForm.total.value = formatNumber(total);
  }

  /**
   * Valida campos requeridos y RUC
   * @returns {boolean} - true si es válido
   */
  function validateForm() {
    const requiredFields = [
      "nroDocument","ruc","legalName","date",
      "subtotal","percentageIVA","description",
      "centerCost","user","currency"
    ];

    let allValid = validateRequiredFields(refsForm, requiredFields);
    allValid = validateRUC(refsForm.ruc.value, refsForm.ruc) && allValid;

    return allValid;
  }

  // ==============================
  // Eventos
  // ==============================

  refsForm.subtotal.addEventListener("input", calculateIVAandTotal);
  refsForm.percentageIVA.addEventListener("change", calculateIVAandTotal);

  // Botón Cancelar
  form.querySelector("#btnCancell").addEventListener("click", () => {
    clearForm(true); // limpiar y ocultar formulario
  });

  // Submit del formulario
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (isReadonly) return;
    if (!validateForm()) return;

    const invoiceItem = {};
    Object.keys(refsForm).forEach(k => {
      if (k !== "documentFile") invoiceItem[k] = refsForm[k].value;
    });

    invoiceItem.idDocument = getInvoiceId(invoiceEditingId);
    invoiceItem.documentFile = getUploadedFilePath(refsForm.documentFile, existingDocumentFile);

    onSave(invoiceItem);
    clearForm(true); // cerrar formulario después de guardar
  });

  // Botón Editar: desbloquea campos
  editButton.addEventListener("click", () => {
    isReadonly = false;
    Object.values(refsForm).forEach(r => r.disabled = false);
  });

  form.querySelector(".form-actions").appendChild(editButton);

  // ==============================
  // API pública
  // ==============================
  return { openForm, clearForm };
}
