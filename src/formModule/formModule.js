import { formatNumber, generateId, parseNumberFormatted } from "../utils/utils.js";
import formFields from "./mocks/formFields.js";

export function FormModule({ containerId, onSubmit }) {
  const container = document.getElementById(containerId);
  let invoiceEditingId = null;

  const form = document.createElement("form");
  form.id = "formInvoice";
  form.style.display = "none";

  // GENERAR FILAS DINÁMICAMENTE
  let currentRow = document.createElement("div");
  currentRow.className = "row";
  let currentWidth = 0;

  formFields.forEach(c => {
    const col = document.createElement("div");
    col.className = `col ${c.colClass || "col-4"}`;
    currentWidth += parseInt(c.colClass?.split("-")[1] || "4");

    const label = document.createElement("label");
    label.textContent = c.label;
    col.appendChild(label);

    let input;
    if (c.type === "select") {
      input = document.createElement("select");
      c.options.forEach(opt => {
        const o = document.createElement("option");
        o.value = opt;
        o.textContent = opt;
        input.appendChild(o);
      });
    } else if (c.type === "textarea") {
      input = document.createElement("textarea");
    } else {
      input = document.createElement("input");
      input.type = c.type;
    }

    if (c.disabled) input.disabled = true;
    if (c.maxlength) input.maxLength = c.maxlength;
    input.id = c.id;

    if (c.id === "idDocument" && !invoiceEditingId) {
      input.value = generateId();
    }

    col.appendChild(input);
    currentRow.appendChild(col);

    if (currentWidth >= 12) {
      form.appendChild(currentRow);
      currentRow = document.createElement("div");
      currentRow.className = "row";
      currentWidth = 0;
    }
  });

  if (currentRow.children.length > 0) form.appendChild(currentRow);

  // BOTONES
  const actions = document.createElement("div");
  actions.className = "form-actions";
  actions.innerHTML = `
    <button type="submit" class="btn-save">Guardar</button>
    <button type="button" id="btnCancell" class="btn-cancell">Cancelar</button>
  `;
  form.appendChild(actions);
  container.appendChild(form);

  const refs = {};
  formFields.forEach(c => refs[c.id] = form.querySelector(`#${c.id}`));

  function clearForm(hide = true) {
    invoiceEditingId = null;
    formFields.forEach(c => {
      const input = refs[c.id];
      if (c.type === "select") input.value = c.options[0] || "";
      else input.value = "";
      if (c.id === "idDocument") input.value = generateId();
      input.classList.remove("valid","invalid");
    });
    if (hide) form.style.display = "none";
  }

  function openForm(factura = null) {
    if (factura) {
      invoiceEditingId = factura.idDocument;
      formFields.forEach(c => {
        const input = refs[c.id];
        if (factura[c.id] !== undefined) input.value = factura[c.id];
      });
    } else clearForm(false);
    form.style.display = "block";
  }

  function calculateIVAanTotal() {
    const subtotal = parseNumberFormatted(refs["subtotal"].value);
    const percentage = parseFloat(refs["percentageIVA"].value) || 0;
    const iva = +(subtotal * (percentage / 100));
    refs["iva"].value = formatNumber(iva);
    refs["total"].value = formatNumber(subtotal + iva);
  }

  function validateVisualForm() {
    const requireds = ["nroDocument","ruc","legalName","date","subtotal","description","centerCost","user"];
    let allValid = true;
    requireds.forEach(id => {
      const input = refs[id];
      const value = String(input.value).trim();
      if (!value || (id === "ruc" && input.value.replace(/\D/g,'').length !== 11)) {
        input.classList.add("invalid");
        input.classList.remove("valid");
        allValid = false;
      } else {
        input.classList.add("valid");
        input.classList.remove("invalid");
      }
    });
    return allValid;
  }

  // EVENTOS
  refs["subtotal"].addEventListener("input", calculateIVAanTotal);
  refs["percentageIVA"].addEventListener("change", calculateIVAanTotal);
  form.querySelector("#btnCancell").addEventListener("click", () => clearForm());
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!validateVisualForm()) return alert("Complete los campos requeridos en rojo");
    const factura = {};
    formFields.forEach(c => factura[c.id] = refs[c.id].value);
    factura.idDocument = invoiceEditingId || generateId();
    onSubmit(factura);
    clearForm();
  });

  return { openForm, clearForm };
}

