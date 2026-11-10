import { DataTypes } from 'sequelize';
import sequelize from '../../configs/database.js';

const Experience = sequelize.define('Experience', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    enterprise: {
        type: DataTypes.STRING(60),
    },
    description: {
        type: DataTypes.TEXT,
    },
    start_date: {
        type: DataTypes.DATEONLY,
    },
    end_date: {
        type: DataTypes.DATEONLY,
    },
    student_id: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'experiences',
    timestamps: false,
});

export default Experience;