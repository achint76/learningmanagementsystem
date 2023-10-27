const models = require('../models');
module.exports = {
    createUser: async function({name, email, password, user_type}){
        return await models.Users.create({
            name: name,
            email: email,
            password: password,
            user_type: user_type
        })
    }
}