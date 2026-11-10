import { DataTypes } from 'sequelize';
import sequelize from '../../configs/database.js';

const SkillLevel = sequelize.define('SkillLevel', {
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
    tableName: 'skill_levels',
    timestamps: false,
});

export default SkillLevel;