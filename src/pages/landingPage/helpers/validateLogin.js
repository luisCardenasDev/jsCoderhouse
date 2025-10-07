import { landingRef } from "../landingConsts/landingConsts.js";

/**
 * Handles login form validation, visual feedback via CSS classes, and error rendering.
 * - Adds or removes CSS classes to indicate valid/invalid fields.
 * - Displays error messages under corresponding input fields.
 * - Uses external CSS for visual styling.
 */
export function ValidateLoginModule() {
  const {
    loginForm,
    loginModal,
    emailInput,
    passwordInput,
    emailError,
    passwordError,
  } = landingRef;

  // Validation state
  const state = {
    isValid: false,
    errors: {},
  };

  /**
   * Updates validation errors and triggers visual feedback.
   * @param {Object} errors - Field errors as key-message pairs.
   */
  function setErrors(errors) {
    state.errors = errors;
    state.isValid = Object.keys(errors).length === 0;

    renderErrors();
    updateInputClasses();
  }

  /**
   * Returns a snapshot of the current validation state.
   * @returns {{ isValid: boolean, errors: Object }}
   */
  function getState() {
    return { ...state };
  }

  /**
   * Displays validation messages under the corresponding inputs.
   */
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

  /**
   * Adds or removes CSS classes for valid/invalid states.
   * Expected CSS:
   * .is-valid   → green border/background
   * .is-invalid → red border/background
   */
  function updateInputClasses() {
    const fields = { email: emailInput, password: passwordInput };

    Object.entries(fields).forEach(([key, input]) => {
      input.classList.remove("is-valid", "is-invalid");

      if (state.errors[key]) {
        input.classList.add("is-invalid");
      } else {
        input.classList.add("is-valid");
      }
    });
  }

  /**
   * Validates input fields and updates the validation state.
   * @returns {boolean} True if the form is valid, otherwise false.
   */
  function validateForm() {
    const errors = {};

    if (!emailInput.value.trim()) {
      errors.email = "Email is required.";
    }

    if (!passwordInput.value.trim()) {
      errors.password = "Password is required.";
    } else if (passwordInput.value.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    setErrors(errors);
    return state.isValid;
  }

  /**
   * Handles form submission, triggers validation, and provides user feedback.
   */
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Login successful (simulated).");
      loginModal.style.display = "none";
      loginForm.reset();

      // Clear visual state after reset
      emailInput.classList.remove("is-valid", "is-invalid");
      passwordInput.classList.remove("is-valid", "is-invalid");

      location.hash = "registerPage";
    } else {
      alert("Form contains errors. Please fix the highlighted fields.");
    }
  });

  // Public API
  return {
    validateForm,
    getState,
  };
}