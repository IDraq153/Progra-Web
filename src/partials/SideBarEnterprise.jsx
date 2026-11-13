// src\partials\SideBarEnterprise.jsx
import { NavLink } from 'react-router-dom'
import './SideBarEnterprise.css'

export default function SideBarEnterprise() {
  return (
    <aside className="enterprise-sidebar">

      {/* Convocatorias */}
      <div className="enterprise-sidebar-section">

        <h6 className="enterprise-sidebar-title">
          CONVOCATORIAS
        </h6>

        <nav className="enterprise-sidebar-nav">

          <NavLink
            to="/enterprise/convocatorias"
            className={({ isActive }) =>
              `enterprise-sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="enterprise-sidebar-bullet"></span>
            Mis convocatorias
          </NavLink>

          <NavLink
            to="/enterprise/carrers"
            className={({ isActive }) =>
              `enterprise-sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="enterprise-sidebar-bullet"></span>
            Listado de Carreras
          </NavLink>

          <NavLink
            to="/enterprise/students"
            className={({ isActive }) =>
              `enterprise-sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="enterprise-sidebar-bullet"></span>
            Listado de Estudiantes
          </NavLink>

          <NavLink
            to="/enterprise/convocatorias/nueva"
            className={({ isActive }) =>
              `enterprise-sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="enterprise-sidebar-bullet"></span>
            Nueva convocatoria
          </NavLink>

          <NavLink
            to="/enterprise/postulantes"
            className={({ isActive }) =>
              `enterprise-sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="enterprise-sidebar-bullet"></span>
            Bandeja de postulantes
          </NavLink>

        </nav>
      </div>

      {/* Empresa */}
      <div className="enterprise-sidebar-section">

        <h6 className="enterprise-sidebar-title">
          EMPRESA
        </h6>

        <nav className="enterprise-sidebar-nav">

          <NavLink
            to="/enterprise/perfil"
            className={({ isActive }) =>
              `enterprise-sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="enterprise-sidebar-bullet"></span>
            Perfil de la empresa
          </NavLink>

          <NavLink
            to="/enterprise/resenas"
            className={({ isActive }) =>
              `enterprise-sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="enterprise-sidebar-bullet"></span>
            Reseñas recibidas
          </NavLink>

        </nav>
      </div>

      {/* Cuenta */}
      <div className="enterprise-sidebar-section">

        <h6 className="enterprise-sidebar-title">
          CUENTA
        </h6>

        <nav className="enterprise-sidebar-nav">

          <NavLink
            to="/enterprise/cambiar-contrasena"
            className={({ isActive }) =>
              `enterprise-sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="enterprise-sidebar-bullet"></span>
            Cambiar contraseña
          </NavLink>

          <a
            href="/logout"
            className="enterprise-sidebar-link"
          >
            <span className="enterprise-sidebar-bullet"></span>
            Cerrar sesión
          </a>

        </nav>
      </div>

    </aside>
  )
}