/**
 * idHelper.js
 * 
 * Funciones auxiliares para manejar IDs de facturas.
 */

import { generateId } from "../../utils/utils.js";

/**
 * Devuelve el ID de la factura existente o genera uno nuevo si no existe.
 *
 * @param {string|null} currentId - ID actual de la factura, o null si es nueva.
 * @returns {string} - ID existente o un ID generado automáticamente.
 *
 * @example
 * // Generar un ID nuevo si no hay uno existente
 * const invoiceId = getInvoiceId(null); 
 * console.log(invoiceId); // Ej: "INV-00123"
 * 
 * // Usar el ID existente si ya hay uno
 * const existingId = getInvoiceId("INV-00045");
 * console.log(existingId); // "INV-00045"
 */
export function getInvoiceId(currentId) {
  return currentId || generateId();
}
