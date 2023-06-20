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

let productos = [];

let trueOfalse = true

const urlProducts =
    "https://6490e0222f2c7ee6c2c79355.mockapi.io/productos";

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
        Swal.fire({
            icon: 'success',
            title: 'Datos guardados en el localStore',
            showConfirmButton: false,
            timer: 1500
        })

        //Se quita la visualizacion del formulario persona
        formularioPersona.style.display = 'none';

        form.reset() // Limpiar los campos del formulario
    } else {        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor complete sus datos para continuar',
        })
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
function agregarAlCarrito(nombre, precio) {
    const id = Date.now(); // Generar un id único para el producto

    carrito.push({ id, nombre, precio }); // Agregar el nombre, precio y id al carrito como un objeto

    //Mensaje      
    Toastify({
        text: "Producto añadido correctamente",
        duration: 3000,
        position: "center",
        gravity: "bottom",
        style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        close: true,
    }).showToast();    
    actualizarCarrito(); // Actualizar el carrito en el DOM

    // Llamada a la función subirProducto() directamente dentro de agregarAlCarrito()
    subirProducto({ id, nombre, precio });
}

// Declarar la constante para el valor total del carrito
let totalCarritoValor = 0;

// Función para calcular y asignar el valor total del carrito
function calcularTotalCarrito() {
    totalCarritoValor = carrito.reduce(function(acc, precio) {
        return acc + precio;
    }, 0);
}

// Asignar los eventos a los elementos del DOM

agregarBotones.forEach(function(boton) {
    boton.addEventListener('click', function() {
        const nombre = boton.dataset.nombre; // Obtener el nombre del atributo data-nombre
        const precio = parseInt(boton.dataset.precio); // Obtener el precio del atributo data-precio
        agregarAlCarrito(nombre, precio);
    });
});

// Función para actualizar el carrito en el DOM
function actualizarCarrito() {
    // Vaciar el contenido anterior del carrito
    listaCarrito.innerHTML = '';

    // Recorrer los productos en el carrito y generar la lista en el DOM
    carrito.forEach(function(producto, index) {
        const elemento = document.createElement('li');
        elemento.textContent = `Escogiste la boleta "${producto.nombre}" del valor: $${producto.precio}`;

        // Crear el botón de remover y asignarle una clase
        const botonRemover = document.createElement('button');
        botonRemover.textContent = 'Remover';
        botonRemover.classList.add('boton-remover');

        // Agregar el botón al elemento de lista
        elemento.appendChild(botonRemover);
        listaCarrito.appendChild(elemento);
    });

    // Calcular y mostrar el total del carrito
    const total = carrito.reduce(function(acc, producto) {
        return acc + producto.precio;
    }, 0);
    totalCarrito.textContent = `Total: $${total}`;
}

// Llamar a la función actualizarCarrito() para actualizar el carrito en el DOM
actualizarCarrito();

// Función para vaciar el carrito
function vaciarCarrito() {
    Swal.fire({
        title: '¿Está seguro de vaciar el carrito?',
        text: "Una vez vaciado el carrito, debe vovler a escoger sus boletas",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Si, vaciar!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                '¡Carrito Vaciado!',
                'Todos las boletas han sido eliminadas correctamente.',
                'success'
            )
            carrito = []; // Vaciar el array del carrito
            actualizarCarrito(); // Actualizar el carrito en el DOM
            eliminarProductosURL(); // Eliminar todos los productos de la URL
        }
    })
    
}

// Función comprarBoletas
function comprarBoletas() { 
    if (carrito.length > 0) {
        Swal.fire({
            icon: 'success',
            title: 'Felicidades por su compra',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            timer: 3000
        });

        // Retrasar la recarga de la página por 3 segundos (3000 milisegundos)
        setTimeout(function() {
            // Volver a cargar la página después del retraso
            window.location.reload();
        }, 3000);
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Tu carrito esta vacio',
            text: 'Agrega al menos un producto al carrito para poder registar tu comprar.',
        });
    }
}

//Activación del botón comprar para el menu de formas de pago
comprar.addEventListener("click", comprarBoletas);

// Asignar el evento click al botón "Vaciar carrito"
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

// Función para enviar el producto al servidor mediante POST
async function subirProducto(producto) {
    try {
        const resp = await fetch(urlProducts, {
            method: "POST",
            body: JSON.stringify(producto),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (resp.ok) {
            console.log("Producto enviado exitosamente");
        } else {
            console.error("Error al enviar el producto");
        }
    } catch (error) {
        console.error("Error al realizar la petición POST:", error);
    }
}

// Función para eliminar un producto del carrito y de la URL
async function eliminarProducto(index) {
    try {
        // Eliminar el producto del carrito utilizando el índice proporcionado
        carrito.splice(index, 1);

        // Actualizar el carrito en el DOM
        actualizarCarrito();

        // Realizar una petición DELETE al servidor para eliminar el producto de la URL
        const urlEliminar = `${urlProducts}/${index + 1}`;
        const resp = await fetch(urlEliminar, {
            method: "DELETE",
        });

        if (resp.ok) {
            console.log("Producto eliminado exitosamente");
            //Mensaje      
            Toastify({
                text: "Producto eliminado exitosamente",
                duration: 3000,
                position: "center",
                gravity: "bottom",
                style: {
                background: "linear-gradient(to right, #FF416C, #FF4B2B)",
                },
                close: true,
            }).showToast();
        } else {
            console.error("Error al eliminar el producto");
        }
    } catch (error) {
        console.error("Error al realizar la petición DELETE:", error);
    }
}

// Asignar el evento click a los botones de remover
listaCarrito.addEventListener('click', function(event) {
    if (event.target.classList.contains('boton-remover')) {
        const index = Array.from(event.target.parentNode.parentNode.children).indexOf(event.target.parentNode);
        eliminarProducto(index);
    }
});

// Función para eliminar todos los productos de la URL
async function eliminarProductosURL() {
    try {
        const resp = await fetch(urlProducts);
        const productos = await resp.json();

        // Eliminar cada producto de la URL utilizando una petición DELETE
        productos.forEach(async (producto) => {
            const urlEliminar = `${urlProducts}/${producto.id}`;
            await fetch(urlEliminar, {
                method: "DELETE",
            });
        });

        console.log("Productos eliminados de la URL exitosamente");
    } catch (error) {
        console.error("Error al eliminar los productos de la URL:", error);
    }
}

