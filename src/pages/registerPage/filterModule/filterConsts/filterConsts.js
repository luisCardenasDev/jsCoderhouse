  
  export const filterRefs = {
    fieldSelect : document.getElementById("filterField") ,    // Primer select fijo
    valueWrapper : document.getElementById("filterValueWrapper"),// Contenedor dinámico
    sortButtonsWrapper : document.getElementById("sortButtonsWrapper"),// Botones de ordenamiento estáticos
  }

  // Campos filtrables y tipo
   export const filterFields = [
    { id: "nroDocument", label: "N° Doc", type: "text" },
    { id: "ruc", label: "RUC", type: "text" },
    { id: "legalName", label: "Razón Social", type: "text" },
    { id: "date", label: "Fecha", type: "date" },
    { id: "currency", label: "Moneda", type: "select" },
    { id: "centerCost", label: "Centro de Costo", type: "select" },
    { id: "user", label: "Usuario", type: "select" }
  ];
