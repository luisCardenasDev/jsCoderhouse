// registerPage.js
import { FormController } from "./formModule/formController.js";
import { TableController } from "./tableModule/tableController.js";
import { FilterController } from "./filterModule/filterController.js";

export function RegisterPage() {
  const form = FormController(false);
  const table = TableController(false);

  form.render();
  table.render();

  // 🔗 Conectar filtro con tabla
  const filter = FilterController((filteredData) => {
    table.render(filteredData);
  });

  return {
    form,
    table,
    filter,
  };
}