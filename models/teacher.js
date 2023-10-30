const {DataTypes} = require('sequelize');
const sequelize = require('../db/config');
const models = require('./index');
const teachers = sequelize.define('teachertable', {
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
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // subject: {
    //     type: DataTypes.ENUM('English','Hindi','Mathematics','Physics','Chemistry'),
    //     //allowNull: false
    // }
    
},{
    timestamps:false,
    id: false 
})

module.exports = teachers;