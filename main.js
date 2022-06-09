//Variables
let menu;
let menuCompra;
let menuVenta;

let pesos = 0;
let cripto = [];
let historial = [];

pesos = parseFloat(prompt("Ingrese cantidad de dinero"));

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
    for (const transaccion of historial) {
        let articulo = document.createElement("article");
    
        articulo.innerHTML = `<h4> ${transaccion.tipo} </h4>
                                <p> Precio: ${transaccion.precio}</p>
                                <p> Criptomoneda: ${transaccion.cripto}</p>`
        let contenedor = document.getElementById("transacciones");
        contenedor.append(articulo);
    }
}

//Eventos
let botonDepositar = document.getElementById("depositar");
botonDepositar.onclick = () => {realizarDeposito()};

let botonRetirar = document.getElementById("retirar");
botonRetirar.onclick = () => {realizarRetiro()};

let botonVerTransacciones = document.getElementById("transacc");
botonVerTransacciones.onclick = () => {verTransacciones()};

do {

    menu = parseFloat(prompt("Para comprar cripto ingrese: 1\nPara vender cripto ingrese: 2\nPara ver su saldo ingrese: 3\nPara cargar dinero ingrese: 4\nPara retirar dinero ingrese: 5\nPara mostrar transaccion: 6\nPara salir ingrese: 0"));
    
    switch(menu){
        case 1:

            menuCompra = parseFloat(prompt("Para comprar BTC: 1\nPara comprar ETH: 2"));
            let compra;

            switch(menuCompra){
                case 1:
                compra = parseFloat(prompt("Ingrese en pesos cuanto BTC quiere comprar"));
                validarCompra(compra);

                if(cripto.some(cr => cr.codigo == "BTC")){
                    cripto.find(cr => cr.codigo == "BTC").agregarCompra(compra);
                }else{
                    let BTC = new Criptomoneda("BitCoin", "BTC", 100, (compra/100));
                    cripto.push(BTC);
                    agregarTransaccion("COMPRA", "BTC", compra);
                }
                break;

                case 2:
                compra = parseFloat(prompt("Ingrese en pesos cuanto ETH quiere comprar"));
                validarCompra(compra);

                if(cripto.some(cr => cr.codigo == "ETH")){
                    cripto.find(cr => cr.codigo == "ETH").agregarCompra(compra);
                }else{
                    let ETH = new Criptomoneda("Ethereum", "ETH", 50, (compra/50));
                    cripto.push(ETH);
                    agregarTransaccion("COMPRA", "ETH", compra);
                }
                break;

                default:
                    alert("Ingrese un valor valido");
                break;
            }
            console.log(cripto);
        break;

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

//Creo articulos dinamicamente mostrando todas mis monedas
for (const criptomoneda of cripto) {
    let articulo = document.createElement("article");
    let total = criptomoneda.precio * criptomoneda.cantidad;

    articulo.innerHTML = `<h4> ${criptomoneda.codigo} (${criptomoneda.nombre}) </h4>
                            <p> Precio: ${criptomoneda.precio}</p>
                            <p> Cantidad: ${criptomoneda.cantidad}</p>
                            <p> Total: ${total}</p>`;
    let contenedor = document.getElementById("criptos");
    contenedor.append(articulo);
}