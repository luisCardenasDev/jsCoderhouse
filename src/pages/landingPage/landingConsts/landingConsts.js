/**
 * References to DOM elements used in the landing page.
 * All elements are selected once to avoid repeated DOM queries.
 */
export const landingRef = {
  // Main container
  container: document.getElementById("startPage"),

  // Login modal elements
  loginModal: document.getElementById("loginModal"),
  openLogin: document.getElementById("openLogin"),
  closeLogin: document.getElementById("closeLogin"),

  // Start button
  btnStart: document.getElementById("btnStart"),

  // Login form elements
  loginForm: document.getElementById("loginForm"),
  emailInput: document.getElementById("email"),
  passwordInput: document.getElementById("password"),

  // Validation error display elements
  emailError: document.getElementById("emailError"),
  passwordError: document.getElementById("passwordError"),
};
