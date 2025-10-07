// landingPageModule.js
import { ValidateLoginModule } from "./helpers/validateLogin.js";
import { landingRef } from "./landingConsts/landingConsts.js";

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

  // 🔹 Inicializa validación de login y pasa callback
  ValidateLoginModule(
      setState({ modalOpen: false }
      )
  );

  // Render inicial
  render();
}
