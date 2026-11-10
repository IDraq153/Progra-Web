import { DataTypes } from 'sequelize';
import sequelize from '../../configs/database.js';

const Log = sequelize.define('Log', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.STRING(100),
    },
    created: {
        type: DataTypes.DATE,
    },
}, {
    tableName: 'logs',
    timestamps: false,
});

export default Log;