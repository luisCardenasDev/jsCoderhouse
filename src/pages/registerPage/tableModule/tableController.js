import { generateId } from "../../../utils/utils.js";
import { getState, setState, subscribe } from "../../../state/stateManager.js";
import { TableView } from "./tableView.js";

export function TableController() {
  const view = TableView();

  function deleteItem(id) {
    const { stateTable } = getState();
    const newData = stateTable.data.filter(f => f.idDocument !== id);
    setState({ stateTable: { ...stateTable, data: newData } });
  }

  function showItem(id) {
    const { stateForm, stateTable } = getState();
    const item = stateTable.data.find(f => f.idDocument === id);
    console.log("llega showItem")
    console.log(item)
    if (!item) return;

    setState({
      stateForm: {
        ...stateForm,
        isOpen: true,
        isReadonly: true,
        currentData: { ...item },
      },
    });
  }

  view.tbody.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const id = btn.dataset.id;
    if (!id) return;

    if (btn.classList.contains("btn-delete")) {
      if (confirm("⚠️ ¿Eliminar factura?")) deleteItem(id);
    }
    if (btn.classList.contains("btn-view")) {
      showItem(id);
    }
  });

  view.addButton.addEventListener("click", () => {
    const { stateForm } = getState();
    setState({
      stateForm: {
        ...stateForm,
        isOpen: true,
        isReadonly: false,
        currentData: {
          idDocument: generateId(),
          nroDocument: "",
          ruc: "",
          legalName: "",
          date: "",
          description: "",
          centerCost: "",
          user: "",
          currency: "",
          documentFile: "",
          subtotal: "",
          percentageIVA: "",
          iva: "",
          total: "",
        },
      },
    });
  });

  function render(filteredData) {
    let data;
    if (Array.isArray(filteredData)) data = filteredData;
    else if (filteredData && filteredData.stateTable) data = filteredData.stateTable.data;
    else data = getState().stateTable.data;

    view.renderAll(data);
    view.updateSummary(data);

    if (getState().stateForm.isOpen) view.lock();
    else view.unlock();
  }

  subscribe(render);

  return { render, deleteItem };
}
