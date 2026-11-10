//admin\models\user.js

import { DataTypes } from 'sequelize';
import sequelize from '../../configs/database.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    reset_token: {
        type: DataTypes.STRING(100),
    },
    created: {
        type: DataTypes.DATE,
    },
    updated: {
        type: DataTypes.DATE,
    },
    profile_id: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'users',
    timestamps: false,
});

export default User;