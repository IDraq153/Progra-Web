import { DataTypes } from 'sequelize';
import sequelize from '../../configs/database.js';

const Link = sequelize.define('Link', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    student_id: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'links',
    timestamps: false,
});

export default Link;