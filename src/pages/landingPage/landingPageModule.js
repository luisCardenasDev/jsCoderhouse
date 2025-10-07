import { ValidateLoginModule } from "./helpers/validateLogin.js";
import { landingRef } from "./landingConsts/landingConsts.js";

/**
 * Landing Page Module
 * Implements a simple MVC pattern:
 * - Model: local state of modal visibility
 * - View: rendering modal open/close
 * - Controller: event listeners and interactions
 */
export default function LandingPageModule() {
  const { container, openLogin, btnStart, loginModal, closeLogin } = landingRef;

  // ======================
  // === MODEL ===
  // ======================
  let state = {
    modalOpen: false,
  };

  function setState(newState) {
    state = { ...state, ...newState };
    render();
  }

  function getState() {
    return { ...state };
  }

  // ======================
  // === VIEW ===
  // ======================
  function render() {
    loginModal.style.display = state.modalOpen ? "flex" : "none";
  }

  // ======================
  // === CONTROLLER ===
  // ======================
  openLogin.addEventListener("click", () => setState({ modalOpen: true }));
  btnStart.addEventListener("click", () => setState({ modalOpen: true }));
  closeLogin.addEventListener("click", () => setState({ modalOpen: false }));

  window.addEventListener("click", (e) => {
    if (e.target === loginModal) setState({ modalOpen: false });
  });

  // Initialize login validation module
  // The module itself manages form validation and internal state
  const loginValidator = ValidateLoginModule();

  // Example: after successful login, close modal
  // Can integrate with setState if needed inside loginValidator
  // loginValidator.validateForm() could be called programmatically

  // Initial render
  render();
}