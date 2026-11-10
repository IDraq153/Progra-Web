import { DataTypes } from 'sequelize';
import sequelize from '../../configs/database.js';

const StudentsSkillsSkillLevels = sequelize.define('StudentsSkillsSkillLevels', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    student_id: {
        type: DataTypes.INTEGER,
    },
    skill_id: {
        type: DataTypes.INTEGER,
    },
    skill_level_id: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'students_skills_skill_levels',
    timestamps: false,
});

export default StudentsSkillsSkillLevels;