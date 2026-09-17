let clienteSupabase;
let partidos = [];
let fotografias = [];
let productos = [];

const BUCKET = "waterpolo-media";

function textoSeguro(valor = "") {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function mostrarEstado(id, mensaje, tipo = "") {
  const elemento = document.getElementById(id);
  elemento.className = `estado ${tipo}`.trim();
  elemento.textContent = mensaje;
}

async function crearClienteSupabase() {
  const respuesta = await fetch("/api/configuracion-supabase");
  const configuracion = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(configuracion.error || "No se pudo cargar la configuración.");
  }

  return window.supabase.createClient(
    configuracion.url,
    configuracion.clavePublica,
  );
}

async function comprobarAcceso() {
  const { data: sesion } = await clienteSupabase.auth.getSession();

  if (!sesion.session) {
    window.location.replace("login.html");
    return false;
  }

  const { data, error } = await clienteSupabase
    .from("waterpolo_admins")
    .select("user_id")
    .eq("user_id", sesion.session.user.id)
    .maybeSingle();

  if (error || !data) {
    await clienteSupabase.auth.signOut();
    window.location.replace("login.html");
    return false;
  }

  return true;
}

function urlPublica(path) {
  if (!path) return "";
  return clienteSupabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

function extensionArchivo(nombre) {
  const partes = nombre.toLowerCase().split(".");
  const extension = partes.length > 1 ? partes.pop() : "jpg";
  return ["jpg", "jpeg", "png", "webp"].includes(extension) ? extension : "jpg";
}

async function subirArchivo(archivo, carpeta) {
  const path = `${carpeta}/${crypto.randomUUID()}.${extensionArchivo(archivo.name)}`;
  const { error } = await clienteSupabase.storage
    .from(BUCKET)
    .upload(path, archivo, { cacheControl: "3600", upsert: false });

  if (error) throw error;
  return path;
}

async function eliminarArchivos(paths = []) {
  const validos = paths.filter(Boolean);
  if (validos.length === 0) return;

  const { error } = await clienteSupabase.storage.from(BUCKET).remove(validos);
  if (error) throw error;
}

function activarSeccion(nombre) {
  document.querySelectorAll(".seccion-admin").forEach((seccion) => {
    seccion.hidden = seccion.id !== `seccion-${nombre}`;
  });

  document.querySelectorAll(".admin-navegacion button[data-seccion]").forEach((boton) => {
    boton.classList.toggle("activo", boton.dataset.seccion === nombre);
  });
}

document.querySelector(".admin-navegacion").addEventListener("click", (evento) => {
  const boton = evento.target.closest("button[data-seccion]");
  if (boton) activarSeccion(boton.dataset.seccion);
});

document.getElementById("cerrar-sesion").addEventListener("click", async () => {
  await clienteSupabase.auth.signOut();
  window.location.replace("login.html");
});

// PARTIDOS
async function cargarPartidos() {
  const { data, error } = await clienteSupabase
    .from("waterpolo_partidos")
    .select("*")
    .order("fecha", { ascending: true })
    .order("hora", { ascending: true });

  if (error) throw error;
  partidos = data || [];
  renderPartidos();
}

function renderPartidos() {
  const lista = document.getElementById("lista-partidos");

  if (partidos.length === 0) {
    lista.innerHTML = '<p class="sin-contenido">Todavía no hay partidos guardados.</p>';
    return;
  }

  lista.innerHTML = partidos.map((partido) => `
    <article class="item-admin">
      <div><strong>${textoSeguro(partido.hora.slice(0, 5))}</strong></div>
      <div>
        <h3>${textoSeguro(partido.categoria)} · CW Petrer vs ${textoSeguro(partido.rival)}</h3>
        <p>${textoSeguro(partido.fecha)} · ${textoSeguro(partido.ubicacion)}</p>
        <small>${partido.activo ? "Publicado" : "Oculto"}</small>
      </div>
      <div class="item-acciones">
        <button class="boton boton-pequeno" type="button" data-editar-partido="${partido.id}">Editar</button>
        <button class="boton boton-peligro boton-pequeno" type="button" data-eliminar-partido="${partido.id}">Eliminar</button>
      </div>
    </article>
  `).join("");
}

function limpiarPartido() {
  document.getElementById("form-partido").reset();
  document.getElementById("partido-id").value = "";
  document.getElementById("cancelar-partido").hidden = true;
}

document.getElementById("form-partido").addEventListener("submit", async (evento) => {
  evento.preventDefault();
  const id = document.getElementById("partido-id").value;
  const payload = {
    fecha: document.getElementById("partido-fecha").value,
    hora: document.getElementById("partido-hora").value,
    categoria: document.getElementById("partido-categoria").value.trim(),
    rival: document.getElementById("partido-rival").value.trim(),
    ubicacion: document.getElementById("partido-ubicacion").value.trim(),
    activo: document.getElementById("partido-activo").value === "true",
  };

  mostrarEstado("estado-partidos", "Guardando…");

  const consulta = id
    ? clienteSupabase.from("waterpolo_partidos").update(payload).eq("id", id)
    : clienteSupabase.from("waterpolo_partidos").insert(payload);

  const { error } = await consulta;

  if (error) {
    mostrarEstado("estado-partidos", error.message, "error");
    return;
  }

  limpiarPartido();
  await cargarPartidos();
  mostrarEstado("estado-partidos", "Partido guardado correctamente.", "exito");
});

document.getElementById("cancelar-partido").addEventListener("click", limpiarPartido);

document.getElementById("lista-partidos").addEventListener("click", async (evento) => {
  const editar = evento.target.closest("[data-editar-partido]");
  const eliminar = evento.target.closest("[data-eliminar-partido]");

  if (editar) {
    const partido = partidos.find((item) => item.id === editar.dataset.editarPartido);
    if (!partido) return;

    document.getElementById("partido-id").value = partido.id;
    document.getElementById("partido-fecha").value = partido.fecha;
    document.getElementById("partido-hora").value = partido.hora.slice(0, 5);
    document.getElementById("partido-categoria").value = partido.categoria;
    document.getElementById("partido-rival").value = partido.rival;
    document.getElementById("partido-ubicacion").value = partido.ubicacion;
    document.getElementById("partido-activo").value = String(partido.activo);
    document.getElementById("cancelar-partido").hidden = false;
    document.getElementById("form-partido").scrollIntoView({ behavior: "smooth" });
  }

  if (eliminar && confirm("¿Quieres eliminar este partido?")) {
    const { error } = await clienteSupabase
      .from("waterpolo_partidos")
      .delete()
      .eq("id", eliminar.dataset.eliminarPartido);

    if (error) mostrarEstado("estado-partidos", error.message, "error");
    else {
      await cargarPartidos();
      mostrarEstado("estado-partidos", "Partido eliminado.", "exito");
    }
  }
});

// GALERÍA
async function cargarGaleria() {
  const { data, error } = await clienteSupabase
    .from("waterpolo_galeria")
    .select("*")
    .order("orden", { ascending: true })
    .order("creado_en", { ascending: false });

  if (error) throw error;
  fotografias = data || [];
  renderGaleria();
}

function renderGaleria() {
  const lista = document.getElementById("lista-galeria");

  if (fotografias.length === 0) {
    lista.innerHTML = '<p class="sin-contenido">Todavía no hay fotografías subidas.</p>';
    return;
  }

  lista.innerHTML = fotografias.map((foto) => `
    <article class="item-admin">
      <img src="${textoSeguro(urlPublica(foto.imagen_path))}" alt="">
      <div>
        <h3>${textoSeguro(foto.titulo || "Fotografía sin título")}</h3>
        <p>${textoSeguro(foto.texto_alternativo)}</p>
        <small>${foto.activo ? "Publicada" : "Oculta"}</small>
      </div>
      <div class="item-acciones">
        <button class="boton boton-pequeno" type="button" data-editar-foto="${foto.id}">Editar</button>
        <button class="boton boton-peligro boton-pequeno" type="button" data-eliminar-foto="${foto.id}">Eliminar</button>
      </div>
    </article>
  `).join("");
}

function limpiarGaleria() {
  document.getElementById("form-galeria").reset();
  document.getElementById("galeria-id").value = "";
  document.getElementById("cancelar-galeria").hidden = true;
}

document.getElementById("form-galeria").addEventListener("submit", async (evento) => {
  evento.preventDefault();
  const id = document.getElementById("galeria-id").value;
  const anterior = fotografias.find((foto) => foto.id === id);
  const archivo = document.getElementById("galeria-imagen").files[0];

  if (!id && !archivo) {
    mostrarEstado("estado-galeria", "Selecciona una imagen.", "error");
    return;
  }

  mostrarEstado("estado-galeria", "Subiendo y guardando…");

  let nuevoPath = anterior?.imagen_path || "";

  try {
    if (archivo) nuevoPath = await subirArchivo(archivo, "galeria");

    const payload = {
      titulo: document.getElementById("galeria-titulo").value.trim() || null,
      descripcion: document.getElementById("galeria-descripcion").value.trim() || null,
      texto_alternativo: document.getElementById("galeria-alt").value.trim(),
      imagen_path: nuevoPath,
      activo: document.getElementById("galeria-activo").value === "true",
    };

    const consulta = id
      ? clienteSupabase.from("waterpolo_galeria").update(payload).eq("id", id)
      : clienteSupabase.from("waterpolo_galeria").insert(payload);

    const { error } = await consulta;
    if (error) throw error;

    if (archivo && anterior?.imagen_path) {
      await eliminarArchivos([anterior.imagen_path]);
    }

    limpiarGaleria();
    await cargarGaleria();
    mostrarEstado("estado-galeria", "Fotografía guardada correctamente.", "exito");
  } catch (error) {
    if (archivo && nuevoPath !== anterior?.imagen_path) {
      await eliminarArchivos([nuevoPath]).catch(() => {});
    }
    mostrarEstado("estado-galeria", error.message, "error");
  }
});

document.getElementById("cancelar-galeria").addEventListener("click", limpiarGaleria);

document.getElementById("lista-galeria").addEventListener("click", async (evento) => {
  const editar = evento.target.closest("[data-editar-foto]");
  const eliminar = evento.target.closest("[data-eliminar-foto]");

  if (editar) {
    const foto = fotografias.find((item) => item.id === editar.dataset.editarFoto);
    if (!foto) return;

    document.getElementById("galeria-id").value = foto.id;
    document.getElementById("galeria-titulo").value = foto.titulo || "";
    document.getElementById("galeria-descripcion").value = foto.descripcion || "";
    document.getElementById("galeria-alt").value = foto.texto_alternativo;
    document.getElementById("galeria-activo").value = String(foto.activo);
    document.getElementById("cancelar-galeria").hidden = false;
    document.getElementById("form-galeria").scrollIntoView({ behavior: "smooth" });
  }

  if (eliminar && confirm("¿Quieres eliminar esta fotografía?")) {
    const foto = fotografias.find((item) => item.id === eliminar.dataset.eliminarFoto);
    const { error } = await clienteSupabase
      .from("waterpolo_galeria")
      .delete()
      .eq("id", eliminar.dataset.eliminarFoto);

    if (error) mostrarEstado("estado-galeria", error.message, "error");
    else {
      await eliminarArchivos([foto?.imagen_path]).catch(() => {});
      await cargarGaleria();
      mostrarEstado("estado-galeria", "Fotografía eliminada.", "exito");
    }
  }
});

// PRODUCTOS
async function cargarProductos() {
  const { data, error } = await clienteSupabase
    .from("waterpolo_productos")
    .select("*")
    .order("orden", { ascending: true })
    .order("creado_en", { ascending: false });

  if (error) throw error;
  productos = data || [];
  renderProductos();
}

function renderProductos() {
  const lista = document.getElementById("lista-productos");

  if (productos.length === 0) {
    lista.innerHTML = '<p class="sin-contenido">Todavía no hay productos guardados.</p>';
    return;
  }

  lista.innerHTML = productos.map((producto) => `
    <article class="item-admin">
      ${producto.imagen_paths?.[0]
        ? `<img src="${textoSeguro(urlPublica(producto.imagen_paths[0]))}" alt="">`
        : "<div></div>"}
      <div>
        <h3>${textoSeguro(producto.nombre)}</h3>
        <p>${textoSeguro(producto.descripcion || "")}</p>
        <small>${producto.activo ? "Publicado" : "Oculto"} · ${producto.imagen_paths?.length || 0} imagen(es)</small>
      </div>
      <div class="item-acciones">
        <button class="boton boton-pequeno" type="button" data-editar-producto="${producto.id}">Editar</button>
        <button class="boton boton-peligro boton-pequeno" type="button" data-eliminar-producto="${producto.id}">Eliminar</button>
      </div>
    </article>
  `).join("");
}

function limpiarProducto() {
  document.getElementById("form-producto").reset();
  document.getElementById("producto-id").value = "";
  document.getElementById("cancelar-producto").hidden = true;
}

document.getElementById("form-producto").addEventListener("submit", async (evento) => {
  evento.preventDefault();
  const id = document.getElementById("producto-id").value;
  const anterior = productos.find((producto) => producto.id === id);
  const archivos = [...document.getElementById("producto-imagenes").files];

  if (!id && archivos.length === 0) {
    mostrarEstado("estado-productos", "Selecciona al menos una imagen.", "error");
    return;
  }

  mostrarEstado("estado-productos", "Subiendo y guardando…");
  const nuevosPaths = [];

  try {
    for (const archivo of archivos) {
      nuevosPaths.push(await subirArchivo(archivo, "productos"));
    }

    const payload = {
      nombre: document.getElementById("producto-nombre").value.trim(),
      descripcion: document.getElementById("producto-descripcion").value.trim() || null,
      imagen_paths: nuevosPaths.length ? nuevosPaths : (anterior?.imagen_paths || []),
      activo: document.getElementById("producto-activo").value === "true",
    };

    const consulta = id
      ? clienteSupabase.from("waterpolo_productos").update(payload).eq("id", id)
      : clienteSupabase.from("waterpolo_productos").insert(payload);

    const { error } = await consulta;
    if (error) throw error;

    if (nuevosPaths.length && anterior?.imagen_paths?.length) {
      await eliminarArchivos(anterior.imagen_paths);
    }

    limpiarProducto();
    await cargarProductos();
    mostrarEstado("estado-productos", "Producto guardado correctamente.", "exito");
  } catch (error) {
    await eliminarArchivos(nuevosPaths).catch(() => {});
    mostrarEstado("estado-productos", error.message, "error");
  }
});

document.getElementById("cancelar-producto").addEventListener("click", limpiarProducto);

document.getElementById("lista-productos").addEventListener("click", async (evento) => {
  const editar = evento.target.closest("[data-editar-producto]");
  const eliminar = evento.target.closest("[data-eliminar-producto]");

  if (editar) {
    const producto = productos.find((item) => item.id === editar.dataset.editarProducto);
    if (!producto) return;

    document.getElementById("producto-id").value = producto.id;
    document.getElementById("producto-nombre").value = producto.nombre;
    document.getElementById("producto-descripcion").value = producto.descripcion || "";
    document.getElementById("producto-activo").value = String(producto.activo);
    document.getElementById("cancelar-producto").hidden = false;
    document.getElementById("form-producto").scrollIntoView({ behavior: "smooth" });
  }

  if (eliminar && confirm("¿Quieres eliminar este producto?")) {
    const producto = productos.find((item) => item.id === eliminar.dataset.eliminarProducto);
    const { error } = await clienteSupabase
      .from("waterpolo_productos")
      .delete()
      .eq("id", eliminar.dataset.eliminarProducto);

    if (error) mostrarEstado("estado-productos", error.message, "error");
    else {
      await eliminarArchivos(producto?.imagen_paths || []).catch(() => {});
      await cargarProductos();
      mostrarEstado("estado-productos", "Producto eliminado.", "exito");
    }
  }
});

async function iniciarPanel() {
  clienteSupabase = await crearClienteSupabase();
  if (!await comprobarAcceso()) return;

  await Promise.all([
    cargarPartidos(),
    cargarGaleria(),
    cargarProductos(),
  ]);
}

iniciarPanel().catch((error) => {
  alert("No se pudo iniciar el panel: " + error.message);
});
