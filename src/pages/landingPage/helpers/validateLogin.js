import {landingRef} from "../landingConsts/landingConsts.js";


export default function ValidateLogin(){

  const {loginForm,loginModal,emailInput,passwordInput,emailError,passwordError} = landingRef;


      // Validación de formulario
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // Resetear errores
    emailError.style.display = "none";
    passwordError.style.display = "none";

    if (!emailInput.value.trim()) {
      emailError.textContent = "El correo es obligatorio";
      emailError.style.display = "block";
      isValid = false;
    }

    if (!passwordInput.value.trim()) {
      passwordError.textContent = "La contraseña es obligatoria";
      passwordError.style.display = "block";
      isValid = false;
    } else if (passwordInput.value.length < 6) {
      passwordError.textContent = "La contraseña debe tener al menos 6 caracteres";
      passwordError.style.display = "block";
      isValid = false;
    }

    if (isValid) {
      alert("Login exitoso (simulado).");
      loginModal.style.display = "none";
      loginForm.reset();
      location.hash = 'registerPage'; // esto dispara hashchange automáticamente 
    }
  });
}