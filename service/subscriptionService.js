const models = require('../models');

module.exports = {
    subscribeteacher: async function(teachersArray) {
        try {
            if (!Array.isArray(teachersArray)) {
                throw new Error('Invalid teachers data');
            }

            const selectedteachers = await models.Subscription.bulkCreate(teachersArray);

            for (const teacherData of teachersArray) {
                // Check if the user_id corresponds to a teacher in the teachers table
                const teacher = await models.Teacher.findOne({
                    where: { user_id: teacherData.teacher_id }
                });

                // Check if the student_id corresponds to a student in the users table
                const student = await models.Users.findOne({
                    where: {
                        id: teacherData.student_id,
                        user_type: 'student'
                    }
                });

                if (!teacher) {
                    throw new Error(`User with user_id ${teacherData.teacher_id} is not a teacher.`);
                }

                if (!student) {
                    throw new Error(`User with id ${teacherData.student_id} is not a student.`);
                }
            }

            return selectedteachers;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};
