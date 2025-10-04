// calculations.js
export function calculateIVAandTotal(subtotalValue, percentageValue) {
  const subtotal = parseFloat(subtotalValue) || 0;
  const percentage = parseFloat(percentageValue) || 0;
  const iva = +(subtotal * (percentage / 100));
  const total = subtotal + iva;
  return { iva, total };
}