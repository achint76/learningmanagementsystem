const models = require('../models');
const subscriptionService = require('../service/subscriptionService');
module.exports = {
    subscribeteacher: async function(req,res){
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
}