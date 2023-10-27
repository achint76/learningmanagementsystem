const {DataTypes} = require('sequelize');
const sequelize = require('../db/config');
const models = require('./index');
const Users = sequelize.define('usertable', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(20),
       allowNull: false 
    },
    email: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    user_type: {
        type: DataTypes.ENUM('admin', 'teacher', 'student'), 
        allowNull: false,
       // defaultValue: 'user', // Set the default value to 'user'
    },
},{
    timestamps:false,
    id: false 
})

module.exports = Users;