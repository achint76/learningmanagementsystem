const models = require('../models');
const studentsessionService = require('../service/studentsessionService');
const jwtService = require('../service/jwtService');
module.exports = {
    joiningstudent: async function(req,res){
       // try{
            const jwt = req.headers["authorization"];
            if (!jwt) {
                return res.status(401).json({ message: "Authorization header is missing" });
            }
            const token = jwt.split(" ")[1];
            console.log(jwt,"JWTJWTJWT");
            const authData = jwtService.verifyToken(token);
            console.log(authData,"STATUSAPPROVE");
            try{
               
            }catch(error){

            }
            
//}catch(error){}
    }
}