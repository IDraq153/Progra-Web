import { DataTypes } from 'sequelize';
import sequelize from '../../configs/database.js';

const StudentsApplicationsSaved = sequelize.define('StudentsApplicationsSaved', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    created: {
        type: DataTypes.DATEONLY,
    },
    student_id: {
        type: DataTypes.INTEGER,
    },
    application_id: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'students_applications_saved',
    timestamps: false,
});

export default StudentsApplicationsSaved;