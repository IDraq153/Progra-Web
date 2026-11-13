// src/pages/enterprise/EstudianteDetalle.jsx

import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './EstudianteListado.css'; // estilos compartidos (st-*)
import axios from 'axios';

const FORM_VACIO = {
  names: '',
  last_names: '',
  email: '',
  phone: '',
  district_id: '',
  carrere_id: '',
  sementer_id: '',
  picture_url: '',
  summary: '',
};

export default function EstudianteDetalle() {
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(FORM_VACIO);

  // Listas para los selects
  const [carrers, setCarrers] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    _cargarLista('/api/v1/carrers', setCarrers);
    _cargarLista('/api/v1/semesters', setSemesters);
    _cargarLista('/api/v1/districts', setDistricts);
  }, []);

  const _cargarLista = async (url, setter) => {
    try {
      const response = await axios.get(url);
      setter(response.data.data || []);
    } catch (error) {
      console.error(url, error);
    }
  };

  const _cambiar = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Vacío -> null; los ids de los selects -> número
  const _texto = (value) => (value.trim() === '' ? null : value.trim());
  const _numero = (value) => (value === '' ? null : Number(value));

  // Registrar nuevo estudiante
  const _guardarEstudiante = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await axios.post('/api/v1/students', {
        names: form.names.trim(),
        last_names: form.last_names.trim(),
        email: form.email.trim(),
        phone: _texto(form.phone),
        district_id: _numero(form.district_id),
        carrere_id: _numero(form.carrere_id),
        sementer_id: _numero(form.sementer_id),
        picture_url: _texto(form.picture_url),
        summary: _texto(form.summary),
      });

      if (response.data.success) {
        setForm(FORM_VACIO);
      }

      setMessage(response.data.message);
      setStatusMessage(response.data.success);
    } catch (error) {
      console.error(error);

      const data = error.response?.data;
      const detalle = data?.error ? ` (${data.error})` : '';

      setMessage((data?.message || 'Error al registrar el estudiante') + detalle);
      setStatusMessage(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="st-page">
      <header className="st-header">
        <div>
          <h1 className="st-title">Estudiante Nuevo</h1>
          <p className="st-subtitle">
            Completa los datos del estudiante. Los campos con <strong>*</strong> son obligatorios.
          </p>
        </div>
        <NavLink to="/enterprise/students" className="st-btn st-btn-ghost st-btn-link">
          ‹ Retroceder
        </NavLink>
      </header>

      {message !== '' && (
        <div className={`st-alert ${statusMessage ? 'st-alert-success' : 'st-alert-danger'}`} role="alert">
          <span>{message}</span>
          <button type="button" onClick={() => setMessage('')} aria-label="Cerrar">✕</button>
        </div>
      )}

      <form className="st-filters" onSubmit={_guardarEstudiante}>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="names" className="form-label">Nombres *</label>
            <input
              type="text"
              id="names"
              name="names"
              className="form-control"
              placeholder="Ej: Dario"
              value={form.names}
              onChange={_cambiar}
              maxLength={45}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="last_names" className="form-label">Apellidos *</label>
            <input
              type="text"
              id="last_names"
              name="last_names"
              className="form-control"
              placeholder="Ej: Rua Perez"
              value={form.last_names}
              onChange={_cambiar}
              maxLength={100}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="email" className="form-label">Correo *</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="correo@ejemplo.com"
              value={form.email}
              onChange={_cambiar}
              maxLength={45}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="phone" className="form-label">Teléfono</label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="form-control"
              placeholder="987654321"
              value={form.phone}
              onChange={_cambiar}
              maxLength={15}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="carrere_id" className="form-label">Carrera</label>
            <select
              id="carrere_id"
              name="carrere_id"
              className="form-select"
              value={form.carrere_id}
              onChange={_cambiar}
            >
              <option value="">Selecciona una carrera</option>
              {carrers.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label htmlFor="sementer_id" className="form-label">Semestre</label>
            <select
              id="sementer_id"
              name="sementer_id"
              className="form-select"
              value={form.sementer_id}
              onChange={_cambiar}
            >
              <option value="">Selecciona un semestre</option>
              {semesters.map((sm) => (
                <option key={sm.id} value={sm.id}>{sm.name}</option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label htmlFor="district_id" className="form-label">Distrito</label>
            <select
              id="district_id"
              name="district_id"
              className="form-select"
              value={form.district_id}
              onChange={_cambiar}
            >
              <option value="">Selecciona un distrito</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="col-12">
            <label htmlFor="picture_url" className="form-label">URL de la foto</label>
            <input
              type="url"
              id="picture_url"
              name="picture_url"
              className="form-control"
              placeholder="https://..."
              value={form.picture_url}
              onChange={_cambiar}
              maxLength={100}
            />
          </div>

          <div className="col-12">
            <label htmlFor="summary" className="form-label">Resumen</label>
            <textarea
              id="summary"
              name="summary"
              className="form-control"
              rows={3}
              placeholder="Intereses y presentación breve del estudiante"
              value={form.summary}
              onChange={_cambiar}
            />
          </div>
        </div>

        <div className="mt-4 d-flex gap-2">
          <button type="submit" className="st-btn st-btn-primary" disabled={saving}>
            {saving ? 'Guardando…' : 'Guardar Estudiante'}
          </button>
          <button
            type="button"
            className="st-btn st-btn-ghost"
            onClick={() => setForm(FORM_VACIO)}
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}
