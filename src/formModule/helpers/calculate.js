/**
 * calculate.js
 * Funciones de cálculo para facturas
 */

/**
 * Calcula el IVA y el total de una factura
 * @param {number} subtotal
 * @param {number} percentageIVA
 * @returns {Object} - { iva, total }
 */
export function calculateIVA(subtotal, percentageIVA) {
  const iva = +(subtotal * (percentageIVA / 100)).toFixed(2);
  const total = +(subtotal + iva).toFixed(2);
  return { iva, total };
}
