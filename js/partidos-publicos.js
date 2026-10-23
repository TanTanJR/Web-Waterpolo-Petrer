/*
 * Carga los partidos publicados por la directiva desde Supabase.
 * Si la conexión falla, la web conserva los datos locales de datos/partidos.js.
 */

let partidosSupabaseCargados = false;
let cargaPartidosSupabase;

function agruparPartidosPublicos(filas) {
    const jornadas = new Map();

    filas.forEach(partido => {
       const clave = `${partido.fecha}|${partido.ubicacion}|${partido.tipo}`;
        if (!jornadas.has(clave)) {
            jornadas.set(clave, {
            fecha: partido.fecha,
            ubicacion: partido.ubicacion,
            tipo: partido.tipo || "casa",
            partidos: []
        }); 
        }

        jornadas.get(clave).partidos.push({
            hora: partido.hora?.slice(0, 5) || "",
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

            let configuracion;

            // Detectamos si estamos trabajando con Live Server.
            const esLocal = ["localhost", "127.0.0.1"]
                .includes(window.location.hostname);

            if (esLocal) {
                // En local utilizamos config.local.js.
                configuracion = window.SUPABASE_CONFIG_LOCAL;

                if (!configuracion?.url || !configuracion?.clavePublica) {
                    throw new Error(
                        "No se ha cargado la configuración local de Supabase."
                    );
                }

            } else {
                // En Vercel utilizamos la función API.
                const respuestaConfiguracion = await fetch(
                    "/api/configuracion-supabase"
                );

                if (!respuestaConfiguracion.ok) {
                    throw new Error(
                        "No se pudo obtener la configuración de Supabase."
                    );
                }

                configuracion = await respuestaConfiguracion.json();
            }

            // Construimos la consulta a Supabase.
            const urlBase = configuracion.url.replace(/\/$/, "");
            const consulta = new URL(
                `${urlBase}/rest/v1/waterpolo_partidos`
            );

            consulta.searchParams.set(
                "select",
                "fecha,hora,categoria,rival,ubicacion,tipo"
            );
            consulta.searchParams.set("activo", "eq.true");
            consulta.searchParams.set(
                "order",
                "fecha.asc,hora.asc"
            );

            // Solicitamos los partidos publicados.
            const respuestaPartidos = await fetch(consulta, {
                headers: {
                    apikey: configuracion.clavePublica,
                    Authorization: `Bearer ${configuracion.clavePublica}`
                }
            });

            if (!respuestaPartidos.ok) {
                const detalle = await respuestaPartidos.text();
                throw new Error(
                    `Error de Supabase (${respuestaPartidos.status}): ${detalle}`
                );
            }

            const filas = await respuestaPartidos.json();

            console.log(
                "Partidos recibidos desde Supabase:",
                filas.length
            );

            const jornadasSupabase = agruparPartidosPublicos(filas);

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
            console.error(
                "Error al cargar los partidos de Supabase:",
                error
            );
        });
    }

    await cargaPartidosSupabase;
}
