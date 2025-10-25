import { mockInvoices } from "../apiFake/dataMock.js";

/**
 * Initial application state
 */
let state = {
  stateForm: {
    isOpen: false,
    isReadonly: false,
    currentData: {},
  },
  stateFilter: {
    field: null,
    values: {},
    isReadonly: true,
  },
  stateTable: {
    isOpen: true,
    isReadonly: false,
    data: mockInvoices,
  },
};

/**
 * Set of subscriber callbacks to notify on state changes
 */
const subscribers = new Set();

/**
 * Subscribe to state changes.
 * Returns an unsubscribe function.
 *  callback - Function called with the updated state
 * {Function} unsubscribe
 */
export function subscribe(callback) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

/**
 * Merge partial updates into the state and notify subscribers.
 *  partial - Partial state to merge
 */
export function setState(partial) {
  state = { ...state, ...partial };
  notify();
}

/**
 * Get a shallow copy of the current state.
 *   Current state
 */
export function getState() {
  return { ...state };
}

/**
 * Notify all subscribers with the latest state
 */
function notify() {
  subscribers.forEach((cb) => cb({ ...state }));
}

/**
 * Replace the entire state (useful for persistence or external effects)
 * and notify subscribers.
 *  New full state object
 */
export function replaceState(newState) {
  state = { ...newState };
  notify();
}
