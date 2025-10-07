/**
 * Calculates IVA (tax) and total for a given subtotal and percentage
 */
export function calculateIVAandTotal(subtotalValue, percentageValue) {
  const subtotal = parseFloat(subtotalValue) || 0;
  const percentage = parseFloat(percentageValue) || 0;

  const ivaCalc = +(subtotal * (percentage / 100)); // Tax amount
  const totalCalc = subtotal + ivaCalc; // Total including tax

  return { ivaCalc, totalCalc };
}