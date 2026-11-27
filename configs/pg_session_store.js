// configs/pg_session_store.js
// Store de express-session en PostgreSQL (misma base que usa Sequelize).
// En Vercel cada petición puede caer en una instancia distinta, por eso las sesiones
// no pueden vivir en archivos de /tmp: se guardan en la tabla "sessions".
import session from 'express-session';
import sequelize from './database.js';

const TABLA = 'sessions';
const UN_DIA_MS = 1000 * 60 * 60 * 24;

export default class PgSessionStore extends session.Store {
  constructor() {
    super();
    this.lista = null;
  }

  // Crea la tabla la primera vez que se usa (idempotente)
  async preparar() {
    if (!this.lista) {
      this.lista = sequelize.query(
        `CREATE TABLE IF NOT EXISTS ${TABLA} (
           sid varchar PRIMARY KEY,
           sess json NOT NULL,
           expire timestamptz NOT NULL
         )`
      ).then(() => sequelize.query(`CREATE INDEX IF NOT EXISTS idx_${TABLA}_expire ON ${TABLA} (expire)`))
        .catch((error) => {
          // No es fatal: la tabla puede existir ya (migración db:up). Si no existe, fallarán las consultas con su error real.
          console.error('[sesiones] No se pudo crear/verificar la tabla sessions:', error.message);
        });
    }
    return this.lista;
  }

  get(sid, callback) {
    this.preparar()
      .then(() => sequelize.query(
        `SELECT sess FROM ${TABLA} WHERE sid = :sid AND expire > NOW()`,
        { replacements: { sid }, type: 'SELECT' }
      ))
      .then((filas) => callback(null, filas[0] ? filas[0].sess : null))
      .catch((error) => {
        // Si la base falla, se trata como "sin sesión" en vez de tumbar la página con un 500
        console.error('[sesiones] Error al leer la sesión:', error.message);
        callback(null, null);
      });
  }

  set(sid, sess, callback = () => {}) {
    const expira = sess?.cookie?.expires ? new Date(sess.cookie.expires) : new Date(Date.now() + UN_DIA_MS);

    this.preparar()
      .then(() => sequelize.query(
        `INSERT INTO ${TABLA} (sid, sess, expire) VALUES (:sid, :sess, :expire)
         ON CONFLICT (sid) DO UPDATE SET sess = EXCLUDED.sess, expire = EXCLUDED.expire`,
        { replacements: { sid, sess: JSON.stringify(sess), expire: expira } }
      ))
      .then(() => callback(null))
      .catch((error) => {
        console.error('[sesiones] Error al guardar la sesión:', error.message);
        callback(error);
      });
  }

  touch(sid, sess, callback = () => {}) {
    this.set(sid, sess, callback);
  }

  destroy(sid, callback = () => {}) {
    this.preparar()
      .then(() => sequelize.query(`DELETE FROM ${TABLA} WHERE sid = :sid`, { replacements: { sid } }))
      .then(() => callback(null))
      .catch((error) => callback(error));
  }
}
