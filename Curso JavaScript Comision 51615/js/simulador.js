const dbBoletas = [
    {
        id: 1,
        name: "Boleta Individual General 1 Día",
        price: 309000
    },

    {
        id: 2,
        name: "Boleta Individual VIP 1 Día",
        price: 536000
    },

    {
        id: 3,
        name: "Boleta Individual General Combo 3 Días",
        price: 734000
    },

    {
        id: 4,
        name: "Boleta Individual VIP Combo 3 Días",
        price: 945000
    }
]

const divisa = "$"


let boletasArr = [];
let carrito = [];
let trueOfalse = true; 

let nombre = prompt("Ingrese su Nombre");
let edad = prompt("Ingrese su edad");
let pais = prompt("Ingrese el país donde esta realizando la compra");
alert("Recuerde que la compra máxima de boletas por persona son 6")

class Boleta {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price
    }
}

function pushBoletas() {
    for (const element of dbBoletas) {
        boletasArr.push(new Boleta(element.id, element.name, element.price))
    }
}

pushBoletas()

function initProgram() {
    while(trueOfalse) {
        let selectOption = prompt("¡BIENVENIDO! \n Ingrese el número de la acción que desea realizar: \n 1. Ver entradas \n 2. Comprar entradas \n 3. Ver mis entradas \n 4. Formas de pago \n 0. Finalizar compra");
        switch(selectOption) {
            case "1":
                verBoletas()
                break;

            case "2":
                comprarEntrada()
                break;

            case "3":
                misBoletas()
                break;
                
            case "4":
                formasPago()
                break;

            case "0":
                trueOfalse = false;
                break;

            default:
                alert("No se inserto una acción válida")
                selectOption = prompt("¡BIENVENIDO! \n Ingrese el número de la acción que desea realizar: \n 1. Ver entradas \n 2. Buscar entradas  3. Comprar entradas para el festival \n 4. Ver mis entradas \n 5. Formas de pago \n 6. Finalizar compra");
                break
        }
    }
}

function verBoletas() {
    boletasArr.forEach((Boleta) => {
        alert(Boleta.name + " " + divisa + Boleta.price);
    });
}

function comprarEntrada() {
    let boletaABuscar = prompt("Seleccione la entrada que desea comprar: \n 1. Boleta Individual General 1 Día \n 2. Boleta Individual VIP 1 Día \n 3. Boleta Individual General Combo 3 Días \n 4. Boleta Individual VIP Combo 3 Días \n\n 0. Volver");
    let boletaEncontrada = boletasArr.find((Boleta) => {
        return Boleta.id == boletaABuscar
    })
    if (boletaEncontrada) {
        let opcion = Number(prompt("La boleta que seleccionó es:" + "\n" + boletaEncontrada.name + " " + "y su valor es" + " " + divisa + boletaEncontrada.price + "\n" + "\n" + "¿Desea agregar la entrada a su carrito de compra?" + "\n" + "1. Si" + "\n" + "2. No"))
        while(trueOfalse) {
            if (opcion === 1) {
                carrito.push(boletaEncontrada)
                alert("Su entrada ha sido agregada correctamente")
                initProgram()
            } else {
                initProgram()
            }
        }
    } else if (boletaABuscar === 0) {
        initProgram()
    } else {
        alert("No se encontró la entrada")
        initProgram()
    }
}

function misBoletas(){
    for (const ticket of carrito) {
        alert("id" + " " + ticket.id + "\n" + ticket.name + "\n" + divisa + ticket.price)
    } 
    if (carrito.length > 0){
        let compra = Number(prompt("¿Desea Conocer el valor total de sus entradas? \n 1. Si \n 2. No" ))
        if (compra == 1) {
            let monto = carrito.reduce((i, Boleta) => {
                return i + Boleta.precio
            })
            sumarPrecio()
        } else if (compra == 2) {
            formasPago();
        } else {
            alert("Inserte una acción válida")
            compra = Number(prompt("¿Desea Conocer el valor total de sus entradas? \n 1. Si \n 2. No" ))
        }
    } else {
        alert("No tiene entradas a su nombre")
        initProgram()
    }
}

function sumarPrecio() {
    let precioTotal = carrito.reduce((acumulador, Boleta) => {
        return acumulador + Boleta.price
    } ,0)

    let continuarCompra = prompt("Su monto total es de" + "\n" + divisa + " " + precioTotal + "\n" + "\n" + "¿Desea pagar su entradas? \n 1. Si \n 2. Deseo eliminar entradas \n 0. Cancelar compra")
    if (continuarCompra == 1){
        formasPago()
    } else if (continuarCompra == 2){
        eliminarEntradas()
    } else {
        alert("No se continuó con el proceso de compra, pero aún posee sus entradas en el carrito por si ambia de opinión")
        initProgram()
    }
}

function eliminarEntradas() {
    if (carrito.length > 0){
        let id = parseInt(prompt("Ingrese el número del id de la entrada que desea eliminar"));
        const index = carrito.findIndex(Boleta => Boleta.id === id)
        if (index !== -1) {
            carrito.splice(index, 1);
            alert("La entrada fue eliminada exitosamente")
            misBoletas();
        } else {
            alert("Su carrito esta vacio");
            initProgram();
        }
    }
}

function formasPago() {
    let formaPago = Number(prompt("Escoja la forma de pago que desea utilizar: \n 1. Efectivo \n 2. Tarjeta de crédito \n 3. Pago electrónico \n 4. Servicio Arma mi vaca \n 0. Volver"));
    while(trueOfalse){
        if (formaPago === 1){
            alert("Para realizar su pago en efectivo, por favor dirijase a uno de nuestros puntos fisicos.\n Si se encuentra fuera del país, por favor consigne al siguiente número de cuenta #00000000000000000 (Tenga presente que estamos regidos bajo la conversión de cambio de divisa del gobierno nacional)")
            trueOfalse = false

        } else if (formaPago === 2){
            calculoTasa()
            alert("Gracias por su compra");
            trueOfalse = false
        } else if (formaPago === 3) {
            alert("Va a ser dirigido a la plataforma de pagos electrónicos")
            trueOfalse = false
        } else if (formaPago === 4) {
            alert("Va a ser dirigido a la plataforma de Arma mi Vaca")
            trueOfalse = false
        } else if (formaPago >= 5) {
            alert("Digite una acción válida")
            formaPago = Number(prompt("Escoja la forma de pago que desea utilizar: \n 1. Efectivo \n 2. Tarjeta de crédito \n 3. Pago electrónico \n 4. Servicio Arma mi vaca \n 0. Volver"));
        } else if (formaPago >= 0) {
            initProgram();
        } else {
            initProgram();
        }
    }

}


function calculoTasa() {
    let precioBase = carrito.reduce((acumulador, Boleta) => {
        return acumulador + Boleta.price
    } ,0); // Precio base de la compra
    let mesesElegidos = prompt("¿Cuántos meses desea tener de plazo?"); // Se pide al usuario el número de meses de plazo
    let descuento = 0; // Inicialización de la variable descuento

    if (mesesElegidos >= 3 && mesesElegidos < 6) {
    descuento = 0.1; // Descuento del 10% para 3-5 meses
    } else if (mesesElegidos >= 6 && mesesElegidos < 12) {
    descuento = 0.2; // Descuento del 20% para 6-11 meses
    } else if (mesesElegidos >= 12) {
    descuento = 0.3; // Descuento del 30% para 12 o más meses
    }

    let precioFinal = precioBase - (precioBase * descuento); // Cálculo del precio final con descuento
    alert("El precio final de la compra es: " + precioFinal); // Se muestra el precio final en la consola
}

while(trueOfalse){
    if (nombre === "" || edad === "" || pais === ""){
        alert("Debe completar sus datos para continuar con la compra")
        nombre = prompt("Ingrese su Nombre");
        edad = prompt("Ingrese su edad");
        pais = prompt("Ingrese el país donde esta realizando la compra");
    } else {
        initProgram ();
    }
}

initProgram();

