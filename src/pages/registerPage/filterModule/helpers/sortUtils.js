let sortField = null;
let sortOrder = "asc";

export function setSort(field, order = "asc") {
  sortField = field;
  sortOrder = order.toLowerCase() === "desc" ? "desc" : "asc";
}

export function getSort() {
  return { field: sortField, order: sortOrder };
}
