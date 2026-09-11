/* Renderiza el contenido de las tarjetas principales. */

function crearHorariosHTML() {
    return horariosEntrenamiento.map(horario => {
        const sesiones = horario.sesiones.map(sesion => `
            <div class="horario-grupo">
                <span class="categoria">${sesion.grupo}</span>
                <span class="hora">${sesion.hora}</span>
            </div>
        `).join("");

        return `
            <div class="dia">
                <h3>${horario.dia}</h3>
                ${sesiones}
            </div>
        `;
    }).join("");
}

function crearTiendaHTML() {
    return productosTienda.map((producto, indice) => {
        if (producto.carrusel) {
            return `
                <div class="producto gorros">
                    <button type="button"
                            class="flecha-gorro izquierda"
                            onclick="cambiarGorro(-1)"
                            aria-label="Gorro anterior">❮</button>

                    <img id="imagenGorro"
                         src="imagenes/productos/${producto.imagenes[0]}"
                         alt="${producto.alt}"
                         loading="lazy"
                         decoding="async">

                    <button type="button"
                            class="flecha-gorro derecha"
                            onclick="cambiarGorro(1)"
                            aria-label="Gorro siguiente">❯</button>

                    <h3>${producto.nombre}</h3>
                </div>
            `;
        }

        return `
            <button type="button" class="producto" onclick="abrirProducto(${indice})">
                <img src="imagenes/productos/${producto.imagenes[0]}"
                     alt="${producto.alt}"
                     loading="lazy"
                     decoding="async">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
            </button>
        `;
    }).join("");
}

function mostrarSeccion(seccion){
    const contenido = document.getElementById("contenido"); // Aquí se muestra el contenido de cada sección según el botón pulsado */
    
    if(seccion === "horarios"){
        contenido.innerHTML = `
            <div class="seccion-box">
                <h2 class="seccion-titulo">🕒 Horarios de entrenamiento</h2>
                <div class="dias">
                    ${crearHorariosHTML()}
                </div>
            </div>
        `;
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

        listaImagenes = ["foto1.webp", "foto2.webp","foto3.webp", "foto4.webp", "foto5.webp"];

        listaImagenes.forEach((img, index) => {
            const numero = index + 1;

            html += `
                <button type="button"
                        class="galeria-boton"
                        onclick="abrirImagen(${index})"
                        aria-label="Abrir foto ${numero} de ${listaImagenes.length}">
                    <img src="imagenes/galeria/${img}"
                         alt="Foto ${numero} del Club Waterpolo Petrer"
                         loading="lazy"
                         decoding="async">
                </button>
            `;
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
                <p>Actualmente no hay próximos partidos programados. Publicaremos las nuevas fechas próximamente.</p>
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

                    <a href="mailto:waterpolopetrer@hotmail.com?subject=Informaci%C3%B3n%20para%20unirse%20al%20club&body=Hola%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20para%20formar%20parte%20del%20Club%20Waterpolo%20Petrer."
                       class="btn-email"
                       aria-label="Enviar un correo a Waterpolo Petrer">
                        Escríbenos
                    </a>
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
                <button type="button" onclick="cambiarMes(-1)" aria-label="Mes anterior">🢀</button>
                <h3 id="mesActual"></h3>
                <button type="button" onclick="cambiarMes(1)" aria-label="Mes siguiente">🢂</button>
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
                ${crearTiendaHTML()}
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
