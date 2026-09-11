/* Menú desplegable para dispositivos móviles. */

function toggleMenu(boton){ // Muestra u oculta las tarjetas y comunica su estado a lectores de pantalla */
    const contenedor = document.getElementById("menu-tarjetas");
    const estaOculto = contenedor.style.display === "none";

    contenedor.style.display = estaOculto ? "grid" : "none";
    boton.setAttribute("aria-expanded", String(estaOculto));
    boton.textContent = estaOculto ? "☰ Ocultar menú" : "☰ Mostrar menú";
}
