// Departamentos del Perú (bóveda 05.01 — mapa de calor nacional).
// El `code` coincide EXACTAMENTE con la propiedad NOMBDEP del GeoJSON
// (src/data/peru-departments.json): mayúsculas, sin tildes.

export interface PeruDepartment {
  code: string
  label: string
}

export const PERU_DEPARTMENTS: PeruDepartment[] = [
  { code: "AMAZONAS", label: "Amazonas" },
  { code: "ANCASH", label: "Áncash" },
  { code: "APURIMAC", label: "Apurímac" },
  { code: "AREQUIPA", label: "Arequipa" },
  { code: "AYACUCHO", label: "Ayacucho" },
  { code: "CAJAMARCA", label: "Cajamarca" },
  { code: "CALLAO", label: "Callao" },
  { code: "CUSCO", label: "Cusco" },
  { code: "HUANCAVELICA", label: "Huancavelica" },
  { code: "HUANUCO", label: "Huánuco" },
  { code: "ICA", label: "Ica" },
  { code: "JUNIN", label: "Junín" },
  { code: "LA LIBERTAD", label: "La Libertad" },
  { code: "LAMBAYEQUE", label: "Lambayeque" },
  { code: "LIMA", label: "Lima" },
  { code: "LORETO", label: "Loreto" },
  { code: "MADRE DE DIOS", label: "Madre de Dios" },
  { code: "MOQUEGUA", label: "Moquegua" },
  { code: "PASCO", label: "Pasco" },
  { code: "PIURA", label: "Piura" },
  { code: "PUNO", label: "Puno" },
  { code: "SAN MARTIN", label: "San Martín" },
  { code: "TACNA", label: "Tacna" },
  { code: "TUMBES", label: "Tumbes" },
  { code: "UCAYALI", label: "Ucayali" },
]

export const DEPARTMENT_CODES = PERU_DEPARTMENTS.map((d) => d.code) as [
  string,
  ...string[],
]

export function departmentLabel(code: string | null | undefined): string {
  if (!code) return "—"
  return PERU_DEPARTMENTS.find((d) => d.code === code)?.label ?? code
}
