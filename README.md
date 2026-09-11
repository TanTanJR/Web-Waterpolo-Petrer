# Club Waterpolo Petrer

Sitio web informativo del **Club Waterpolo Petrer**, desarrollado para presentar el club, sus equipos, horarios, próximos partidos, instalaciones y material oficial.

El proyecto está construido con HTML, CSS y JavaScript, sin frameworks externos. Su diseño se adapta a ordenadores, tabletas y teléfonos móviles.

## Funcionalidades

- Horarios de entrenamiento por día y categoría.
- Información de los equipos del club.
- Próximos partidos obtenidos desde un archivo de datos independiente.
- Calendario mensual interactivo.
- Galería con visor de imágenes, miniaturas y navegación mediante teclado.
- Catálogo de material oficial.
- Ubicación mediante Google Maps.
- Información de contacto y redes sociales.
- Carrusel de patrocinadores.
- Menú y diseño responsive.
- Navegación accesible mediante teclado.

## Tecnologías

- **HTML5:** estructura y contenido de la página.
- **CSS3:** diseño, animaciones y adaptación responsive.
- **JavaScript:** secciones dinámicas, calendario, galería, tienda y menú móvil.
- **Git y GitHub:** control de versiones y almacenamiento del código.
- **Vercel:** vista previa y despliegue del proyecto.

## Estructura del proyecto

```text
Web-Waterpolo-Petrer/
├── datos/
│   └── partidos.js
├── imagenes/
│   ├── contacto/
│   ├── galeria/
│   ├── portada/
│   ├── productos/
│   ├── sidebar/
│   └── sponsors/
├── js/
│   ├── calendario.js
│   ├── lightbox.js
│   ├── menu.js
│   ├── secciones.js
│   └── tienda.js
├── index.css
├── index.html
└── README.md
```

## Ejecutar el proyecto

### Con Visual Studio Code y Live Server

1. Descarga o clona el repositorio.
2. Abre la carpeta del proyecto en Visual Studio Code.
3. Instala la extensión **Live Server**, si todavía no la tienes.
4. Haz clic con el botón derecho sobre `index.html`.
5. Selecciona **Open with Live Server**.

La web se abrirá en una dirección local similar a:

```text
http://127.0.0.1:5500
```

### Clonar con Git

```bash
git clone https://github.com/TanTanJR/Web-Waterpolo-Petrer.git
cd Web-Waterpolo-Petrer
```

## Actualizar los partidos

Los datos están en `datos/partidos.js`. Cada jornada utiliza esta estructura:

```js
{
    fecha: "2026-10-03",
    ubicacion: "Piscina San Fernando, Petrer",
    partidos: [
        {
            hora: "09:00",
            categoria: "Alevín A",
            rival: "Equipo rival"
        }
    ]
}
```

La fecha debe escribirse en formato `AAAA-MM-DD`.

## Contacto del club

- Correo: [waterpolopetrer@hotmail.com](mailto:waterpolopetrer@hotmail.com)
- Instagram: [@waterpolopetrer](https://www.instagram.com/waterpolopetrer/)
- Facebook: [Club Waterpolo Petrer](https://www.facebook.com/CWPetrer)

## Autor

Proyecto desarrollado por **Tristán Vecina** como parte de su aprendizaje en Desarrollo de Aplicaciones Web.
