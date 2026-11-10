import { DataTypes } from 'sequelize';
import sequelize from '../../configs/database.js';

const StatusApplicationsStudents = sequelize.define('StatusApplicationsStudents', {
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
    tableName: 'status_applications_students',
    timestamps: false,
});

export default StatusApplicationsStudents;