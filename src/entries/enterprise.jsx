import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 1. Estructura (Partials)
import Cabecera from '../partials/ControlPanel/HeaderPanel/HeaderPanel';
import Footer from '../partials/ControlPanel/FooterPanel/FooterPanel';
import SideBar from '../partials/ControlPanel/SideBarPanel/SideBarPanel';

// 2. Vistas (Pages)
import Bandeja from '../pages/Bandeja';
import ResumenDia from '../pages/ResumenDia';
import Entrega from '../pages/Entrega';
// import Agotados from '../pages/Agotados';

// 3. CSS base
import './enterprise.css';

function EnterpriseApp() {
  return (
    <BrowserRouter>
      <div className="app">

        <header className="app-header">
          <Cabecera />
        </header>

        <div className="app-body">

          <aside className="app-sidebar">
            <SideBar />
          </aside>

          <Routes>
            <Route path="/enterprises" element={<Navigate to="/enterprises/bandeja" replace />} />
            <Route path="/enterprises/bandeja" element={<Bandeja />} />
            <Route path="/enterprises/resumenDia" element={<ResumenDia />} />
            <Route path="/enterprises/entrega" element={<Entrega />} />
            {/* <Route path="/enterprises/agotados" element={<Agotados />} /> */}
          </Routes>

        </div>

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