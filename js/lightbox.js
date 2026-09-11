/* Galería y visor de imágenes de productos. */

let imagenActual = 0;
let listaImagenes = [];
let productoActual = 0;
let imagenProductoActual = 0;
let listaProductos = [];
let tipoLightbox = "galeria";
let nombreProductoActual = "";
let elementoConFocoAntesDelLightbox = null;

function cerrarImagen(){ // Cierra el visor y devuelve el foco al elemento que lo abrió
    const lightbox = document.getElementById("lightbox");

    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (elementoConFocoAntesDelLightbox) {
        elementoConFocoAntesDelLightbox.focus();
    }
}

function actualizarContador(){// Esta función actualiza el contador que muestra la posición de la imagen actual en la galería, mostrando el número de imagen actual y el total de imágenes disponibles */
    document.getElementById("contador").innerText = 
        (imagenActual + 1) + " / " + listaImagenes.length;
}

function abrirImagen(index){ // Abre una fotografía de la galería en el visor
    elementoConFocoAntesDelLightbox = document.activeElement;
    tipoLightbox = "galeria";
    imagenActual = index;

    const lightbox = document.getElementById("lightbox");
    const imagen = document.getElementById("imagenGrande");

    imagen.src = "imagenes/galeria/" + listaImagenes[imagenActual];
    imagen.alt = `Foto ${imagenActual + 1} del Club Waterpolo Petrer ampliada`;
    lightbox.style.display = "flex";
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    document.querySelectorAll("#lightbox .flecha").forEach(flecha => {
        flecha.style.display = "block";
    });

    let miniaturas = "<div class='miniaturas'>";

    listaImagenes.forEach((img, i) => {
        miniaturas += `
            <button type="button"
                    class="miniatura-boton"
                    onclick="abrirImagen(${i})"
                    aria-label="Mostrar foto ${i + 1} de ${listaImagenes.length}">
                <img src="imagenes/galeria/${img}"
                     alt=""
                     aria-hidden="true"
                     class="${i === imagenActual ? 'activa' : ''}">
            </button>
        `;
    });

    miniaturas += "</div>";

    const old = document.querySelector(".miniaturas");
    if (old) old.remove();

    lightbox.insertAdjacentHTML("beforeend", miniaturas);

    actualizarContador();
    lightbox.querySelector(".cerrar").focus();
}

function abrirProducto(index) {

    elementoConFocoAntesDelLightbox = document.activeElement;
    tipoLightbox = "producto";
    productoActual = index;
    imagenProductoActual = 0;

    const producto = productosTienda[productoActual];

    listaProductos = producto.imagenes;
    nombreProductoActual = producto.nombre;

    const lightbox = document.getElementById("lightbox");
    const imagen = document.getElementById("imagenGrande");

    imagen.src = "imagenes/productos/" + listaProductos[0];
    imagen.alt = nombreProductoActual + " ampliado";

    lightbox.style.display = "flex";
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    const miniaturas = lightbox.querySelector(".miniaturas");
    if (miniaturas) miniaturas.remove();

    document.querySelectorAll("#lightbox .flecha").forEach(flecha => {
        flecha.style.display = listaProductos.length > 1 ? "block" : "none";
    });

    actualizarContadorProducto();
    lightbox.querySelector(".cerrar").focus();
}

function cambiarImagenProducto(direccion) {

    imagenProductoActual += direccion;

    if (imagenProductoActual < 0) {
        imagenProductoActual = listaProductos.length - 1;
    }

    if (imagenProductoActual >= listaProductos.length) {
        imagenProductoActual = 0;
    }

    const imagen = document.getElementById("imagenGrande");

    imagen.src = "imagenes/productos/" + listaProductos[imagenProductoActual];
    imagen.alt = `${nombreProductoActual}, imagen ${imagenProductoActual + 1}`;

    actualizarContadorProducto();
}

function actualizarContadorProducto() {

    document.getElementById("contador").innerText =
        (imagenProductoActual + 1) + " / " + listaProductos.length;
}

function actualizarMiniaturas(){ // Esta función actualiza las miniaturas de navegación en el lightbox, resaltando la miniatura de la imagen actual y permitiendo hacer clic en las miniaturas para cambiar la imagen mostrada */
    const minis = document.querySelectorAll(".miniaturas img");

    minis.forEach((img, i) => {
        if(i === imagenActual){
            img.classList.add("activa");
        } else {
            img.classList.remove("activa");
        }
    });
}

function cambiarImagen(direccion){ // Esta función cambia la imagen mostrada en el lightbox, sumando o restando a la posición actual de la imagen y actualizando la imagen grande, el contador y las miniaturas */

    if (tipoLightbox === "producto") {
        cambiarImagenProducto(direccion);
        return;
    }

    const img = document.getElementById("imagenGrande");

    img.style.opacity = 0;

    setTimeout(() => {

        imagenActual += direccion;

        if (imagenActual < 0) {
            imagenActual = listaImagenes.length - 1;
        }

        if (imagenActual >= listaImagenes.length) {
            imagenActual = 0;
        }

        img.src = "imagenes/galeria/" + listaImagenes[imagenActual];
        img.alt = `Foto ${imagenActual + 1} del Club Waterpolo Petrer ampliada`;
        img.style.opacity = 1;

        actualizarContador();
        actualizarMiniaturas();

    }, 200);
}

document.addEventListener("keydown", function(e){ // Este evento escucha las teclas presionadas por el usuario y permite navegar por las imágenes del lightbox usando las flechas izquierda y derecha, o cerrar el lightbox con la tecla Escape */

    const lightbox = document.getElementById("lightbox");

    if (lightbox.getAttribute("aria-hidden") === "false") {

        if (e.key === "ArrowRight") cambiarImagen(1);
        if (e.key === "ArrowLeft") cambiarImagen(-1);
        if (e.key === "Escape") cerrarImagen();
    }
});

// Cierra el visor al pulsar fuera de la imagen.
document.getElementById("lightbox").addEventListener("click", function(evento) {
    if (evento.target === this) {
        cerrarImagen();
    }
});
