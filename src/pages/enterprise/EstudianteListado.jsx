// src/pages/enterprise/EstudianteListado.jsx

import { useState, useEffect, useMemo } from 'react';
import './EstudianteListado.css';
import axios from 'axios';

// Filtros vacíos (estado inicial y al limpiar)
const FILTROS_VACIOS = { text: '', carrerId: '', semesterId: '' };

// Foto del estudiante; si no hay URL o la imagen no carga, muestra sus iniciales
function StudentAvatar({ url, names, lastNames }) {
  const [failed, setFailed] = useState(false);
  const initials = `${names?.[0] ?? ''}${lastNames?.[0] ?? ''}`.toUpperCase();

  if (!url || failed) {
    return <span className="st-avatar st-avatar-initials">{initials || '?'}</span>;
  }

  return (
    <img
      src={url}
      alt={names}
      className="st-avatar"
      onError={() => setFailed(true)}
    />
  );
}

export default function EstudianteListado() {
  const [students, setStudents] = useState([]);
  const [carrers, setCarrers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState(false);

  // Lo que el usuario está eligiendo en el formulario (aún no aplicado)
  const [form, setForm] = useState(FILTROS_VACIOS);
  // Lo que se aplicó al pulsar "Filtrar"
  const [applied, setApplied] = useState(FILTROS_VACIOS);

  // Orden de la tabla
  const [sort, setSort] = useState({ key: 'id', dir: 'asc' });

  // Paginación
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    _cargarTodo();
  }, []);

  const _cargarTodo = async () => {
    setLoading(true);
    await Promise.all([_cargarEstudiantes(), _cargarCarreras()]);
    setLoading(false);
  };

  const _cargarEstudiantes = async () => {
    try {
      const response = await axios.get('/api/v1/students');
      setStudents(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Error al listar los estudiantes');
      setStatusMessage(false);
    }
  };

  const _cargarCarreras = async () => {
    try {
      const response = await axios.get('/api/v1/carrers');
      setCarrers(response.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const carrerName = (id) => carrers.find((c) => c.id === id)?.name ?? '-';
  // El semestre ya viene dentro de cada estudiante (student.semester)
  const semesterName = (st) =>
    st.semester?.name ?? (st.sementer_id ? `Semestre ${st.sementer_id}` : '-');

  // Opciones del select: los semestres que tienen los estudiantes
  const semesterOptions = useMemo(() => {
    const map = new Map();
    students.forEach((st) => {
      if (st.sementer_id) map.set(st.sementer_id, semesterName(st));
    });
    return [...map.entries()]
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [students]);

  // ---------- Filtrar ----------
  const _filtrar = (e) => {
    e.preventDefault();
    setApplied({ ...form, text: form.text.trim() });
    setPage(1);
  };

  const _limpiar = () => {
    setForm(FILTROS_VACIOS);
    setApplied(FILTROS_VACIOS);
    setPage(1);
  };

  // Quitar un solo filtro desde su etiqueta
  const _quitarFiltro = (key) => {
    const next = { ...applied, [key]: '' };
    setApplied(next);
    setForm(next);
    setPage(1);
  };

  // El texto busca en nombre, apellido, correo, teléfono, carrera y semestre
  const filtered = useMemo(() => {
    const text = applied.text.toLowerCase();

    return students.filter((st) => {
      const matchesCarrer =
        applied.carrerId === '' || st.carrere_id === Number(applied.carrerId);
      const matchesSemester =
        applied.semesterId === '' || st.sementer_id === Number(applied.semesterId);

      const searchable = [
        st.names,
        st.last_names,
        st.email,
        st.phone,
        carrerName(st.carrere_id),
        semesterName(st),
      ]
        .join(' ')
        .toLowerCase();

      const matchesText = text === '' || searchable.includes(text);

      return matchesCarrer && matchesSemester && matchesText;
    });
  }, [students, applied, carrers]);

  // ---------- Ordenar ----------
  const sortValue = (st, key) => {
    switch (key) {
      case 'name': return `${st.names} ${st.last_names}`.toLowerCase();
      case 'carrer': return carrerName(st.carrere_id).toLowerCase();
      case 'semester': return semesterName(st).toLowerCase();
      default: return st.id;
    }
  };

  const sorted = useMemo(() => {
    const list = [...filtered];
    list.sort((a, b) => {
      const va = sortValue(a, sort.key);
      const vb = sortValue(b, sort.key);
      if (va < vb) return sort.dir === 'asc' ? -1 : 1;
      if (va > vb) return sort.dir === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [filtered, sort, carrers]);

  const _ordenar = (key) => {
    setSort((prev) => ({
      key,
      dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortIcon = (key) => {
    if (sort.key !== key) return '↕';
    return sort.dir === 'asc' ? '↑' : '↓';
  };

  // ---------- Paginación ----------
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const paginated = sorted.slice(startIndex, startIndex + pageSize);

  const pageNumbers = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  }, [totalPages, currentPage]);

  // ---------- Acciones ----------
  const _editar = (e, id) => {
    setMessage('La edición del estudiante #' + id + ' aún no está disponible.');
    setStatusMessage(false);
  };

  const _eliminar = async (e, id) => {
    const confirmar = window.confirm(
      '¿Estás seguro de que deseas eliminar este estudiante? Esta acción no se puede deshacer.'
    );
    if (!confirmar) return;

    try {
      const response = await axios.delete('/api/v1/students/' + id);
      await _cargarEstudiantes();
      setMessage(response.data.message);
      setStatusMessage(response.data.success);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Error al eliminar el estudiante');
      setStatusMessage(false);
    }
  };

  // Etiquetas de filtros aplicados
  const chips = [
    applied.text && { key: 'text', label: `Texto: "${applied.text}"` },
    applied.carrerId && { key: 'carrerId', label: `Carrera: ${carrerName(Number(applied.carrerId))}` },
    applied.semesterId && { key: 'semesterId', label: `Semestre: ${semesterOptions.find((o) => o.id === Number(applied.semesterId))?.name ?? applied.semesterId}` },
  ].filter(Boolean);

  const hayCambiosSinAplicar =
    form.text.trim() !== applied.text ||
    form.carrerId !== applied.carrerId ||
    form.semesterId !== applied.semesterId;

  return (
    <div className="st-page">
      {/* Encabezado */}
      <header className="st-header">
        <div>
          <h1 className="st-title">Listado de Estudiantes</h1>
          <p className="st-subtitle">
            Encuentra talento por nombre, carrera o semestre. Elige tus filtros y pulsa <strong>Filtrar</strong>.
          </p>
        </div>
        <div className="st-stat">
          <span className="st-stat-number">{students.length}</span>
          <span className="st-stat-label">estudiantes registrados</span>
        </div>
      </header>

      {message !== '' && (
        <div className={`st-alert ${statusMessage ? 'st-alert-success' : 'st-alert-danger'}`} role="alert">
          <span>{message}</span>
          <button type="button" onClick={() => setMessage('')} aria-label="Cerrar">✕</button>
        </div>
      )}

      {/* Panel de filtros */}
      <form className="st-filters" onSubmit={_filtrar}>
        <div className="st-filters-grid">
          <label className="st-field st-field-wide">
            <span className="st-field-label">
              <span className="st-step">1</span> Buscar
            </span>
            <input
              type="text"
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              placeholder="Nombre, correo, teléfono, carrera o semestre…"
            />
          </label>

          <label className="st-field">
            <span className="st-field-label">
              <span className="st-step">2</span> Carrera
            </span>
            <select
              value={form.carrerId}
              onChange={(e) => setForm({ ...form, carrerId: e.target.value })}
            >
              <option value="">Todas las carreras</option>
              {carrers.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </label>

          <label className="st-field">
            <span className="st-field-label">
              <span className="st-step">3</span> Semestre
            </span>
            <select
              value={form.semesterId}
              onChange={(e) => setForm({ ...form, semesterId: e.target.value })}
            >
              <option value="">Todos los semestres</option>
              {semesterOptions.map((sm) => (
                <option key={sm.id} value={sm.id}>{sm.name}</option>
              ))}
            </select>
          </label>

          <div className="st-field st-actions">
            <button type="submit" className="st-btn st-btn-primary">
              Filtrar
            </button>
            <button type="button" className="st-btn st-btn-ghost" onClick={_limpiar}>
              Limpiar
            </button>
          </div>
        </div>

        {hayCambiosSinAplicar && (
          <p className="st-hint">
            💡 Tienes cambios sin aplicar. Pulsa <strong>Filtrar</strong> para ver los resultados.
          </p>
        )}
      </form>

      {/* Resumen + filtros aplicados */}
      <div className="st-summary">
        <span>
          Mostrando <strong>{sorted.length}</strong> de {students.length} estudiantes
        </span>

        {chips.length > 0 && (
          <div className="st-chips">
            {chips.map((chip) => (
              <span key={chip.key} className="st-chip">
                {chip.label}
                <button type="button" onClick={() => _quitarFiltro(chip.key)} aria-label="Quitar filtro">
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Tabla */}
      <div className="st-table-card">
        <table className="st-table">
          <thead>
            <tr>
              <th className="st-sortable" onClick={() => _ordenar('id')}>
                # <span className="st-sort">{sortIcon('id')}</span>
              </th>
              <th className="st-sortable" onClick={() => _ordenar('name')}>
                Estudiante <span className="st-sort">{sortIcon('name')}</span>
              </th>
              <th>Teléfono</th>
              <th className="st-sortable" onClick={() => _ordenar('carrer')}>
                Carrera <span className="st-sort">{sortIcon('carrer')}</span>
              </th>
              <th className="st-sortable" onClick={() => _ordenar('semester')}>
                Semestre <span className="st-sort">{sortIcon('semester')}</span>
              </th>
              <th>Perfil</th>
              <th className="st-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="7" className="st-empty">Cargando estudiantes…</td>
              </tr>
            )}

            {!loading && paginated.map((student) => (
              <tr key={student.id}>
                <td className="st-id">{student.id}</td>
                <td>
                  <div className="st-person">
                    <StudentAvatar
                      url={student.picture_url}
                      names={student.names}
                      lastNames={student.last_names}
                    />
                    <div>
                      <div className="st-person-name">
                        {student.names} {student.last_names}
                      </div>
                      <div className="st-person-email">{student.email}</div>
                    </div>
                  </div>
                </td>
                <td>{student.phone || '-'}</td>
                <td>
                  <span className="st-badge st-badge-carrer">{carrerName(student.carrere_id)}</span>
                </td>
                <td>
                  <span className="st-badge st-badge-semester">{semesterName(student)}</span>
                </td>
                <td>
                  <span className="st-badge st-badge-profile">{student.user?.profile?.name ?? '-'}</span>
                </td>
                <td className="st-center">
                  <div className="st-row-actions">
                    <button
                      type="button"
                      className="st-btn-icon st-btn-edit"
                      onClick={(e) => _editar(e, student.id)}
                      title="Editar"
                    >
                      ✎ Editar
                    </button>
                    <button
                      type="button"
                      className="st-btn-icon st-btn-delete"
                      onClick={(e) => _eliminar(e, student.id)}
                      title="Eliminar"
                    >
                      🗑 Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {!loading && sorted.length === 0 && (
              <tr>
                <td colSpan="7" className="st-empty">
                  <div className="st-empty-icon">🔎</div>
                  No encontramos estudiantes con esos filtros.
                  <br />
                  <button type="button" className="st-link" onClick={_limpiar}>
                    Limpiar filtros
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Paginación */}
        {!loading && sorted.length > 0 && (
          <div className="st-pagination">
            <label className="st-page-size">
              Filas por página
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </label>

            <span className="st-page-info">
              {startIndex + 1}–{Math.min(startIndex + pageSize, sorted.length)} de {sorted.length}
            </span>

            <div className="st-page-buttons">
              <button type="button" onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>
                ‹
              </button>

              {pageNumbers.map((n, i) =>
                n === '...' ? (
                  <span key={'dots' + i} className="st-page-dots">…</span>
                ) : (
                  <button
                    type="button"
                    key={n}
                    className={n === currentPage ? 'active' : ''}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </button>
                )
              )}

              <button
                type="button"
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
