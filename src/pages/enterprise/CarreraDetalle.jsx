
import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './CarreraDetalle.css';
import axios from 'axios';

export default function CarreraDetalle() {
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState(false);
  const [name, setName] = useState("");

  const { id } = useParams();

  // Obtener carrera para editar
  const _obtenerCarrera = async () => {
    if (id !== undefined) {
      try {
        const response = await axios.get('/api/v1/carrers/' + id);

        console.log(response.data);
        setName(response.data.data.name);

      } catch (error) {
        console.error(error);
        setMessage(
          error.response?.data?.message || "Error al obtener la carrera"
        );
        setStatusMessage(false);
      }
    }
  };

  useEffect(() => {
    _obtenerCarrera();
  }, [id]);

  // Registrar o actualizar carrera
  const _guardarCarrera = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (id === undefined) {
        // Registrar nueva carrera
        response = await axios.post('/api/v1/carrers', {
          name: name
        });
        if (response.data.success) {
          setName("");
        }
      } else {
        // Actualizar carrera
        response = await axios.put(`/api/v1/carrers/` + id, {
          name: name
        });
      }

      setMessage(response.data.message);
      setStatusMessage(response.data.success);


    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message || "Error al registrar la carrera"
      );

      setStatusMessage(false);
    }
  };

  // Renderizar componente
  return (
    <>
      <h1>{id === undefined ? "Carrera Nueva" : "Editar Carrera"}</h1>

      {message !== "" && (
        <div
          className={`alert ${statusMessage ? 'alert-success' : 'alert-danger'}`}
          role="alert"
          id="alertMessage"
        >
          {message}
        </div>
      )}

      <NavLink to="/enterprise/carrers" className="btn btn-secondary mb-3">
        Retroceder
      </NavLink>

      <form onSubmit={_guardarCarrera}>
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
