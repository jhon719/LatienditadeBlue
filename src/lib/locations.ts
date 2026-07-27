// Puntos de RECOJO de pedidos de La Tiendita de Blue.
// Ojo: no son locales de la tienda, son puntos de encuentro acordados para
// entregar pedidos. El texto de la UI debe reflejar eso (nada de "visítanos").

export interface PickupPoint {
  id: string
  name: string
  /** Referencia corta que se muestra bajo el nombre */
  detail: string
  /** Dirección completa, si la hay */
  address?: string
  /** Enlace para abrir en la app de Google Maps */
  mapsUrl: string
  /**
   * Qué se le pasa al mapa embebido: coordenadas "lat,lng" o una dirección.
   * Google geocodifica la dirección, así que es más preciso que coordenadas
   * aproximadas cuando no se tienen las exactas.
   */
  mapQuery: string
}

export const PICKUP_POINTS: PickupPoint[] = [
  {
    id: "feria-grau",
    name: "Feria Grau",
    detail: "Ex Carpa Grau · Cercado de Lima",
    mapQuery: "-12.0599102,-77.0343483",
    mapsUrl:
      "https://www.google.com/maps/place/Feria+Grau+-+ex+carpa+grau/@-12.0599102,-77.0343483,17z/data=!3m1!4b1!4m6!3m5!1s0x9105c92bb159c6cb:0x1eba26681c201ad4!8m2!3d-12.0599102!4d-77.0343483!16s%2Fg%2F11v65432tz",
  },
  {
    id: "centro-civico",
    name: "Real Plaza Centro Civico",
    detail: "Entregas en los exteriores",
    address: "Av. Garcilaso de la Vega 1337, Lima 15001",
    mapQuery: "Real Plaza Centro Civico, Av. Garcilaso de la Vega 1337, Lima 15001",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("Real Plaza Centro Civico, Av. Garcilaso de la Vega 1337, Lima 15001"),
  },
]

/**
 * URL del iframe de Google Maps sin API key ni facturación.
 * `output=embed` es el embed clásico: gratuito y sin cuota.
 */
export const mapEmbedUrl = (query: string, zoom = 17) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`
