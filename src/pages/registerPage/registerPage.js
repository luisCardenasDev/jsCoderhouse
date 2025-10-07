import { FormController } from "./formModule/formController.js";
import { TableController } from "./tableModule/tableController.js";
import { FilterController } from "./filterModule/filterController.js";

/**
 * RegisterPage
 * - Main module for the invoice registration page.
 * - Initializes the form, table, and filter controllers.
 * - Connects the filter with the table to render only filtered data.
 *
 * Returns main controllers:
 *   form   → Form controller
 *   table  → Table controller
 *   filter → Filter controller
 */
export function RegisterPage() {
  // Initialize controllers
  const form = FormController(false);   // Form controller
  const table = TableController(false); // Table controller

  // Initial render
  form.render();
  table.render();

  // 🔗 Connect filter to table
  const filter = FilterController((filteredData) => {
    table.render(filteredData); // Re-render table whenever filter changes
  });

  // Return all controllers for potential external use
  return {
    form,    // Form controller
    table,   // Table controller
    filter,  // Filter controller
  };
}
