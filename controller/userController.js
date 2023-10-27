const userService = require('../service/userService');
const models = require('../models');
const jwtService = require('../service/jwtService');
const sessionService = require('../service/sessionService');
const {Op} = require('sequelize');

module.exports = {
    createUser: async function(req,res){
           if(req.userdata.user_type == "student"){
            try{
               const data= req.body;
               const user = await userService.createUser({
                name: data.name,
                email: data.email,
                password: data.password,
                user_type: data.user_type
               })
               res.json({message: 'new student added', data: user}) 
            }catch(error){
                   console.log(error,"======ERROR");
                   res.status(500).json({
                    message: `error coming !!!!!`,
                    err: error,
                })
            }
           }
           else if(req.userdata.user_type == "admin"){
              res.json({message: 'Not more than one admin possible'})
           }
           else{
            try{
                const jwt = req.headers["authorization"];
                const authData = jwtService.verifyToken(jwt);
                if(authData.user_type == "admin"){
                    try{
                   const data = req.body;
                   const user = await userService.createUser({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    user_type: data.user_type
                   })
                   res.json({message: "New teacher is added", data: user})
                }catch(error){
                    console.log(error,"======ERROR");
                    res.status(500).json({
                     message: `error coming !!!!!`,
                     err: error,
                    })
                }
            }
                else
                res.json({message: "only admin has the right to approve"})
            }catch(error){
                console.log(error,"======ERROR");
                res.status(500).json({
                 message: `error coming !!!!!`,
                 err: error,
                })
            }
           }
           
    },

    
    
    updateSessionLogout: async function(req,res){
        try{
            const jwt = req.headers["authorization"];
            const authData = jwtService.verifyToken(jwt);
            const sessions_id = authData.id;
            const date = new Date();
            const session = await sessionService.findSession({id: sessions_id});
            console.log(sessions_id,"SesssssionsId^^^^^^^^");
            console.log(session,"Session Is this!!!!!!!!");
            const sessions = await models.Session.findAll({
                where: {
                    [Op.and]: [
                        { logout: null }, // Check if logout is null
                        { expiry: { [Op.gt]: date } } // Check if expiry is greater than the current date
                    ]
                }
            });
            console.log(sessions,"SESSIONS AFTER CHECKING LOGOUT AND EXPIRY");
            if(sessions){
            const logOut = await sessionService.updateSessionlogout({
                date: date,
                id: sessions_id
            })
            console.log(logOut,"USERCONTROLLER>JS LOGOUT");
            if (logOut.numUpdatedRows > 0) {
                res.json({
                    message: `${authData.name} Logged out`
                })
            }
            else {
                res.json({
                    message: `Log in to log out`
                })
            }
        }
        else{
             console.log("sessions not found!!!");
        } } catch (error) {
            console.log(error,"<----error");
            res.status(500).json({
                message: `error coming !!!!!`,
                err: error,
            });
        }
    }
}
