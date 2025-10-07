// calculations.js
export function calculateIVAandTotal(subtotalValue, percentageValue) {
  const subtotal = parseFloat(subtotalValue) || 0;
  const percentage = parseFloat(percentageValue) || 0;
  const ivaCalc = +(subtotal * (percentage / 100));
  const totalCalc = subtotal + ivaCalc;
  return { ivaCalc, totalCalc };
}