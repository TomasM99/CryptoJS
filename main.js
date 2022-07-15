//Variables
let pesos;
let cripto = [];
let historial = [];
//Mi "API", al final se explica el problema
const criptomonedas =  [{nombre: "BitCoin", codigo: "BTC", precio: 3500},
                        {nombre: "Ethereum", codigo: "ETH", precio: 500},
                        {nombre: "DogeCoin", codigo: "DGC", precio: 10},
                        {nombre: "USD Coin", codigo: "USC", precio: 200},
                        {nombre: "Dai", codigo: "DAI", precio: 250},
                        {nombre: "LiteCoin", codigo: "LTC", precio: 2000},
                        {nombre: "UniSwap", codigo: "USW", precio: 700},
                        {nombre: "Aave", codigo: "AAV", precio: 1500}];

//Muestro las criptos disponibles
for (const moneda of criptomonedas) {
    let articulo = document.createElement("article");
    let contenedor = document.getElementById("cotizacion");
    articulo.innerHTML = `<h4> ${moneda.nombre} (${moneda.codigo}) </h4>
                            <p> Precio: ${moneda.precio}</p>`;
    contenedor.append(articulo);
}
for (const moneda of criptomonedas) {
    let opcion = document.createElement("option");
    let contenedor = document.getElementById("codigoCripto");
    opcion.innerText = `${moneda.codigo}`;
    contenedor.append(opcion);
}

//Clases
class Criptomoneda{
    constructor(nombre, codigo, precio, cantidad){
        this.nombre = nombre;
        this.codigo = codigo;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    agregarCompra(compra){
        this.cantidad = this.cantidad + (compra/this.precio);
        agregarTransaccion("COMPRA", this.codigo, compra);
        avisarConfirmacion("Compra realizada con exito");
        actualizarSaldo(pesos);
        verTransacciones();
        guardadoLocalStorage();
    }

    vender(cantidadVendida){
        if(cantidadVendida <= this.cantidad){
            this.cantidad -= cantidadVendida;
            pesos += (cantidadVendida*this.precio);
            agregarTransaccion("VENTA", this.codigo, cantidadVendida*this.precio);
            avisarConfirmacion("Venta realizada con exito");
            guardadoLocalStorage();
        }else{
            avisarError("No tiene suficientes criptomonedas");
        }
        if(this.cantidad == 0){
            cripto.sort((a,b) => b.cantidad - a.cantidad).pop();
        }
    }
}

class Transaccion{
    constructor(tipo, cripto, precio){
        this.tipo = tipo;
        this.cripto = cripto;
        this.precio = precio;
    }
}

//Manejo del Local Storage
if(localStorage.getItem("pesos") == null){
    pesos = 0;
}else{
    pesos = parseFloat(localStorage.getItem("pesos"));
    actualizarSaldo(pesos);
}
if(localStorage.getItem("historial") != null){
    let historialViejo = JSON.parse(localStorage.getItem("historial"));
    for (const transaccion of historialViejo){
        historial.push(new Transaccion(transaccion.tipo, transaccion.cripto, transaccion.precio));
    }
    verTransacciones();
}
if(localStorage.getItem("criptos") != null){
    let criptoViejo = JSON.parse(localStorage.getItem("criptos"));
    for (const moneda of criptoViejo){
        cripto.push(new Criptomoneda(moneda.nombre, moneda.codigo, moneda.precio, moneda.cantidad));
    }
}

function guardadoLocalStorage(){
    localStorage.setItem('pesos', pesos);
    localStorage.setItem('historial', JSON.stringify(historial));
    localStorage.setItem('criptos', JSON.stringify(cripto));
}

//Funciones generales
function agregarTransaccion(tipo, codigo, precio){
    let transaccion = new Transaccion(tipo, codigo, precio);
    historial.push(transaccion);
}

function actualizarSaldo(nuevoSaldo) {
    let saldo = document.getElementById("pesos");
    saldo.innerText = `Pesos: $${nuevoSaldo}`;
}

function verTransacciones(){
    let div = document.getElementById("transacciones");
    div.innerHTML = `<div></div>`;
    div.className = "orden";
    for (const transaccion of historial) {
        let articulo = document.createElement("article");
        articulo.innerHTML = `<h4> ${transaccion.tipo} </h4>
                                <p> Precio: ${transaccion.precio}</p>
                                <p> Criptomoneda: ${transaccion.cripto}</p>`
        div.append(articulo);
    }
}

function actualizarVentas(){
    let contenedor = document.getElementById("codigoCriptoV");
    contenedor.innerHTML = ``;
    for (const moneda of cripto) {
        let opcion = document.createElement("option");
        opcion.innerText = `${moneda.codigo}`;
        contenedor.append(opcion);
    }
}

//Funciones eventos
function realizarDeposito() {
    let deposito = document.getElementById("deposito");
    deposito = parseFloat(deposito.value);
    if(deposito < 0){
        avisarError("Solo valores positivos");
    }else{
        pesos += deposito;
        agregarTransaccion("DEPOSITO", "-", deposito);
        actualizarSaldo(pesos);
        verTransacciones();
        avisarConfirmacion("Deposito realizado con exito");
        guardadoLocalStorage();
    }
}

function realizarRetiro(){
    let retiro = document.getElementById("retiro");
    retiro = parseFloat(retiro.value);
    if(retiro < 0){
        avisarError("Solo valores positivos");
    }else{
        if(pesos >= retiro){
            pesos -= retiro;
            agregarTransaccion("RETIRO", "-", retiro);
            actualizarSaldo(pesos);
            verTransacciones();
            avisarConfirmacion("Retiro realizado con exito");
            guardadoLocalStorage();
        }else{
            avisarError("No cuenta con esa cantidad de dinero");
        }
    }
}

function verWallet(){
    let contenedor = document.getElementById("criptos");
    contenedor.innerHTML = `<div></div>`;
    contenedor.className = "orden";
    for (const criptomoneda of cripto) {
        let articulo = document.createElement("article");
        let total = criptomoneda.precio * criptomoneda.cantidad;
        articulo.innerHTML = `<h4> ${criptomoneda.codigo} (${criptomoneda.nombre}) </h4>
                                <p> Precio: ${criptomoneda.precio}</p>
                                <p> Cantidad: ${criptomoneda.cantidad}</p>
                                <p> Total: ${total}</p>`;
        contenedor.append(articulo);
    }
    botonVerWallet.onclick = () => {ocultarWallet()};
}

function ocultarWallet(){
    let contenedor = document.getElementById("criptos");
    contenedor.className = "orden ocultar"
    botonVerWallet.onclick = () => {verWallet()};
}

function realizarCompra(ev){
    ev.preventDefault();
    let campoCodigo = document.getElementById("codigoCripto");
    let campoCantidad = document.getElementById("cantidadCompra");
    campoCantidad = parseFloat(campoCantidad.value);
    if(campoCantidad < 0){
        avisarError("Solo valores positivos");
    }else{
        if(pesos >= campoCantidad){
            pesos -= campoCantidad;
            if(cripto.some(cr => cr.codigo == campoCodigo.value)){
                cripto.find(cr => cr.codigo == campoCodigo.value).agregarCompra(campoCantidad);
            }else{
                let nuevaMoneda = criptomonedas.find(cr => cr.codigo == campoCodigo.value);
                let moneda = new Criptomoneda(nuevaMoneda.nombre, nuevaMoneda.codigo, nuevaMoneda.precio, (campoCantidad/nuevaMoneda.precio));
                cripto.push(moneda);
                agregarTransaccion("COMPRA", campoCodigo.value, campoCantidad);
                avisarConfirmacion("Compra realizada con exito");
                actualizarSaldo(pesos);
                actualizarVentas();
                verTransacciones();
                guardadoLocalStorage();
                verWallet();
            }
        }else{
            avisarError("No cuenta con esa cantidad de dinero");
        }
    }
}

function realizarVenta(ev){
    ev.preventDefault();
    let campoCodigo = document.getElementById("codigoCriptoV");
    let campoCantidad = document.getElementById("cantidadVenta");
    campoCantidad = parseFloat(campoCantidad.value);
    if(campoCantidad < 0){
        avisarError("Solo valores positivos");
    }else{
        if(cripto.some(cr => cr.codigo == campoCodigo.value)){
            cripto.find(cr => cr.codigo == campoCodigo.value).vender(campoCantidad);
            actualizarSaldo(pesos);
            actualizarVentas();
            verTransacciones();
            guardadoLocalStorage();
            verWallet();
        }else{
            avisarError("No tiene esa criptomoneda");
        }
    }
}

//Eventos
let botonDepositar = document.getElementById("depositar");
botonDepositar.onclick = () => {realizarDeposito()};

let botonRetirar = document.getElementById("retirar");
botonRetirar.onclick = () => {realizarRetiro()};

let botonVerWallet = document.getElementById("wallet");
botonVerWallet.onclick = () => {verWallet()};

let formularioCompra = document.getElementById("compra");
formularioCompra.addEventListener("submit", realizarCompra);

let formularioVenta = document.getElementById("venta");
formularioVenta.addEventListener("submit", realizarVenta);

//Alertas
function avisarError(mensaje){
    Toastify({
        text: mensaje,
        duration: 3000,
        gravity: 'bottom',
        style: {
            background: 'linear-gradient(to right, #f60a0a, #f6400a)'
        }
    }).showToast();
}

function avisarConfirmacion(mensaje){
    Toastify({
        text: mensaje,
        duration: 3000,
        gravity: 'bottom',
        style: {
            background: 'linear-gradient(to right, #09bc09, #51c90c)'
        }
    }).showToast();
}

/* 
Mi idea era crear un archivo .json con los datos de las monedas necesarios.
Iba a hacer una funcion y todo que los tome y los muestre como hace con el array de objetos del principio.
Segui los pasos tal cual la clase pero me tira un error que la verdad no se como solucionar, por eso no uso una API.
/*
const URLJSON = "/simulador.json";
fetch(URLJSON)
    .then((response) => response.json())
    .then((json) => console.log(json));

*/