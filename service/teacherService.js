// // const models = require('../models');

// // module.exports = {
// //     selectsubjects: async function({subject_id,user_id}){
// //         try{
// //         const user = await models.Users.findOne({
// //             where: { id: user_id },
// //         });
// //         if (!user) {
// //             throw new Error('User not found');
// //         }
// //         return await models.Teacher.create({
// //             subject_id: subject_id,
// //             user_id: user_id
// //         });
// //     }catch(error){
// //         console.log(error);
// //         res.json({error: error});
// //     }
// // }
// // }


// // service/teacherService.js
// const models = require('../models');

// module.exports = {
//   selectsubjects: async function ({subject_id,user_id}) {
//    // const { subject_id, user_id } = data;
    
//     try {
//       const user = await models.Users.findOne({
//         where: { id: user_id },
//       });

//       if (!user) {
//         throw new Error('User not found');
//       }

//       const subjectsToInsert = [{ subject_id, user_id }]; // Create an array to store the subjects to be inserted
//       console.log(subjectsToInsert,"INSERT:::::::");
//       // Push objects with the subject_id and user_id into the subjectsToInsert array
//       subjectsToInsert.push({ subject_id, user_id });

//       // You can add more objects to the subjectsToInsert array if you have multiple subjects

//       // Use bulkCreate to insert the subjects
//       const selectedsubjects = await models.Teacher.bulkCreate(subjectsToInsert);

//       return selectedsubjects;
//     } catch (error) {
//       console.log(error);
//       throw error; // Rethrow the error to be handled in the controller
//     }
//   },
// };

const models = require('../models');

module.exports = {
    selectsubjects: async function(subjectsArray) {
        try {
            // Ensure the subjectsArray is an array of objects
            if (!Array.isArray(subjectsArray)) {
                throw new Error('Invalid subjects data');
            }

            // You can optionally validate the subjectsArray structure here
            // For example, check if each object has "subject_id" and "user_id" properties.

            // Use bulkCreate to insert the subjects
            const selectedsubjects = await models.Teacher.bulkCreate(subjectsArray);

            return selectedsubjects;
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to be handled in the controller
        }
    }
};
