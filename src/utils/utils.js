/**
 * Generate a random ID in the format: AAA1234
 *  - 3 uppercase letters followed by 4 digits
 * @returns {string} Generated ID
 */
export function generateId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";

  let id = "";

  // Add 3 random letters
  for (let i = 0; i < 3; i++) {
    id += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Add 4 random digits
  for (let i = 0; i < 4; i++) {
    id += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  return id;
}

/**
 * Format a number as a string with commas and 2 decimal places
 * @param {number|string} n - The number to format
 * @returns {string} Formatted number string
 */
export function formatNumber(n) {
  const num = parseFloat(n || 0);
  if (isNaN(num)) return (0).toFixed(2);
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Parse a formatted number string (with commas) into a float
 * @param {string} str - Formatted number string
 * @returns {number} Parsed numeric value
 */
export function parseNumberFormatted(str) {
  if (str === null || str === undefined || str === "") return 0;
  const cleaned = String(str).replace(/,/g, '').trim();
  return parseFloat(cleaned) || 0;
}
