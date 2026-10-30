// src/pages/enterprise/NuevaConvocatoria.jsx
import './NuevaConvocatoria.css'

export default function NuevaConvocatoria() {
  return (
    <div className="nueva-convocatoria">

      {/* =====================================================
          HEADER
          ===================================================== */}
      <div className="convocatoria-header">
        <div>
          <div className="breadcrumb-custom">
            Convocatorias <span>•</span> Nueva convocatoria
          </div>

          <h1>Nueva convocatoria</h1>
        </div>

        <div className="convocatoria-actions">
          <button
            type="button"
            className="btn btn-light btn-sm"
          >
            Guardar como borrador
          </button>

          <button
            type="submit"
            form="form-nueva-convocatoria"
            className="btn btn-accent btn-sm"
          >
            Publicar convocatoria
          </button>
        </div>
      </div>


      {/* =====================================================
          FORMULARIO
          ===================================================== */}
      <form
        id="form-nueva-convocatoria"
        className="row g-2 convocatoria-form"
      >

        {/* ===================================================
            COLUMNA IZQUIERDA
            =================================================== */}
        <div className="col-lg-6">

          {/* =================================================
              1. PUESTO
              ================================================= */}
          <section className="convocatoria-card">

            <div className="section-title">
              <span>1</span>
              PUESTO
            </div>


            {/* title */}
            <div className="mb-2">
              <label htmlFor="title" className="form-label">
                TÍTULO DEL PUESTO
              </label>

              <input
                id="title"
                name="title"
                type="text"
                className="form-control"
                maxLength={40}
                placeholder="Ej. Practicante de Desarrollo de Software"
              />
            </div>


            {/* description */}
            <div className="mb-2">
              <label htmlFor="description" className="form-label">
                DESCRIPCIÓN DE LA PRÁCTICA
              </label>

              <textarea
                id="description"
                name="description"
                className="form-control"
                rows="4"
                placeholder="Describe la práctica y el objetivo de la posición..."
              />
            </div>


            {/* functions */}
            <div>
              <label htmlFor="functions" className="form-label">
                FUNCIONES PRINCIPALES
              </label>

              <textarea
                id="functions"
                name="functions"
                className="form-control"
                rows="3"
                placeholder="Describe las principales funciones..."
              />
            </div>

          </section>


          {/* =================================================
              2. PERFIL BUSCADO
              ================================================= */}
          <section className="convocatoria-card">

            <div className="section-title">
              <span>2</span>
              PERFIL BUSCADO
            </div>


            {/* carrer_id */}
            <div className="mb-2">
              <label htmlFor="carrer_id" className="form-label">
                CARRERAS
              </label>

              <div
                id="carrer_id"
                className="tag-input"
              >
                <span className="selection-tag">
                  Ingeniería de Sistemas
                  <button type="button">×</button>
                </span>

                <span className="selection-tag">
                  Ingeniería Industrial
                  <button type="button">×</button>
                </span>

                <button
                  type="button"
                  className="add-tag"
                >
                  + agregar
                </button>
              </div>
            </div>


            <div className="row g-2">

              {/* sementer_id */}
              <div className="col-md-6">
                <label
                  htmlFor="sementer_id"
                  className="form-label"
                >
                  CICLO MÍNIMO
                </label>

                <select
                  id="sementer_id"
                  name="sementer_id"
                  className="form-select"
                >
                  <option value="">
                    Seleccionar
                  </option>

                  <option value="1">Primero</option>
                  <option value="2">Segundo</option>
                  <option value="3">Tercero</option>
                  <option value="4">Cuarto</option>
                  <option value="5">Quinto</option>
                  <option value="6">Sexto</option>
                  <option value="7">Séptimo</option>
                  <option value="8">Octavo</option>
                  <option value="9">Noveno</option>
                  <option value="10">Décimo</option>
                </select>
              </div>


              {/* skill_id */}
              <div className="col-md-6">
                <label
                  htmlFor="skill_id"
                  className="form-label"
                >
                  HABILIDADES DESEADAS
                </label>

                <div
                  id="skill_id"
                  className="tag-input skills-input"
                >
                  <span className="selection-tag">
                    React
                    <button type="button">×</button>
                  </span>

                  <span className="selection-tag">
                    SQL
                    <button type="button">×</button>
                  </span>
                </div>
              </div>

            </div>

          </section>

        </div>


        {/* ===================================================
            COLUMNA DERECHA
            =================================================== */}
        <div className="col-lg-6">

          {/* =================================================
              3. CONDICIONES
              ================================================= */}
          <section className="convocatoria-card">

            <div className="section-title">
              <span>3</span>
              CONDICIONES
            </div>


            <div className="row g-2">

              {/* modality_id */}
              <div className="col-md-6">
                <label
                  htmlFor="modality_id"
                  className="form-label"
                >
                  MODALIDAD
                </label>

                <select
                  id="modality_id"
                  name="modality_id"
                  className="form-select"
                >
                  <option value="">
                    Seleccionar
                  </option>

                  <option value="1">
                    Presencial
                  </option>

                  <option value="2">
                    Híbrido
                  </option>

                  <option value="3">
                    Remoto
                  </option>
                </select>
              </div>


              {/* workday_id */}
              <div className="col-md-6">
                <label
                  htmlFor="workday_id"
                  className="form-label"
                >
                  JORNADA
                </label>

                <select
                  id="workday_id"
                  name="workday_id"
                  className="form-select"
                >
                  <option value="">
                    Seleccionar
                  </option>

                  <option value="1">
                    Tiempo completo
                  </option>

                  <option value="2">
                    Medio tiempo
                  </option>

                  <option value="3">
                    Part time
                  </option>
                </select>
              </div>


              {/* district_id */}
              <div className="col-md-6">
                <label
                  htmlFor="district_id"
                  className="form-label"
                >
                  DISTRITO
                </label>

                <select
                  id="district_id"
                  name="district_id"
                  className="form-select"
                >
                  <option value="">
                    Seleccionar
                  </option>

                  <option value="1">
                    Miraflores
                  </option>

                  <option value="2">
                    San Isidro
                  </option>

                  <option value="3">
                    San Borja
                  </option>

                  <option value="4">
                    Santiago de Surco
                  </option>
                </select>
              </div>


              {/* salarry */}
              <div className="col-md-6">
                <label
                  htmlFor="salarry"
                  className="form-label"
                >
                  SUBVENCIÓN MENSUAL
                </label>

                <div className="input-group">

                  <span className="input-group-text">
                    S/
                  </span>

                  <input
                    id="salarry"
                    name="salarry"
                    type="number"
                    className="form-control"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />

                </div>

                <div className="form-help">
                  Entre S/ 1,025.00 y S/ 2,500.00
                </div>
              </div>


              {/* benefits */}
              <div className="col-12">
                <label
                  htmlFor="benefits"
                  className="form-label"
                >
                  BENEFICIOS
                </label>

                <textarea
                  id="benefits"
                  name="benefits"
                  className="form-control"
                  rows="3"
                  placeholder="Describe los beneficios ofrecidos..."
                />
              </div>

            </div>

          </section>


          {/* =================================================
              4. PUBLICACIÓN
              ================================================= */}
          <section className="convocatoria-card">

            <div className="section-title">
              <span>4</span>
              PUBLICACIÓN
            </div>


            <div className="row g-2">

              {/* published */}
              <div className="col-md-6">
                <label
                  htmlFor="published"
                  className="form-label"
                >
                  FECHA DE PUBLICACIÓN
                </label>

                <input
                  id="published"
                  name="published"
                  type="datetime-local"
                  className="form-control"
                />
              </div>


              {/* closed */}
              <div className="col-md-6">
                <label
                  htmlFor="closed"
                  className="form-label"
                >
                  FECHA DE CIERRE
                </label>

                <input
                  id="closed"
                  name="closed"
                  type="datetime-local"
                  className="form-control"
                />
              </div>


              {/* vacancies */}
              <div className="col-md-4">
                <label
                  htmlFor="vacancies"
                  className="form-label"
                >
                  VACANTES
                </label>

                <input
                  id="vacancies"
                  name="vacancies"
                  type="number"
                  min="1"
                  className="form-control"
                  placeholder="2"
                />
              </div>


              {/* email_notification */}
              <div className="col-12">

                <div className="form-check notification-check">

                  <input
                    id="email_notification"
                    name="email_notification"
                    className="form-check-input"
                    type="checkbox"
                    value="1"
                  />

                  <label
                    className="form-check-label"
                    htmlFor="email_notification"
                  >
                    Avisarme por correo cada vez que llegue una
                    postulación
                  </label>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              AVISO
              ================================================= */}
          <div className="publication-notice">

            <div className="notice-icon">
              i
            </div>

            <div>
              Al publicar, la convocatoria queda visible para
              todos los estudiantes cuya carrera coincida.
              Puedes editarla o cerrarla en cualquier momento
              desde «Mis convocatorias».
            </div>

          </div>

        </div>

      </form>

    </div>
  )
}
