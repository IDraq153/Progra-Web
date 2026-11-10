import { DataTypes } from 'sequelize';
import sequelize from '../../configs/database.js';

const Semester = sequelize.define('Semester', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
}, {
    tableName: 'semesters',
    timestamps: false,
});

export default Semester;