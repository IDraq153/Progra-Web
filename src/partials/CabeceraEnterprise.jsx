// src/partials/CabeceraEnterprise.jsx
import { Link } from 'react-router-dom'
import './CabeceraEnterprise.css'

export default function CabeceraEnterprise() {
  return (
    <nav className="navbar enterprise-navbar">
      <div className="enterprise-navbar-content">

        {/* Izquierda */}
        <div className="enterprise-navbar-left">

          {/* Nombre de la aplicación */}
          <Link
            className="enterprise-brand"
            to="/enterprise"
          >
            PrácticaLima
          </Link>

          {/* Navegación */}
          <Link
            className="enterprise-nav-link"
            to="/enterprise"
          >
            PANEL DE EMPRESA
          </Link>

        </div>

        {/* Derecha */}
        <div className="enterprise-navbar-right">

          {/* Buscador */}
          <div className="enterprise-search">
            <span className="enterprise-search-icon">
              <i className="bi bi-search"></i>
            </span>

            <input
              type="search"
              className="enterprise-search-input"
              placeholder="Buscar postulante"
              aria-label="Buscar postulante"
            />
          </div>

          {/* Dropdown empresa */}
          <div className="dropdown">

            <button
              className="enterprise-company-button dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {/* Iniciales */}
              <span className="enterprise-avatar">
                PL
              </span>

              {/* Información */}
              <span className="enterprise-company-info">
                <strong>PrácticaLima</strong>
                <small>Empresa - cuenta verificada</small>
              </span>
            </button>

            <ul className="dropdown-menu dropdown-menu-end enterprise-dropdown">

              <li>
                <Link
                  className="dropdown-item"
                  to="/enterprise/perfil"
                >
                  Mi perfil
                </Link>
              </li>

              <li>
                <Link
                  className="dropdown-item"
                  to="/enterprise/configuracion"
                >
                  Configuración
                </Link>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a
                  className="dropdown-item text-danger"
                  href="/logout"
                >
                  Cerrar sesión
                </a>
              </li>

            </ul>
          </div>

        </div>

      </div>
    </nav>
  )
}
