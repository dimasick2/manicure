const express = require("express");
const passport = require('passport')
const userContoller=require('../controlers/users')
const urlencodedParser = express.urlencoded({extended: false});





 
// определяем Router
const userRouter = express.Router();
 
// определяем маршруты и их обработчики внутри роутера
userRouter.get("/user/:id", passport.authenticate('jwt', {session:false}), userContoller.getusers)

userRouter.post("/adduser", passport.authenticate('jwt', {session:false}), userContoller.setuser)

module.exports=userRouter