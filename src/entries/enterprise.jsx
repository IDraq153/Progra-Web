// src/entries/enterprise.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'

import Cabecera from '../partials/CabeceraEnterprise'
import Footer from '../partials/FooterEnterprise'
import SideBar from '../partials/SideBarEnterprise'

import './enterprise.css'

function HolaMundo() {
  return (
    <main className="app-content">
      <div className="page-container">
        <h1>Hola</h1>
        <p>Hola mundo</p>
      </div>
    </main>
  )
}

function Enterprise() {
  return (
    <div className="app">

      <header className="app-header">
        <Cabecera />
      </header>

      <div className="app-body">

        <aside className="app-sidebar">
          <SideBar />
        </aside>

        <HolaMundo />

      </div>

      <footer className="app-footer">
        <Footer />
      </footer>

    </div>
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
