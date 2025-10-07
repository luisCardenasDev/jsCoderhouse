// tableController.js
import { generateId } from "../../../utils/utils.js";
import { getState, setState, subscribe } from "../../../state/stateManager.js";
import { TableView } from "./tableView.js";
import { initialDataForm } from "./tableConsts/tableConsts.js";

/**
 * TableController
 * - Handles table actions: add, view, delete invoices
 * - Connects table view with the global state
 */
export function TableController() {
  const view = TableView();

  /**
   * Deletes an invoice from state by ID
   *  id - idDocument of the invoice
   */
  function deleteItem(id) {
    const { stateTable } = getState();
    const newData = stateTable.data.filter(f => f.idDocument !== id);
    setState({ stateTable: { ...stateTable, data: newData } });
  }

  /**
   * Opens the form in readonly mode to view an invoice
   *  id - idDocument of the invoice
   */
  function showItem(id) {
    const { stateForm, stateTable } = getState();
    const item = stateTable.data.find(f => f.idDocument === id);
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

  // ======================
  // === Event listeners ===
  // ======================

  // Handle view/delete buttons in the table
  view.tbody.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const id = btn.dataset.id;
    if (!id) return;

    if (btn.classList.contains("btn-delete")) {
      if (confirm("⚠️ Delete invoice?")) deleteItem(id);
    }

    if (btn.classList.contains("btn-view")) {
      showItem(id);
    }
  });

  // Handle "Add Invoice" button
  view.addButton.addEventListener("click", () => {
    const { stateForm } = getState();
    setState({
      stateForm: {
        ...stateForm,
        isOpen: true,
        isReadonly: false,
        currentData: {
          ...initialDataForm,
          idDocument: generateId(), // generate new ID for the invoice
        },
      },
    });
  });

  /**
   * Renders table rows and updates summary
   * filteredData - Optional filtered data or full state object
   */
  function render(filteredData) {
    let data;

    if (Array.isArray(filteredData)) {
      data = filteredData;
    } else if (filteredData && filteredData.stateTable) {
      data = filteredData.stateTable.data;
    } else {
      data = getState().stateTable.data;
    }

    view.renderAll(data);
    view.updateSummary(data);

    // Lock or unlock table depending on form state
    if (getState().stateForm.isOpen) {
      view.lock();
    } else {
      view.unlock();
    }
  }

  // Subscribe render function to state changes
  subscribe(render);

  // Expose public methods
  return { render, deleteItem };
}
