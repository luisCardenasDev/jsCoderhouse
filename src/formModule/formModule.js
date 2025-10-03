import { formatNumber, generateId } from "../utils/utils.js";
import refsForm from "./mocks/refsForm.js";

/**
 * FormModule
 * 
 * Módulo que maneja la lógica del formulario de facturas.
 * Permite abrir, limpiar, validar y guardar facturas.
 * Campos críticos como "IVA" e "ID" son siempre de solo lectura.
 *
 * @param {Object} options
 * @param {Function} options.onSave - Callback que se ejecuta al guardar una factura. 
 *                                     Recibe como parámetro un objeto con los datos del formulario.
 * @returns {Object} - Métodos públicos:
 *   - openForm(invoiceItem: Object|null, readonly: boolean): void
 *       Abre el formulario para editar o crear una factura.
 *       invoiceItem: factura a editar, null para nueva.
 *       readonly: si true, bloquea campos no críticos.
 *   - clearForm(hide: boolean = true): void
 *       Limpia y reinicia el formulario. Si hide es true, oculta el formulario.
 *
 * Ejemplo de uso:
 * 
 * const formModule = FormModule({
 *   onSave: (invoice) => console.log("Factura guardada:", invoice)
 * });
 * 
 * // Abrir formulario en modo creación
 * formModule.openForm(null, false);
 * 
 * // Abrir formulario en modo edición
 * const invoice = { idDocument: "F001", ruc: "12345678901", subtotal: "100" };
 * formModule.openForm(invoice, true);
 * 
 * // Limpiar formulario
 * formModule.clearForm();
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
   * @param {boolean} hide - Oculta el formulario si es true
   */
  function clearForm(hide = true) {
    invoiceEditingId = null;
    existingDocumentFile = null;
    isReadonly = false;

    Object.values(refsForm).forEach(input => {
      if (input.tagName === "SELECT") input.selectedIndex = 0;
      else input.value = "";

      if (input === refsForm.idDocument || input === refsForm.iva) {
        input.disabled = true;
      } else {
        input.disabled = false;
      }

      input.classList.remove("valid", "invalid");
    });

    refsForm.idDocument.value = generateId();

    if (hide) form.style.display = "none";
  }

  /**
   * Abre el formulario en modo edición o creación
   * @param {Object|null} invoiceItem - Factura a editar, null para nueva
   * @param {boolean} readonly - Si true, bloquea campos no críticos
   */
  function openForm(invoiceItem = null, readonly = false) {
    isReadonly = readonly;

    // Bloquear controles de la tabla
    tableContainer.querySelectorAll("button, a, input, select").forEach(el => {
      el.disabled = true;
      el.style.pointerEvents = "none";
    });

    if (invoiceItem) {
      invoiceEditingId = invoiceItem.idDocument;
      existingDocumentFile = invoiceItem.documentFile || null;

      Object.keys(refsForm).forEach(k => {
        if (k === "documentFile") return;
        if (invoiceItem[k] !== undefined) refsForm[k].value = invoiceItem[k];

        if (k === "idDocument" || k === "iva") {
          refsForm[k].disabled = true;
        } else {
          refsForm[k].disabled = readonly;
        }
      });
    } else {
      clearForm(false);
    }

    form.style.display = "block";
  }

  /**
   * Calcula IVA y total automáticamente
   */
  function calculateIVAandTotal() {
    const subtotal = parseFloat(refsForm.subtotal.value) || 0;
    const percentage = parseFloat(refsForm.percentageIVA.value) || 0;
    const iva = +(subtotal * (percentage / 100));

    refsForm.iva.value = formatNumber(iva);
    refsForm.total.value = formatNumber(subtotal + iva);
  }

  /**
   * Valida visualmente los campos requeridos
   * @returns {boolean} true si todos los campos son válidos
   */
  function validateVisualForm() {
    const requireds = [
      "nroDocument","ruc","legalName","date",
      "subtotal","percentageIVA","description",
      "centerCost","user","currency"
    ];
    let allValid = true;

    requireds.forEach(id => {
      const input = refsForm[id];
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

  // ==============================
  // Eventos
  // ==============================

  refsForm.subtotal.addEventListener("input", calculateIVAandTotal);
  refsForm.percentageIVA.addEventListener("change", calculateIVAandTotal);

  form.querySelector("#btnCancell").addEventListener("click", () => {
    tableContainer.querySelectorAll("button, a, input, select").forEach(el => {
      el.disabled = false;
      el.style.pointerEvents = "auto";
    });
    clearForm();
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (isReadonly) return;
    if (!validateVisualForm()) return;

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

  editButton.addEventListener("click", () => {
    isReadonly = false;
    Object.keys(refsForm).forEach(k => {
      if (k !== "idDocument" && k !== "iva") refsForm[k].disabled = false;
    });
  });

  form.querySelector(".form-actions").appendChild(editButton);

  // ==============================
  // API pública
  // ==============================
  return { openForm, clearForm };
}
