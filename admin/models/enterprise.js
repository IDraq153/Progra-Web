import { DataTypes } from 'sequelize';
import sequelize from '../../configs/database.js';

const Enterprise = sequelize.define('Enterprise', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    ruc: {
        type: DataTypes.STRING(11),
    },
    email: {
        type: DataTypes.STRING(45),
    },
    phone: {
        type: DataTypes.STRING(15),
    },
    website_url: {
        type: DataTypes.STRING(100),
    },
    description: {
        type: DataTypes.TEXT,
    },
    address: {
        type: DataTypes.STRING(100),
    },
    picture_url: {
        type: DataTypes.STRING(100),
    },
    district_id: {
        type: DataTypes.INTEGER,
    },
    sector_id: {
        type: DataTypes.INTEGER,
    },
    size_id: {
        type: DataTypes.INTEGER,
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    created: {
        type: DataTypes.DATE,
    },
    updated: {
        type: DataTypes.DATE,
    },
}, {
    tableName: 'enterprises',
    timestamps: false,
});

export default Enterprise;