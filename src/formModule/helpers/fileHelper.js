/**
 * fileHelper.js
 * Funciones auxiliares para manejar archivos en formularios
 */

/**
 * Devuelve la ruta de un archivo cargado o mantiene el existente
 * @param {HTMLInputElement} inputFile - input type="file"
 * @param {string|null} existingFile - archivo previamente guardado
 * @returns {string|null}
 */
export function getUploadedFilePath(inputFile, existingFile) {
  const file = inputFile.files[0];
  return file ? `./uploads/${file.name}` : existingFile;
}