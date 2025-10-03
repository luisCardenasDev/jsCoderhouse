/**
 * refsForm
 * Objeto que contiene referencias a todos los elementos del formulario de facturas.
 * Cada propiedad apunta al elemento HTML correspondiente dentro de #formInvoice.
 */
const refsForm = {
  /** Input del ID de la factura (generado automáticamente, deshabilitado) */
  idDocument: document.querySelector("#formContainer #formInvoice #idDocument"),

  /** Input del número de documento de la factura */
  nroDocument: document.querySelector("#formContainer #formInvoice #nroDocument"),

  /** Input del RUC del cliente (máximo 11 dígitos) */
  ruc: document.querySelector("#formContainer #formInvoice #ruc"),

  /** Input de la razón social del cliente */
  legalName: document.querySelector("#formContainer #formInvoice #legalName"),

  /** Input de la fecha de emisión de la factura */
  date: document.querySelector("#formContainer #formInvoice #date"),

  /** Input del subtotal de la factura */
  subtotal: document.querySelector("#formContainer #formInvoice #subtotal"),

  /** Select del porcentaje de IVA aplicable */
  percentageIVA: document.querySelector("#formContainer #formInvoice #percentageIVA"),

  /** Input del valor del IVA calculado (deshabilitado) */
  iva: document.querySelector("#formContainer #formInvoice #iva"),

  /** Input del total de la factura (subtotal + IVA, deshabilitado) */
  total: document.querySelector("#formContainer #formInvoice #total"),

  /** Select de la moneda de la factura (PEN, USD, etc.) */
  currency: document.querySelector("#formContainer #formInvoice #currency"),

  /** Select del centro de costo asociado a la factura */
  centerCost: document.querySelector("#formContainer #formInvoice #centerCost"),

  /** Select del usuario responsable de la factura */
  user: document.querySelector("#formContainer #formInvoice #user"),

  /** Textarea de la descripción de la factura */
  description: document.querySelector("#formContainer #formInvoice #description"),

  /** Input de tipo file para adjuntar el documento (jpg, png, pdf) */
  documentFile: document.querySelector("#formContainer #formInvoice #documentFile")
};

export default refsForm;