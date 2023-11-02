const {DataTypes} = require('sequelize');
const sequelize = require('../db/config');
const models = require('../models');
const Subscription = sequelize.define('subscriptiontable', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false,
    id: false
})
module.exports = Subscription;