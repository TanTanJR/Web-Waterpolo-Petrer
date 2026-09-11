/*
 * Datos de los partidos del Club Waterpolo Petrer.
 *
 * Para añadir una jornada, copia uno de los objetos y modifica:
 * - fecha: formato AAAA-MM-DD
 * - ubicacion: nombre de la piscina o ciudad
 * - partidos: hora, categoria y rival de cada encuentro
 */

const partidosCalendario = [ // Aquí se pueden agregar más partidos con su fecha, ubicación y detalles */
    {
        fecha: "2026-04-18",
        ubicacion: "Piscina San Fernando, Petrer",
        partidos: [
            { hora: "14:00", categoria: "Alevín B", rival: "CW Turia" },
            { hora: "14:00", categoria: "Alevín A", rival: "CW Turia" },
            { hora: "14:45", categoria: "Infantil", rival: "CW Turia" },
            { hora: "15:45", categoria: "Juvenil", rival: "CW Turia" },
            { hora: "16:45", categoria: "Infantil", rival: "CW Turia" },
            { hora: "17:45", categoria: "Abs Femenino", rival: "CW Turia" },
            { hora: "18:45", categoria: "Abs Masculino A", rival: "CW Turia" }
        ]
    },
    {
        fecha: "2026-04-19",
        ubicacion: "Piscina San Fernando, Petrer",
        partidos: [
            { hora: "09:00", categoria: "Alevín A", rival: "CN Godella" },
            { hora: "09:45", categoria: "Infantil", rival: "CN Godella" },
            { hora: "10:45", categoria: "Juvenil", rival: "CN Godella" },  
            { hora: "11:45", categoria: "Abs Femenino", rival: "CN Godella" },
            { hora: "12:45", categoria: "Abs Masculino A", rival: "CN Godella" }
        ]
    },
    {
       fecha: "2026-04-19",
        ubicacion: "Valencia",
        partidos: [
            { hora: "16:00", categoria: "Alevín B", rival: "Rari Nantes" },
            { hora: "16:45", categoria: "Abs Masculino B", rival: "Rari Nantes" }
        ]
    },
    {
        fecha: "2026-10-03",
        ubicacion: "Piscina San Fernando, Petrer",
        partidos: [
            { hora: "09:00", categoria: "Alevín A", rival: "CN Godella" },
            { hora: "09:45", categoria: "Infantil", rival: "CN Godella" },
            { hora: "10:45", categoria: "Juvenil", rival: "CN Godella" },  
            { hora: "11:45", categoria: "Abs Femenino", rival: "CN Godella" },
            { hora: "12:45", categoria: "Abs Masculino A", rival: "CN Godella" }
        ]
    },

];

