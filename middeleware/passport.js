const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')

const mongoose = require("mongoose");
const User = require('../shema/Users')
// const User = mongoose.model('User')


const configKey = require('../config/config')

let cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['Authorization'];
    }
    return token;
};

const options ={
    jwtFromRequest:cookieExtractor,
    secretOrKey: configKey.jwt

}

module.exports = passport =>{
    passport.use(
        new JwtStrategy(options, async (playload, done)=>{
            try {
                const user= await User.findById(playload.userId).select('email id')
                if(user){
                    done(null, user)
                }else{
                    done(nuul, false)
                }
            } catch (error) {
                console.log('ошибка токена', error)
            }
            
           
        })
    )

}