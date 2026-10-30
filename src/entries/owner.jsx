// src/entries/owner.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import Cabecera from '../partials/Cabecera'

function HolaMundo() {
  return (
    <>
      <p>Hola mundo</p>
      <p>Estamos entendiendo algo por alli</p>
    </>
  )
}

// 3. Montaje en el DOM
const container = document.getElementById('root')

if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <Cabecera />
      <HolaMundo />
    </React.StrictMode>
  )
}