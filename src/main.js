import { Router } from "./router/router.js";
import { initPersistence } from "./apiFake/apiFake.js";

/**
 * Initialize state persistence (loads from localStorage and subscribes for automatic saving)
 */
initPersistence(); // Hydrate state and activate persistence

/**
 * Initialize the router after the DOM is fully loaded
 */
document.addEventListener("DOMContentLoaded", () => {
  Router(); // Start the client-side routing system
});

