
let facturas = [];
let contadorID = 0;


// Funciones auxiliares
//==========================

// Validar que el número sea positivo
function validarNumeroPositivo(valor, nombreCampo) {
  if (isNaN(valor) || valor < 0) {
    alert(`${nombreCampo} inválido. Debe ser un número positivo.`);
    return false;
  }
  return true;
}

// Validar porcentaje entre 0 y 100
function validarPorcentaje(valor, nombreCampo) {
  if (isNaN(valor) || valor < 0 || valor > 100) {
    alert(`${nombreCampo} inválido. Debe estar entre 0 y 100.`);
    return false;
  }
  return true;
}

// Validar fecha simple (DD-MM-YYYY)
function validarFecha(fecha) {
  if (!fecha || fecha.length !== 10) {
    alert("Formato de fecha inválido. Use DD-MM-YYYY.");
    return false;
  }

  let partes = fecha.split("-");
  if (partes.length !== 3) {
    alert("Formato de fecha inválido. Use DD-MM-YYYY.");
    return false;
  }

  let d = Number(partes[0]);
  let m = Number(partes[1]);
  let y = Number(partes[2]);

  if (isNaN(d) || isNaN(m) || isNaN(y)) {
    alert("La fecha debe contener solo números.");
    return false;
  }

  if (y < 1900 || y > 3000) {
    alert("Año inválido.");
    return false;
  }

  if (m < 1 || m > 12) {
    alert("Mes inválido.");
    return false;
  }

  if (d < 1 || d > 31) {
    alert("Día inválido.");
    return false;
  }

  // Validar que sea una fecha real del calendario
  const dt = new Date(y, m - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) {
    alert("Fecha inválida. Revise día y mes.");
    return false;
  }

  return true;
}

// Validar RUC (numérico, 8 a 11 dígitos)
function validarRUC(ruc) {
  if (!ruc) {
    alert("El RUC no puede estar vacío.");
    return false;
  }

  if (ruc.length < 8 || ruc.length > 11) {
    alert("RUC inválido. Debe tener entre 8 y 11 dígitos.");
    return false;
  }

  for (let i = 0; i < ruc.length; i++) {
    let c = ruc[i];
    if (c < "0" || c > "9") {
      alert("RUC inválido. Debe contener solo números.");
      return false;
    }
  }

  return true;
}

// Validar número de factura (string no vacío y único)
function validarNumeroFactura(numero) {
  if (!numero || numero.trim() === "") {
    alert("El número de factura no puede estar vacío.");
    return false;
  }

  let existe = facturas.some(f => f.numeroFactura === numero);
  if (existe) {
    alert("El número de factura ya está registrado.");
    return false;
  }
  return true;
}

// Convertir DD-MM-YYYY a YYYYMMDD string para ordenar
function fechaToClave(fecha) {
  let partes = fecha.split("-");
  let d = partes[0];
  let m = partes[1];
  let y = partes[2];
  return y + m + d; // YYYYMMDD
}

// Ordena por fecha descendente (más reciente primero)
function ordenarFacturasPorFechaDesc(arr) {
  return arr.slice().sort((a, b) => {
    let claveA = fechaToClave(a.fecha);
    let claveB = fechaToClave(b.fecha);
    if (claveA > claveB) return -1;
    if (claveA < claveB) return 1;
    return a.numeroFactura.localeCompare(b.numeroFactura);
  });
}


// Funciones principales
// ============================

// 1. Crear factura
function crearFactura() {
  contadorID++;

  let numeroFactura = prompt("Ingrese el número de factura:");
  if (!validarNumeroFactura(numeroFactura)) {
    contadorID--;
    return;
  }

  let descripcion = prompt("Ingrese la descripción de la factura:");
  if (!descripcion || descripcion.trim() === "") {
    alert("La descripción no puede estar vacía.");
    contadorID--;
    return;
  }

  let ruc = prompt("Ingrese el RUC/RUS del emisor:");
  if (!validarRUC(ruc)) {
    contadorID--;
    return;
  }

  let fecha = prompt("Ingrese la fecha de la factura (DD-MM-YYYY):");
  if (!validarFecha(fecha)) {
    contadorID--;
    return;
  }

  let base = parseFloat(prompt("Ingrese la base imponible (ej: 150):"));
  if (!validarNumeroPositivo(base, "Base imponible")) {
    contadorID--;
    return;
  }

  let iva = parseFloat(prompt("Ingrese el IVA en % (ej: 18):"));
  if (!validarPorcentaje(iva, "IVA")) {
    contadorID--;
    return;
  }

  let descuento = parseFloat(prompt("Ingrese el descuento en % (ej: 10):"));
  if (!validarPorcentaje(descuento, "Descuento")) {
    contadorID--;
    return;
  }

  // Cálculo del total
  let montoIVA = base * (iva / 100);
  let montoDescuento = base * (descuento / 100);
  let total = base + montoIVA - montoDescuento;

  // Crear objeto factura
  let factura = {
    id: contadorID,
    numeroFactura: numeroFactura,
    descripcion: descripcion,
    ruc: ruc,
    fecha: fecha, // formato DD-MM-YYYY
    base: base,
    iva: iva,
    descuento: descuento,
    total: total
  };

  facturas.push(factura);

  // Resumen inmediato en alert
  alert(
    "Factura registrada con éxito:\n" +
    "--------------------------------\n" +
    `ID interno: ${factura.id}\n` +
    `N° Factura: ${factura.numeroFactura}\n` +
    `Descripción: ${factura.descripcion}\n` +
    `RUC/RUS: ${factura.ruc}\n` +
    `Fecha: ${factura.fecha}\n` +
    `Base: $${factura.base.toFixed(2)}\n` +
    `IVA: ${factura.iva}%\n` +
    `Descuento: ${factura.descuento}%\n` +
    `Total: $${factura.total.toFixed(2)}`
  );
}

// 2. Imprimir todas las facturas en consola (ordenadas por fecha reciente)
function imprimirFacturas() {
  console.log("===============================================");
  console.log("*********** REGISTRO DE FACTURAS **************");
  console.log("===============================================");

  const ordenadas = ordenarFacturasPorFechaDesc(facturas);

  for (let i = 0; i < ordenadas.length; i++) {
    let f = ordenadas[i];
    console.log("-----------------------------------------------");
    console.log(` ID interno:   ${f.id}`);
    console.log(` N° Factura:   ${f.numeroFactura}`);
    console.log(` Descripción:  ${f.descripcion}`);
    console.log(` RUC/RUS:      ${f.ruc}`);
    console.log(` Fecha:        ${f.fecha}`);
    console.log(` Base:         $${f.base.toFixed(2)}`);
    console.log(` IVA:          ${f.iva}%`);
    console.log(` Descuento:    ${f.descuento}%`);
    console.log(` Total:        $${f.total.toFixed(2)}`);
  }

  console.log("===============================================");
  console.log("************* FIN DEL REGISTRO ****************");
  console.log("===============================================");
}

// 3. Flujo principal
function simulador() {
  alert("Bienvenido al simulador de registro de facturas.");

  let continuar = true;

  while (continuar) {
    crearFactura();
    continuar = confirm("¿Desea registrar otra factura?");
  }

  imprimirFacturas();
}


//Llamada a función principal
simulador();