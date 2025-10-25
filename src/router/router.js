import LandingPageModule from '../pages/landingPage/landingPageModule.js';
import { RegisterPage } from '../pages/registerPage/registerPage.js';

/**
 * Simple client-side router for switching between pages.
 * Only allows 'startPage' to be visited once.
 */
export function Router() {
  const sections = document.querySelectorAll("section");
  let startVisited = false;

  // Map of page IDs to their associated modules
  const routes = {
    startPage: LandingPageModule,
    registerPage: RegisterPage
  };

  /**
   * Navigate to a given page by its ID.
   *  pageId - The ID of the target page section.
   */
  function navigate(pageId) {
    // Rule: startPage can only be visited once
    if (pageId === "startPage" && startVisited) return;

    // Hide all sections
    sections.forEach((s) => s.classList.remove("active"));

    // Find the target section
    const target = document.getElementById(pageId);
    if (!target) return;

    // Show the target section
    target.classList.add("active");

    // Execute the associated page logic
    routes[pageId](navigate);

    // Mark startPage as visited
    if (pageId === "startPage") startVisited = true;
  }

  // Listen to hash changes to handle navigation
  window.addEventListener("hashchange", () => {
    const pageId = location.hash.replace("#", "") || "startPage";
    navigate(pageId);
  });

  // Initial navigation (default to startPage if no hash)
  const initialPage = location.hash.replace("#", "") || "startPage";
  navigate(initialPage);
}
