const models = require('../models');
module.exports = {
    // createUser: async function({name, email, password, user_type}){
    //     return await models.Users.create({
    //         name: name,
    //         email: email,
    //         password: password,
    //         user_type: user_type
    //     })
    // },
    validateEmail: async function ({ email }) {
        if (email == undefined || email == null) {
            throw new Error('Email is undefined or null');
        }
        try{
        const existingUser = await models.Users.findOne({
            where: {
                email: email
            },
            //raw: true
        });

        if (existingUser) {
         
            throw new Error('Email already exists');
        }
    }catch(error){
        return {error: error.message};
    }
    },
    approvalmail: async function({email}){
        if(email == undefined || email == null)
        throw new Error('Email is undefined or null');
        const existingemail = await models.Users.findOne({
            where: {
                email: email
            }
        })
        return existingemail;
    }
}