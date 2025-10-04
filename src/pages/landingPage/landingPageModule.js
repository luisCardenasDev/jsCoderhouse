import ValidateLogin from "./helpers/validateLogin.js";
import {landingRef} from "./landingConsts/landingConsts.js";

export default  function LandingPageModule(){

const {openLogin,btnStart,loginModal,closeLogin} = landingRef;

  // Abrir modal
  openLogin.addEventListener("click", () => {
    loginModal.style.display = "flex";
  });

  btnStart.addEventListener("click", () => {
    loginModal.style.display = "flex";
  });

  // Cerrar modal
  closeLogin.addEventListener("click", () => {
    loginModal.style.display = "none";
  });


  ValidateLogin();


  // Cerrar modal al hacer click afuera
  window.addEventListener("click", (e) => {
    if (e.target === loginModal) {
      loginModal.style.display = "none";
 
    }
  });

}






