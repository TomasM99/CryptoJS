//Compra-Venta de cripto

let menu;
let menuCompra;
let menuVenta;

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

    agregarCompra(compra){
        this.cantidad = this.cantidad + (compra/this.precio);
    }

    vender(cantidadVendida){
        if(cantidadVendida <= this.cantidad){
            this.cantidad -= cantidadVendida;
            pesos += (cantidadVendida*this.precio);
        }else{
            alert("No tiene suficientes criptomonedas")
        }
    }
}

function saldo(pesos){
    alert("Su saldo es de: $" + pesos);
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

            switch(menuCompra){
                case 1:
                compra = parseFloat(prompt("Ingrese en pesos cuanto BTC quiere comprar"));
                validarCompra(compra);

                if(cripto.some(cr => cr.codigo == "BTC")){
                    cripto.find(cr => cr.codigo == "BTC").agregarCompra(compra);
                }else{
                    let BTC = new Criptomoneda("BitCoin", "BTC", 100, (compra/100));
                    cripto.push(BTC);
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
                }
                venta = parseFloat(prompt("Ingrese en BTC cuanto quiere vender"));
                cripto.find(cr => cr.codigo == "BTC").vender(venta);
                break;

                case 2:
                if(!cripto.some(cr => cr.codigo == "ETH")){
                    alert("No posee ETH");
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