// const models = require('../models');
// const nodemailer = require('nodemailer');

// async function sendEmail(email,subject,html){
//     const transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 587,
//         secure: false,
//         requireTLS: true,
//         auth: {
//           user: 'achintya@matrixnmedia.com',
//           pass: 'nvuk ohpc qlie rxdp'
//         }
//     });
//     const mailOptions = {
//         from: 'achintya@matrixnmedia.com', // sender's email
//         to: email, // recipient's email
//         subject: subject,
//         html: html,
//     }
//     try {
//         await transporter.sendMail(mailOptions);
//         console.log('Email sent');
//       } catch (error) {
//         console.error('Email sending error:', error);
//       }
// }

// module.exports = {
//     createSession: async function({subject_id,teacher_id,totalstudents,date}){
//         try{
//             //checking for valid teacher_id
//             const validteacher = await models.Teacher.findOne({
//                 where: {
//                     id: teacher_id
//                 }
//             });
//             const validsubject = await models.Teacher.findOne({
//                 where: {
//                     user_id: teacher_id,
//                     subject_id: subject_id
//                 }
//             })

//             if(!validsubject)
//             throw new Error('Respective teacher is not teaching the particular subject');
//             //checking for valid
//             if(!validteacher)
//             throw new Error('Invalid teacher_id');

//             const trainingsession =  await models.TrainingSession.create({
//                 subject_id: subject_id,
//                 teacher_id: teacher_id,
//                 totalstudents: totalstudents,
//                 session_date: date
//             });

//             //for fetching student emails as they have subscribed to particular teacher
//             const subscribedstudents = await models.Subscription.findAll({
//                 where: {
//                     teacher_id: teacher_id
//                 }
//             })
//             console.log(subscribedstudents,"===<STUDENTSSUBSCRIBERDETAILS");
//             //need to fetch student_id from the subscribedstudents and with student_id from users table we can send email to the subscribed students
//             const studentIds = [];
//             for(const subscription of subscribedstudents){
//                 studentIds.push(subscription.student_id);
//             }
//             for(const student of subscribedstudents){ 
//             const studentsinfo = await models.Users.findAll({
//                 attributes: ['email'],
//                 where: {
//                     id: studentIds,
//                     user_type: 'student'
//                 },
//             })
//             if (studentsinfo) {
//                 const email = studentsinfo.email;
//                 const subject = 'Your scheduled session information';
//                 const html = `<p>Here is the information about your scheduled session...</p>` // Customize your email text
      
//                 sendEmail(email, subject, html);
//               }

            



//         }
//         }catch(error){
//             console.log(error);
//             throw error;
//         }
//     }
// }


const models = require('../models');
const nodemailer = require('nodemailer');

async function sendEmail(email, subject, html) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'achintya@matrixnmedia.com',
            pass: 'nvuk ohpc qlie rxdp'
        }
    });
    const mailOptions = {
        from: 'achintya@matrixnmedia.com',
        to: email, // Use the correct email address here
        subject: subject,
        html: html,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent');
    } catch (error) {
        console.error('Email sending error:', error);
    }
}

module.exports = {
    createSession: async function ({ subject_id, teacher_id, totalstudents, date }) {
        try {
            // checking for valid teacher_id
            const validteacher = await models.Teacher.findOne({
                where: {
                    id: teacher_id
                }
            });
            const validsubject = await models.Teacher.findOne({
                where: {
                    user_id: teacher_id,
                    subject_id: subject_id
                }
            })

            if (!validsubject)
                throw new Error('Respective teacher is not teaching the particular subject');
            // checking for valid
            if (!validteacher)
                throw new Error('Invalid teacher_id');

            const trainingsession = await models.TrainingSession.create({
                subject_id: subject_id,
                teacher_id: teacher_id,
                totalstudents: totalstudents,
                session_date: date
            });

            // for fetching student emails as they have subscribed to a particular teacher
            const subscribedstudents = await models.Subscription.findAll({
                where: {
                    teacher_id: teacher_id
                }
            });
            console.log(subscribedstudents, "===<STUDENTSSUBSCRIBERDETAILS");

            for (const subscription of subscribedstudents) {
                // Fetch the email for each student and send the email
                const studentId = subscription.student_id;
                const studentinfo = await models.Users.findOne({
                    attributes: ['email'],
                    where: {
                        id: studentId,
                        user_type: 'student'
                    }
                });

                if (studentinfo) {
                    const email = studentinfo.email;
                    const subject = 'Your scheduled session information';
                    const html = `<p>Here is the information about your scheduled session...</p>
                    <ul>
                    <li>Date: ${date}</li>
                    <li>Teacher ID: ${teacher_id}</li>
                    <li>Number of Students Allowed to attend: ${totalstudents}</li>
                    </ul>`;

                    sendEmail(email, subject, html);
                }
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
