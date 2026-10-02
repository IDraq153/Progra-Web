import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import Cabecera from '../partials/CabeceraEnterprise'
import Footer from '../partials/FooterEnterprise'
import SideBar from '../partials/SideBarEnterprise'

import './enterprise.css'


function Page({ title, text }) {
  return (
    <main className="app-content">
      <div className="page-container">
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </main>
  )
}


function Enterprise() {
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

            <Route
              path="/enterprises"
              element={
                <Page
                  title="Bandeja del día"
                  text="Aquí se mostrarán los pedidos del día."
                />
              }
            />

            <Route
              path="/enterprises/bandeja"
              element={
                <Page
                  title="Bandeja del día"
                  text="Aquí se mostrarán los pedidos del día."
                />
              }
            />

            <Route
              path="/enterprises/entrega-contra-codigo"
              element={
                <Page
                  title="Entrega contra código"
                  text="Aquí se gestionarán las entregas contra código."
                />
              }
            />

            <Route
              path="/enterprises/resumen"
              element={
                <Page
                  title="Resumen del día"
                  text="Aquí aparecerá el resumen del día."
                />
              }
            />

            <Route
              path="/enterprises/carta"
              element={
                <Page
                  title="Mi carta"
                  text="Administración de la carta."
                />
              }
            />

            <Route
              path="/enterprises/opciones-agregados"
              element={
                <Page
                  title="Opciones y agregados"
                  text="Administración de opciones y agregados."
                />
              }
            />

            <Route
              path="/enterprises/agotados"
              element={
                <Page
                  title="Agotados del día"
                  text="Productos agotados actualmente."
                />
              }
            />

            <Route
              path="/enterprises/perfil"
              element={
                <Page
                  title="Perfil del local"
                  text="Información del local."
                />
              }
            />

            <Route
              path="/enterprises/horario"
              element={
                <Page
                  title="Horario de atención"
                  text="Configuración del horario."
                />
              }
            />

            <Route
              path="/enterprises/resenas"
              element={
                <Page
                  title="Reseñas"
                  text="Reseñas del local."
                />
              }
            />

          </Routes>

        </div>

        <footer className="app-footer">
          <Footer />
        </footer>

      </div>
    </BrowserRouter>
  )
}


const container = document.getElementById('root')

if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <Enterprise />
    </React.StrictMode>
  )
}
