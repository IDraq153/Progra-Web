import { DataTypes } from 'sequelize';
import sequelize from '../../configs/database.js';

const ApplicationsStudentsReviews = sequelize.define('ApplicationsStudentsReviews', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    applications_students_reviews: {
        type: DataTypes.INTEGER,
    },
    points: {
        type: DataTypes.INTEGER,
    },
    enviroment: {
        type: DataTypes.INTEGER,
    },
    learning: {
        type: DataTypes.INTEGER,
    },
    work_load: {
        type: DataTypes.INTEGER,
    },
    title: {
        type: DataTypes.STRING(50),
    },
    comment: {
        type: DataTypes.TEXT,
    },
    created: {
        type: DataTypes.DATE,
    },
    updated: {
        type: DataTypes.DATE,
    },
    start: {
        type: DataTypes.DATE,
    },
    end: {
        type: DataTypes.DATE,
    },
    anonimous: {
        type: DataTypes.BOOLEAN,
    },
}, {
    tableName: 'applications_students_reviews',
    timestamps: false,
});

export default ApplicationsStudentsReviews;