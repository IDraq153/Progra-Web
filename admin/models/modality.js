import { DataTypes } from 'sequelize';
import sequelize from '../../configs/database.js';

const Modality = sequelize.define('Modality', {
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
    tableName: 'modalities',
    timestamps: false,
});

export default Modality;