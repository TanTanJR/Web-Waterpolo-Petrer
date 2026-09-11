let fechaVista = new Date();
let imagenActual = 0;
let listaImagenes = [];

let productoActual = 0;
let imagenProductoActual = 0;
let listaProductos = [];
let tipoLightbox = "galeria";

function mostrarSeccion(seccion){
    const contenido = document.getElementById("contenido"); // Aquí se muestra el contenido de cada sección según el botón pulsado */
    
    if(seccion === "horarios"){
    contenido.innerHTML = `
    <div class="seccion-box">
        <h2 class="seccion-titulo">🕒 Horarios de entrenamiento</h2>

        <div class="dias">

            <div class="dia">
                <h3>Lunes</h3>

                <div class="horario-grupo">
                    <span class="categoria">Alevín / Infantil</span>
                    <span class="hora">19:30 - 21:00</span>
                </div>

                <div class="horario-grupo">
                    <span class="categoria">Juvenil / Absoluto Masculino / Absoluto Femenino</span>
                    <span class="hora">21:30 - 23:30</span>
                </div>
            </div>


            <div class="dia">
                <h3>Martes</h3>

                <div class="horario-grupo">
                    <span class="categoria">Pre-Benjamín / Benjamín / Alevín </span>
                    <span class="hora">19:00 - 20:00</span>
                </div>

                <div class="horario-grupo">
                    <span class="categoria">Alevín / Infantil</span>
                    <span class="hora">20:00 - 21:30</span>
                </div>
            </div>


            <div class="dia">
                <h3>Miércoles</h3>

                <div class="horario-grupo">
                    <span class="categoria">Alevín / Infantil</span>
                    <span class="hora">19:00 - 20:30</span>
                </div>

                <div class="horario-grupo">
                    <span class="categoria">Juvenil / Absoluto Masculino / Absoluto Femenino</span>
                    <span class="hora">21:30 - 23:30</span>
                </div>
            </div>


            <div class="dia">
                <h3>Jueves</h3>

                <div class="horario-grupo">
                    <span class="categoria">Pre-Benjamín / Benjamín</span>
                    <span class="hora">19:00 - 20:00</span>
                </div>

                <div class="horario-grupo">
                    <span class="categoria">Alevín / Infantil</span>
                    <span class="hora">19:00 - 20:30</span>
                </div>

                <div class="horario-grupo">
                    <span class="categoria">Juvenil / Absoluto Masculino / Absoluto Femenino</span>
                    <span class="hora">21:30 - 23:30</span>
                </div>
            </div>


            <div class="dia">
                <h3>Viernes</h3>

                <div class="horario-grupo">
                    <span class="categoria">Pre-Benjamín / Benjamín / Alevín / Infantil</span>
                    <span class="hora">19:30 - 21:00</span>
                </div>

                <div class="horario-grupo">
                    <span class="categoria">Juvenil / Absoluto Masculino / Absoluto Femenino</span>
                    <span class="hora">20:30 - 22:30</span>
                </div>
            </div>

        </div>
    </div>`;
}


    if (seccion === "equipos") { // Aquí se muestra el contenido de la sección de equipos, con una lista de los diferentes equipos del club */
       contenido.innerHTML = `
    <div class="seccion-box">
        <h2 class="seccion-titulo">👥 Equipos</h2>
    
        <div class="equipos">
            <div>- Pre-Benjamin <br> 2018 - 2019</div>
            <div>- Benjamín <br> 2016 - 2017</div>
            <div>- Alevin <br> 2014 - 2015</div>
            <div>- Infantil<br> 2012 - 2013</div>
            <div>- Juvenil</div>
            <div>- Absoluto Femenino</div>
            <div>- Absoluto Masculino B</div>
            <div>- Absoluto Masculino A</div>
        </div>
        
       
        
        `;
    }

    

    if (seccion === "galeria") { // Aquí se muestra el contenido de la sección de galería, con una lista de imágenes que se pueden abrir en un lightbox al hacer clic */

        let html = "<h2>Galería</h2><div class='galeria'>";

        listaImagenes = ["foto1.jpg", "foto2.jpg","foto3.jpg", "foto4.jpg", "foto5.jpg"];

        listaImagenes.forEach((img, index) => {
            html += `<img src="imagenes/galeria/${img}" onclick="abrirImagen(${index})">`;
        });

        html += "</div>";

        contenido.innerHTML = html;
        
    }

    if (seccion === "partidos") {

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const proximosPartidos = partidosCalendario.filter(jornada => {
        const fechaPartido = new Date(jornada.fecha + "T00:00:00");
        return fechaPartido >= hoy;
    });

    let html = `
        <div class="seccion-box">
            <h2 class="seccion-titulo">📅 Próximos Partidos</h2>

            <p class="partidos-intro">
                Consulta los próximos encuentros de nuestros equipos.
            </p>

            <div class="lista-partidos">
    `;

    if (proximosPartidos.length === 0) {

        html += `
            <div class="sin-partidos">
                <span>🏊</span>
                <h3>No hay próximos partidos</h3>
                <p>En estos momentos no hay partidos programados.</p>
            </div>
        `;

    } else {

        proximosPartidos.forEach(jornada => {

            const fecha = new Date(jornada.fecha + "T00:00:00");

            const fechaTexto = fecha.toLocaleDateString("es-ES", {
                weekday: "long",
                day: "numeric",
                month: "long"
            });

            html += `
                <div class="jornada-partidos">

                    <div class="fecha-partido">
                        📅 ${fechaTexto}
                    </div>

                    <div class="ubicacion-partido">
                        📍 ${jornada.ubicacion}
                    </div>
            `;

            jornada.partidos.forEach(partido => {

                html += `
                    <div class="partido-item">

                        <div class="partido-hora">
                            ${partido.hora}
                        </div>

                        <div class="partido-info">

                            <span class="partido-categoria">
                                ${partido.categoria}
                            </span>

                            <strong>
                                CW Petrer
                                <span class="vs">VS</span>
                                ${partido.rival}
                            </strong>

                        </div>

                    </div>
                `;
            });

            html += `
                </div>
            `;
        });
    }

    html += `
            </div>
        </div>
    `;

    contenido.innerHTML = html;
}

    if (seccion === "contacto") {
    contenido.innerHTML = `
        <div class="seccion-box">
            <h2 class="seccion-titulo">📬 Contacto</h2>

            <div class="contacto">

                <div class="contacto-item">
                    <h3>
                        <img src="imagenes/contacto/gmail.jpg" class="icono-contacto" alt="" aria-hidden="true">
                        Email
                    </h3>

                    <p>¿Tienes alguna pregunta? Escríbenos y te responderemos lo antes posible.</p>

                    <button type="button" class="btn-email btn-email-pendiente" disabled>
                        Correo disponible próximamente
                    </button>
                </div>

                <div class="contacto-item">
                    <h3>📞 Teléfono</h3>
                    <p>Ponte en contacto directamente con nosotros:</p>

                    <div class="telefonos">
                        <a href="tel:+34625141778" class="btn-telefono" aria-label="Llamar al 625 141 778">
                            📞 625 141 778
                        </a>

                        <a href="tel:+34667455600" class="btn-telefono" aria-label="Llamar al 667 455 600">
                            📞 667 455 600
                        </a>
                    </div>
                </div>

               <div class="contacto-item">
                    <h3>
                        <img src="imagenes/sidebar/instagram.jpg" class="icono-contacto" alt="" aria-hidden="true">
                        Redes Sociales
                    </h3>

                    <p>Síguenos y descubre las novedades del club.</p>

                    <a href="https://www.instagram.com/waterpolopetrer/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn-instagram">
                       <img src="imagenes/contacto/instagram-rojo.jpg" class="icono-contacto" alt="" aria-hidden="true"> 
                       Instagram
                    </a>
                </div>

            </div>
        </div>
       
    `;
}

    if(seccion === "ubicacion"){ // Aquí se muestra el contenido de la sección de ubicación, con un mapa de Google Maps que muestra la ubicación del club */
        contenido.innerHTML = `
        <div class="seccion-box">
            <h2 class="seccion-titulo">📍 Ubicación</h2>
            <div class="ubicacion">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d464.23849067849403!2d-0.7774816203496921!3d38.487368246593235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63dacc1e0f63bf%3A0x1ec272fa486c487d!2sPiscina%20cubierta%20de%20San%20Fernando!5e0!3m2!1ses!2ses!4v1774895710142!5m2!1ses!2ses" width="100%" height="450" style="border:0; border-radius: 15px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
         `;
         
    }

    if(seccion === "calendario"){ // Aquí se muestra el contenido de la sección de calendario, con un calendario interactivo que muestra los próximos partidos del club según la fecha seleccionada */
    contenido.innerHTML = `
        <div class="seccion-box">
            <h2 class="seccion-titulo">📅 Calendario de Partidos</h2>

            <div class="calendario-header">
                <button onclick="cambiarMes(-1)">🢀</button>
                <h3 id="mesActual"></h3>
                <button onclick="cambiarMes(1)">🢂</button>
            </div>

            <div id="calendario" class="calendario-grid"></div>

            <div id="detallePartido" class="detalle-partido"></div>
        </div>
         
    `;

    generarCalendario();
}

if (seccion === "compras") {

    contenido.innerHTML = `
        <div class="seccion-box">

            <h2 class="seccion-titulo">🛍️ Material oficial del club</h2>

            <div class="tienda">

                <div class="producto" onclick="abrirProducto(0)">
                    <img src="imagenes/productos/abanicos.jpg" alt="Abanicos del club">
                    <h3>Abanicos</h3>
                    <p>Material oficial del club</p>
                </div>

                <div class="producto" onclick="abrirProducto(1)">
                    <img src="imagenes/productos/bañador.jpg" alt="Bañador del club">
                    <h3>Bañador</h3>
                    <p>Material oficial del club</p>
                </div>

                <div class="producto" onclick="abrirProducto(2)">
                    <img src="imagenes/productos/equipacion.jpg" alt="Equipación del club">
                    <h3>Equipación</h3>
                    <p>Equipación oficial</p>
                </div>

                <div class="producto gorros">

                    <button class="flecha-gorro izquierda" onclick="cambiarGorro(-1)">
                        ❮
                    </button>

                    <img id="imagenGorro"
                        src="imagenes/productos/gorros-natacion.jpg"
                        alt="Gorro de natación">

                    <button class="flecha-gorro derecha" onclick="cambiarGorro(1)">
                        ❯
                    </button>

                    <h3>Gorros de natación</h3>

                </div>
                <div class="producto" onclick="abrirProducto(4)">
                    <img src="imagenes/productos/mochila.jpg" alt="Mochila del club">
                    <h3>Mochila</h3>
                    <p>Material oficial del club</p>
                </div>

            </div>

        </div>
    `;
}

    setTimeout(() => {
        contenido.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 100);
}



function generarCalendario() { // Esta función genera el calendario del mes actual y marca los días que tienen partidos programados, permitiendo hacer clic en cada día para ver los detalles de los partidos de ese día */
    const calendario = document.getElementById("calendario");
    const mesActual = document.getElementById("mesActual");

    const año = fechaVista.getFullYear();
    const mes = fechaVista.getMonth();

   const primerDia = (new Date(año, mes, 1).getDay() + 6) % 7;
    const diasMes = new Date(año, mes + 1, 0).getDate();

    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

   mesActual.textContent = `${meses[mes]} ${año}`;

   let html = "";

    html += `
    <div class="nombre-dia">L</div>
    <div class="nombre-dia">M</div>
    <div class="nombre-dia">X</div>
    <div class="nombre-dia">J</div>
    <div class="nombre-dia">V</div>
    <div class="nombre-dia">S</div>
    <div class="nombre-dia">D</div>
`;
for (let i = 0; i < primerDia; i++) { // Agrega días vacíos al inicio del mes para alinear el primer día correctamente */
    html += `<div class="dia-vacio"></div>`;
}


    for (let dia = 1; dia <= diasMes; dia++) { // Agrega cada día del mes al calendario, marcando los días que tienen partidos programados */
        const fechaTexto = `${año}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

        const hayPartido = partidosCalendario.find(p => p.fecha === fechaTexto);

        html += `
            <div class="dia-calendario ${hayPartido ? "partido-dia" : ""}"
                 onclick="mostrarDetalle('${fechaTexto}')">
                ${dia}
            </div>`;
    }

    calendario.innerHTML = html;
}
function cambiarMes(direccion) { // Esta función cambia el mes que se muestra en el calendario, sumando o restando un mes a la fecha actual y regenerando el calendario */
    fechaVista.setMonth(fechaVista.getMonth() + direccion);
    generarCalendario();
}
function mostrarDetalle(fecha) { // Esta función muestra los detalles de los partidos programados para la fecha seleccionada, buscando en el array de partidos y mostrando la información en un formato legible */
    const detalle = document.getElementById("detallePartido");

    const jornadas = partidosCalendario.filter(p => p.fecha === fecha);

    if (jornadas.length === 0) {
        detalle.innerHTML = `<p>No hay partidos este día.</p>`;
        return;
    }

    let html = `<h3>🏊 Jornada del ${fecha}</h3>`;

    jornadas.forEach(jornada => {
        html += `
            <div class="partido-card">
                <p><b>📍 Ubicación:</b> ${jornada.ubicacion}</p>
                <hr>
        `;

        jornada.partidos.forEach(partido => {
            html += `
                <div class="partido-linea">
                    <span><b>${partido.hora}</b></span>
                    <span>${partido.categoria}</span>
                    <span>vs ${partido.rival}</span>
                </div>
            `;
        });

        html += `</div>`;
    });

    detalle.innerHTML = html;
}
   

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

function toggleMenu(){ // Esta función muestra u oculta el menú de navegación en pantallas pequeñas, cambiando la propiedad de display del contenedor del menú entre "grid" y "none" */
    const contenedor = document.querySelector(".contenedor");

    if (contenedor.style.display === "grid" || contenedor.style.display === "flex") {
        contenedor.style.display = "none";
    } else {
        contenedor.style.display = "grid";
    }
};

/*Hacer que en el calendario al pulsar un día se baje la pantalla como estamos haciendo con los botones y contenido */
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

