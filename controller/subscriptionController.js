const models = require('../models');
const subscriptionService = require('../service/subscriptionService');
module.exports = {
    subscribeteacher: async function(req,res){
        
            const jwt = req.headers['authorization'];
            if (!jwt) {
                return res.status(401).json({ message: "Authorization header is missing" });
            }
            const token = jwt.split(" ")[1];
            console.log(jwt,"JWTJWTJWT");
            const authData = jwtService.verifyToken(token);
            console.log(authData,"STATUSAPPROVE");
            if(authData.user_type == "student"){
                try{
            const teachersArray = req.body;
            const selectteachers = await subscriptionService.subscribeteacher(teachersArray);
            res.json({
                message: 'Subscribed teachers chosen',
                data: selectteachers
            });
        }catch(error){
            console.log(error,"ERROR======>");
            res.staus(500).json({
                message: 'Error occurred',
                error: error
            });
        }
    }
        else{
            res.json({message: "Only student can subscribe , not for admin or teacher"})
        }
        
    }
}