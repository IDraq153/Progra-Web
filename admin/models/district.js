import { DataTypes } from 'sequelize';
import sequelize from '../../configs/database.js';

const District = sequelize.define('District', {
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
    tableName: 'districts',
    timestamps: false,
});

export default District;