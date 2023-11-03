const models = require('../models');
const trainingsessionService = require('../service/trainingsessionService');
module.exports = {
    schedulesession: async function(req,res){
        try{
            const data = req.body;
            // const subid = data.subject_id;
            // const teacherid = data.teacher_id;
            const createSession = await trainingsessionService.createSession({
                subject_id: data.subject_id,
                teacher_id: data.teacher_id,
                totalstudents: data.totalstudents,
                date: data.date
            });
            res.json({
                message: 'Sessiuon scheduled',
                data: createSession
            });

        }catch(error){
            console.log(error,"ERRORERROR");
            res.status(500).json({
                message: 'Error occurred',
                error: error
            });
        }
    },
}