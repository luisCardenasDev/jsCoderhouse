/**
 * tableLock.js
 * 
 * Funciones auxiliares para bloquear y desbloquear todos los controles
 * dentro de un contenedor de tabla o cualquier sección de la UI.
 */

/**
 * Bloquea todos los inputs, selects, buttons y enlaces dentro de un contenedor.
 *
 * @param {HTMLElement} container - Contenedor cuyos elementos serán bloqueados.
 *
 * @example
 * const tableContainer = document.getElementById("tableContainer");
 * lockContainer(tableContainer); // Todos los botones, inputs y selects quedan deshabilitados
 */
export function lockContainer(container) {
  container.querySelectorAll("button, a, input, select").forEach(el => {
    el.disabled = true;
    el.style.pointerEvents = "none";
  });
}

/**
 * Desbloquea todos los inputs, selects, buttons y enlaces dentro de un contenedor.
 *
 * @param {HTMLElement} container - Contenedor cuyos elementos serán desbloqueados.
 *
 * @example
 * const tableContainer = document.getElementById("tableContainer");
 * unlockContainer(tableContainer); // Todos los botones, inputs y selects quedan habilitados
 */
export function unlockContainer(container) {
  container.querySelectorAll("button, a, input, select").forEach(el => {
    el.disabled = false;
    el.style.pointerEvents = "auto";
  });
}
