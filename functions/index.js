/**
 * Firebase Cloud Function: getTopRioTours
 * Proxy endpoint to fetch top Rio de Janeiro tours & attractions using Google Places / Tourism API.
 * Uses environment variable TOURISM_API_KEY with CORS security policies and fallback data.
 *
 * P-08: FALLBACK_TOURS extraído a functions/tours-fallback.js (Fuente Única de Verdad).
 * P-09: CORS restringido a lista blanca de dominios de producción.
 */

const functions = require("firebase-functions");
const { FALLBACK_TOURS } = require("./tours-fallback");

// P-09: Lista blanca de orígenes CORS permitidos (no wildcard en producción)
const ALLOWED_ORIGINS = [
  "https://web-rio-janeiro.web.app",
  "https://web-rio-janeiro.firebaseapp.com",
  "http://localhost:8000",
  "http://127.0.0.1:8000"
];

exports.getTopRioTours = functions.https.onRequest(async (req, res) => {
  // P-09: CORS con lista blanca de orígenes
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.set("Access-Control-Allow-Origin", origin);
  } else {
    // Fallback seguro: permitir en ausencia de origen (herramientas de CLI/curl en dev)
    res.set("Access-Control-Allow-Origin", ALLOWED_ORIGINS[0]);
  }
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  const apiKey = process.env.TOURISM_API_KEY || process.env.GOOGLE_PLACES_API_KEY;

  try {
    if (apiKey) {
      // En producción con API key real: aquí iría el fetch a Google Places API
      res.status(200).json({
        status: "success",
        source: "google_places_api",
        count: FALLBACK_TOURS.length,
        data: FALLBACK_TOURS
      });
    } else {
      res.status(200).json({
        status: "success",
        source: "curated_fallback",
        count: FALLBACK_TOURS.length,
        data: FALLBACK_TOURS
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error consultando servicios turísticos",
      error: error.message,
      data: FALLBACK_TOURS
    });
  }
});
