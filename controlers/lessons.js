const mongoose = require('mongoose');
const Lesson=require('../shema/lesson')
const User=require('../shema/Users')
const jwt=require('jsonwebtoken')
const configKey = require('../config/config')




module.exports.getlesson=async  function(req,res){
   
    let id = new mongoose.mongo.ObjectId(req.params.id);
   
    // console.log(id)

    const candidate = await User.findOne(id)
    const accessLesson = await Lesson.findOne({'email':candidate.email})

    
    if(accessLesson.access=='true'){
        res.render('lesson.hbs',{
            user:candidate.email
        })

    }else{
        res.status(401).json({
                massage: 'нет доступа'
        })
    }
       
    }
    // console.log(candidate)
    // res.render('lesson.hbs')
   


// module.exports.getusers=async  function(req,res){
    
//     // res.json({'mesage':"доступ получен"})
//     let id = new mongoose.mongo.ObjectId(req.params.id);
   
   

//     const candidate = await User.findOne(id)
//     if(candidate){
//         res.render('lesson.hbs',{
//             user:candidate.email
//         })
//     }
//     res.render('adpanel.hbs')
   

// }