import { FormModule } from "./formModule/formModule.js";
import { TableModule } from "./tableModule/tableModule.js";
import { FilterModule } from "./filterModule/filterModule.js";
import { getInvoices, postInvoices } from "../../apiFake/apiFake.js";
import {refsForm} from "./formModule/formConsts/formConsts.js";

export default function RegisterPage() {

  const {formInvoice}=refsForm;

  let invoices = getInvoices();

  const formModule = FormModule({ onSave: handleSave });

  const tableModule = TableModule({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onAdd: () => formModule.openForm()
  });

  const filterModule = FilterModule({
    data: invoices,
    onFiltered: result => tableModule.render(result)
  });

  function handleSave(data) {
    const index = invoices.findIndex(f => f.idDocument === data.idDocument);
    if (index >= 0) invoices[index] = data;
    else invoices.push(data);

    postInvoices(invoices);
    filterModule.setData(invoices);
    applyFiltersAndRender();
  }

  function handleEdit(item, readonly = false) {
    formModule.openForm(item, readonly);
  }

  function handleDelete(id) {
    invoices = invoices.filter(f => f.idDocument !== id);
    postInvoices(invoices);
    filterModule.setData(invoices);
    applyFiltersAndRender();
  }

  function applyFiltersAndRender() {
    filterModule.apply();
  }

  // ===========================
  // Bloqueo y desbloqueo de filtros y tabla
  // ===========================
  function lockAll() {
    filterModule.lock();
    const tableContainer = document.getElementById("tableContainer");
    tableContainer?.querySelectorAll("button, input, select, a").forEach(el => {
      el.disabled = true;
      el.style.pointerEvents = "none";
    });
  }

  function unlockAll() {
    filterModule.unlock();
    const tableContainer = document.getElementById("tableContainer");
    tableContainer?.querySelectorAll("button, input, select, a").forEach(el => {
      el.disabled = false;
      el.style.pointerEvents = "auto";
    });
  }

  // Escuchamos eventos de FormModule
  formInvoice.addEventListener("formOpened", lockAll);
  formInvoice.addEventListener("formClosed", unlockAll);

  // Render inicial
  filterModule.setData(invoices);
  applyFiltersAndRender();

    // Formulario inicialmente oculto
  formModule.clearForm(true); 
}
