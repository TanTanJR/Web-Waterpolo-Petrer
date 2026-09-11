/* Carrusel de gorros de la tienda. */

const gorros = [
    "gorros-natacion.jpg",
    "gorros-natacion2.jpg"
];

let gorroActual = 0;

function cambiarGorro(direccion) {

    gorroActual += direccion;

    if (gorroActual < 0) {
        gorroActual = gorros.length - 1;
    }

    if (gorroActual >= gorros.length) {
        gorroActual = 0;
    }

    document.getElementById("imagenGorro").src =
        "imagenes/productos/" + gorros[gorroActual];
}
