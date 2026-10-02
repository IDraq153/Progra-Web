// src/partials/CabeceraEnterprise.jsx
import './CabeceraEnterprise.css'
export default function CabeceraEnterprise() {
    // Por ahora son datos de ejemplo.
    // Más adelante puedes obtenerlos desde tu usuario/contexto/API.
    const sede = 'Cafetería Central'
    const localAbierto = true
    const inicialesUsuario = 'JP'

    return (
        <nav className="enterprise-navbar">
            <div className="enterprise-navbar__left">

                {/* Logo / Nombre de aplicación */}
                <a
                    className="enterprise-navbar__brand"
                    href="/enterprise"
                >
                    Campus Pide
                </a>

                {/* Navegación */}
                <a
                    className="enterprise-navbar__link enterprise-navbar__link--active"
                    href="/enterprise"
                >
                    Panel del local
                </a>

                {/* Sede actual */}
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

                {/* Estado del local */}
                <div
                    className={`enterprise-navbar__status ${
                        localAbierto
                            ? 'enterprise-navbar__status--open'
                            : 'enterprise-navbar__status--closed'
                    }`}
                >
                    <span className="enterprise-navbar__status-dot"></span>

                    <span>
                        {localAbierto ? 'Abierto' : 'Cerrado'}
                    </span>
                </div>

                {/* Usuario */}
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
