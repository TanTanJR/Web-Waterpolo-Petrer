function mostrarSeccion(seccion){
    const contenido = document.getElementById("contenido");
    if(seccion === "horarios"){
    contenido.innerHTML = `
        <h2>Horarios</h2>

        <div class="dias">
            <div class="dia"><b>Lunes </b><br> Alevín / Infantil → 19:30 - 21:00 <br>Juvenil / Asoluto Masc / Absoluto Fem → 21:30 - 23:30</div>

            <div class="dia"><b>Martes</b> <br>Pre-Benjamin / Benjamín / Alevin B → 19:00 - 20:00 
            <br>Alevín / Infantil → 20:00 - 21:30</div>
            
            <div class="dia"><b>Miercoles</b><br> Alevín / Infantil → 19:00 - 20:30 <br>Juvenil / Asoluto Masc / Absoluto Fem → 21:30 - 23:30</div>

           <div class="dia"><b>Jueves</b><br>Pre-benjamín / Benjamín / Alevin B → 19:00 - 20:00
            <br> Alevín / Infantil → 19:00 - 20:30 <br>Juvenil / Asoluto Masc / Absoluto Fem → 21:30 - 23:30</div>

           <div class="dia"><b>Viernes</b><br>Pre-benjamín / Benjamín / Alevin / Infantil→ 19:30 - 21:00
           <br>Juvenil / Asoluto Masc / Absoluto Fem → 20:30 - 22:30</div>

          
        </div>
    `;
    }

    if (seccion === "equipos") {
        contenido.innerHTML = `<h2>Equipos</h2>
    
        <div class="equipos">
            <div>- Pre-Benjamin 2018 - 2019</div>
            <div>- Benjamín 2016 - 2017</div>
            <div>- Alevin 2014 - 2015</div>
            <div>- Infantil 2012 - 2013</div>
            <div>- Juvenil</div>
            <div>- Absoluto Femenino</div>
            <div>- Absoluto Masculino B</div>
            <div>- Absoluto Masculino A</div>
        </div>
        
        `;
    }

    if (seccion === "galeria") {

        let html = "<h2>Galería</h2><div class='galeria'>";

        listaImagenes = ["foto1.jpg", "foto2.jpg","foto3.jpg", "foto4.jpg", "foto5.jpg"];

        listaImagenes.forEach((img, index) => {
            html += `<img src="imagenes/galeria/${img}" onclick="abrirImagen(${index})">`;
        });

        html += "</div>";

        contenido.innerHTML = html;
    }

    if (seccion === "partidos") {
        contenido.innerHTML = `<h2>Próximos Partidos</h2>
        <div class="partidos">
        <div>¡Sábado 28 febrero!<br>CW Petrer VS CW Morvedre</div>
        <div>Horarios:</div>
        <ul>
            <li>14:00 - Juvenil</li>
            <li>15:00 - Alevin</li>
            <li>16:00 - Absoluto</li>
            <li>17:15 - Infantil </li>
        </ul>
        </div>`;
    }

    if (seccion === "contacto") {
        contenido.innerHTML = `<h2>Contacto</h2>
        
        <div class="contacto">
        <ul>
        <li>Email: club@waterpolo.com</li>
        <li>Teléfono: 625141778 - 667455600</li>
        <li>Nuestro → <a href="https://www.instagram.com/waterpolopetrer/" target="_blank" class="btn-instagram">
        📸 Instagram
    </a></li>
        

        </ul>
        </div>
        `;
    }

    if(seccion === "ubicacion"){
        contenido.innerHTML = `<h2>Ubicación</h2>
        <div class="ubicacion">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d464.23849067849403!2d-0.7774816203496921!3d38.487368246593235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63dacc1e0f63bf%3A0x1ec272fa486c487d!2sPiscina%20cubierta%20de%20San%20Fernando!5e0!3m2!1ses!2ses!4v1774895710142!5m2!1ses!2ses" width="800" height="450" style="border:0; border-radius: 15px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div> `;
    }
}

    function cerrarImagen(){
        document.getElementById("lightbox").style.display = "none";
      
    }

function actualizarContador(){
    document.getElementById("contador").innerText = 
        (imagenActual + 1) + " / " + listaImagenes.length;
}

function abrirImagen(index){
    imagenActual = index;

    const lightbox = document.getElementById("lightbox");
    const imagen = document.getElementById("imagenGrande");

    imagen.src = "imagenes/galeria/" + listaImagenes[imagenActual];
    lightbox.style.display = "flex";

   

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

function actualizarMiniaturas(){
    const minis = document.querySelectorAll(".miniaturas img");

    minis.forEach((img, i) => {
        if(i === imagenActual){
            img.classList.add("activa");
        } else {
            img.classList.remove("activa");
        }
    });
}

function cambiarImagen(direccion){

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

document.addEventListener("keydown", function(e){

    const lightbox = document.getElementById("lightbox");

    if (lightbox.style.display === "flex") {

        if (e.key === "ArrowRight") cambiarImagen(1);
        if (e.key === "ArrowLeft") cambiarImagen(-1);
        if (e.key === "Escape") cerrarImagen();
    }
});


