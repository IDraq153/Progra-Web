// admin\models\students.js

import { DataTypes } from 'sequelize';
import sequelize from '../../configs/database.js';

const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    names: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    last_names: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(45),
    },
    phone: {
        type: DataTypes.STRING(15),
    },
    district_id: {
        type: DataTypes.INTEGER,
    },
    picture_url: {
        type: DataTypes.STRING(100),
    },
    summary: {
        type: DataTypes.TEXT,
    },
    carrere_id: {
        type: DataTypes.INTEGER,
    },
    sementer_id: {
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
    tableName: 'students',
    timestamps: false,
});

export default Student;