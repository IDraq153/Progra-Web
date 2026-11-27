// src/api/solicitudes.js
// Solicitudes de registro de locales (pantalla del owner).
import axios from 'axios';

const api = axios.create({ baseURL: '/api/v1', withCredentials: true });

// Si el servidor no devuelve JSON de la API (p. ej. una página HTML por sesión caída) se lanza un error
// en vez de devolver undefined, para que cada pantalla muestre su mensaje y no se rompa.
const datos = (respuesta) => {
  if (!respuesta.data || typeof respuesta.data !== 'object') {
    throw new Error('El servidor no devolvió una respuesta válida');
  }
  return respuesta.data.data;
};

export const listarSolicitudes = async () => datos(await api.get('/store-requests', { params: { status: 'todos' } }));

// status: 'activo' (aprobar) | 'rechazado' (observar) | 'pendiente' (volver a revisión)
export const cambiarEstadoSolicitud = async (id, status) =>
  datos(await api.patch(`/store-requests/${id}/status`, { status }));
