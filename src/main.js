import { FormModule } from "./formModule/formModule.js";
import { TableModule } from "./tableModule/tableModule.js";

let facturas = JSON.parse(localStorage.getItem("facturas")) || [];

// Instanciar el formulario
const form = FormModule({
  containerId: "formContainer",
  onSubmit: (factura) => {
    const index = facturas.findIndex(f => f.idDocument === factura.idDocument);
    if (index >= 0) {
      facturas[index] = factura; // editar
    } else {
      facturas.push(factura); // agregar nuevo
    }
    localStorage.setItem("facturas", JSON.stringify(facturas));
    table.render(facturas);
  }
});

// Instanciar la tabla
const table = TableModule({
  containerId: "tableContainer",
  onEdit: (factura) => form.openForm(factura), // abrir formulario para editar
  onDelete: (id) => {
    facturas = facturas.filter(f => f.idDocument.toString() !== id.toString());
    localStorage.setItem("facturas", JSON.stringify(facturas));
    table.render(facturas);
  },
  onAdd: () => form.openForm() // abrir formulario para agregar
});

// Render inicial
table.render(facturas);
