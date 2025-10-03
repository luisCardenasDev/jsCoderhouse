/**
 * tableFields
 * 
 * Array de objetos que define las columnas de la tabla de facturas.
 * Cada objeto tiene un `id` que corresponde a la propiedad del objeto factura.
 * Este mock se usa para generar dinámicamente las filas de la tabla.
 * 
 * NOTA: Algunas columnas se pueden filtrar al renderizar la tabla
 * (por ejemplo: campos internos como idDocument, subtotal, percentageIVA, iva).
 */
const tableFields = [
  /** ID único de la factura (interno, no se muestra) */
  { id: "idDocument" },

  /** Número de documento de la factura */
  { id: "nroDocument" },

  /** RUC del cliente */
  { id: "ruc" },

  /** Razón social del cliente */
  { id: "legalName" },

  /** Fecha de emisión de la factura */
  { id: "date" },

  /** Subtotal de la factura (interno, se usa para cálculos) */
  { id: "subtotal" },

  /** Porcentaje de IVA aplicado (interno, se usa para cálculos) */
  { id: "percentageIVA" },

  /** Valor del IVA calculado (interno) */
  { id: "iva" },

  /** Total de la factura (subtotal + IVA) */
  { id: "total" },

  /** Moneda de la factura (PEN, USD, etc.) */
  { id: "currency" },

  /** Centro de costo asociado a la factura */
  { id: "centerCost" },

  /** Usuario responsable de la factura */
  { id: "user" },

  /** Descripción de la factura */
  { id: "description" },

  /** Documento adjunto (archivo) */
  { id: "documentFile" }
];

export default tableFields;