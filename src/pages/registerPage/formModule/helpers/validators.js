export function validateInvoiceForm(refsForm) {
  
  const rules = {
    nroDocument: { required: true },
    ruc: { required: true, pattern: /^\d{11}$/, message: "El RUC debe tener 11 dígitos numéricos" },
    legalName: { required: true },
    date: { required: true },
    subtotal: { required: true },
    percentageIVA: { required: true },
    description: { required: true },
    centerCost: { required: true },
    user: { required: true },
    currency: { required: true },
  };

  const errors = {};
  const validFields = [];

  for (const [id, rule] of Object.entries(rules)) {
    const input = refsForm[id];
    if (!input) continue; // campo no encontrado, evitar error
    const value = (input.value || "").trim();

    // 1️⃣ Requerido
    if (rule.required && !value) {
      errors[id] = "Campo obligatorio";
      continue;
    }

    // 2️⃣ Patrón (ej: RUC)
    if (rule.pattern && !rule.pattern.test(value)) {
      errors[id] = rule.message || "Formato inválido";
      continue;
    }

    // Si pasa todas las validaciones
    validFields.push(id);
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    validFields,
  };
}