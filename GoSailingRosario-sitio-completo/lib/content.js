/**
 * content.js — Contenido comercial de GoSailingRosario.
 *
 * Este es el ÚNICO lugar donde se debería editar precio, capacidad,
 * datos de contacto, textos de FAQ o la lista de imágenes.
 * El resto del sitio (index.html, styles.css, main.js) no debería
 * necesitar tocarse para actualizar esta información.
 *
 * Todo el contenido comercial proviene exclusivamente del brief
 * provisto por el cliente. No se inventó ningún dato.
 */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "5493415499174"; // +54 9 341 549-9174 (confirmado)
  var WHATSAPP_DEFAULT_MSG =
    "Hola, quiero consultar por los paseos en velero de GoSailingRosario.";

  function waLink(message) {
    return (
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message || WHATSAPP_DEFAULT_MSG)
    );
  }

  // Precio: $75.000 por persona. Grupos de menos de 4 personas
  // abonan el equivalente a 4 pasajeros. No hay mínimo de personas
  // para contratar el paseo.
  var PRICE_PER_PERSON = 75000;
  var MIN_BILLABLE_PAX = 4;
  var MAX_CAPACITY = 8; // "7/8 personas máximo"

  function priceForGroup(pax) {
    var billable = Math.max(pax, MIN_BILLABLE_PAX);
    return billable * PRICE_PER_PERSON;
  }

  function formatARS(n) {
    return "$" + n.toLocaleString("es-AR");
  }

  window.__BRAND__ = {
    name: "GoSailingRosario",
    shortName: "Go Sailing Rosario",
    tagline: "Paseos privados en velero por el río Paraná",
    concept:
      "Una experiencia privada para compartir el Paraná con tu grupo.",

    logo: "assets/img/logo.png",

    contact: {
      whatsappNumber: WHATSAPP_NUMBER,
      whatsappDisplay: "341 15-549 9174",
      whatsappDefaultMessage: WHATSAPP_DEFAULT_MSG,
      waLink: waLink,
      instagramHandle: "@gosailingrosario",
      instagramUrl: "https://instagram.com/gosailingrosario",
      email: "gosailingrosario@gmail.com",
    },

    location: {
      name: "Club de Velas Rosario",
      address: "Av. Colombres 956, Rosario, Santa Fe, Argentina",
      mapsQuery: "Club de Velas Rosario, Av. Colombres 956, Rosario",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(
          "Club de Velas Rosario, Av. Colombres 956, Rosario, Santa Fe, Argentina"
        ),
      // Coordenadas reales obtenidas por geocodificación (Nominatim/OpenStreetMap)
      // de la dirección de arriba — no inventadas. El embed sin API key de
      // Google (maps?...&output=embed) muestra intermitentemente un error
      // ("No se ha podido cargar la información del sitio"), por eso se usa
      // el embed de OpenStreetMap, que es estable y no requiere API key.
      coords: { lat: -32.9038211, lon: -60.6803897 },
      mapsEmbedSrc:
        "https://www.openstreetmap.org/export/embed.html?bbox=-60.68636%2C-32.9078%2C-60.67436%2C-32.8998&layer=mapnik&marker=-32.9038211%2C-60.6803897",
    },

    trip: {
      durationLabel: "3 horas",
      durationHours: 3,
      isPrivate: true,
      capacityLabel: "Hasta 7/8 personas",
      maxCapacity: MAX_CAPACITY,
      pricePerPerson: PRICE_PER_PERSON,
      pricePerPersonLabel: formatARS(PRICE_PER_PERSON),
      minBillablePax: MIN_BILLABLE_PAX,
      priceForGroup: priceForGroup,
      formatARS: formatARS,
      priceRuleShort:
        "Para grupos de menos de 4 personas, se abona el equivalente a 4 pasajeros.",
      priceRuleLong:
        "No existe una cantidad mínima de personas para reservar: podés ir solo, en pareja o en un grupo chico. Sí, si el grupo tiene menos de 4 personas, se abona el equivalente a 4 pasajeros.",
    },

    quickFacts: [
      { icon: "schedule", label: "3 horas", sub: "de paseo privado" },
      { icon: "payments", label: "$75.000", sub: "por persona" },
      { icon: "sailing", label: "Privado", sub: "solo tu grupo" },
      { icon: "group", label: "Hasta 7/8", sub: "personas" },
      { icon: "verified_user", label: "Capitán", sub: "incluido" },
    ],

    // Posibilidades dentro de una experiencia flexible.
    // No son "paquetes" cerrados — se comunican como opciones.
    experiences: [
      {
        id: "navegar",
        title: "Navegar",
        text: "Recorré el Paraná a bordo de un velero, idealmente a vela cuando el viento del día lo permite.",
        icon: "sailing",
        image: "assets/img/grupo-amigos-navegando.jpg",
      },
      {
        id: "relajarse",
        title: "Relajarse",
        text: "Bajar un cambio, disfrutar del río y del sol sin apuro. El recorrido se conversa con el capitán según lo que busque el grupo.",
        icon: "self_improvement",
        image: "assets/img/mujer-relajada-proa.jpg",
      },
      {
        id: "nadar",
        title: "Nadar o tirarse al agua",
        text: "Según las condiciones del día y la coordinación con el capitán, es posible detenerse a nadar. También es perfectamente válido navegar sin meterse al agua.",
        icon: "pool",
        image: "assets/img/aerea-canal-islas.jpg",
      },
      {
        id: "atardecer",
        title: "Atardecer",
        text: "El paseo también puede coordinarse para disfrutar la puesta de sol sobre el río, con el horario a acordar con el capitán.",
        icon: "wb_twilight",
        image: "assets/img/atardecer-cielo-mastil.jpg",
      },
      {
        id: "compartir",
        title: "Compartir en grupo",
        text: "Familia, amigos o un grupo que simplemente quiere estar junto en el río, en un velero que es solo para ustedes.",
        icon: "diversity_3",
        image: "assets/img/amigas-proa-rio.jpg",
      },
      {
        id: "laboral",
        title: "Reuniones de trabajo",
        text: "Una alternativa distinta para un encuentro o actividad de equipo. Existen opciones adicionales de bebidas y picadas, a coordinar aparte.",
        icon: "groups",
        image: "assets/img/grupo-amigos-timon.jpg",
      },
    ],

    includes: [
      {
        icon: "verified_user",
        title: "Capitán certificado",
        text: "A cargo de la navegación durante todo el paseo.",
      },
      {
        icon: "sailing",
        title: "Embarcación",
        text: "El velero completo, exclusivo para tu grupo.",
      },
      {
        icon: "local_gas_station",
        title: "Combustible",
        text: "Incluido, sin cargos adicionales.",
      },
      {
        icon: "health_and_safety",
        title: "Seguridad",
        text: "Las medidas de seguridad necesarias para la navegación.",
      },
      {
        icon: "local_bar",
        title: "Bebidas",
        text: "Incluidas. Cualquier duda puntual, se puede consultar directamente por WhatsApp.",
      },
    ],

    audiences: [
      {
        id: "familias",
        title: "Familias",
        text: "Una salida diferente para disfrutar juntos del río.",
        image: "assets/img/familia-selfie-velero.jpg",
      },
      {
        id: "amigos",
        title: "Amigos",
        text: "Una experiencia privada para compartir, navegar, relajarse y disfrutar.",
        image: "assets/img/amigas-proa-rio.jpg",
      },
      {
        id: "laboral",
        title: "Reuniones laborales",
        text: "Una alternativa diferente para encuentros y actividades de grupos de trabajo.",
        image: "assets/img/grupo-amigos-timon.jpg",
      },
    ],

    gallery: [
      { src: "assets/img/hero-atardecer.jpg", alt: "Velero de GoSailingRosario anclado en el río Paraná durante el atardecer" },
      { src: "assets/img/logo-en-casco-atardecer.jpg", alt: "Logo de GoSailingRosario en el casco del velero, navegando al atardecer con el puente Rosario-Victoria de fondo" },
      { src: "assets/img/grupo-navegando-atardecer.jpg", alt: "Grupo navegando en velero por el Paraná durante el atardecer" },
      { src: "assets/img/aerea-tormento-atardecer.jpg", alt: "Vista aérea del velero anclado en el río al atardecer" },
      { src: "assets/img/atardecer-cielo-mastil.jpg", alt: "Atardecer con cielo anaranjado visto desde la cubierta del velero" },
      { src: "assets/img/marina-club-atardecer.jpg", alt: "Marina del Club de Velas Rosario al atardecer, con los veleros amarrados" },
      { src: "assets/img/amigas-proa-rio.jpg", alt: "Grupo de amigas en la proa del velero navegando por el río Paraná" },
      { src: "assets/img/familia-selfie-velero.jpg", alt: "Familia a bordo del velero con la costa de Rosario de fondo" },
      { src: "assets/img/grupo-amigos-timon.jpg", alt: "Grupo de amigos a bordo del velero al atardecer" },
      { src: "assets/img/aerea-canal-islas.jpg", alt: "Vista aérea del velero navegando por un canal entre islas del Paraná" },
      { src: "assets/img/mujer-relajada-proa.jpg", alt: "Persona relajada en la proa del velero con las velas desplegadas" },
      { src: "assets/img/amigas-mate-velero.jpg", alt: "Grupo de amigos tomando mate a bordo del velero" },
      { src: "assets/img/grupo-amigas-club.jpg", alt: "Grupo de amigas a bordo del velero amarrado en el club" },
      { src: "assets/img/salvavidas-atardecer.jpg", alt: "Salvavidas del velero con el atardecer de fondo" },
      { src: "assets/img/grupo-atardecer-capitan.jpg", alt: "Grupo a bordo del velero al atardecer con la costa de Rosario de fondo" },
      { src: "assets/img/amigas-mate-nublado.jpg", alt: "Grupo de amigas tomando mate a bordo en un día nublado" },
      { src: "assets/img/atardecer-puente-lancha.jpg", alt: "Atardecer sobre el puente Rosario-Victoria visto desde el río" },
      { src: "assets/img/grupo-puente-navegando.jpg", alt: "Grupo navegando con el puente Rosario-Victoria de fondo" },
      { src: "assets/img/puente-noche-luces.jpg", alt: "Puente Rosario-Victoria iluminado de noche, reflejado en el río" },
      { src: "assets/img/amigas-puente-atardecer.jpg", alt: "Grupo de amigas a bordo con el puente Rosario-Victoria al atardecer" },
      { src: "assets/img/grupo-puente-atardecer.jpg", alt: "Grupo a bordo del velero con el puente Rosario-Victoria al atardecer" },
      { src: "assets/img/grupo-atardecer-proa.jpg", alt: "Grupo en la proa del velero durante el atardecer" },
      { src: "assets/img/capitan-timon-grupo.jpg", alt: "Capitán en el timón del velero junto a un grupo de pasajeros" },
      { src: "assets/img/detalle-proa-nublado.jpg", alt: "Detalle de la proa del velero navegando" },
      { src: "assets/img/grupo-amigos-navegando.jpg", alt: "Grupo de amigos a bordo del velero navegando por el Paraná" },
      { src: "assets/img/detalle-vela-estela.jpg", alt: "Detalle de la vela del velero navegando, con la estela en el agua" },
      { src: "assets/img/pareja-proa-atardecer.jpg", alt: "Pareja en la proa del velero durante el atardecer" },
      { src: "assets/img/atardecer-puente-dramatico.jpg", alt: "Atardecer dramático sobre el puente Rosario-Victoria" },
      { src: "assets/img/atardecer-puente-buque.jpg", alt: "Atardecer sobre el río Paraná con el puente Rosario-Victoria y un buque de fondo" },
      { src: "assets/img/amigas-brindis-discreto.jpg", alt: "Grupo de amigas compartiendo un brindis a bordo del velero" },
      { src: "assets/img/grupo-puente-bandera.jpg", alt: "Grupo navegando en velero bajo el puente Rosario-Victoria, con la bandera argentina" },
    ],

    faq: [
      {
        q: "¿Cuánto dura el paseo?",
        a: "El paseo tiene una duración habitual de 3 horas.",
      },
      {
        q: "¿El paseo es privado?",
        a: "Sí. El velero queda destinado exclusivamente a tu grupo — no se comparte con otros grupos desconocidos.",
      },
      {
        q: "¿Cuántas personas pueden ir?",
        a: "Hasta 7/8 personas como máximo, según la capacidad de la embarcación.",
      },
      {
        q: "¿Hay una cantidad mínima de personas para reservar?",
        a: "No. Podés ir solo, en pareja o en un grupo chico. Sí, cuando el grupo tiene menos de 4 personas, se abona el equivalente a 4 pasajeros.",
      },
      {
        q: "¿Qué incluye el precio?",
        a: "El precio incluye capitán certificado, la embarcación, combustible, las medidas de seguridad necesarias y bebidas.",
      },
      {
        q: "¿Cómo se coordina el horario?",
        a: "El horario se coordina directamente con el capitán, no hay un horario fijo. También es posible realizar el paseo al atardecer.",
      },
      {
        q: "¿Qué pasa si no hay viento ese día?",
        a: "La navegación a vela depende de las condiciones climáticas y del viento del día. El capitán coordina la mejor experiencia posible dentro de las condiciones del día.",
      },
      {
        q: "¿Se puede nadar?",
        a: "Puede ser posible nadar o tirarse al agua, según las condiciones y la coordinación con el capitán. También es perfectamente válido contratar el paseo simplemente para navegar y disfrutar del río.",
      },
      {
        q: "¿Puedo llevar comida y bebida?",
        a: "Sí, podés llevar tu propia comida y bebida. También se permite alcohol, siempre con consumo responsable.",
      },
      {
        q: "¿Puedo llevar mascotas?",
        a: "Sí, las mascotas pueden acompañar el paseo. Se recomienda coordinarlo previamente con el capitán.",
      },
      {
        q: "¿De dónde salen los paseos?",
        a: "La salida es desde el Club de Velas Rosario, Av. Colombres 956, Rosario, Santa Fe.",
      },
      {
        q: "¿Puedo consultar por una reunión laboral?",
        a: "Sí. El paseo privado puede ser una alternativa distinta para una reunión o encuentro de trabajo. Existen opciones adicionales de bebidas y picadas, con costo adicional, a coordinar directamente.",
      },
    ],
  };
})();
