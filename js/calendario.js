/* Calendario y detalle de los partidos. */

let fechaVista = new Date();

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
    html += `<div class="dia-vacio" aria-hidden="true"></div>`;
}


    for (let dia = 1; dia <= diasMes; dia++) { // Agrega cada día del mes al calendario, marcando los días que tienen partidos programados */
        const fechaTexto = `${año}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

        const hayPartido = partidosCalendario.find(p => p.fecha === fechaTexto);

        const descripcionDia = `${dia} de ${meses[mes]} de ${año}${hayPartido ? ", tiene partidos" : ", sin partidos"}`;

        html += `
            <button type="button"
                    class="dia-calendario ${hayPartido ? "partido-dia" : ""}"
                    onclick="mostrarDetalle('${fechaTexto}')"
                    aria-label="${descripcionDia}">
                ${dia}
            </button>`;
    }

    calendario.innerHTML = html;
}
function cambiarMes(direccion) { // Esta función cambia el mes que se muestra en el calendario, sumando o restando un mes a la fecha actual y regenerando el calendario */
    fechaVista.setMonth(fechaVista.getMonth() + direccion);
    generarCalendario();
}
function mostrarDetalle(fecha) { // Muestra los partidos del día con el mismo diseño que Próximos Partidos
    const detalle = document.getElementById("detallePartido");
    const jornadas = partidosCalendario.filter(jornada => jornada.fecha === fecha);

    if (jornadas.length === 0) {
        detalle.innerHTML = `<p>No hay partidos este día.</p>`;
        return;
    }

    const fechaObjeto = new Date(fecha + "T00:00:00");
    const fechaTexto = fechaObjeto.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long"
    });

    let html = `<div class="lista-partidos">`;

    jornadas.forEach(jornada => {
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

        html += `</div>`;
    });

    html += `</div>`;
    detalle.innerHTML = html;

    detalle.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}
