//Compra-Venta de cripto

let menu;
let menuCompra;

let cripto = [];

let pesos = parseFloat(prompt("Ingrese la cantidad de dinero que quiere cargar en su cartera"));
    while(pesos < 0 || isNaN(pesos)){
        pesos = parseFloat(prompt("Ingrese una cantidad valida"));
    }

class Criptomoneda{
    constructor(nombre, codigo, precio, cantidad){
        this.nombre = nombre;
        this.codigo = codigo;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

function saldo(pesos){
    alert("Su saldo es de: $" + pesos);
}

function validarCompra(compra, moneda){
    if(compra <= pesos){
        pesos -= compra;
        cripto.push(moneda);
    }else{
        alert("No tiene dinero suficiente")
    }
}


function ventaCripto(venta){
    if(venta <= cripto){
        cripto -= venta;
        pesos = pesos + (venta * 2);
        saldo(pesos);
    }else{
        alert("No tiene criptomonedas suficientes");
    }
}

function retiroDinero(retiro){
    if(retiro <= pesos){
        pesos -= retiro;
    }else{
        alert("No posee esa cantidad de dinero");
    }
}

do {

    menu = parseFloat(prompt("Para comprar cripto ingrese: 1\nPara vender cripto ingrese: 2\nPara ver su saldo ingrese: 3\nPara cargar dinero ingrese: 4\nPara retirar dinero ingrese: 5\nPara salir ingrese: 0"));
    
    switch(menu){
        case 1:

            menuCompra = parseFloat(prompt("Para comprar BTC: 1\nPara comprar ETH: 2"));
            let compra;
            let moneda;

            switch(menuCompra){
                case 1:

                compra = parseFloat(prompt("Ingrese en pesos cuanto BTC quiere comprar"));
                moneda = new Criptomoneda("BitCoin", "BTC", 100, (compra/100));

                validarCompra(compra, moneda);

                break;

                case 2:

                compra = parseFloat(prompt("Ingrese en pesos cuanto ETH quiere comprar"));
                moneda = new Criptomoneda("Ethereum", "ETH", 50, (compra/50));

                validarCompra(compra, moneda);

                break;

                default:
                    alert("Ingrese un valor valido");
                break;
            }
        break;

        case 2:
            let venta = parseFloat(prompt("Ingrese cuentas criptomonedas quiere vender"));
            ventaCripto(venta);
        break;

        case 3:
            saldo(pesos);
        break;

        case 4:
            let carga = parseFloat(prompt("Ingrese cantidad de dinero a cargar"));
            while(carga < 0 || isNaN(carga)){
                carga = parseFloat(prompt("Ingrese una cantidad valida"));
            }
            pesos += carga;
        break;

        case 5:
            let retiro = parseFloat(prompt("Ingrese cantidad de dinero a retirar"));
            while(retiro < 0 || isNaN(retiro)){
                retiro = parseFloat(prompt("Ingrese una cantidad valida"));
            }
            retiroDinero(retiro);
        break;

        case 0:
        break;

        default:
            alert("Ingrese un valor valido");
        break;
    }
    
}while(menu);

console.log(cripto);