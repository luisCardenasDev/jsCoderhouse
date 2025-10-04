export function applyFilters({ data, filters, sort }) {
  let result = [...data];

  // Filtros dinámicos
  Object.entries(filters).forEach(([key, value]) => {
    if (!value) return;

    if (typeof value === "object" && value.from !== undefined) {
      // Rango de fechas
      result = result.filter(item => {
        const itemDate = item[key] || "";
        return (!value.from || itemDate >= value.from) &&
               (!value.to || itemDate <= value.to);
      });
    } else {
      const searchValue = value.toString().toLowerCase();
      result = result.filter(item => (item[key] || "").toString().toLowerCase().includes(searchValue));
    }
  });

  // Ordenamiento
  if (sort.field) {
    result.sort((a, b) => {
      const valA = a[sort.field] ?? "";
      const valB = b[sort.field] ?? "";
      if (!isNaN(valA) && !isNaN(valB)) 
        return sort.order === "asc" ? valA - valB : valB - valA;
      return sort.order === "asc"
        ? valA.toString().localeCompare(valB.toString())
        : valB.toString().localeCompare(valA.toString());
    });
  }

  return result;
}
