const subjectService = require('../service/subjectService');
const models = require('../models');

module.exports = {
    getSubject: async function(req,res){
        try{
        const subject = await subjectService.getSubject();
        res.json({
            message: 'All subjects',
            data: subject
        })
    }catch(error){
        console.log(error,"<----error");
                res.status(500).json({
                    message: `error coming !!!!!`,
                    err: error,
                });
    }
    }
}