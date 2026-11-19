
import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './ModalityListado';
import axios from 'axios';

export default function ModalityDetalle() {
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState(false);
  const [name, setName] = useState("");

  const { id } = useParams();

  // Obtener modalidad para editar
  const _obtenerModalidad = async () => {
    if (id !== undefined) {
      try {
        const response = await axios.get('/api/v1/modalities/' + id);

        console.log(response.data);
        setName(response.data.data.name);

      } catch (error) {
        console.error(error);
        setMessage(
          error.response?.data?.message || "Error al obtener la modalidad"
        );
        setStatusMessage(false);
      }
    }
  };

  useEffect(() => {
    _obtenerModalidad();
  }, [id]);

  // Registrar o actualizar modalidad
  const _guardarModalidad = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (id === undefined) {
        // Registrar nueva modalidad
        response = await axios.post('/api/v1/modalities', {
          name: name
        });
        if (response.data.success) {
          setName("");
        }
      } else {
        // Actualizar modalidad
        response = await axios.put(`/api/v1/modalities/` + id, {
          name: name
        });
      }

      setMessage(response.data.message);
      setStatusMessage(response.data.success);


    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message || "Error al registrar la modalidad"
      );

      setStatusMessage(false);
    }
  };

  // Renderizar componente
  return (
    <>
      <h1>{id === undefined ? "Modalidad Nueva" : "Editar Modalidad"}</h1>

      {message !== "" && (
        <div
          className={`alert ${statusMessage ? 'alert-success' : 'alert-danger'}`}
          role="alert"
          id="alertMessage"
        >
          {message}
        </div>
      )}

      <NavLink to="/enterprise/modalities" className="btn btn-secondary mb-3">
        Retroceder
      </NavLink>

      <form onSubmit={_guardarModalidad}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre de la modalidad
          </label>

          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Ingrese el nombre de la modalidad"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar Modalidad
        </button>
      </form>
    </>
  );
}
