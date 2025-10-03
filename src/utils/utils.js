/**
 * utils.js
 * Funciones utilitarias para manejo de números y generación de IDs.
 */

/**
 * generateId
 * 
 * Genera un ID único alfanumérico de 7 caracteres: 3 letras mayúsculas + 4 números.
 *
 * @returns {string} ID único, ejemplo: "ABC1234"
 *
 * @example
 * const newId = generateId();
 * console.log(newId); // "XQJ4821"
 */
export function generateId() {
    const spell = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";

    let id = "";
    // 3 letras
    for (let i = 0; i < 3; i++) {
        id += spell.charAt(Math.floor(Math.random() * spell.length));
    }
    // 4 números
    for (let i = 0; i < 4; i++) {
        id += nums.charAt(Math.floor(Math.random() * nums.length));
    }

    return id;
}

/**
 * formatNumber
 * 
 * Formatea un número como string con 2 decimales y separador de miles.
 *
 * @param {number|string} n - Número a formatear
 * @returns {string} Número formateado, ej. "1,234.50"
 *
 * @example
 * formatNumber(1234.5); // "1,234.50"
 * formatNumber("5678.9"); // "5,678.90"
 */
export function formatNumber(n) {
  const num = parseFloat(n || 0);
  if (isNaN(num)) return (0).toFixed(2);
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * parseNumberFormatted
 * 
 * Convierte un string formateado (con comas o espacios) a número.
 *
 * @param {string} str - String formateado, ej. "1,234.50"
 * @returns {number} Número convertido, ej. 1234.5
 *
 * @example
 * parseNumberFormatted("1,234.50"); // 1234.5
 * parseNumberFormatted("5678"); // 5678
 */
export function parseNumberFormatted(str) {
  if (str === null || str === undefined || str === "") return 0;
  const cleaned = String(str).replace(/,/g, '').trim();
  return parseFloat(cleaned) || 0;
}
