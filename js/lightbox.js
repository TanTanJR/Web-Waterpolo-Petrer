/* Galería y visor de imágenes de productos. */

let imagenActual = 0;
let listaImagenes = [];
let productoActual = 0;
let imagenProductoActual = 0;
let listaProductos = [];
let tipoLightbox = "galeria";

function cerrarImagen(){ // Esta función cierra el lightbox de la galería, ocultando el contenedor del lightbox y deteniendo la visualización de la imagen grande */
    document.getElementById("lightbox").style.display = "none";
      
}

function actualizarContador(){// Esta función actualiza el contador que muestra la posición de la imagen actual en la galería, mostrando el número de imagen actual y el total de imágenes disponibles */
    document.getElementById("contador").innerText = 
        (imagenActual + 1) + " / " + listaImagenes.length;
}

function abrirImagen(index){ // Esta función abre la imagen seleccionada en el lightbox, mostrando la imagen grande y generando las miniaturas de navegación, además de actualizar el contador de imágenes */
    tipoLightbox = "galeria";
    imagenActual = index;

    const lightbox = document.getElementById("lightbox");
    const imagen = document.getElementById("imagenGrande");

    imagen.src = "imagenes/galeria/" + listaImagenes[imagenActual];
    lightbox.style.display = "flex";

    document.querySelectorAll("#lightbox .flecha").forEach(flecha => {
        flecha.style.display = "block";
    });

    let miniaturas = "<div class='miniaturas'>";

    listaImagenes.forEach((img, i) => {
        miniaturas += `<img 
            src="imagenes/galeria/${img}" 
            onclick="abrirImagen(${i})"
            class="${i === imagenActual ? 'activa' : ''}"
        >`;
    });

    miniaturas += "</div>";

    const old = document.querySelector(".miniaturas");
    if (old) old.remove();

    lightbox.innerHTML += miniaturas;

    actualizarContador();
}

function abrirProducto(index) {

    tipoLightbox = "producto";
    productoActual = index;
    imagenProductoActual = 0;

    const productos = [
        {
            nombre: "Abanicos",
            imagenes: ["abanicos.jpg"]
        },
        {
            nombre: "Bañador",
            imagenes: ["bañador.jpg"]
        },
        {
            nombre: "Equipación",
            imagenes: ["equipacion.jpg"]
        },
        {
            nombre: "Gorros de natación",
            imagenes: ["gorros-natacion.jpg", "gorros-natacion2.jpg"]
        },
        {
            nombre: "Mochila",
            imagenes: ["mochila.jpg"]
        }
    ];

    listaProductos = productos[productoActual].imagenes;

    const lightbox = document.getElementById("lightbox");
    const imagen = document.getElementById("imagenGrande");

    imagen.src = "imagenes/productos/" + listaProductos[0];

    lightbox.style.display = "flex";

    const miniaturas = lightbox.querySelector(".miniaturas");
    if (miniaturas) miniaturas.remove();

    document.querySelectorAll("#lightbox .flecha").forEach(flecha => {
        flecha.style.display = listaProductos.length > 1 ? "block" : "none";
    });

    actualizarContadorProducto();
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
        img.style.opacity = 1;

        actualizarContador();
        actualizarMiniaturas();

    }, 200);
}

document.addEventListener("keydown", function(e){ // Este evento escucha las teclas presionadas por el usuario y permite navegar por las imágenes del lightbox usando las flechas izquierda y derecha, o cerrar el lightbox con la tecla Escape */

    const lightbox = document.getElementById("lightbox");

    if (lightbox.style.display === "flex") {

        if (e.key === "ArrowRight") cambiarImagen(1);
        if (e.key === "ArrowLeft") cambiarImagen(-1);
        if (e.key === "Escape") cerrarImagen();
    }
});
