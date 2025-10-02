import { formatNumber, parseNumberFormatted } from "../utils/utils.js";
import tableFields from "./mocks/tableFields.js";

export function TableModule({ containerId, onEdit, onDelete, onAdd }) {
  const container = document.getElementById(containerId);
  const table = container.querySelector("#invoiceTable");
  const tbody = table.querySelector("tbody");

  const selectAllCheckbox = table.querySelector("#selectAll");
  const recordCountEl = document.getElementById("recordCount");
  const currencyTotalEl = document.getElementById("currencyTotal");
  const addButton = document.getElementById("btnAddInvoice");

  function render(data) {
    tbody.innerHTML = "";
    data.forEach(item => {
      const tr = document.createElement("tr");
      tr.dataset.id = item.idDocument;

      // Calcular total correcto si no existe
      const subtotal = parseFloat(item.subtotal) || 0;
      const iva = parseFloat(item.iva) || subtotal * ((parseFloat(item.percentageIVA) || 0)/100);
      const total = subtotal + iva;

      const rowHtml = `<td><input type="checkbox" class="row-checkbox"></td>` +
        tableFields.map(f => {
          if (f.id === "subtotal") return `<td>${formatNumber(item.subtotal)}</td>`;
          if (f.id === "iva") return `<td>${formatNumber(iva)}</td>`;
          if (f.id === "total") return `<td>${formatNumber(total)}</td>`;
          if (f.id === "currency") return `<td>${item.currency || ""}</td>`;
          return `<td>${item[f.id] || ""}</td>`;
        }).join("") +
        `<td>
          <button class="btn-edit" data-id="${item.idDocument}">Editar</button>
          <button class="btn-delete" data-id="${item.idDocument}">Eliminar</button>
        </td>`;
      tr.innerHTML = rowHtml;
      tbody.appendChild(tr);
    });
    applyZebra();
    updateSummary();
  }

  function applyZebra() {
    Array.from(tbody.querySelectorAll("tr")).forEach((tr, i) => {
      tr.classList.toggle("zebra", i % 2 === 0);
    });
  }

  function updateSummary() {
    const visibleRows = Array.from(tbody.querySelectorAll("tr")).filter(r => r.style.display !== "none");
    recordCountEl.textContent = visibleRows.length;

    const totalsByCurrency = {};
    visibleRows.forEach(tr => {
      const currency = tr.children[10].textContent.trim() || "S/"; // columna Moneda
      const total = parseNumberFormatted(tr.children[9].textContent); // columna Total
      if (!totalsByCurrency[currency]) totalsByCurrency[currency] = 0;
      totalsByCurrency[currency] += total;
    });

    currencyTotalEl.innerHTML = Object.entries(totalsByCurrency)
      .map(([c, t]) => `${c} ${formatNumber(t)}`)
      .join(" | ");
  }

  // Delegación de eventos
  tbody.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const id = btn.dataset.id;
    if (!id) return;

    if (btn.classList.contains("btn-delete")) {
      if (confirm("⚠️ ¿Eliminar factura?")) onDelete && onDelete(id);
      return;
    }
    if (btn.classList.contains("btn-edit")) {
      const tr = tbody.querySelector(`tr[data-id="${id}"]`);
      if (!tr) return;
      const item = {};
      tableFields.forEach((f, idx) => {
        if (["subtotal","iva","total"].includes(f.id)) {
          item[f.id] = parseNumberFormatted(tr.children[idx + 1].textContent);
        } else {
          item[f.id] = tr.children[idx + 1].textContent;
        }
      });
      // moneda
      item.currency = tr.children[10].textContent;
      onEdit && onEdit(item);
    }
  });

  // Select all
  selectAllCheckbox.addEventListener("change", () => {
    const visibleRows = Array.from(tbody.querySelectorAll("tr")).filter(r => r.style.display !== "none");
    visibleRows.forEach(r => {
      const cb = r.querySelector(".row-checkbox");
      if (cb) cb.checked = selectAllCheckbox.checked;
    });
  });

  tbody.addEventListener("change", e => {
    if (!e.target.classList.contains("row-checkbox")) return;
    const visibleRows = Array.from(tbody.querySelectorAll("tr")).filter(r => r.style.display !== "none");
    selectAllCheckbox.checked = visibleRows.every(r => r.querySelector(".row-checkbox").checked);
  });

  addButton.addEventListener("click", () => onAdd());

  return { render, updateSummary };
}
