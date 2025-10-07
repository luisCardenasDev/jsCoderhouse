
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


export function formatNumber(n) {
  const num = parseFloat(n || 0);
  if (isNaN(num)) return (0).toFixed(2);
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}


export function parseNumberFormatted(str) {
  if (str === null || str === undefined || str === "") return 0;
  const cleaned = String(str).replace(/,/g, '').trim();
  return parseFloat(cleaned) || 0;
}
