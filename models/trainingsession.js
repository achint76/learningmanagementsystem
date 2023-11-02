const {DataTypes} = require('sequelize');
const sequelize = require('../db/config');
const models = require('./index');
const trainingsession = sequelize.define('trainingsessiontable', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subject_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalstudents: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    session_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true,

})
module.exports = trainingsession;