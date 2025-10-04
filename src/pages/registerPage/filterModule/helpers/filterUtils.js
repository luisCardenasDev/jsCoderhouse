let filters = {};

export function setFilters(newFilters) {
  filters = { ...filters, ...newFilters };
}

export function getFilters() {
  return filters;
}

export function resetFilters() {
  filters = {};
}