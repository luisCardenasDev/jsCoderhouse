/**
 * applyZebraEffect
 * 
 * Aplica efecto "zebra" alternando clases CSS en las filas de la tabla.
 * La clase `zebra` se asigna a las filas pares (0,2,4...).
 *
 * @param {HTMLTableSectionElement} tbody - <tbody> de la tabla
 *
 * @example
 * const tbody = document.querySelector("#invoiceTable tbody");
 * applyZebraEffect(tbody);
 */
export function applyZebraEffect(tbody) {
  Array.from(tbody.querySelectorAll("tr")).forEach((tr, i) => {
    tr.classList.toggle("zebra", i % 2 === 0);
  });
}
