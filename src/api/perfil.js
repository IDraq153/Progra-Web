// src/api/perfil.js
// Perfil del local en sesión: datos, contacto, logo y galería de fotografías.
import axios from 'axios';
import { archivoADataUrl, subirLogoLocal } from './carta';

const api = axios.create({ baseURL: '/api/v1', withCredentials: true });

// Si el servidor no devuelve JSON de la API (p. ej. una página HTML por sesión caída) se lanza un error
// en vez de devolver undefined, para que cada pantalla muestre su mensaje y no se rompa.
const datos = (respuesta) => {
  if (!respuesta.data || typeof respuesta.data !== 'object') {
    throw new Error('El servidor no devolvió una respuesta válida');
  }
  return respuesta.data.data;
};

export const obtenerPerfilLocal = async () => datos(await api.get('/my-store/profile'));

// { commercial_name, campus_location, description, phone }
export const guardarPerfilLocal = async (perfil) => datos(await api.put('/my-store/profile', perfil));

export const agregarFotoLocal = async (archivo) =>
  datos(await api.post('/my-store/photos', { image: await archivoADataUrl(archivo) }));

export const quitarFotoLocal = async (idFoto) => api.delete(`/my-store/photos/${idFoto}`);

export const cambiarLogoLocal = async (archivo) => subirLogoLocal(await archivoADataUrl(archivo));
