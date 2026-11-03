
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './CarreraNueva.css';
import axios from 'axios';

export default function CarreraNueva() {
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState(false);
  const [name, setName] = useState("");

  const _agregarCarrera = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/v1/carrers', {
        name: name
      });

      setMessage(response.data.message);
      setStatusMessage(response.data.success);

      if (response.data.success) {
        setName("");
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Error al registrar la carrera");
      setStatusMessage(false);
    }
  };

  return (
    <>
      <h1>Carrera Nueva</h1>

      {message !== "" && (
        <div className={`alert ${statusMessage ? 'alert-success' : 'alert-danger'}`} role="alert" id="alertMessage">
          {message}
        </div>
      )}

      <NavLink to="/enterprise/carrers" className="btn btn-secondary mb-3">
        Retroceder
      </NavLink>

      <form onSubmit={_agregarCarrera}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre de la carrera
          </label>

          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Ingrese el nombre de la carrera"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar Carrera
        </button>
      </form>
    </>
  );
}
