// src\entries\enterprise.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'

import CabeceraEnterprise from '../partials/CabeceraEnterprise'
import SideBarEnterprise from '../partials/SideBarEnterprise'
import FooterEnterprise from '../partials/FooterEnterprise'
// paginas
import PanelEmpresa from '../pages/enterprise/PanelEmpresa'
import MisConvocatorias from '../pages/enterprise/MisConvocatorias'
import NuevaConvocatoria from '../pages/enterprise/NuevaConvocatoria'
import CarreraListado from '../pages/enterprise/CarreraListado'

import './enterprise.css'

function EnterpriseLayout() {
  return (
    <>
      <CabeceraEnterprise />
      <div className="enterprise-layout">
        <SideBarEnterprise />
        <main className="enterprise-content">
          <Outlet />
        </main>
      </div>
      <FooterEnterprise />
    </>
  )
}

function Postulantes() {
  return (
    <>
      <h1>Bandeja de postulantes</h1>
      <p>Aquí se mostrarán los postulantes.</p>
    </>
  )
}

function PerfilEmpresa() {
  return (
    <>
      <h1>Perfil de la empresa</h1>
      <p>Información de la empresa.</p>
    </>
  )
}

function Resenas() {
  return (
    <>
      <h1>Reseñas recibidas</h1>
      <p>Aquí se mostrarán las reseñas.</p>
    </>
  )
}

function CambiarContrasena() {
  return (
    <>
      <h1>Cambiar contraseña</h1>
      <p>Formulario para cambiar la contraseña.</p>
    </>
  )
}

function Configuracion() {
  return (
    <>
      <h1>Configuración</h1>
      <p>Configuración de la cuenta empresarial.</p>
    </>
  )
}

function App() {
  return (
    <Routes>
      {/* Layout general de empresa */}
      <Route path="/enterprise" element={<EnterpriseLayout />}>
        {/* /enterprise */}
        <Route index element={<PanelEmpresa />} />
        {/* Convocatorias */}
        <Route path="convocatorias" element={<MisConvocatorias />} />
        <Route path="convocatorias/nueva" element={<NuevaConvocatoria />} />
        {/* Postulantes */}
        <Route path="postulantes" element={<Postulantes />} />
        {/* Empresa */} 
        <Route path="perfil" element={<PerfilEmpresa />} />
        <Route path="resenas" element={<Resenas />} />
        {/* Carreras */} 
        <Route path="carrers" element={<CarreraListado />} />
        {/* Cuenta */} 
        <Route path="cambiar-contrasena" element={<CambiarContrasena />} />
        <Route path="configuracion" element={<Configuracion />} />
      </Route>
    </Routes>
  )
}

const container = document.getElementById('root')

if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
}
