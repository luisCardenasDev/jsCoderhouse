
export const tableFields = [
  { id: "idDocument" },
  { id: "nroDocument" },
  { id: "ruc" },
  { id: "legalName" },
  { id: "date" },
  { id: "subtotal" },
  { id: "percentageIVA" },
  { id: "iva" },
  { id: "total" },
  { id: "currency" },
  { id: "centerCost" },
  { id: "user" },
  { id: "description" },
  { id: "documentFile" }
];


export function getTableRefs() {
  const container = document.getElementById("tableContainer");
  const table = container.querySelector("#invoiceTable");

  return {
    container,
    table,
    tbody: table.querySelector("tbody"),
    selectAll: table.querySelector("#selectAll"),
    recordCount: container.querySelector("#recordCount"),
    currencyTotal: container.querySelector("#currencyTotal"),
    addButton: container.querySelector("#btnAddInvoice")
  };
}