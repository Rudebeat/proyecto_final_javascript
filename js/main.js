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

const contenedor = document.getElementById("contenedorCards");
const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];

const cargaDeCards = () => {
    contenedor.innerHTML = ""

    cards.forEach(card => {
        let botonAgregar = "";

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

        contenedor.innerHTML += cardHtml;

    });

};

cargaDeCards();

const agregarCarrito = idCard => {

    carrito.push(idCard);

    localStorage.setItem("carrito", JSON.stringify(carrito))

    cargaDeCards();
    cargaDeCarrito();
    totalCarrito();
};


const borrarCarrito = idCard => {

    const index = carrito.findIndex(item => item === idCard);

    carrito.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    cargaDeCards();

    cargaDeCarrito();

    totalCarrito();
};

const modalCarrito = document.getElementById("modalCarrito");
const contenedorCarrito = document.getElementById("contenedorCarrito");

const cargaDeCarrito = () => {
    contenedorCarrito.innerHTML = ""
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

const mostrarCarrito = evento => {
    if (evento) {
        modalCarrito.classList.add("showModal");
    } else{
        modalCarrito.classList.remove("showModal");
    }
}

const totalCarrito = () => {
    const cardsCarrito = cards.filter(card => carrito.includes(card.id));
    const total = cardsCarrito.reduce((acum,card) => acum + card.precio, 0);

    const precioHtml = document.getElementById("totalCarrito");
    precioHtml.innerText = `${total}`;

    const totalServicios = cardsCarrito.length;
    const bulletHtml = document.getElementById("bulletHtml");
    bulletHtml.innerText = `${totalServicios}`;
};

totalCarrito();
