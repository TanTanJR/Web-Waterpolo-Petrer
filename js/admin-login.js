const formularioLogin = document.querySelector("#form-login");
const estadoLogin = document.querySelector("#estado-login");
const botonLogin = formularioLogin.querySelector('button[type="submit"]');

let clienteSupabase;

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

async function esAdminWaterpolo(userId) {
  const { data, error } = await clienteSupabase
    .from("waterpolo_admins")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return Boolean(data);
}

async function prepararLogin() {
  clienteSupabase = await crearClienteSupabase();
  const { data } = await clienteSupabase.auth.getSession();

  if (data.session && await esAdminWaterpolo(data.session.user.id)) {
    window.location.replace("index.html");
  }
}

formularioLogin.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  botonLogin.disabled = true;
  estadoLogin.className = "estado";
  estadoLogin.textContent = "Comprobando los datos…";

  const email = document.querySelector("#email-admin").value.trim();
  const password = document.querySelector("#password-admin").value;

  try {
    const { data, error } = await clienteSupabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error("El correo o la contraseña no son correctos.");

    if (!await esAdminWaterpolo(data.user.id)) {
      await clienteSupabase.auth.signOut();
      throw new Error("Este usuario no pertenece a la directiva autorizada.");
    }

    estadoLogin.className = "estado exito";
    estadoLogin.textContent = "Acceso correcto.";
    window.location.replace("index.html");
  } catch (error) {
    estadoLogin.className = "estado error";
    estadoLogin.textContent = error.message;
    botonLogin.disabled = false;
  }
});

prepararLogin().catch((error) => {
  estadoLogin.className = "estado error";
  estadoLogin.textContent = error.message;
  botonLogin.disabled = true;
});
