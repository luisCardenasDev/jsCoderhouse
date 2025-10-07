// validateLoginModule.js
import { landingRef } from "../landingConsts/landingConsts.js";

export function ValidateLoginModule() {
  const {
    loginForm,
    loginModal,
    emailInput,
    passwordInput,
    emailError,
    passwordError,
  } = landingRef;

  const state = {
    isValid: false,
    errors: {},
  };

  function setErrors(errors) {
    state.errors = errors;
    state.isValid = Object.keys(errors).length === 0;
    renderErrors();
  }

  function getState() {
    return { ...state };
  }

  function renderErrors() {
    emailError.style.display = "none";
    passwordError.style.display = "none";

    if (state.errors.email) {
      emailError.textContent = state.errors.email;
      emailError.style.display = "block";
    }

    if (state.errors.password) {
      passwordError.textContent = state.errors.password;
      passwordError.style.display = "block";
    }
  }

  function validateForm() {
    const errors = {};

    if (!emailInput.value.trim()) {
      errors.email = "El correo es obligatorio";
    }

    if (!passwordInput.value.trim()) {
      errors.password = "La contraseña es obligatoria";
    } else if (passwordInput.value.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(errors);
    return state.isValid;
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Login exitoso (simulado).");
      loginModal.style.display = "none";
      loginForm.reset();
      location.hash = "registerPage";
    }
  });

  return {
    validateForm,
    getState,
  };
}
