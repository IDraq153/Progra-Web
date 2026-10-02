import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 1. Importas la estructura (Partials)
import Cabecera from '../partials/ControlPanel/HeaderPanel/CabeceraEnterprise';
import Footer from '../partials/ControlPanel/FooterPanel/FooterPanel';
import SideBar from '../partials/ControlPanel/SideBarPanel/SideBarPanel';

// 2. Importas tus Vistas dinámicas (Pages)
import Bandeja from '../pages/Bandeja';
// import Agotados from '../pages/Agotados'; // Importarás las demás cuando las crees

// 3. Importas el CSS base (el que tiene el zoom al 130%)
import './enterprise.css';

function EnterpriseApp() {
  return (
    <BrowserRouter>
      <div className="app">
        
        {/* Cabecera fija */}
        <header className="app-header">
          <Cabecera />
        </header>

        <div className="app-body">
          
          {/* Menú lateral fijo */}
          <aside className="app-sidebar">
            <SideBar />
          </aside>

          {/* 4. El Router inyecta la página aquí adentro */}
          <Routes>
            {/* Si entras a /enterprises a secas, te redirige automáticamente a la bandeja */}
            <Route path="/enterprises" element={<Navigate to="/enterprises/bandeja" replace />} />
            
            {/* Esta es la ruta que llama a todo el código Kanban que hicimos */}
            <Route path="/enterprises/bandeja" element={<Bandeja />} />
            
            {/* Aquí irás agregando las demás rutas: */}
            {/* <Route path="/enterprises/agotados" element={<Agotados />} /> */}
          </Routes>

        </div>

        {/* Footer fijo */}
        <footer className="app-footer">
          <Footer />
        </footer>
        
      </div>
    </BrowserRouter>
  );
}

const container = document.getElementById('root');
if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <EnterpriseApp />
    </React.StrictMode>
  );
}