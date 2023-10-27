const sequelize = require('../db/config');

const Users = require('./users');
const Session = require('./Sessions');
//sequelize.sync({alter:true});

module.exports = {
    Users,
    Session
}