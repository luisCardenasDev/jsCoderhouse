/**
 * calculate.js
 * 
 * Funciones de cálculo para facturas.
 */

/**
 * Calcula el IVA y el total de una factura.
 *
 * @param {number} subtotal - El subtotal de la factura.
 * @param {number} percentageIVA - Porcentaje de IVA a aplicar.
 * @returns {Object} - Objeto con los resultados:
 *   - iva {number} - Valor del IVA calculado.
 *   - total {number} - Total de la factura incluyendo IVA.
 *
 * @example
 * const { iva, total } = calculateIVA(100, 18);
 * console.log(iva);   // 18
 * console.log(total); // 118
 */
export function calculateIVA(subtotal, percentageIVA) {
  const iva = +(subtotal * (percentageIVA / 100)).toFixed(2);
  const total = +(subtotal + iva).toFixed(2);
  return { iva, total };
}