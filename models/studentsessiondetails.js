const {DataTypes} = require('sequelize');
const sequelize = require('../db/config');
const models = require('./index');
const studentsessiondetails = sequelize.define('studentsessiondetails', {
    id: {
        primaryKey: true,
        
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false

    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    trainingsession_id :{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subject_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    session_opted: {
        type:  DataTypes.INTEGER,
        allowNull: false
    }
})
module.exports = studentsessiondetails;             