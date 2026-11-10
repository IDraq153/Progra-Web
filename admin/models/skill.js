import { DataTypes } from 'sequelize';
import sequelize from '../../configs/database.js';

const Skill = sequelize.define('Skill', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
}, {
    tableName: 'skills',
    timestamps: false,
});

export default Skill;