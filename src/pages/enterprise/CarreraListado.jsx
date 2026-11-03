
// src/pages/enterprise/CarreraListado.jsx

import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './CarreraListado.css';
import axios from 'axios';

export default function CarreraListado() {
  const [carrers, setCarrers] = useState([]);
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState(false);

  // const _eliminar = async (e, id) => {
  //   alert(id);
  // }

  useEffect(() => {
    _cargarCarreras();
  }, []);

  const _cargarCarreras = async () => {
    try {
      const response = await axios.get('/api/v1/carrers');
      setCarrers(response.data.data);
      setMessage(response.data.message);
      setStatusMessage(response.data.success);
    } catch (error) {
      console.error(error);
    }
  };
  const _eliminar = async (e, id) => {
    try {
      const response = await axios.delete('/api/v1/carrers/' + id);
      _cargarCarreras();

      setMessage(response.data.message);
      setStatusMessage(response.data.success);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Carrera Listado</h1>
      <p>Bienvenido al panel de empresa.</p>

      {message !== "" && (
        <div className={`alert ${statusMessage ? 'alert-success' : 'alert-danger'}`} role="alert" id="alertMessage">
          {message}
        </div>
      )}

      <NavLink to="/enterprise/carrers/new" className="btn btn-secondary">
        Agregar Carrera
      </NavLink>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(carrers) && carrers.map((carrer) => (
            <tr key={carrer.id}>
              <td>{carrer.id}</td>
              <td>{carrer.name}</td>
              <td>
                <button>Editar</button>
                <button onClick={(e) => _eliminar(e,carrer.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
