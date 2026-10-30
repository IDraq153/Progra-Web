import { useMemo, useState } from 'react'
import './MisConvocatorias.css'

const convocatorias = [
  {
    id: 1,
    title: 'Practicante de Soporte TI',
    careers: ['Ing. de Sistemas'],
    published: '02/08/2026',
    closed: '18/09/2026',
    applicants: 31,
    status: 'Vigente',
    is_draft: false,
  },
  {
    id: 2,
    title: 'Practicante de Gestión Humana',
    careers: ['Psicología', 'Administración'],
    published: '05/08/2026',
    closed: '20/09/2026',
    applicants: 14,
    status: 'Vigente',
    is_draft: false,
  },
  {
    id: 3,
    title: 'Practicante de Mejora de Procesos',
    careers: ['Ing. Industrial'],
    published: '12/08/2026',
    closed: '26/09/2026',
    applicants: 22,
    status: 'Vigente',
    is_draft: false,
  },
  {
    id: 4,
    title: 'Practicante de Desarrollo de Software',
    careers: ['Ing. de Sistemas'],
    published: '18/08/2026',
    closed: '30/09/2026',
    applicants: 23,
    status: 'Vigente',
    is_draft: false,
  },
  {
    id: 5,
    title: 'Practicante de Finanzas',
    careers: ['Contabilidad', 'Administración'],
    published: '02/07/2026',
    closed: '31/07/2026',
    applicants: 18,
    status: 'Cerrada',
    is_draft: false,
  },
  {
    id: 6,
    title: 'Practicante de Comercio Exterior',
    careers: ['Administración'],
    published: '15/06/2026',
    closed: '14/07/2026',
    applicants: 9,
    status: 'Cerrada',
    is_draft: false,
  },
  {
    id: 7,
    title: 'Practicante de Data Analytics',
    careers: ['Ing. de Sistemas', 'Ing. Industrial'],
    published: '01/06/2026',
    closed: '30/06/2026',
    applicants: 27,
    status: 'Cerrada',
    is_draft: false,
  },
  {
    id: 8,
    title: 'Practicante de Marketing Digital',
    careers: ['Marketing', 'Comunicación'],
    published: '—',
    closed: '—',
    applicants: 0,
    status: 'Borrador',
    is_draft: true,
  },
  {
    id: 9,
    title: 'Practicante de Arquitectura de Datos',
    careers: ['Ing. de Sistemas'],
    published: '—',
    closed: '—',
    applicants: 0,
    status: 'Borrador',
    is_draft: true,
  },
]

const filtros = [
  {
    id: 'todas',
    label: 'Todas',
  },
  {
    id: 'vigentes',
    label: 'Vigentes',
  },
  {
    id: 'cerradas',
    label: 'Cerradas',
  },
  {
    id: 'borradores',
    label: 'Borradores',
  },
]

function filtrarConvocatorias(data, filtro) {
  switch (filtro) {
    case 'vigentes':
      return data.filter((item) => item.status === 'Vigente')

    case 'cerradas':
      return data.filter((item) => item.status === 'Cerrada')

    case 'borradores':
      return data.filter((item) => item.is_draft)

    default:
      return data
  }
}

export default function MisConvocatorias() {
  const [filtro, setFiltro] = useState('todas')
  const [search, setSearch] = useState('')

  const cantidades = useMemo(() => ({
    todas: convocatorias.length,
    vigentes: convocatorias.filter(
      (item) => item.status === 'Vigente'
    ).length,
    cerradas: convocatorias.filter(
      (item) => item.status === 'Cerrada'
    ).length,
    borradores: convocatorias.filter(
      (item) => item.is_draft
    ).length,
  }), [])

  const convocatoriasFiltradas = useMemo(() => {
    const resultado = filtrarConvocatorias(convocatorias, filtro)

    const texto = search.trim().toLowerCase()

    if (!texto) {
      return resultado
    }

    return resultado.filter((item) => {
      const titulo = item.title.toLowerCase()

      const carreras = item.careers
        .join(' ')
        .toLowerCase()

      return (
        titulo.includes(texto) ||
        carreras.includes(texto)
      )
    })
  }, [filtro, search])

  return (
    <div className="mis-convocatorias">

      {/* =====================================================
          HEADER
          ===================================================== */}
      <div className="mis-convocatorias-header">

        <div>
          <div className="breadcrumb-custom">
            Convocatorias <span>•</span> Mis convocatorias
          </div>

          <h1>Mis convocatorias</h1>
        </div>

        <button
          type="button"
          className="btn btn-primary nueva-convocatoria-btn"
        >
          + Nueva convocatoria
        </button>

      </div>


      {/* =====================================================
          FILTROS
          ===================================================== */}
      <div className="convocatorias-toolbar">

        <div className="search-wrapper">
          <span className="search-icon">
            ○
          </span>

          <input
            id="search"
            name="search"
            type="search"
            className="form-control"
            placeholder="Buscar por puesto o carrera"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>


        <div className="status-filters">

          {filtros.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`status-filter ${
                filtro === item.id ? 'active' : ''
              }`}
              onClick={() => setFiltro(item.id)}
            >
              {item.label}

              <span>
                {cantidades[item.id]}
              </span>
            </button>
          ))}

        </div>


        <div className="results-info">
          {convocatoriasFiltradas.length} convocatoria
          {convocatoriasFiltradas.length !== 1 ? 's' : ''}
          {' '}· ordenadas por cierre
        </div>

      </div>


      {/* =====================================================
          TABLA
          ===================================================== */}
      <div className="convocatorias-table-wrapper">

        <table className="table convocatorias-table">

          <thead>
            <tr>
              <th scope="col">PUESTO</th>
              <th scope="col">CARRERAS</th>
              <th scope="col">PUBLICACIÓN</th>
              <th scope="col">CIERRE</th>
              <th scope="col">POSTULANTES</th>
              <th scope="col">ESTADO</th>
              <th scope="col" className="actions-column">
                ACCIONES
              </th>
            </tr>
          </thead>

          <tbody>

            {convocatoriasFiltradas.map((convocatoria) => (
              <tr key={convocatoria.id}>

                {/* title */}
                <td className="position-cell">
                  {convocatoria.title}
                </td>


                {/* applications_carrers */}
                <td className="careers-cell">
                  {convocatoria.careers.join(', ')}
                </td>


                {/* published */}
                <td>
                  {convocatoria.published}
                </td>


                {/* closed */}
                <td>
                  {convocatoria.closed}
                </td>


                {/* applications_students */}
                <td className="applicants-cell">
                  {convocatoria.applicants}
                </td>


                {/* is_draft / estado */}
                <td>
                  <span
                    className={`status-badge status-${convocatoria.status.toLowerCase()}`}
                  >
                    {convocatoria.status}
                  </span>
                </td>


                {/* acciones */}
                <td className="actions-column">

                  <button
                    type="button"
                    className="action-button"
                    aria-label={`Acciones para ${convocatoria.title}`}
                  >
                    ...
                  </button>

                </td>

              </tr>
            ))}


            {convocatoriasFiltradas.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="empty-state"
                >
                  No se encontraron convocatorias.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>


      {/* =====================================================
          FOOTER TABLA
          ===================================================== */}
      <div className="table-footer">

        <div className="table-summary">
          Mostrando 1–{convocatoriasFiltradas.length} de{' '}
          {convocatoriasFiltradas.length} convocatorias
        </div>

        <div className="pagination-custom">

          <button
            type="button"
            disabled
            className="pagination-button"
          >
            Anterior
          </button>

          <button
            type="button"
            className="pagination-button active"
          >
            1
          </button>

          <button
            type="button"
            className="pagination-button"
          >
            Siguiente
          </button>

        </div>

      </div>

    </div>
  )
}
