import { DataTypes } from 'sequelize';
import sequelize from '../../configs/database.js';

const Application = sequelize.define('Application', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    benefits: {
        type: DataTypes.TEXT,
    },
    functions: {
        type: DataTypes.TEXT,
    },
    vacancies: {
        type: DataTypes.INTEGER,
    },
    created: {
        type: DataTypes.DATE,
    },
    published: {
        type: DataTypes.DATE,
    },
    email_notification: {
        type: DataTypes.BOOLEAN,
    },
    closed: {
        type: DataTypes.DATE,
    },
    salarry: {
        type: DataTypes.DECIMAL(10, 2),
    },
    is_draft: {
        type: DataTypes.BOOLEAN,
    },
    modality_id: {
        type: DataTypes.INTEGER,
    },
    sementer_id: {
        type: DataTypes.INTEGER,
    },
    district_id: {
        type: DataTypes.INTEGER,
    },
    workday_id: {
        type: DataTypes.INTEGER,
    },
    enterprise_id: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'applications',
    timestamps: false,
});

export default Application;