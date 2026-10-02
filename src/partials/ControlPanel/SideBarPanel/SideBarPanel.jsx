import { NavLink } from 'react-router-dom'
import './SideBarEnterprise.css'

const sections = [
  {
    title: 'ATENCIÓN',
    items: [
      {
        label: 'Bandeja del día',
        path: '/enterprises/bandeja',
      },
      {
        label: 'Entrega contra código',
        path: '/enterprises/entrega-contra-codigo',
      },
      {
        label: 'Resumen del día',
        path: '/enterprises/resumen',
      },
    ],
  },
  {
    title: 'CARTA',
    items: [
      {
        label: 'Mi carta',
        path: '/enterprises/carta',
      },
      {
        label: 'Opciones y agregados',
        path: '/enterprises/opciones-agregados',
      },
      {
        label: 'Agotados del día',
        path: '/enterprises/agotados',
      },
    ],
  },
  {
    title: 'LOCAL',
    items: [
      {
        label: 'Perfil del local',
        path: '/enterprises/perfil',
      },
      {
        label: 'Horario de atención',
        path: '/enterprises/horario',
      },
      {
        label: 'Reseñas',
        path: '/enterprises/resenas',
      },
    ],
  },
]

export default function SideBarEnterprise() {
  return (
    <aside className="sidebar-enterprise">
      {sections.map((section) => (
        <section
          className="sidebar-section"
          key={section.title}
        >
          <h3 className="sidebar-section-title">
            {section.title}
          </h3>

          <nav>
            {section.items.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-item ${
                    isActive ? 'sidebar-item--active' : ''
                  }`
                }
              >
                <span>{item.label}</span>

                {item.badge !== undefined && (
                  <span className="sidebar-badge">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </section>
      ))}
    </aside>
  )
}
