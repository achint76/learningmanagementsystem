const {DataTypes} = require('sequelize');
const sequelize = require('../db/config');
const models = require('./index');
const Subjects = sequelize.define('subjecttables', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subject_name: {
        type: DataTypes.STRING(20),
       allowNull: false 
    },
    
},{
    timestamps:false,
    id: false 
})

module.exports = Subjects;