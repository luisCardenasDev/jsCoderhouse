/**
 * tableLock.js
 * Funciones para bloquear/desbloquear todos los controles de la tabla
 */

/**
 * Bloquea todos los inputs, selects, buttons y links de un contenedor
 * @param {HTMLElement} container
 */
export function lockContainer(container) {
  container.querySelectorAll("button, a, input, select").forEach(el => {
    el.disabled = true;
    el.style.pointerEvents = "none";
  });
}

/**
 * Desbloquea todos los inputs, selects, buttons y links de un contenedor
 * @param {HTMLElement} container
 */
export function unlockContainer(container) {
  container.querySelectorAll("button, a, input, select").forEach(el => {
    el.disabled = false;
    el.style.pointerEvents = "auto";
  });
}