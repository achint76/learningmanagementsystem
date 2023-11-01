const nodemailer = require('nodemailer');
const userService = require('../service/userService');
//const statusmail = async
const statusMail = async(email,status)=>{
    return new Promise(async (resolve, reject) => {
    try{
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'achintya@matrixnmedia.com',
      pass: 'nvuk ohpc qlie rxdp'
    }
})

let approvalMessage;
if (status === 'approved') {
    approvalMessage = 'approved for logging.';
} else if (status === 'disapproved') {
    approvalMessage = 'disapproved for logging.';
} else {
    // Handle the case when the status is unknown
    approvalMessage = 'pending status.';
}

const mailOptions = {
    from: 'achintya@matrixnmedia.com', // sender's email
    to: email, // recipient's email
    subject: 'Approval Status Update',
    html: `<p> Hii, admin has ${approvalMessage}</p>`,
}

transporter.sendMail(mailOptions,function(error,result){
    if(error){
    console.log(error);
    //res.status(400).send({success: false, message: "Mail not sent"})
    reject(error);
    }
  else{
    console.log('Mail has been sent---', result.response);
    //res.status(200).send({success: true, message: "Mail sent"})
    resolve(result);
  }
   })
}catch(error){
//res.status(400).send({success: false, message: error.message})
console.log(error);
reject(error);
}
})
}
// module.exports = {
//     approvalmail: async function(req,res){
//         const email = req.body.email;
//         try{
//             const getmail = await userService.approvalmail({email});
//             console.log(getmail.approved_status,"GETMAIL:::::");
//             if(getmail){
//                 statusMail(getmail.email,getmail.approved_status);
//                 res.status(200).send({success: true,message: 'Please check your inbox'});
//             }
//             else {
//                 // The email does not exist in the database
//                 res.status(404).json({ message: "Email not found" });
//               }
//         }catch (error) {
//             // Handle any errors thrown by the validateEmail function
//             res.status(400).json({ message: error.message });
// }
//     }
// }