const mongoose = require('mongoose');
const User=require('../shema/Users')

const Lesson=require('../shema/lesson')

module.exports.getusers=async  function(req,res){
    
    // res.json({'mesage':"доступ получен"})
    let id = new mongoose.mongo.ObjectId(req.params.id);
   
    const userAll = await Lesson.find({})
   

    const candidate = await User.findOne(id)
    if(candidate){
        res.render('adpanel.hbs',{
            user:candidate.email,
            stutends:userAll
        })
        // res.render('adpanel.hbs')

    }
   

}
module.exports.setuser=async  function(req,res){
  
    const candidate = await Lesson.findOne({email:req.body.email})
   
    if(!candidate){
         // создать прользователя
         const lesson =new Lesson({
             email:req.body.email,
             access:true
         })
         try {
          await lesson.save()
       
            res.status(200).json({
                massage: 'пользователь добавлен'
            })
 
           
         } catch (err) {
            //  errorHandler(res, err)
            // console.log('ошибка регистрации')
            res.status(200).json({
                massage: 'ошибка регистрации'
            })
           
         }
        
    }else{
        // пользователю доступ закрыт
        //409 конфликт
        // res.status(409).json({
        //     message:'email существует'
        // })
        res.render('adpanel.hbs',{
            massage: 'ошибка: email существует'
        })
       
    }

}

// статус 

module.exports.changeUserAcces=async  function(req,res){

   

    if(req.body.current=='true'){
        const user = await Lesson.findOneAndUpdate({_id: req.body.idUserAcces}, {access: 'false'}, {new: true}); 

        if(user){
            
            // console.log(user)
            res.status(200).json({
                massage:user.access
            })
    
    
        }else{
            res.status(200).json({
             massage: 'err status'
            })

        }


    }else{
        const user = await Lesson.findOneAndUpdate({_id: req.body.idUserAcces}, {access: 'true'}, {new: true}); 
        if(user){
            
            // console.log(user)
            res.status(200).json({
                massage:user.access
            })
    
    
        }else{
            res.status(200).json({
             massage: 'err status'
            })

        }


    }



   


   

}
