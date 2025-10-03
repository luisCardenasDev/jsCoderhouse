/**
 * idHelper.js
 * Funciones para manejar IDs de facturas
 */

import { generateId } from "../../utils/utils.js";

/**
 * Devuelve el ID de la factura, o genera uno nuevo si no existe
 * @param {string|null} currentId
 * @returns {string}
 */
export function getInvoiceId(currentId) {
  return currentId || generateId();
}
