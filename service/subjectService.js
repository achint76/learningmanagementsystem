const models = require('../models');

module.exports = {
    getSubject: async function(){
        return await models.Subject.findAll();
    }
}