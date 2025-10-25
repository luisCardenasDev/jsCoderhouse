import { refsTableElements } from "./tableConsts/tableConsts.js";
import { formatNumber } from "../../../utils/utils.js";
import { renderRows } from "./helpers/renderRow.js";

/**
 * TableView
 * 
 * Manages rendering and interaction of the invoices table.
 * Provides functions to render table rows, update summaries, and control UI interactivity.
 */
export function TableView() {
  // References to DOM elements for table container and summary elements
  const { container, tbody, recordCount, currencyTotal, addButton } = refsTableElements;

  /**
   * Render all table rows based on provided data
   * @param {Array<Object>} data - Array of invoice objects to display
   */
  function renderAll(data) {
    // Generate and inject HTML for all rows at once
    tbody.innerHTML = renderRows(data);
  }

  /**
   * Updates the summary section below the table
   * Displays total number of records and total amounts per currency
   * @param {Array<Object>} data - Array of invoice objects
   */
  function updateSummary(data) {
    // Update total record count
    recordCount.textContent = data.length;

    // Calculate totals grouped by currency
    const totalsByCurrency = data.reduce((acc, item) => {
      const total = parseFloat(item.total) || 0;
      acc[item.currency] = (acc[item.currency] || 0) + total;
      return acc;
    }, {});

    // Render totals as string: "USD 300 | PEN 1500"
    currencyTotal.textContent = Object.entries(totalsByCurrency)
      .map(([currency, amount]) => `${currency} ${formatNumber(amount)}`)
      .join(" | ");
  }

  /**
   * Locks the table UI to prevent interactions
   * Typically used when a modal or form is open
   */
  function lock() {
    container.style.pointerEvents = "none";
    container.style.opacity = "0.5"; // indicate locked state visually
  }

  /**
   * Unlocks the table UI, allowing interactions again
   */
  function unlock() {
    container.style.pointerEvents = "auto";
    container.style.opacity = "1"; // restore normal appearance
  }

  // Public API
  return {
    renderAll,       // render table rows
    updateSummary,   // update record count and currency totals
    lock,            // disable table interactions
    unlock,          // enable table interactions
    tbody,           // reference to table body (for row events)
    addButton        // reference to "Add Invoice" button
  };
}
