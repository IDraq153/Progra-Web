import { DataTypes } from 'sequelize';
import sequelize from '../../configs/database.js';

const ApplicationsCarrers = sequelize.define('ApplicationsCarrers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    application_id: {
        type: DataTypes.INTEGER,
    },
    carrer_id: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'applications_carrers',
    timestamps: false,
});

export default ApplicationsCarrers;