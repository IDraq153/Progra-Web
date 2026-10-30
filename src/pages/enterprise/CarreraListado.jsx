// src/pages/enterprise/CarreraListado.jsx
import { useState, useEffect } from 'react';
import './CarreraListado.css'
import axios from 'axios';

export default function CarreraListado() {
  const carrers2 = [];

  const [carrers, setCarrers] = useState(carrers2);

  useEffect(() => {
    cargarCarreras();
  }, []);

  const cargarCarreras = async () => {
    try{
      const response = await axios.get('/api/v1/carrers');
      setCarrers(response.data.data.list)
    }catch(error){
      console.error(error)
    }
  }

  return (
    <>
      <h1>Carrera Listado</h1>
      <p>Bienvenido al panel de empresa.</p>
      <table className='table'>
        <thead>
          <th>id</th>
          <th>nombre</th>
          <th>operaciones</th>
        </thead>
        <tbody>
          {Array.isArray(carrers) && carrers.map((carrer) => (
            <tr>
              <td>{carrer.id}</td>
              <td>{carrer.name}</td>
              <td>
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}