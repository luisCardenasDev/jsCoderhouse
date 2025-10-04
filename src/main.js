import RegisterPage from "./pages/registerPage/registerPage.js";
import LandingPageModule from "./pages/landingPage/landingPageModule.js";
import router from "./router.js/router.js";


router();

document.addEventListener("DOMContentLoaded", () => {
  const landingApp = LandingPageModule()
});

RegisterPage()




