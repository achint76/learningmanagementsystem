const models = require('../models');
const {Op} = require('sequelize');
module.exports = {
    loginfunc: async function({email,password}){
        return await models.Users.findAll({
            where: {
                [Op.and]:
            [{email: email},
            {password: password}]
            },
            raw: true
        })
    }
}