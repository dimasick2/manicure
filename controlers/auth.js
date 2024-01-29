const bcryptjs= require('bcryptjs')
const jwt=require('jsonwebtoken')
const configKey = require('../config/config')

const User=require('../shema/Users')
const Lesson=require('../shema/lesson')


module.exports.getlogin=function(req,res){
    

    res.render('authlogin.hbs')
   

}
module.exports.getregistry= function(req,res){
    
   
    res.render('authReg.hbs')

}

module.exports.login=async  function(req,res){
 

    const candidate = await User.findOne({email:req.body.email})
    
    if(candidate ){
        const passResult = bcryptjs.compareSync(req.body.password, candidate.password)
       
        if(passResult){


            const token=jwt.sign({
                email:candidate.email,
                userId:candidate._id
            }, configKey.jwt,{expiresIn:60*60})
            res.cookie('Authorization', token);

            if(candidate.email=='olga@admin.com'  ){
                res.redirect('/api/user/'+candidate._id);

            }else{
                res.redirect('/access/lesson/'+candidate._id);

            }

            
        }else{
            res.render('authlogin.hbs',{
                massage: 'пароль не верный'
            })
            // res.status(401).json({
            //     massage: 'пароль не верный'
            // })
           
        }

    }else{
        res.render('authlogin.hbs',{
            massage: 'ошибка: email не найден'
        })
        // res.status(401).json({
        //     massage: 'ошибка: email не найден'
        // })
    }

}

// регистрация пользователя на урок
module.exports.registry=async function(req,res){
    
    // const candidate = await Lesson.findOne({email:req.body.email})
    const candidate = await User.findOne({email:req.body.email})
   
    

    if(!candidate){
         // создать прользователя
         const salt = bcryptjs.genSaltSync(7)
        
         const user =new User({
             email:req.body.email,
             password:bcryptjs.hashSync(req.body.password,salt)
 
         })
         try {
          await user.save()
          //201 пользователь создан
          res.render('authlogin.hbs',{
            massage: 'пользователь зарегистрирован'
        })
 
           
         } catch (err) {
            //  errorHandler(res, err)
            // console.log('ошибка регистрации')
            res.render('authReg.hbs',{
                massage: 'ошибка регистрации'
            })
         }
        
    }else{
        // пользователю доступ закрыт
        //409 конфликт
        // res.status(409).json({
        //     message:'email существует'
        // })
        res.render('authReg.hbs',{
            massage: 'ошибка: email существует'
        })
       
    }
}