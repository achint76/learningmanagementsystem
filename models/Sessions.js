const sequelize = require('../db/config');

const {DataTypes} = require('sequelize');
const Session = sequelize.define('sessiontable', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    login: {
        type: DataTypes.DATE
    },
    logout: {
        type: DataTypes.DATE
    },
    expiry: {
        type: DataTypes.DATE
    }
})

module.exports = Session;