import { DataTypes } from 'sequelize';
import sequelize from '../../configs/database.js';

const ApplicationsStudents = sequelize.define('ApplicationsStudents', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    application_id: {
        type: DataTypes.INTEGER,
    },
    student_id: {
        type: DataTypes.INTEGER,
    },
    status_applications_student_id: {
        type: DataTypes.INTEGER,
    },
    notes: {
        type: DataTypes.TEXT,
    },
    created: {
        type: DataTypes.DATE,
    },
}, {
    tableName: 'applications_students',
    timestamps: false,
});

export default ApplicationsStudents;