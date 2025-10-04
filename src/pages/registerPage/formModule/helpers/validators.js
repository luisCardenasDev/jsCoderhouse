// validators.js
export function validateInvoiceForm(refsForm) {
  const requiredFields = [
    "nroDocument","ruc","legalName","date",
    "subtotal","percentageIVA","description",
    "centerCost","user","currency"
  ];

  let allValid = true;

  requiredFields.forEach(id => {
    const input = refsForm[id];
    const value = (input?.value || "").trim();

    if (!value) {
      input.classList.add("invalid");
      input.classList.remove("valid");
      allValid = false;
    } else if (id === "ruc" && input.value.replace(/\D/g,'').length !== 11) {
      input.classList.add("invalid");
      input.classList.remove("valid");
      allValid = false;
      alert("RUC inválido: debe tener 11 dígitos");
    } else {
      input.classList.add("valid");
      input.classList.remove("invalid");
    }
  });

  return allValid;
}