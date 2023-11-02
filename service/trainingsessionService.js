const models = require('../models');
module.exports = {
    createSession: async function({subject_id,teacher_id,totalstudents,date}){
        try{
            //checking for valid teacher_id
            const validteacher = await models.Teacher.findOne({
                where: {
                    id: teacher_id
                }
            });
            const validsubject = await models.Subject.findOne({
                where: {
                    id: teacher_id,
                    subject_id: subject_id
                }
            })

            if(!validsubject)
            throw new Error('Respective teacher is not teaching the particular subject');
            //checking for valid
            if(!validteacher)
            throw new Error('Invalid teacher_id');

            const trainingsession =  await models.TrainingSession.create({
                subject_id: subject_id,
                teacher_id: teacher_id,
                totalstudents: totalstudents,
                date: date
            });

            //for fetching student emails as they have subscribed to particular teacher
            const subscribedstudents = await models.Subscription.findAll({
                where: {
                    teacher_id: teacher_id
                }
            })
            console.log(subscribedstudents,"===<STUDENTSSUBSCRIBERDETAILS");
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}