const express = require('express');
const app = express();


const RouterSignup = require('./router/signupRouter');
const RouterLogin = require('./router/loginRouter');
const RouterUser = require('./router/userRouter');


app.use(express.json());

app.use('/user', RouterSignup);
app.use('/user', RouterLogin);
app.use('/user', RouterUser);

 
app.get('/', function(req,res){
  res.send('hello World')
})

app.listen(3005, ()=>{
    console.log('server is running on port 3005');
})
