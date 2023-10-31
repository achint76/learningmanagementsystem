// const models = require('../models');
// const teacherService = require('../service/teacherService');
// module.exports = {
//     selectsubjects: async function(req,res){
//   try{
//     const {subject_id,user_id} = req.body;
// //const data = req.body;
//     // const selectedsubjects = await teacherService.selectsubjects({
//     //     subject_id: data.subject_id,
//     //     user_id: data.user_id
//     // })
//    const selectedsubjects = await teacherService.selectsubjects({subject_id,user_id});
//     res.json({
//         message: 'subjects chosen', data: selectedsubjects
//     })
//   }catch(error){
//     console.log(error,"======ERROR");
//     res.status(500).json({
//      message: `error coming !!!!!`,
//      err: error,
//  })
//   }
// }
// }

const models = require('../models');
const teacherService = require('../service/teacherService');

module.exports = {
    selectsubjects: async function(req, res) {
        try {
            const subjectsArray = req.body; // Receive an array of objects
            const selectedsubjects = await teacherService.selectsubjects(subjectsArray);
            res.json({
                message: 'Subjects chosen',
                data: selectedsubjects
            });
        } catch (error) {
            console.log(error, '======ERROR');
            res.status(500).json({
                message: 'Error occurred',
                error: error
            });
        }
    }
}
