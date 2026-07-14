export type TeamMember = {
  id: string
  name: string
  role: string
  tenure?: string | null
  initials: string
  /** Ruta en public, p. ej. /images/team/julio-puig.jpg */
  photo?: string | null
}

/** Placeholders listos para sustituir `photo` cuando tenga las imágenes del equipo. */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'julio-puig',
    name: 'Julio Puig',
    role: 'Director',
    tenure: null,
    initials: 'JP',
    photo: null,
  },
  {
    id: 'miembro-2',
    name: 'Nombre del asesor',
    role: 'Asesor inmobiliario',
    tenure: null,
    initials: '—',
    photo: null,
  },
  {
    id: 'miembro-3',
    name: 'Nombre del asesor',
    role: 'Valoraciones y tasaciones',
    tenure: null,
    initials: '—',
    photo: null,
  },
  {
    id: 'miembro-4',
    name: 'Nombre del asesor',
    role: 'Gestión y documentación',
    tenure: null,
    initials: '—',
    photo: null,
  },
]

export const TEAM_QUOTE = {
  text: 'No vendemos propiedades. Ayudamos a personas a tomar la mejor decisión posible sobre un bien que importa de verdad.',
  attribution: 'Julio Puig',
  role: 'Director',
} as const
