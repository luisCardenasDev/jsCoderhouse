// Validates invoice form fields based on predefined rules
// - Checks required fields
// - Checks specific patterns (e.g., RUC must have 11 digits)
// - Returns validation status, errors, and list of valid fields

export function validateInvoiceForm(refsForm) {
  // Define validation rules for each field
  const rules = {
    nroDocument: { required: true },
    ruc: { required: true, pattern: /^\d{11}$/, message: "RUC must have 11 numeric digits" },
    legalName: { required: true },
    date: { required: true },
    subtotal: { required: true },
    percentageIVA: { required: true },
    description: { required: true },
    centerCost: { required: true },
    user: { required: true },
    currency: { required: true },
  };

  const errors = {};      // Stores field errors
  const validFields = []; // Stores fields that passed validation

  // Loop through each field to validate
  for (const [id, rule] of Object.entries(rules)) {
    const input = refsForm[id];
    if (!input) continue; // Skip if input element not found

    const value = (input.value || "").trim();

    // 1️⃣ Required validation
    if (rule.required && !value) {
      errors[id] = "This field is required";
      continue;
    }

    // 2️⃣ Pattern validation (e.g., RUC)
    if (rule.pattern && !rule.pattern.test(value)) {
      errors[id] = rule.message || "Invalid format";
      continue;
    }

    // Field passed all validations
    validFields.push(id);
  }

  // Return validation result
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    validFields,
  };
}
