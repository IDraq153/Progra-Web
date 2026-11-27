-- migrate:up

-- Sesiones de express-session (en Vercel no pueden guardarse en archivos)
CREATE TABLE IF NOT EXISTS sessions (
  sid varchar PRIMARY KEY,
  sess json NOT NULL,
  expire timestamptz NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_sessions_expire ON sessions (expire);

-- migrate:down

DROP TABLE IF EXISTS sessions;
