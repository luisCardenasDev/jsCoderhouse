import { getState, replaceState, subscribe } from "../state/stateManager.js";
import { mockInvoices } from "../apiFake/dataMock.js";

const STORAGE_KEY = "app_state";

/**
 * Load the persisted application state from localStorage.
 * If no saved data is found, returns the default initial state.
 */
export function loadFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);

  // Return default state if no data exists
  if (!saved) {
    return {
      stateForm: { isOpen: false, isReadonly: false, currentData: {} },
      stateFilter: { field: null, values: {}, isReadonly: true },
      stateTable: { isOpen: true, isReadonly: false, data: mockInvoices },
    };
  }

  try {
    // Try to parse stored JSON data
    return JSON.parse(saved);
  } catch (err) {
    console.error("Failed to parse localStorage data:", err);
    return null;
  }
}

/**
 * Save the current application state to localStorage.
 * Automatically serializes the store to JSON.
 */
export function saveToStorage() {
  try {
    const state = getState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save to localStorage:", err);
  }
}

/**
 * Clear localStorage and reset the app state to defaults.
 */
export function resetStorage() {
  localStorage.removeItem(STORAGE_KEY);
  replaceState(loadFromStorage());
}

/**
 * Initialize state persistence mechanism.
 * Loads the stored state (if available) and subscribes
 * to future store updates for automatic saving.
 */
export function initPersistence() {
  const stored = loadFromStorage();
  if (stored) replaceState(stored);

  // Subscribe to store changes to persist automatically
  subscribe(saveToStorage);
}