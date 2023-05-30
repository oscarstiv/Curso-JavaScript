// Obtener los elementos del DOM

//Elemento Sección Formulario
const form = document.getElementById ("form");
const inputForm = document.querySelectorAll (".inputForm");
const EnviarDatos = document.getElementById("EnviarDatos");
const SeccionBoletas = document.getElementById("SeccionBoletas");
const resultado = document.getElementById('resultado');
const NumeroIdentificacion = document.getElementById("NumeroIdentificacion");
const mensajeAdd = document.getElementById('mensajeAdd');
const formularioPersona = document.getElementById("formularioPersona");

let validar = false

//Elementos Seccion Productos
const agregarBotones = document.querySelectorAll('.agregar-carrito');
const listaCarrito = document.querySelector('#lista-carrito');
const totalCarrito = document.querySelector('#total-carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const comprar = document.getElementById('comprar-carrito');

let carrito = []; // Array para almacenar los productos agregados al carrito

let trueOfalse = true

//Activa las sección de compra de boletas
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    const Nombre = form.Nombre.value;
    const Apellido = form.Apellido.value;

    if(validar){        
        SeccionBoletas.classList.remove("ocultarContenido"); // Elimina la calse ocultarContenido       

        // Construir el Nombre ingresado
        const MostrarNombre = `
        <h2>Bienvenido:</h2>
        <h3>${Nombre}  ${Apellido}</h3>
        <h4>Seleccione las boletas que desea adquirir:</h4>
        `;

        // Mostrar el Nombre ingresado
        resultado.innerHTML = MostrarNombre;

        // Obtener los valores del formulario
        const nombre = document.getElementById('Nombre').value;
        const apellido = document.getElementById('Apellido').value;
        const identificacion = document.getElementById('Identificacion').value;
        const numeroid = document.getElementById('NumeroIdentificacion').value;
        const correo = document.getElementById('Email').value;

        // Crear un objeto con los datos del formulario
        const formData = {
            Nombre: nombre,
            Apellido: apellido,
            Identificacion: identificacion,
            Numeroidentificación: numeroid,
            Correo: correo
        };

        // Convertir el objeto a una cadena JSON
        const formDataJSON = JSON.stringify(formData);

        // Guardar los datos en el Local Storage
        localStorage.setItem('formData', formDataJSON);

        // Mostrar un mensaje de éxito
        alert('Datos guardados en el Local Storage');

        formularioPersona.style.display = 'none';

        form.reset() // Limpiar los campos del formulario
    } else {        
        alert("Por favor llene sus datos para continuar")
    }
})

//Si el numero de identificación tiene mas de 12 caracteres
NumeroIdentificacion.addEventListener('input', function() {
    const value = NumeroIdentificacion.value;
    
    if (value.length > 12) {
        mensajeAdd.style.display = 'block';
    } else {
        mensajeAdd.style.display = 'none';
    }
});

// Valida que la info del formulario de lo datos personales se complete
inputForm.forEach(input => {
    input.addEventListener("input" , () => {
        if (inputForm [0].value && inputForm[1].value && inputForm[2].value && inputForm[3].value) {
            EnviarDatos.classList.remove("buttonDisable")
            console.log(inputForm)
            validar = true

        } else {
            EnviarDatos.classList.add("buttonDisable")
            validar = false
        }
    })
})

// Función para agregar un producto al carrito
function agregarAlCarrito(precio) {
    carrito.push(precio); // Agregar el precio al carrito
    alert("Se ha añadido con éxito");
    actualizarCarrito(); // Actualizar el carrito en el DOM
}

// Declarar la constante para el valor total del carrito
let totalCarritoValor = 0;

// Función para calcular y asignar el valor total del carrito
function calcularTotalCarrito() {
    totalCarritoValor = carrito.reduce(function(acc, precio) {
        return acc + precio;
    }, 0);
}

// Función para actualizar el carrito en el DOM
function actualizarCarrito() {
    // Vaciar el contenido anterior del carrito
    listaCarrito.innerHTML = '';

    // Recorrer los productos en el carrito y generar la lista en el DOM
    carrito.forEach(function(precio) {
        const elemento = document.createElement('li');
        elemento.textContent = `Escogiste la boleta del valor: $${precio}`;
        listaCarrito.appendChild(elemento);
    });

    // Calcular y mostrar el total del carrito
    const total = carrito.reduce(function(acc, precio) {
        return acc + precio;
    }, 0);
    totalCarrito.textContent = `Total: $${total}`;
}

// Llamar a la función actualizarCarrito() para actualizar el carrito en el DOM
actualizarCarrito();
// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = []; // Vaciar el array del carrito
    alert("El carrito se limpio correctamente");
    actualizarCarrito(); // Actualizar el carrito en el DOM
}

// Asignar los eventos a los elementos del DOM

// Recorrer los botones "Agregar al carrito" y asignarles el evento click
agregarBotones.forEach(function(boton) {
    boton.addEventListener('click', function() {
        const precio = parseInt(boton.dataset.precio); // Obtener el precio del atributo data-precio
        agregarAlCarrito(precio);
    });
});

// Asignar el evento click al botón "Vaciar carrito"
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);


// Menu para formas de pago
function formasPago() {

    // Calcular el valor total del carrito antes de usarlo
    calcularTotalCarrito();

    let formaPago = Number(prompt("Escoja la forma de pago que desea utilizar: \n 1. Efectivo \n 2. Tarjeta de crédito \n 3. Pago electrónico \n 4. Servicio Arma mi vaca \n 0. Volver"));

    while (true) {
        if (formaPago === 1) {
            alert("Para realizar su pago en efectivo, por favor diríjase a uno de nuestros puntos físicos.\n Si se encuentra fuera del país, por favor consigne al siguiente número de cuenta #00000000000000000 (Tenga presente que estamos regidos bajo la conversión de cambio de divisa del gobierno nacional)");
            break;
        } else if (formaPago === 2) {
            
        // Obtener el monto de la compra desde el valor total del carrito
        const montoCompra = totalCarritoValor;

        // Obtener el número de meses de financiamiento mediante un prompt
        const mesesFinanciamiento = parseInt(prompt("Ingrese el número de meses de financiamiento:"));

        // Declarar una variable para almacenar el monto total a pagar
        let totalPagar = 0;

        // Calcular el monto total a pagar según el número de meses de financiamiento seleccionado
        if (mesesFinanciamiento === 2) {
            totalPagar = montoCompra * 1.05; // Monto total a pagar con un incremento del 5% para 2 meses
        } else if (mesesFinanciamiento === 4) {
            totalPagar = montoCompra * 1.1; // Monto total a pagar con un incremento del 10% para 4 meses
        } else if (mesesFinanciamiento === 6) {
            totalPagar = montoCompra * 1.15; // Monto total a pagar con un incremento del 15% para 6 meses
        } else if (mesesFinanciamiento === 12) {
            totalPagar = montoCompra * 1.2; // Monto total a pagar con un incremento del 20% para 12 meses
        } else if (mesesFinanciamiento === 24) {
            totalPagar = montoCompra * 1.25; // Monto total a pagar con un incremento del 25% para 24 meses
        } else {
            // Opción inválida
            alert("Opción inválida. Por favor, seleccione un número válido de meses de financiamiento.");
        }

        // Mostrar el monto total a pagar
        alert(`El monto total a pagar por la compra es de: $${totalPagar.toFixed(2)}`);


            alert("Gracias por su compra");
            break;
        } else if (formaPago === 3) {
            alert("Va a ser dirigido a la plataforma de pagos electrónicos");
            break;
        } else if (formaPago === 4) {
            alert("Va a ser dirigido a la plataforma de Arma mi Vaca");
            break;
        } else if (formaPago >= 5) {
            alert("Digite una acción válida");
            formaPago = Number(prompt("Escoja la forma de pago que desea utilizar: \n 1. Efectivo \n 2. Tarjeta de crédito \n 3. Pago electrónico \n 4. Servicio Arma mi vaca \n 0. Volver"));
        } else if (formaPago >= 0) {
            initProgram();
            break;
        } else {
            initProgram();
            break;
        }
    }
}

//Activación del botón comprar para el menu de formas de pago
comprar.addEventListener("click", formasPago);
