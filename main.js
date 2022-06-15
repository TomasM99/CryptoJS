//Variables
let menu;
let menuVenta;

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
    let contenedor = document.getElementById("transacciones");
    contenedor.innerHTML = `<div></div>`;
    contenedor.className = "orden";
    for (const transaccion of historial) {
        let articulo = document.createElement("article");
        articulo.innerHTML = `<h4> ${transaccion.tipo} </h4>
                                <p> Precio: ${transaccion.precio}</p>
                                <p> Criptomoneda: ${transaccion.cripto}</p>`
        contenedor.append(articulo);
    }
    botonVerTransacciones.onclick = () => {ocultarTransacciones()};
}

function ocultarTransacciones(){
    let contenedor = document.getElementById("transacciones");
    contenedor.className = "orden ocultar"
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
    botonVerTransacciones.onclick = () => {verWallet()};
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

do {

    menu = parseFloat(prompt("Para vender cripto ingrese: 2\nPara salir ingrese: 0"));
    
    switch(menu){

        case 2:

            menuVenta = parseFloat(prompt("Para vender BTC: 1\nPara vender ETH: 2"));
            let venta;

            switch(menuVenta){
                case 1:
                if(!cripto.some(cr => cr.codigo == "BTC")){
                    alert("No posee BTC");
                    break;
                }
                venta = parseFloat(prompt("Ingrese en BTC cuanto quiere vender"));
                cripto.find(cr => cr.codigo == "BTC").vender(venta);
                break;

                case 2:
                if(!cripto.some(cr => cr.codigo == "ETH")){
                    alert("No posee ETH");
                    break;
                }
                venta = parseFloat(prompt("Ingrese en ETH cuanto quiere vender"));
                cripto.find(cr => cr.codigo == "ETH").vender(venta);
                break;

                default:
                    alert("Ingrese un valor valido");
                break;
            }
            console.log(cripto);
        break;

        case 0:
        break;
    }
    
}while(menu);

//Muestro los arrays completos para comprobar
console.log(cripto);
console.log(historial);