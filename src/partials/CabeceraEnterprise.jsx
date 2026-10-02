import { Link, NavLink } from 'react-router-dom'
import './CabeceraEnterprise.css'

export default function CabeceraEnterprise() {
  const sede = 'Cafetería Central'
  const localAbierto = true
  const inicialesUsuario = 'JP'

  return (
    <nav className="enterprise-navbar">

      <div className="enterprise-navbar__left">

        <Link
          className="enterprise-navbar__brand"
          to="/"
        >
          Campus Pide
        </Link>

        <NavLink
          className={({ isActive }) =>
            `enterprise-navbar__link ${
              isActive
                ? 'enterprise-navbar__link--active'
                : ''
            }`
          }
          to="/"
        >
          Panel del local
        </NavLink>

        <div className="enterprise-navbar__sede">
          <span className="enterprise-navbar__sede-label">
            Sede
          </span>

          <span className="enterprise-navbar__sede-name">
            {sede}
          </span>
        </div>

      </div>

      <div className="enterprise-navbar__right">

        <div
          className={`enterprise-navbar__status ${
            localAbierto
              ? 'enterprise-navbar__status--open'
              : 'enterprise-navbar__status--closed'
          }`}
        >
          <span className="enterprise-navbar__status-dot" />

          <span>
            {localAbierto ? 'Abierto' : 'Cerrado'}
          </span>
        </div>

        <div
          className="enterprise-navbar__user"
          title="Perfil de usuario"
        >
          {inicialesUsuario}
        </div>

      </div>

    </nav>
  )
}
