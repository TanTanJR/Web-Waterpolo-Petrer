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


