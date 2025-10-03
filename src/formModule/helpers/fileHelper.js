/**
 * fileHelper.js
 * 
 * Funciones auxiliares para manejar archivos en formularios.
 */

/**
 * Devuelve la ruta de un archivo cargado o mantiene el existente.
 *
 * @param {HTMLInputElement} inputFile - Elemento input tipo "file".
 * @param {string|null} existingFile - Ruta del archivo previamente guardado, si existe.
 * @returns {string|null} - Ruta del nuevo archivo subido o el archivo existente.
 *
 * @example
 * // Si el usuario sube un archivo
 * const path = getUploadedFilePath(document.querySelector("#documentFile"), null);
 * console.log(path); // "./uploads/nombreDelArchivo.ext"
 *
 * // Si no sube un archivo, se mantiene el existente
 * const path2 = getUploadedFilePath(document.querySelector("#documentFile"), "./uploads/oldFile.pdf");
 * console.log(path2); // "./uploads/oldFile.pdf"
 */
export function getUploadedFilePath(inputFile, existingFile) {
  const file = inputFile.files[0];
  return file ? `./uploads/${file.name}` : existingFile;
}
