const express = require("express");

const authContoller=require('../controlers/auth')

const urlencodedParser = express.urlencoded({extended: false});




 
// определяем Router
const authRouter = express.Router();
 
// определяем маршруты и их обработчики внутри роутера
authRouter.get("/login", authContoller.getlogin)
authRouter.get("/registry", authContoller.getregistry)
authRouter.post("/login", urlencodedParser, authContoller.login)
authRouter.post("/registry",urlencodedParser, authContoller.registry)

module.exports=authRouter