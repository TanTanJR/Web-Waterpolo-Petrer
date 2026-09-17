/*
 * Carga los partidos publicados por la directiva desde Supabase.
 * Si la conexión falla, la web conserva los datos locales de datos/partidos.js.
 */

let partidosSupabaseCargados = false;
let cargaPartidosSupabase;

function agruparPartidosPublicos(filas) {
    const jornadas = new Map();

    filas.forEach(partido => {
        const clave = `${partido.fecha}|${partido.ubicacion}`;

        if (!jornadas.has(clave)) {
            jornadas.set(clave, {
                fecha: partido.fecha,
                ubicacion: partido.ubicacion,
                partidos: []
            });
        }

        jornadas.get(clave).partidos.push({
            hora: partido.hora.slice(0, 5),
            categoria: partido.categoria,
            rival: partido.rival
        });
    });

    return Array.from(jornadas.values());
}

async function cargarPartidosPublicos() {
    if (partidosSupabaseCargados) return;

    if (!cargaPartidosSupabase) {
        cargaPartidosSupabase = (async () => {
            const respuestaConfiguracion = await fetch("/api/configuracion-supabase");
            const configuracion = await respuestaConfiguracion.json();

            if (!respuestaConfiguracion.ok) {
                throw new Error(configuracion.error || "No se pudo cargar la configuración.");
            }

            const urlBase = configuracion.url.replace(/\/$/, "");
            const consulta = new URL(`${urlBase}/rest/v1/waterpolo_partidos`);
            consulta.searchParams.set(
                "select",
                "fecha,hora,categoria,rival,ubicacion"
            );
            consulta.searchParams.set("activo", "eq.true");
            consulta.searchParams.set("order", "fecha.asc,hora.asc");

            const respuestaPartidos = await fetch(consulta, {
                headers: {
                    apikey: configuracion.clavePublica,
                    Authorization: `Bearer ${configuracion.clavePublica}`
                }
            });

            if (!respuestaPartidos.ok) {
                throw new Error("No se pudieron cargar los partidos publicados.");
            }

            const filas = await respuestaPartidos.json();
            const jornadasSupabase = agruparPartidosPublicos(filas);

            /*
             * Supabase es la fuente del panel de administración. Los datos locales
             * se mantienen como respaldo para que la web no quede vacía si falla.
             */
            if (jornadasSupabase.length > 0) {
                partidosCalendario.splice(
                    0,
                    partidosCalendario.length,
                    ...jornadasSupabase
                );
            }

            partidosSupabaseCargados = true;
        })().catch(error => {
            cargaPartidosSupabase = null;
            console.error("Se usarán los partidos locales:", error);
        });
    }

    await cargaPartidosSupabase;
}
