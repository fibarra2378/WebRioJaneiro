/**
 * WebRioJaneiro - Base de Datos Oficial del Viaje
 * Basada fielmente en el PDF: "Itinerario Enriquecido: Río de Janeiro - 4 Amigos (Agosto 2026)"
 */

const TRIP_DATA = {
  generalInfo: {
    title: "Río de Janeiro - 4 Amigos",
    date: "Agosto 2026 (Miércoles 12 al Lunes 17)",
    baseOfOperations: {
      address: "Rua Ministro Viveiros de Castro, 75 ap 901 - Copacabana, Posto 2",
      coordinates: [-22.9644, -43.1762],
      description: "Departamento base ubicado a solo 2 cuadras de la playa de Copacabana (Posto 2) y a 1 cuadra de la Praça do Lido.",
      nearbyServices: [
        {
          name: "Supermercados Zona Sul",
          address: "Av. Prado Júnior, 281 (a menos de 2 cuadras)",
          type: "Supermercado Premium",
          desc: "Excelente para comprar cervezas frías, fiambres, panes y comida lista para calentar."
        },
        {
          name: "Supermercado Pão de Açúcar",
          address: "Av. Nossa Sra. de Copacabana, 109 (a 2 cuadras)",
          type: "Supermercado Grande",
          desc: "Ideal para compras pesadas (agua mineral, packs de cerveza, snacks y provisiones)."
        },
        {
          name: "Estación Bike Itaú",
          address: "Praça do Lido (a 1 cuadra)",
          type: "Bicicletas Públicas",
          price: "R$ 3.99 (1 Viaje) • R$ 13.90 (Pase Diario)",
          url: "https://bikeitau.com.br/rio/",
          desc: "Bicisenda costera directa para pedalear por Copacabana, Ipanema y Leblon. Descarga la App Bike Itaú para desbloquear."
        },
        {
          name: "Guarda de Equipaje (Bounce / LuggageHero)",
          address: "Cerca de Rua Ministro Viveiros de Castro",
          type: "Consigna de Mochilas",
          desc: "Servicio de guardado por ~$5 USD/día para el último día tras dejar el departamento.",
          url: "#luggage-storage",
          btnText: "Ver Consignas (Bounce / LuggageHero)"
        }
      ]
    },
    weather: "Suave y seco (18°C - 26°C). Clima ideal para caminar y realizar actividades al aire libre.",
    groupSize: 4
  },

  itineraryDays: [
    {
      dayId: 1,
      date: "Miércoles 12 de Agosto",
      title: "Día 1: Centro, Ícono y Copacabana",
      badge: "Día de Llegada e Íconos",
      heroImage: "assets/images/christ_redeemer.png",
      schedule: [
        {
          time: "05:00 - 08:00",
          activity: "Llegada y Desayuno en el Centro Histórico",
          logistics: "Tomar Uber directo desde el Aeropuerto Internacional (GIG) al Centro Histórico (aprox. 30-40 mins).",
          details: "Desayuno en una 'Padaria' carioca auténtica y económica. Recomendación: Padaria e Confeitaria Lider (Rua da Carioca) o cafés cercanos a la estación Cinelândia.",
          menuRecommendation: "Pão na chapa com queijo minas, suco de laranja natural y café com leite."
        },
        {
          time: "08:00 - 10:30",
          activity: "Visita al Cristo Redentor (Trem do Corcovado)",
          logistics: "Uber desde el Centro hasta la estación Cosme Velho.",
          details: "La boletería abre a las 07:30 am y el primer tren sube a las 08:00 am en punto. ¡Comprar boletos online con antelación para asegurar el horario!",
          url: "https://www.tremdocorcovado.com.br"
        },
        {
          time: "10:30 - 13:30",
          activity: "Recorrido por Centro, Lapa y Escalera de Selarón",
          logistics: "Caminata desde Cosme Velho / Lapa hacia los Arcos de Lapa y Escadaria Selarón.",
          details: "Almuerzo estilo 'Comida a Quilo' (buffet por peso): Restaurante Ximenes en Lapa o Lapa 40 Graus. Carnes asadas y guarniciones frescas a precio muy accesible."
        },
        {
          time: "14:00 - 16:00",
          activity: "Check-in en el Depto y Compras de Supermercado",
          logistics: "Llegada a Rua Ministro Viveiros de Castro, 75 (Copacabana, Posto 2).",
          details: "Abastecimiento en Zona Sul (Av. Prado Júnior 281) para cervezas frías y fiambres, y Pão de Açúcar (Av. Nossa Sra. de Copacabana 109) para compras pesadas de agua y snacks."
        },
        {
          time: "16:00 en adelante",
          activity: "Tarde y Cena Frente al Mar en Copacabana",
          logistics: "Cruzar a la playa en el Posto 2 de Copacabana.",
          details: "Cena en los animados 'Quiosques' de la costanera sobre el empedrado en ondas (Espaço Atlântico o Chopp Brahma).",
          menuRecommendation: "Primera Caipirinha tradicional frente al mar acompañada de crujientes pastéis de camarón o queso."
        }
      ]
    },
    {
      dayId: 2,
      date: "Jueves 13 de Agosto",
      title: "Día 2: Fútbol, Playas y Lapa",
      badge: "Fútbol y Noche Bohemia",
      heroImage: "assets/images/maracana.png",
      alternatives: [
        {
          section: "Mañana | El Templo del Fútbol",
          options: [
            {
              name: "Alternativa 1: Visita por cuenta propia a Maracaná + Quinta da Boa Vista",
              details: "Tomar Metro en Estación Cardeal Arcoverde directo a estación Maracanã. Tour por vestuarios, sala de prensa y césped mítico. Al salir, cruzar a la Quinta da Boa Vista (Parque Imperial y Bioparque de Río).",
              advantage: "Manejan sus propios tiempos. (Revisar calendario por si hay partido)."
            },
            {
              name: "Alternativa 2: City Tour Guiado",
              details: "Contratar tour con recogida en el depto a las 8:30 am. Incluye exterior/interior de Maracaná, Sambódromo, Catedral Metropolitana y Pan de Azúcar.",
              advantage: "Sin preocupación por transporte, ideal para ver mucho en poco tiempo."
            }
          ]
        },
        {
          section: "Tarde | Playas",
          options: [
            {
              name: "Alternativa 1: Clásico Copacabana e Ipanema",
              details: "Caminar desde el depto a la derecha bordeando la costanera hasta Ipanema. Mucho ambiente, voleibol de playa y cultura carioca."
            },
            {
              name: "Alternativa 2: Playa Vermelha y Trekking Morro da Urca (Recomendada)",
              details: "Uber corto a Praia Vermelha (bahía tranquila). Trekking opcional de 40 mins por la selva hasta la cima del Morro da Urca con vistas espectaculares gratuitas."
            }
          ]
        }
      ],
      schedule: [
        {
          time: "Noche (20:00 en adelante)",
          activity: "Recorrido Nocturno por los Arcos de Lapa",
          logistics: "Uber hacia el barrio de Lapa.",
          details: "Opciones de vida nocturna: Bar da Cachaça (establecimiento al aire libre ideal para aperitivos y cerveza) o Carioca da Gema (samba en vivo de alta calidad cultural)."
        }
      ]
    },
    {
      dayId: 3,
      date: "Viernes 14 de Agosto",
      title: "Día 3: Bicis, Playa y Samba de Raíz",
      badge: "Ciclismo y Samba Imperial",
      heroImage: "assets/images/pedra_do_sal.png",
      schedule: [
        {
          time: "Mañana (09:00 - 12:00)",
          activity: "Paseo en Bicicletas Públicas (Bike Itaú)",
          logistics: "Descargar la App Bike Itaú. Estación a 1 cuadra en Praça do Lido.",
          details: "Pedalear por la bicisenda costera bordeando Copacabana, Ipanema y llegar hasta Leblon. Recorrido plano, seguro e inolvidable."
        },
        {
          time: "Tarde (13:00 - 18:00)",
          activity: "Playa a Elección",
          logistics: "Paseo relajado por la costa.",
          details: "Realizar la alternativa de playa que no eligieron el Día 2 (Praia Vermelha/Urca o Ipanema)."
        },
        {
          time: "Noche (19:30 en adelante)",
          activity: "Pedra do Sal - Rueda de Samba de Raíz (Imprescindible)",
          logistics: "Tip de seguridad: Uber exacto hacia 'Largo de São Francisco da Prainha' y caminar 100 metros a Pedra do Sal.",
          details: "El evento callejero más auténtico de Río en el barrio histórico de Saúde. Músicos sentados alrededor de una mesa central rodeados de ambiente festivo y puestos de cerveza callejeros."
        }
      ]
    },
    {
      dayId: 4,
      date: "Sábado 15 de Agosto",
      title: "Día 4: Santa Teresa y Atardecer en Arpoador",
      badge: "Feijoada y Atardecer Dorado",
      heroImage: "assets/images/arpoador.png",
      schedule: [
        {
          time: "Mañana (10:00 - 14:00)",
          activity: "Recorrido por el Barrio Bohemio de Santa Teresa",
          logistics: "Uber hasta Santa Teresa.",
          details: "Calles empedradas, arte callejero y visita al Parque das Ruínas. Almuerzo imperdible en Bar do Mineiro (famosa Feijoada tradicional brasileña). Llegar temprano (12:30)."
        },
        {
          time: "Tarde (15:30 - 18:30)",
          activity: "Playa en Ipanema y Atardecer en Roca de Arpoador",
          logistics: "Playa en Posto 8 o 9 de Ipanema.",
          details: "A las 17:00 hs, caminar hasta las rocas de Arpoador para presenciar el ritual carioca de aplaudir la caída del sol detrás de los Morros Dois Irmãos."
        },
        {
          time: "Noche (20:00 en adelante)",
          activity: "Despedida Nocturna en la Arena de Copacabana",
          logistics: "Paseo por el calçadão cerca del depto (Posto 2 / Leme).",
          details: "Cena en quioscos de arena pidiendo porciones de 'Isca de peixe' (pescado frito) o 'Carne de sol com aipim' (yuca) acompañadas de rondas de cerveza Skol/Brahma helada."
        }
      ]
    },
    {
      dayId: 5,
      date: "Domingo 16 de Agosto",
      title: "Día 5: Leme, Relax y Despedida (Con Mochilas)",
      badge: "Leme y Vuelo de Regreso",
      heroImage: "assets/images/copacabana.png",
      schedule: [
        {
          time: "Mañana (10:00 AM)",
          activity: "Check-out y Consigna de Equipaje",
          logistics: "Usar apps como Bounce o LuggageHero cerca de Rua Ministro Viveiros de Castro.",
          details: "Dejar mochilas en hoteles/tiendas verificadas por ~$5 USD al día con seguro incluido para disfrutar sin peso el último día."
        },
        {
          time: "Día Completo (11:00 AM - 20:00 PM)",
          activity: "Leme y Día de Relax Total",
          logistics: "Caminar hacia la izquierda del depto hasta el final de la playa (Barrio de Leme).",
          details: "Aprovechar que los domingos la Avenida Atlántica se peatonaliza para el público. Almorzar en Leme, recuperar equipaje al atardecer y descansar en un bar 24hs o hall."
        },
        {
          time: "Madrugada Lunes 17 (02:00 AM)",
          activity: "Traslado al Aeropuerto GIG",
          logistics: "Uber de puerta a puerta hacia el Aeropuerto Internacional GIG para el vuelo de retorno."
        }
      ]
    }
  ],

  guideTips: [
    {
      icon: "fa-credit-card",
      title: "Pagos y Dinero",
      text: "Pagar todo lo posible con tarjeta de débito/crédito o apps. En Río hasta los vendedores ambulantes en la playa aceptan tarjeta mediante sistemas PIX o Maquininha. Llevar Reales en efectivo solo para emergencias o pequeñas propinas."
    },
    {
      icon: "fa-glass-water",
      title: "Hidratación en la Playa",
      text: "Hidratación constante probando la natural 'Água de coco' servida helada en la misma fruta en los quioscos de la playa. Es barata, deliciosa y excelente para reponer minerales."
    },
    {
      icon: "fa-shield-halved",
      title: "Consejos de Seguridad",
      text: "En Lapa y Centro de noche, mantenerse en las calles iluminadas y concurridas. En la zona del depto (Copacabana, Rua Ministro Viveiros de Castro) la zona es muy segura, pero de madrugada es mejor pedir Uber puerta a puerta."
    }
  ],

  placesCoordinates: [
    { name: "Depto 4 Amigos (Rua Min. Viveiros de Castro 75)", coords: [-22.9644, -43.1762], category: "base", desc: "Base de Operaciones - Copacabana Posto 2" },
    { name: "Padaria e Confeitaria Lider (Centro)", coords: [-22.9078, -43.1815], category: "food", desc: "Desayuno Carioca (Día 1)" },
    { name: "Estación Cosme Velho (Cristo Redentor)", coords: [-22.9404, -43.2003], category: "landmark", desc: "Tren al Cristo (Día 1)" },
    { name: "Arcos de Lapa & Selarón", coords: [-22.9154, -43.1797], category: "culture", desc: "Escalera y Arcos (Día 1)" },
    { name: "Supermercado Zona Sul (Prado Júnior)", coords: [-22.9635, -43.1755], category: "services", desc: "Compras rápidas y cerveza" },
    { name: "Supermercado Pão de Açúcar (Copacabana 109)", coords: [-22.9650, -43.1770], category: "services", desc: "Compras grandes y agua" },
    { name: "Estadio Maracanã", coords: [-22.9122, -43.2302], category: "sports", desc: "Templo del Fútbol (Día 2)" },
    { name: "Praia Vermelha & Morro da Urca", coords: [-22.9550, -43.1647], category: "beach", desc: "Playa y Trekking (Día 2)" },
    { name: "Bar da Cachaça & Carioca da Gema (Lapa)", coords: [-22.9135, -43.1810], category: "nightlife", desc: "Samba y Bar (Día 2)" },
    { name: "Praça do Lido (Bike Itaú)", coords: [-22.9640, -43.1775], category: "activity", desc: "Estación de Bicis (Día 3)" },
    { name: "Pedra do Sal (Largo da Prainha)", coords: [-22.8985, -43.1835], category: "samba", desc: "Rueda de Samba (Día 3)" },
    { name: "Bar do Mineiro (Santa Teresa)", coords: [-22.9220, -43.1865], category: "food", desc: "Feijoada Famosa (Día 4)" },
    { name: "Roca de Arpoador", coords: [-22.9880, -43.1920], category: "sunset", desc: "Atardecer Dorado (Día 4)" },
    { name: "Playa de Leme", coords: [-22.9620, -43.1690], category: "relax", desc: "Playa y Peatonal (Día 5)" }
  ],

  topRioTours: [
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
      title: "Excursión Día Completo a Arraial do Cabo",
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
  ]
};
