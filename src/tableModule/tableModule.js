import { formatNumber, parseNumberFormatted } from "../utils/utils.js";
import tableFields from "./mocks/tableFields.js";

export function TableModule({ containerId, onEdit, onDelete, onAdd }) {
  const container = document.getElementById(containerId);

  // CREATE TABLE
  const table = document.createElement("table");
  table.id = "invoiceTable";
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");

  trHead.innerHTML = `<th><input type="checkbox" id="selectAll"></th>` +
    tableFields.map(f => `<th>${f.label}</th>`).join("") +
    `<th>Acciones</th>`;
  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  table.appendChild(tbody);
  container.appendChild(table);

  // Select All checkbox
  const selectAllCheckbox = table.querySelector("#selectAll");

  // Render function
  function render(data) {
    tbody.innerHTML = "";
    data.forEach(item => {
      const tr = document.createElement("tr");
      tr.dataset.id = item.idDocument;
      const rowHtml = `<td><input type="checkbox" class="row-checkbox"></td>` +
        tableFields.map(f => {
          if (["subtotal", "iva", "total"].includes(f.id)) {
            return `<td>${formatNumber(item[f.id])}</td>`;
          }
          return `<td>${item[f.id] || ""}</td>`;
        }).join("") +
        `<td>
          <button class="btn-edit" data-id="${item.idDocument}">Edit</button>
          <button class="btn-delete" data-id="${item.idDocument}">Delete</button>
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

  // Summary
  let summaryContainer = document.getElementById("invoiceSummary");
  if (!summaryContainer) {
    summaryContainer = document.createElement("div");
    summaryContainer.id = "invoiceSummary";
    summaryContainer.innerHTML = `
      <p><strong>Records:</strong> <span id="recordCount">0</span></p>
      <p><strong>Total by currency:</strong> <span id="currencyTotal">0.00</span></p>
    `;
    container.parentNode.insertBefore(summaryContainer, container.nextSibling);
  }

  const recordCountEl = summaryContainer.querySelector("#recordCount");
  const currencyTotalEl = summaryContainer.querySelector("#currencyTotal");

  function updateSummary() {
    const visibleRows = Array.from(tbody.querySelectorAll("tr")).filter(r => r.style.display !== "none");
    recordCountEl.textContent = visibleRows.length;

    const totalsByCurrency = {};
    visibleRows.forEach(tr => {
      const currency = tr.children[7].textContent.trim();
      const total = parseNumberFormatted(tr.children[10].textContent);
      if (!totalsByCurrency[currency]) totalsByCurrency[currency] = 0;
      totalsByCurrency[currency] += total;
    });

    currencyTotalEl.innerHTML = Object.entries(totalsByCurrency)
      .map(([c, t]) => `${c}: ${formatNumber(t)}`)
      .join(" | ");
  }

  // Row events
  tbody.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const id = btn.dataset.id;
    if (!id) return;

    if (btn.classList.contains("btn-delete")) {
      if (confirm("⚠️ This will permanently delete the record. Continue?")) {
        onDelete && onDelete(id);
      }
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

  // Filtering
  function filterTable(fieldId, valueRaw) {
    const value = String(valueRaw || "").toLowerCase();
    tbody.querySelectorAll("tr").forEach(tr => {
      const idx = tableFields.findIndex(f => f.id === fieldId);
      if (idx === -1) return tr.style.display = "";
      const cellText = tr.children[idx + 1].textContent.toLowerCase();
      tr.style.display = cellText.includes(value) ? "" : "none";
    });
    updateSummary();
  }

  // ADD INVOICE BUTTON
  const addButton = document.createElement("button");
  addButton.textContent = " + Agregar Factura";
  addButton.className = "btn-add-invoice";
  addButton.style.marginTop = "10px";
  addButton.addEventListener("click", () => {
    onAdd && onAdd();
  });
  container.appendChild(addButton);

  // Public API
  return {
    render,
    filter: filterTable,
    updateSummary
  };
}
