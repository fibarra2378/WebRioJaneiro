/**
 * WebRioJaneiro - Cloud Function Fallback Dataset
 * Fuente curada de excursiones Top 6 en Río de Janeiro.
 * FUENTE ÚNICA DE VERDAD para la Cloud Function getTopRioTours.
 * El cliente (data.js) hace referencia a este mismo conjunto de datos vía API.
 *
 * Mantener sincronizado con js/data.js > topRioTours si se actualiza localmente.
 */

const FALLBACK_TOURS = [
  {
    id: "tour-01",
    title: "Cristo Redentor & Tren del Corcovado",
    category: "Íconos de Río",
    rating: 4.9,
    reviewsCount: 3840,
    priceBRL: 120,
    priceUSD: 24,
    duration: "3.5 hrs",
    image: "assets/images/christ_redeemer.png",
    badge: "Imprescindible Día 1",
    description: "Acceso prioritario en el histórico Tren del Corcovado hasta la cima del Cristo Redentor con vistas panorámicas 360° de la Bahía de Guanabara.",
    bookingUrl: "https://www.tremdocorcovado.com.br"
  },
  {
    id: "tour-02",
    title: "Teleférico del Pan de Azúcar (Pão de Açúcar)",
    category: "Aventura & Vistas",
    rating: 4.8,
    reviewsCount: 2950,
    priceBRL: 150,
    priceUSD: 30,
    duration: "3 hrs",
    image: "assets/images/copacabana_beach.png",
    badge: "Atardecer Recomendado",
    description: "Ascenso de dos tramos en teleférico panorámico desde Praia Vermelha hacia Morro da Urca y la cumbre del Pan de Azúcar.",
    bookingUrl: "https://boninho.bondinho.com.br/"
  },
  {
    id: "tour-03",
    title: "Escalera de Selarón & Noche Bohemia en Lapa",
    category: "Cultura & Samba",
    rating: 4.7,
    reviewsCount: 1820,
    priceBRL: 0,
    priceUSD: 0,
    duration: "2.5 hrs",
    image: "assets/images/selaron_steps.png",
    badge: "Gratuito / Libre",
    description: "Recorrido a pie por los 215 escalones de azulejos multicolor del artista Jorge Selarón y los icónicos Arcos de Lapa.",
    bookingUrl: "https://visit.rio/que-fazer/escadaria-selaron/"
  },
  {
    id: "tour-04",
    title: "Excursión Día Completo a Arraial do Cabo (Caribe Brasileño)",
    category: "Playas & Barco",
    rating: 4.9,
    reviewsCount: 2100,
    priceBRL: 220,
    priceUSD: 44,
    duration: "12 hrs",
    image: "assets/images/copacabana_posto2.png",
    badge: "Full Day Día 4",
    description: "Navegación en catamarán por las playas de aguas turquesas y arenas blancas cristalinas de As Prainhas do Pontal y Praia do Farol.",
    bookingUrl: "https://visit.rio/"
  },
  {
    id: "tour-05",
    title: "Tour Guiado al Estadio Maracanã",
    category: "Deportes & Historia",
    rating: 4.8,
    reviewsCount: 1450,
    priceBRL: 75,
    priceUSD: 15,
    duration: "2 hrs",
    image: "assets/images/maracana_stadium.png",
    badge: "Día 5 Mítico",
    description: "Visita entre bastidores a los vestuarios, sala de prensa, museo del fútbol y acceso al borde del césped del Templo del Fútbol.",
    bookingUrl: "https://www.tourmaracana.com.br/"
  },
  {
    id: "tour-06",
    title: "Pedra do Sal: Roda de Samba Tradicional",
    category: "Vida Nocturna",
    rating: 4.9,
    reviewsCount: 1680,
    priceBRL: 0,
    priceUSD: 0,
    duration: "4 hrs",
    image: "assets/images/pedra_do_sal_samba.png",
    badge: "Viernes Noche",
    description: "Auténtica rueda de samba al aire libre en la cuna histórica de la cultura afrobrasileña en Saúde, con caipirinhas locales.",
    bookingUrl: "https://visit.rio/"
  }
];

module.exports = { FALLBACK_TOURS };
