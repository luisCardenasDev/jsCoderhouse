import { mockInvoices } from "../apiFake/dataMock.js";

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
  }
};

const subscribers = new Set();

export function subscribe(callback) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

export function setState(partial) {
  state = { ...state, ...partial };
  notify();
}

export function getState() {
  return { ...state };
}

function notify() {
  subscribers.forEach(cb => cb({ ...state }));
}
