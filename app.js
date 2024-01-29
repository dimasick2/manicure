const express = require("express");
const hbs = require("hbs");
// const path = require('path')
const mongoose = require('mongoose')
const passport = require('passport')
const objectId = require("mongodb").ObjectId;
const cookieParser = require('cookie-parser');

const config = require('./config/config')

const authRouter = require('./routs/auth')
const userRouter = require('./routs/users')
const lesRouter = require('./routs/lessons')



const app = express();

mongoose.connect(config.mongoURL)
    .then(()=>console.log('mongodb conect'))
    .catch(error => console.log('err mongodb '+error))


app.use(passport.initialize())
require('./middeleware/passport')(passport)


app.set("view engine", "hbs");
// app.use(express.static(path.resolve(__dirname,"/public")));
app.use(express.static(__dirname+"/public"));
app.use(cookieParser());

app.use(express.json());

 
app.use("/auth", authRouter)
app.use("/api", userRouter)

app.use("/access", lesRouter)

app.use("/", function(_, res){
     res.redirect("/auth/login")
    // res.render('authlogin.hbs')
});

 
app.listen(3000, ()=>{
    console.log('started')
});

