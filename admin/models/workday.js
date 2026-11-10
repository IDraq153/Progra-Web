import { DataTypes } from 'sequelize';
import sequelize from '../../configs/database.js';

const Workday = sequelize.define('Workday', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
}, {
    tableName: 'workdays',
    timestamps: false,
});

export default Workday;