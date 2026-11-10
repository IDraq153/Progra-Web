import { DataTypes } from 'sequelize';
import sequelize from '../../configs/database.js';

const Profile = sequelize.define('Profile', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    created: {
        type: DataTypes.DATE,
    },
    updated: {
        type: DataTypes.DATE,
    },
}, {
    tableName: 'profiles',
    timestamps: false,
});

export default Profile;