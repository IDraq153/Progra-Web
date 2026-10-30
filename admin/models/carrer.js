// admin/models/carrer.js
import { DataTypes } from 'sequelize';
import sequelize from '../../configs/database.js';

const Carrer = sequelize.define('Carrer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Corresponde al SERIAL de PostgreSQL
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
}, {
  tableName: 'carrers', // Fuerza el nombre exacto de la tabla
  timestamps: false,     // Desactiva createdAt y updatedAt
});

export default Carrer;