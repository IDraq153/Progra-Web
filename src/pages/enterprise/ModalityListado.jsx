// src/pages/enterprise/ModalityListado.jsx

import { useState, useEffect, useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './ModalityListado.css'; // estilos compartidos (st-*)
import './ProfileListado.css';
import axios from 'axios';

export default function ModalityListado() {
  const navigate = useNavigate();

  const [modalities, setModalities] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState(false);

  // Lo que se escribe (aún no aplicado) y lo que se aplicó al pulsar "Filtrar"
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

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
    await Promise.all([_cargarPerfiles(), _cargarEstudiantes()]);
    setLoading(false);
  };

  const _cargarPerfiles = async () => {
    try {
      const response = await axios.get('/api/v1/modalities');
      setModalities(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Error al listar las modalidades');
      setStatusMessage(false);
    }
  };

  // Solo para contar cuántos estudiantes tiene cada modalidad, para mostrarlo en la tabla. No es necesario filtrar ni paginar.
  const _cargarEstudiantes = async () => {
    try {
      const response = await axios.get('/api/v1/students');
      setStudents(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const countByProfile = useMemo(() => {
    const counts = {};
    students.forEach((st) => {
      counts[st.profile_id] = (counts[st.profile_id] || 0) + 1;
    });
    return counts;
  }, [students]);

  // ---------- Filtrar ----------
  const _filtrar = (e) => {
    e.preventDefault();
    setSearch(searchInput.trim());
    setPage(1);
  };

  const _limpiar = () => {
    setSearchInput('');
    setSearch('');
    setPage(1);
  };

  const filtered = useMemo(() => {
    const text = search.toLowerCase();
    return modalities.filter((p) => text === '' || p.name.toLowerCase().includes(text));
  }, [modalities, search]);

  // ---------- Ordenar ----------
  const sorted = useMemo(() => {
    const list = [...filtered];
    list.sort((a, b) => {
      let va;
      let vb;

      if (sort.key === 'name') {
        va = a.name.toLowerCase();
        vb = b.name.toLowerCase();
      } else if (sort.key === 'students') {
        va = countByProfile[a.id] || 0;
        vb = countByProfile[b.id] || 0;
      } else {
        va = a.id;
        vb = b.id;
      }

      if (va < vb) return sort.dir === 'asc' ? -1 : 1;
      if (va > vb) return sort.dir === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [filtered, sort, countByProfile]);

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
    navigate('/enterprise/modalities/' + id + '/edit');
  };

  const _eliminar = async (e, id) => {
    const total = countByProfile[id] || 0;
    const aviso = total > 0
      ? `Esta modalidad tiene ${total} estudiante(s); quedarán sin modalidad asignada.\n\n`
      : '';

    const confirmar = window.confirm(
      aviso + '¿Estás seguro de que deseas eliminar esta modalidad? Esta acción no se puede deshacer.'
    );
    if (!confirmar) return;

    try {
      const response = await axios.delete('/api/v1/modalities/' + id);
      await _cargarTodo();
      setMessage(response.data.message);
      setStatusMessage(response.data.success);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Error al eliminar la modalidad');
      setStatusMessage(false);
    }
  };

  const hayCambiosSinAplicar = searchInput.trim() !== search;

  return (
    <div className="st-page">
      {/* Encabezado */}
      <header className="st-header">
        <div>
          <h1 className="st-title">Listado de Modalidades</h1>
          <p className="st-subtitle">
            Administra las modalidades. Escribe un nombre y pulsa <strong>Filtrar</strong>.
          </p>
        </div>
        <div className="st-header-actions">
          <NavLink to="/enterprise/modalities/new" className="st-btn st-btn-primary st-btn-link">
            + Agregar modalidad
          </NavLink>
          <div className="st-stat">
            <span className="st-stat-number">{modalities.length}</span>
            <span className="st-stat-label">modalidades registradas</span>
          </div>
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
        <div className="st-filters-grid st-filters-grid-simple">
          <label className="st-field st-field-wide">
            <span className="st-field-label">
              <span className="st-step">1</span> Buscar por nombre
            </span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Ej: Remoto, Presencial, Online…"
            />
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

      {/* Resumen + filtro aplicado */}
      <div className="st-summary">
        <span>
          Mostrando <strong>{sorted.length}</strong> de {modalities.length} modalidades
        </span>

        {search !== '' && (
          <div className="st-chips">
            <span className="st-chip">
              Texto: "{search}"
              <button type="button" onClick={_limpiar} aria-label="Quitar filtro">✕</button>
            </span>
          </div>
        )}
      </div>

      {/* Tabla */}
      <div className="st-table-card">
        <table className="st-table">
          <thead>
            <tr>
              <th className="st-sortable" onClick={() => _ordenar('id')}>
                N° <span className="st-sort">{sortIcon('id')}</span>
              </th>
              <th className="st-sortable" onClick={() => _ordenar('name')}>
                Modalidad <span className="st-sort">{sortIcon('name')}</span>
              </th>
              <th className="st-sortable" onClick={() => _ordenar('students')}>
                Estudiantes <span className="st-sort">{sortIcon('students')}</span>
              </th>
              <th className="st-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="4" className="st-empty">Cargando modalidades…</td>
              </tr>
            )}

            {!loading && paginated.map((modality, index) => (
              <tr key={modality.id}>
                <td className="st-id">{startIndex + index + 1}</td>
                <td>
                  <div className="st-person">
                    <span className="st-avatar st-avatar-initials st-avatar-square">
                      {modality.name?.[0]?.toUpperCase() ?? '?'}
                    </span>
                    <div className="st-person-name">{modality.name}</div>
                  </div>
                </td>
                <td>
                  <span className="st-badge st-badge-profile">
                    {countByProfile[modality.id] || 0} estudiante(s)
                  </span>
                </td>
                <td className="st-center">
                  <div className="st-row-actions">
                    <button
                      type="button"
                      className="st-btn-icon st-btn-edit"
                      onClick={(e) => _editar(e, modality.id)}
                      title="Editar"
                    >
                      ✎ Editar
                    </button>
                    <button
                      type="button"
                      className="st-btn-icon st-btn-delete"
                      onClick={(e) => _eliminar(e, modality.id)}
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
                <td colSpan="4" className="st-empty">
                  <div className="st-empty-icon">🔎</div>
                  No encontramos modalidades con ese nombre.
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
