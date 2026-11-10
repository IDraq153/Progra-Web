import { DataTypes } from 'sequelize';
import sequelize from '../../configs/database.js';

const ApplicationsSkills = sequelize.define('ApplicationsSkills', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    application_id: {
        type: DataTypes.INTEGER,
    },
    skill_id: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'applications_skills',
    timestamps: false,
});

export default ApplicationsSkills;