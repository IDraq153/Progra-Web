
import { useState, useEffect } from 'react';
import './CarreraListado.css';
import axios from 'axios';

export default function CarreraListado() {

  // Son como las variables que guardan la info y los setters
  const [carrers, setCarrers] = useState([]);
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState(false);

  // Constructor para llamar la info de la base de datos
  useEffect(() => {
    _cargarCarreras();
  }, []);

  const _cargarCarreras = async () => {
    try {
      const response = await axios.get('/api/v1/carrers');

      console.log(response.data.data);

      setCarrers(response.data.data);
      setMessage(response.data.message);
      setStatusMessage(true);

    } catch (error) {
      console.error(error);

      setMessage('Error al cargar las carreras');
      setStatusMessage(false);
    }
  };

  return (
    <>
      <h1>Carrera Listado</h1>
      <p>Bienvenido al panel de empresa.</p>

      {message != "" ? (
        <div
          className={`alert ${statusMessage ? 'alert-success' : 'alert-danger'}`}
          role="alert"
          id="alertMessage"
        >
          {message}
        </div>
      ) : (<></>)
    }

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Operaciones</th>
          </tr>
        </thead>

        <tbody>
          {carrers.map((carrer) => (
            <tr key={carrer.id}>
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
  );
}
