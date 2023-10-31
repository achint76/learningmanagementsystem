const signupService = require('../service/signupService');
const models = require('../models')
module.exports = {

    
    signupfunc: async function(req,res){
        const data = req.body;
        console.log(data,"DATAAAAAAA");
        if(data.user_type == "admin"){
        const existingadmin = await models.Users.findOne({
            where: { user_type: 'admin' },
        });
        console.log(existingadmin,"EXISTINGADMIN");
        if(existingadmin)
        return res.json({
            message: 'An admin account already exists. Cannot create another admin account.',
        });
    }
        const signup = await signupService.signupfunc({
            name: data.name,
            email: data.email,
            password: data.password,
            user_type: data.user_type
        });
        res.json({
            message: 'user signed up',
            data: signup
        });
        console.log(signup,"Signup:::::::::::");
    }
}