import { Sequelize } from 'sequelize';
import pg from 'pg'; // <-- Forzar la inclusión del paquete en el build de Vercel
import dotenv from 'dotenv';

dotenv.config();

const isSSL = process.env.DB_SSL === 'true';

// Opciones comunes a ambos modos de configuración
const options = {
  dialect: 'postgres',
  dialectModule: pg, // <-- Asignar directamente el conector
  logging: process.env.NODE_ENV !== 'production' ? console.log : false,
  pool: {
    max: 2, // Se reduce para entornos Serverless para no agotar el pool de Supabase
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: isSSL ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {}
};

let sequelize;

if (process.env.DB) {
  // Modo cadena de conexión: usa la variable DB del .env
  sequelize = new Sequelize(process.env.DB, options);
} else {
  // Modo variables separadas (configuración original)
  sequelize = new Sequelize(
    process.env.DB_NAME || 'postgres',
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      ...options,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432
    }
  );
}

export default sequelize;