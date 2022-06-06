//Compra-Venta de cripto
let menu;
let menuCompra;
let menuVenta;

let cripto = [];
let historial = [];

let pesos = parseFloat(prompt("Ingrese la cantidad de dinero que quiere cargar en su cartera"));
pesos = validarCantidadIngresada(pesos);

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

function saldo(pesos){
    alert(`Su saldo es de: $${pesos}`);
}

function validarCompra(compra){
    if(compra <= pesos){
        pesos -= compra;
    }else{
        alert("No tiene dinero suficiente")
    }
}

function retiroDinero(retiro){
    if(retiro <= pesos){
        pesos -= retiro;
        agregarTransaccion("RETIRO", "-", retiro);
    }else{
        alert("No posee esa cantidad de dinero");
    }
}

function validarCantidadIngresada(cantidad){
    while(cantidad < 0 || isNaN(cantidad)){
        cantidad = parseFloat(prompt("Ingrese una cantidad valida"));
    }
    return cantidad;
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

do {

    menu = parseFloat(prompt("Para comprar cripto ingrese: 1\nPara vender cripto ingrese: 2\nPara ver su saldo ingrese: 3\nPara cargar dinero ingrese: 4\nPara retirar dinero ingrese: 5\nPara mostrar transaccion: 6\nPara salir ingrese: 0"));
    
    switch(menu){
        case 1:

            menuCompra = parseFloat(prompt("Para comprar BTC: 1\nPara comprar ETH: 2"));
            let compra;

            switch(menuCompra){
                case 1:
                compra = parseFloat(prompt("Ingrese en pesos cuanto BTC quiere comprar"));
                compra = validarCantidadIngresada(compra);
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
                compra = validarCantidadIngresada(compra);
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
                venta = validarCantidadIngresada(venta);
                cripto.find(cr => cr.codigo == "BTC").vender(venta);
                break;

                case 2:
                if(!cripto.some(cr => cr.codigo == "ETH")){
                    alert("No posee ETH");
                    break;
                }
                venta = parseFloat(prompt("Ingrese en ETH cuanto quiere vender"));
                venta = validarCantidadIngresada(venta);
                cripto.find(cr => cr.codigo == "ETH").vender(venta);
                break;

                default:
                    alert("Ingrese un valor valido");
                break;
            }
            console.log(cripto);
        break;

        case 3:
            saldo(pesos);
        break;

        case 4:
            let carga = parseFloat(prompt("Ingrese cantidad de dinero a cargar"));
            carga = validarCantidadIngresada(carga);
            pesos += carga;
            agregarTransaccion("RECARGA", "-", carga);
        break;

        case 5:
            let retiro = parseFloat(prompt("Ingrese cantidad de dinero a retirar"));
            retiro = validarCantidadIngresada(retiro);
            retiroDinero(retiro);
        break;

        case 6:
            let transac = prompt("Ingrese transaccion a mostrar o 'todas' para ver todo su historial");
            verTransaccion(transac);
            menu = 0;
        break;

        case 0:
        break;

        default:
            alert("Ingrese un valor valido");
        break;
    }
    
}while(menu);

//Muestro los arrays completos para comprobar
console.log(cripto);
console.log(historial);

//Muestro por pantalla el saldo actual
let verSaldo = document.getElementById("pesos");
verSaldo.innerText = `Pesos: $${pesos}`;

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

//Creo articulos dinamicamente mostrando todo mi historial
for (const transaccion of historial) {
    let articulo = document.createElement("article");

    articulo.innerHTML = `<h4> ${transaccion.tipo} </h4>
                            <p> Precio: ${transaccion.precio}</p>
                            <p> Criptomoneda: ${transaccion.cripto}</p>`
    let contenedor = document.getElementById("transacciones");
    contenedor.append(articulo);
}