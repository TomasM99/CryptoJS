//Compra-Venta de cripto

let pesos = parseFloat(prompt("Ingrese la cantidad de dinero que quiere cargar en su cartera"));
let cripto = 0;
let menu;

function saldo(pesos, cripto){
    alert("Su saldo es de: $" + pesos + " y " + cripto + " criptomonedas");
}

function compraCripto(compra){

    if(compra <= pesos){
        pesos -= compra;
        cripto = cripto + (compra * 0.5);
        saldo(pesos,cripto);
    }else{
        alert("No tiene dinero suficiente");
    }
}

function ventaCripto(venta){

    if(venta <= cripto){
        cripto -= venta;
        pesos = pesos + (venta * 2);
        saldo(pesos,cripto);
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
            let compra = parseFloat(prompt("Ingrese en pesos cuanto quiere comprar"));
            compraCripto(compra);
        break;

        case 2:
            let venta = parseFloat(prompt("Ingrese cuentas criptomonedas quiere vender"));
            ventaCripto(venta);
        break;

        case 3:
            saldo(pesos,cripto);
        break;

        case 4:
            let carga = parseFloat(prompt("Ingrese cantidad de dinero a cargar"));
            pesos += carga;
        break;

        case 5:
            let retiro = parseFloat(prompt("Ingrese cantidad de dinero a retirar"));
            retiroDinero(retiro);
        break;

        case 0:
        break;

        default:
            alert("Ingrese un valor valido");
        break;
    }
    
} while (menu);