const infoAlertBorrar = {
    titulo: "¡Oh nooo!",
    texto: "¿Seguro quieres borrar este servicio?... Igualmente, puedes agregar el servicio luego",
    confirmarBoton: "Si, borrar",
    cancelarBoton: "No, mantener",
    tituloExitoso: "¡Perfecto!",
    textoExitoso: "Se elminó el servicio correctamente",
}

let cards = [];

// Obtener divs del DOM
const contenedor = document.getElementById("contenedorCards");
const modalCarrito = document.getElementById("modalCarrito");
const contenedorCarrito = document.getElementById("contenedorCarrito");
// Se trae el carrito del localStorage
const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
let activoModalCarrito = false;

const cargarDatosYCrearCards = async () => {
    // Esperamos a que fetch obtenga la respuesta
    const response = await fetch("../datos/data.json");
    // Esperamos a que la respuesta se convierta a JSON
    const data = await response.json();
    // Copiamos los datos obtenidos a cards
    cards = [...data];
    // Llamamos a cargaDeCards después de obtener y procesar los datos
    cargaDeCards();
    totalCarrito();
    cargaDeCarrito();
};

// creación de los cards de los servicios del carrito
const cargaDeCards = () => {
    contenedor.innerHTML = ""

    cards.forEach(card => {
        let botonAgregar = "";

        // Validar si esta agegado o no en el carrito

        if (!carrito.some(item => item === card.id)) {
            botonAgregar = `
            <button type="button" class="btn btn-success btn-sm btnServiciosCarrito" onclick = "agregarCarrito(${card.id})">Agregar al carrito</>
            `
        } else {
            botonAgregar = `<h5>Agregado</h5>`
        };

        const cardHtml = `
        <div class="cardAgendamiento">
        
        <h3>${card.titulo}</h3>
        <h4>$${card.precio}</h4>
        <p>${card.descripcion}</p>
        
        ${botonAgregar}
        
        </div>
        `;

        // Cargar el card en el DOM

        contenedor.innerHTML += cardHtml;

    });

};

const agregarCarrito = idCard => {

    // Se agrega ID del card en el carrito

    carrito.push(idCard);

    // Se agrega carrito en el localStorage

    localStorage.setItem("carrito", JSON.stringify(carrito))

    cargaDeCards();
    cargaDeCarrito();
    totalCarrito();
};

// Función para borrar servicio del carrito

const borrarCarrito = idCard => {

    // Se busca posición del servicio en el Array

    const index = carrito.findIndex(item => item === idCard);

    // Se borra el servicio del Array
    carrito.splice(index, 1);

    // Se actualiza el localStorage

    localStorage.setItem("carrito", JSON.stringify(carrito));

    cargaDeCards();

    cargaDeCarrito();

    totalCarrito();
};

// Función para actualizar carrito

const cargaDeCarrito = () => {
    contenedorCarrito.innerHTML = ""

    // Buscar servicios que estan en el carrito

    const cardsCarrito = cards.filter(card => carrito.includes(card.id));

    cardsCarrito.forEach(card => {

        const cardHtml = `
        <div class="cardAgendamiento">
        
        <h3>${card.titulo}</h3>
        <h4>$${card.precio}</h4>
        
        <button type="button" class="btn btn-success btn-sm btnServiciosCarrito" onclick = "abrirSweetAlert(infoAlertBorrar, ${card.id})">Borrar</>
        
        </div>
        `;

        contenedorCarrito.innerHTML += cardHtml;

    });

};

// Función para mostrar y ocultar carrito

const mostrarCarrito = () => {
    activoModalCarrito = !activoModalCarrito;

    if (activoModalCarrito) {
        modalCarrito.classList.add("showModal");
    } else {
        modalCarrito.classList.remove("showModal");
    }
}

// función para hallar el total del carrito

const totalCarrito = () => {

    // Buscar servicios que estan en el carrito

    const cardsCarrito = cards.filter(card => carrito.includes(card.id));

    // Sumar precios de los servicios en el carrito

    const total = cardsCarrito.reduce((acum, card) => acum + card.precio, 0);

    // Mostrar el total en el DOM

    const precioHtml = document.getElementById("totalCarrito");
    precioHtml.innerText = `${total}`;

    const totalServicios = cardsCarrito.length;
    const bulletHtml = document.getElementById("bulletHtml");
    bulletHtml.innerText = `${totalServicios}`;
};

const abrirSweetAlert = (infoAlert, cardId) => {
    Swal.fire({
        title: infoAlert.titulo,
        text: infoAlert.texto,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: infoAlert.confirmarBoton,
        cancelButtonText: infoAlert.cancelarBoton,
    }).then((result) => {
        if (result.isConfirmed) {
            borrarCarrito(cardId);

            Swal.fire({
                title: infoAlert.tituloExitoso,
                text: infoAlert.textoExitoso,
                icon: "success"
            });
        }
    });
};

cargarDatosYCrearCards();
cargaDeCards();