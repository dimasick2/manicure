const express = require("express");
const objectId = require("mongodb").ObjectId;
const passport = require('passport')
const lessonContoller=require('../controlers/lessons')






 
// определяем Router
const lesRouter = express.Router();
// passport.authenticate('jwt', {session:false})
 
// определяем маршруты и их обработчики внутри роутера
lesRouter.get("/lesson/:id",passport.authenticate('jwt', {session:false}), lessonContoller.getlesson)



module.exports=lesRouter