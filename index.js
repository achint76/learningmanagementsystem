const express = require('express');
const app = express();


const RouterSignup = require('./router/signupRouter');
const RouterLogin = require('./router/loginRouter');
const RouterUser = require('./router/userRouter');
const RouterSubject = require('./router/subjectRouter');
const RouterTeacher = require('./router/teacherRouter');
const RouterSubscription = require('./router/subscriptionRouter');
const RouterSession = require('./router/trainingsessionRouter');
//const RouterStatus = require('./router/statusRouter');
app.use(express.json());

app.use('/user', RouterSignup);
app.use('/user', RouterLogin);
app.use('/user', RouterUser);
app.use('/subjects', RouterSubject);
app.use('/teacher', RouterTeacher);

//app.use('/permission', RouterStatus);
app.use('/student', RouterSubscription);
app.use('/training-scheduled', RouterSession)

app.get('/', function(req,res){
  res.send('hello World')
})

app.listen(3005, ()=>{
    console.log('server is running on port 3005');
})
