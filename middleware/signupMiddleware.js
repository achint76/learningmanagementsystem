const userService = require('../service/userService');
 module.exports = {
    validateEmail: async function(req,res,next){
        const data = req.body;
        const signup = await userService.validateEmail({
            email: data.email
        })
        console.log(signup,"SIGNUP::::::::");
        if(signup){
        res.status(409).json({
            message: "user already signed up"
        })
        return 
    }
    next();

    }
 }