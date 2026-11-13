// src/pages/enterprise/CarreraListado.jsx

import { useState, useEffect, useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './EstudianteListado.css'; // estilos compartidos (st-*)
import './CarreraListado.css';
import axios from 'axios';

export default function CarreraListado() {
  const navigate = useNavigate();

  const [carrers, setCarrers] = useState([]);
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
    await Promise.all([_cargarCarreras(), _cargarEstudiantes()]);
    setLoading(false);
  };

  const _cargarCarreras = async () => {
    try {
      const response = await axios.get('/api/v1/carrers');
      setCarrers(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Error al listar las carreras');
      setStatusMessage(false);
    }
  };

  // Solo para contar cuántos estudiantes tiene cada carrera
  const _cargarEstudiantes = async () => {
    try {
      const response = await axios.get('/api/v1/students');
      setStudents(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const countByCarrer = useMemo(() => {
    const counts = {};
    students.forEach((st) => {
      counts[st.carrere_id] = (counts[st.carrere_id] || 0) + 1;
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
    return carrers.filter((c) => text === '' || c.name.toLowerCase().includes(text));
  }, [carrers, search]);

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
        va = countByCarrer[a.id] || 0;
        vb = countByCarrer[b.id] || 0;
      } else {
        va = a.id;
        vb = b.id;
      }

      if (va < vb) return sort.dir === 'asc' ? -1 : 1;
      if (va > vb) return sort.dir === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [filtered, sort, countByCarrer]);

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
    navigate('/enterprise/carrers/' + id + '/edit');
  };

  const _eliminar = async (e, id) => {
    const total = countByCarrer[id] || 0;
    const aviso = total > 0
      ? `Esta carrera tiene ${total} estudiante(s); quedarán sin carrera asignada.\n\n`
      : '';

    const confirmar = window.confirm(
      aviso + '¿Estás seguro de que deseas eliminar esta carrera? Esta acción no se puede deshacer.'
    );
    if (!confirmar) return;

    try {
      const response = await axios.delete('/api/v1/carrers/' + id);
      await _cargarTodo();
      setMessage(response.data.message);
      setStatusMessage(response.data.success);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Error al eliminar la carrera');
      setStatusMessage(false);
    }
  };

  const hayCambiosSinAplicar = searchInput.trim() !== search;

  return (
    <div className="st-page">
      {/* Encabezado */}
      <header className="st-header">
        <div>
          <h1 className="st-title">Listado de Carreras</h1>
          <p className="st-subtitle">
            Administra las carreras. Escribe un nombre y pulsa <strong>Filtrar</strong>.
          </p>
        </div>
        <div className="st-header-actions">
          <NavLink to="/enterprise/carrers/new" className="st-btn st-btn-primary st-btn-link">
            + Agregar carrera
          </NavLink>
          <div className="st-stat">
            <span className="st-stat-number">{carrers.length}</span>
            <span className="st-stat-label">carreras registradas</span>
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
              placeholder="Ej: Sistemas, Derecho, Marketing…"
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
          Mostrando <strong>{sorted.length}</strong> de {carrers.length} carreras
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
                Carrera <span className="st-sort">{sortIcon('name')}</span>
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
                <td colSpan="4" className="st-empty">Cargando carreras…</td>
              </tr>
            )}

            {!loading && paginated.map((carrer, index) => (
              <tr key={carrer.id}>
                <td className="st-id">{startIndex + index + 1}</td>
                <td>
                  <div className="st-person">
                    <span className="st-avatar st-avatar-initials st-avatar-square">
                      {carrer.name?.[0]?.toUpperCase() ?? '?'}
                    </span>
                    <div className="st-person-name">{carrer.name}</div>
                  </div>
                </td>
                <td>
                  <span className="st-badge st-badge-carrer">
                    {countByCarrer[carrer.id] || 0} estudiante(s)
                  </span>
                </td>
                <td className="st-center">
                  <div className="st-row-actions">
                    <button
                      type="button"
                      className="st-btn-icon st-btn-edit"
                      onClick={(e) => _editar(e, carrer.id)}
                      title="Editar"
                    >
                      ✎ Editar
                    </button>
                    <button
                      type="button"
                      className="st-btn-icon st-btn-delete"
                      onClick={(e) => _eliminar(e, carrer.id)}
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
                  No encontramos carreras con ese nombre.
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
