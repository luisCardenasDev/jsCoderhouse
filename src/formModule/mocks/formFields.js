const formFields = [
  { id: "idDocument", label: "ID", type: "text", disabled: true, colClass: "col-1" },
  { id: "tipoDocument", label: "Tipo Doc", type: "select", options: ["Factura","Boleta","Ticket","Psje","Recibo","Otro"], colClass: "col-1" },
  { id: "nroDocument", label: "Nro Doc", type: "text", colClass: "col-2" },
  { id: "ruc", label: "RUC", type: "text", maxlength: 11, colClass: "col-3" },
  { id: "legalName", label: "Razón Social", type: "text", colClass: "col-5" },
  { id: "date", label: "Emisión", type: "date", colClass: "col-1" },
  { id: "current", label: "Moneda", type: "select", options: ["USD","PEN","ARS"], colClass: "col-1" },
  { id: "subtotal", label: "Subtotal", type: "text", colClass: "col-1" },
  { id: "iva", label: "IVA", type: "text", disabled: true, colClass: "col-1" },
  { id: "percentageIVA", label: "% IVA", type: "select", options: ["","5","10","18"], colClass: "col-1" },
  { id: "total", label: "Total", type: "text", disabled: true, colClass: "col-2" },
  { id: "description", label: "Descripción", type: "textarea", colClass: "col-5" },
  { id: "centerCost", label: "Centro Costo", type: "select", options: ["","003.003.003","003.003.004","003.003.005"], colClass: "col-2" },
  { id: "user", label: "Usuario", type: "select", options: ["","Luis Cardenas","Ana Pérez","Juan Gómez"], colClass: "col-2" }
];

export default formFields;