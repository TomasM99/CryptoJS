//Variables
let pesos = 0;
let cripto = [];
let historial = [];
const criptomonedas =  [{nombre: "BitCoin", codigo: "BTC", precio: 3500},
                        {nombre: "Ethereum", codigo: "ETH", precio: 500},
                        {nombre: "DogeCoin", codigo: "DGC", precio: 10},
                        {nombre: "USD Coin", codigo: "USC", precio: 200},
                        {nombre: "Dai", codigo: "DAI", precio: 250},
                        {nombre: "LiteCoin", codigo: "LTC", precio: 2000},
                        {nombre: "UniSwap", codigo: "USW", precio: 700},
                        {nombre: "Aave", codigo: "AAV", precio: 1500}];

for (const moneda of criptomonedas) {
    let articulo = document.createElement("article");
    let contenedor = document.getElementById("cotizacion");
    articulo.innerHTML = `<h4> ${moneda.nombre} (${moneda.codigo}) </h4>
                            <p> Precio: ${moneda.precio}</p>`;
    contenedor.append(articulo);
}

//Clases
class Criptomoneda{
    constructor(criptomoneda, cantidad){
        this.nombre = criptomoneda.nombre;
        this.codigo = criptomoneda.codigo;
        this.precio = criptomoneda.precio;
        this.cantidad = cantidad;
    }

    agregarCompra(compra){
        this.cantidad = this.cantidad + (compra/this.precio);
        agregarTransaccion("COMPRA", this.codigo, compra);
        actualizarSaldo(pesos);
    }

    vender(cantidadVendida){
        if(cantidadVendida <= this.cantidad){
            this.cantidad -= cantidadVendida;
            pesos += (cantidadVendida*this.precio);
            agregarTransaccion("VENTA", this.codigo, cantidadVendida*this.precio);
        }else{
            alert("No tiene suficientes criptomonedas")
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

//Funciones
function validarCompra(compra){
    if(compra <= pesos){
        pesos -= compra;
    }else{
        alert("No tiene dinero suficiente")
    }
}

function agregarTransaccion(tipo, codigo, precio){
    let transaccion = new Transaccion(tipo, codigo, precio);
    historial.push(transaccion);
}

function verTransaccion(tipoTransaccion){
    if(tipoTransaccion.toUpperCase() == "TODAS"){
        console.log(historial);
    }else{
        historialTransaccion = historial.filter(transaccion => transaccion.tipo == tipoTransaccion.toUpperCase());
        console.log(historialTransaccion);
    }
}

function actualizarSaldo(nuevoSaldo) {
    let saldo = document.getElementById("pesos");
    saldo.innerText = `Pesos: $${nuevoSaldo}`;
}

//Funciones eventos
function realizarDeposito() {
    let deposito = document.getElementById("deposito");
    deposito = parseFloat(deposito.value);
    if(deposito < 0){
        alert("Solo valores positivos")
    }else{
        pesos = pesos + deposito;
        agregarTransaccion("DEPOSITO", "-", deposito);
        actualizarSaldo(pesos);
    }
}

function realizarRetiro(){
    let retiro = document.getElementById("retiro");
    retiro = parseFloat(retiro.value);
    if(retiro < 0){
        alert("Solo valores positivos");
    }else{
        if(pesos >= retiro){
            pesos = pesos - retiro;
            agregarTransaccion("RETIRO", "-", retiro);
            actualizarSaldo(pesos);
        }else{
            alert("No cuenta con esa cantidad de dinero");
        }
    }
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
    botonVerTransacciones.onclick = () => {ocultarTransacciones()};
}

function ocultarTransacciones(){
    let div = document.getElementById("transacciones");
    div.className = "orden ocultar"
    botonVerTransacciones.onclick = () => {verTransacciones()};
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
        alert("Solo valores positivos");
    }else{
        if(pesos >= campoCantidad){
            pesos -= campoCantidad;
            if(cripto.some(cr => cr.codigo == campoCodigo.value)){
                cripto.find(cr => cr.codigo == campoCodigo.value).agregarCompra(campoCantidad);
            }else{
                let nuevaMoneda = criptomonedas.find(cr => cr.codigo == campoCodigo.value);
                let moneda = new Criptomoneda(nuevaMoneda, (campoCantidad/nuevaMoneda.precio));
                cripto.push(moneda);
                agregarTransaccion("COMPRA", campoCodigo.value, campoCantidad);
                actualizarSaldo(pesos);
            }
        }else{
            alert("No cuenta con esa cantidad de dinero");
        }
    }
}

function realizarVenta(ev){
    ev.preventDefault();
    let campoCodigo = document.getElementById("codigoCriptoV");
    let campoCantidad = document.getElementById("cantidadVenta");
    campoCantidad = parseFloat(campoCantidad.value);

    if(campoCantidad < 0){
        alert("Solo valores positivos");
    }else{
        cripto.find(cr => cr.codigo == campoCodigo.value).vender(campoCantidad);
        actualizarSaldo(pesos);
    }
}

//Eventos
let botonDepositar = document.getElementById("depositar");
botonDepositar.onclick = () => {realizarDeposito()};

let botonRetirar = document.getElementById("retirar");
botonRetirar.onclick = () => {realizarRetiro()};

let botonVerTransacciones = document.getElementById("transacc");
botonVerTransacciones.onclick = () => {verTransacciones()};

let botonVerWallet = document.getElementById("wallet");
botonVerWallet.onclick = () => {verWallet()};

let formularioCompra = document.getElementById("compra");
formularioCompra.addEventListener("submit", realizarCompra);

let formularioVenta = document.getElementById("venta");
formularioVenta.addEventListener("submit", realizarVenta);