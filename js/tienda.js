/* Carrusel de gorros de la tienda. Los nombres de archivo están en datos/productos.js. */

const productoGorros = productosTienda.find(producto => producto.carrusel);
const gorros = productoGorros ? productoGorros.imagenes : [];

let gorroActual = 0;

function cambiarGorro(direccion) {
    if (gorros.length === 0) return;

    gorroActual += direccion;

    if (gorroActual < 0) {
        gorroActual = gorros.length - 1;
    }

    if (gorroActual >= gorros.length) {
        gorroActual = 0;
    }

    const imagen = document.getElementById("imagenGorro");

    if (imagen) {
        imagen.src = "imagenes/productos/" + gorros[gorroActual];
        imagen.alt = `Gorro de natación, diseño ${gorroActual + 1}`;
    }
}
