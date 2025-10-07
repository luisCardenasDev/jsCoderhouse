import LandingPageModule from '../pages/landingPage/landingPageModule.js';
import {RegisterPage} from '../pages/registerPage/registerPage.js';

export function Router() {
  const sections = document.querySelectorAll("section");
  let startVisited = false;

  const routes = {
    startPage:LandingPageModule,
    registerPage:RegisterPage
  };

  function navigate(pageId) {
    // Regla: startPage solo una vez
    if (pageId === "startPage" && startVisited) return;

    sections.forEach((s) => s.classList.remove("active"));

    const target = document.getElementById(pageId);
    if (!target) return;

    target.classList.add("active");

    // Ejecutar la lógica asociada a esa página
    routes[pageId](navigate);

    if (pageId === "startPage") startVisited = true;
  }

  // 🔹 Escuchar cambios del hash
  window.addEventListener("hashchange", () => {
    const pageId = location.hash.replace("#", "") || "startPage";
    navigate(pageId);
  });

  // 🔹 Inicialización (si no hay hash, forzar startPage)
  const initialPage = location.hash.replace("#", "") || "startPage";
  navigate(initialPage);
}