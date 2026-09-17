export default function handler(peticion, respuesta) {
  if (peticion.method !== "GET") {
    respuesta.setHeader("Allow", "GET");
    return respuesta.status(405).json({ error: "Método no permitido." });
  }

  const url = process.env.SUPABASE_URL;
  const clavePublica = process.env.SUPABASE_ANON_KEY;

  if (!url || !clavePublica) {
    return respuesta.status(500).json({
      error: "Falta configurar la conexión pública de Supabase en Vercel.",
    });
  }

  respuesta.setHeader("Cache-Control", "no-store");
  return respuesta.status(200).json({ url, clavePublica });
}
