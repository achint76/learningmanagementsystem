const userService = require('../service/userService');
const models = require('../models');
const jwtService = require('../service/jwtService');
const sessionService = require('../service/sessionService');
const {Op} = require('sequelize');

const nodemailer = require('nodemailer');
//const userService = require('../service/userService');
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

module.exports = {
    // createUser: async function(req,res){
    //        //if(req.userdata.user_type == "student"){
    //         try{
    //            const data= req.body;
               
            //    const user = await userService.createUser({
            //     name: data.name,
            //     email: data.email,
            //     password: data.password,
            //     user_type: data.user_type,
            //     approved_status: 'null'
            //    })
            //    res.json({message: 'new student added', data: user}) 
    //         }catch(error){
    //                console.log(error,"======ERROR");
    //                res.status(500).json({
    //                 message: `error coming !!!!!`,
    //                 err: error,
    //             })
    //         }
    //        //}
    //     //    else if(req.userdata.user_type == "admin"){
    //     //       res.json({message: 'Not more than one admin possible'})
    //     //    }
    //        else{
    //         try{
    //             const jwt = req.headers["authorization"];
    //             const authData = jwtService.verifyToken(jwt);
    //             if(authData.user_type == "admin"){
    //                 try{
    //                const data = req.body;
    //                const user = await userService.createUser({
    //                 name: data.name,
    //                 email: data.email,
    //                 password: data.password,
    //                 user_type: data.user_type
    //                })
    //                res.json({message: "New teacher is added", data: user})
    //             }catch(error){
    //                 console.log(error,"======ERROR");
    //                 res.status(500).json({
    //                  message: `error coming !!!!!`,
    //                  err: error,
    //                 })
    //             }
    //         }
    //             else
    //             res.json({message: "only admin has the right to approve"})
    //         }catch(error){
    //             console.log(error,"======ERROR");
    //             res.status(500).json({
    //              message: `error coming !!!!!`,
    //              err: error,
    //             })
    //         }
    //        }
           
    // },
    //  createUser: async function(req,res){
    //     try{
    //       const data = req.body;
    //       if(data.user_type == "admin"){
    //         res.json({message: 'Not more than one admin possible'})
    //       }
    //       const user = await userService.createUser({
    //         name: data.name,
    //         email: data.email,
    //         password: data.password,
    //         user_type: data.user_type,
    //         approved_status: 'null'
    //        })
    //        res.json({message: 'new user added', data: user}) 
          
    //     }catch(error){
    //         console.log(error,"ERRORERROR");
    //         res.status(500).json({
    //             message: `error coming!!`,
    //             err: error
    //         })
    //     }
    //  },
    
    
    updateSessionLogout: async function(req,res){
        try{
            const jwt = req.headers["authorization"];
            if (!jwt) {
                return res.status(401).json({ message: "Authorization header is missing" });
            }
            console.log(jwt,"JWTJWTJWT");
            const token = jwt.split(" ")[1];
            const authData = jwtService.verifyToken(token);
            const sessions_id = authData.id;
            const date = new Date();
            const session = await sessionService.findSession({id: sessions_id});
            console.log(sessions_id,"SesssssionsId^^^^^^^^");
            console.log(session,"Session Is this!!!!!!!!");
            const sessions = await models.Session.findAll({
                where: {
                    [Op.and]: [
                        { logout: null }, // Check if logout is null
                        { expiry: { [Op.gt]: date } } // Check if expiry is greater than the current date
                    ]
                }
            });
            console.log(sessions,"SESSIONS AFTER CHECKING LOGOUT AND EXPIRY");
            if(sessions){
            const logOut = await sessionService.updateSessionlogout({
                date: date,
                id: sessions_id
            })
            console.log(logOut,"USERCONTROLLER>JS LOGOUT");
            if (logOut.numUpdatedRows > 0) {
                res.json({
                    message: `${authData.name} Logged out`
                })
            }
            else {
                res.json({
                    message: `Log in to log out`
                })
            }
        }
        else{
             console.log("sessions not found!!!");
        } } catch (error) {
            console.log(error,"<----error");
            res.status(500).json({
                message: `error coming !!!!!`,
                err: error,
            });
        }
    },

    statusapprove: async function(req,res){
        try{
            const jwt = req.headers["authorization"];
            if (!jwt) {
                return res.status(401).json({ message: "Authorization header is missing" });
            }
            const token = jwt.split(" ")[1];
            console.log(jwt,"JWTJWTJWT");
            const authData = jwtService.verifyToken(token);
            console.log(authData,"STATUSAPPROVE");
            if(authData.user_type != "admin"){
                res.json({
                    message: "Only admin can approve "
                });
            }
            else if(authData.user_type == "admin"){
            //    const userid = req.query.id;
            //    const status = req.query.approved_status;
               const data = req.body;
               const userid = data.id;
               const status = data.approved_status;
               if(status !== null && status !== "approved" && status !== "disapproved"){
                return res.status(400).json({
                    message: "Invalid approved status. Out of choice!!!"
                })
               }
               
               //if(status == "approved" || status == "disapproved"){
                   const [numUpdatedRows, updatedRows] = await models.Users.update({
                    approved_status: status
                   }, {
                    where: {
                        id: userid
                    }
                   });
                   if(numUpdatedRows == 0){
                    res.json({message: "admin has disapproved the request"})
                   }
                   const user = await models.Users.findByPk(userid);
                   if(user && status == "approved"){
                    const useremail = user.email;
                    statusMail(useremail,status);
                   }
                   return res.status(200).json({message:  `User ID ${userid} has been ${status}.`})
              // }
            }
        }catch(error){
            console.log(error,"ERRORRRRR");
            return res.status(500).json({
                message: "Error occurred while updating the user's approval status.",
                error: error
            });
        }
    }
}
