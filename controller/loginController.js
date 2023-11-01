const sessionService =require('../service/sessionService');
const jwtService = require('../service/jwtService');
const loginService = require('../service/loginService');
module.exports = {
    loginfunc: async function(req,res){
        const data = req.body;
        const user = await loginService.loginfunc({
            email: data.email,
            password: data.password
        });
        const dbUser = user[0];
        console.log(dbUser,"SOMEONEISTHERE");
        
        if((dbUser == undefined) || (dbUser.user_type == "teacher" && dbUser.approved_status !== "approved")){
            res.json({
                message: `!!!!You are not allowed to be logged!!!!`
            })
        }
        else if(data.email == dbUser.email && data.password == dbUser.password){
            console.log("Session to be created");
            const sessions = await sessionService.createSession({
                user_id: dbUser.id
            })
            console.log(sessions,"SESSUIONSSSSSSSSSSSS");;
            console.log(sessions.id,"SESSIONS>ID--------");

            const jwt = jwtService.createToken({
                id: sessions.id,
                user_id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                user_type: dbUser.user_type
            });
            console.log(jwt,"JWTJWTJWTJWTJWT");
            const authData = jwtService.verifyToken(jwt);
            console.log(authData,"AUTHDATA IS----->");
            const expDate = new Date(authData.exp * 1000);
            const iatDate = new Date(authData.iat * 1000);
            console.log(expDate,"THIS IS EXP DAET");
            const sessionUpdate = await sessionService.updateSessionlogin({
                expiry: expDate,
                login: iatDate,
                id: authData.id
            })
            const userdata = user[0];
            console.log(user,"USER_------->>>");
            console.log(userdata,"USERDATA*************");
            delete userdata.password;
            delete userdata.user_id;
            console.log(userdata,"USERDATA AFTER UPDATE:::::::");
            res.json({
                message: "Logged In",
                Profile: userdata,
                JWTtoken: jwt
            })

        } else {
            res.json({
                message: "Invalid Combination"
            })
        }

    }
}