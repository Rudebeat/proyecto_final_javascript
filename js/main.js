// Array de servicios a ofrecer

const cards = [

    {
        id: 1,
        titulo: "Valoración inicial",
        precio: 200000,
        descripcion: "Inicia tu tratamiento con la Dra. Clara Tabares realizando una valoración general y específica"
    },
    {
        id: 2,
        titulo: "Sueroterapia",
        precio: 250000,
        descripcion: "Inicia tu tratamiento con la Dra. Clara Tabares realizando una valoración general y específica"
    },
    {
        id: 3,
        titulo: "Teleconsulta",
        precio: 200000,
        descripcion: "Inicia tu tratamiento con la Dra. Clara Tabares realizando una valoración general y específica"
    },
    {
        id: 4,
        titulo: "Plasma",
        precio: 500000,
        descripcion: "Inicia tu tratamiento con la Dra. Clara Tabares realizando una valoración general y específica"
    }

];

// Obtener div contenedor en el DOM

const contenedor = document.getElementById("contenedorCards");

// Se trae el carrito del localStorage

const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];

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

cargaDeCards();

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

const modalCarrito = document.getElementById("modalCarrito");
const contenedorCarrito = document.getElementById("contenedorCarrito");

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
        
        <button type="button" class="btn btn-danger btn-sm btnServiciosCarrito" onclick = "borrarCarrito(${card.id})">Borrar</>
        
        </div>
        `;

        contenedorCarrito.innerHTML += cardHtml;

    });

};

cargaDeCarrito();

// Función para mostrar y ocultar carrito

const mostrarCarrito = evento => {
    if (evento) {
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

totalCarrito();
