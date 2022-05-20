const express= require('express');
const userModel= require('../model/userModel');
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth")

const router= new express.Router()



router.post('/user/register',function(req,res){
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email= req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, 10, function(err,hash1){
        //console.log(hash1)
        //var data= new passengerModel(req.body)

        const data = new userModel ({firstname : firstname, lastname : lastname, email : email, password : hash1});
        
        data.save()
        .then(function(result){
            res.status(201).json({message: "User Registered Success"})

        })
        .catch(function(err){
            res.status(500).json({message: err })

        })
        
    router.put('/user/update',function(req,res){
        const id= req.body.id;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email= req.body.email;

        userModel.updateOne({_id:id},{firstname : firstname},{lastname : lastname},{email : email},{password:hash1})
        .then(function(result){
            res.status(201).json({message: "User Updated Success"})
        })
        .catch(function(err){
            res.status(500).json({message: err })

        })
    })

    router.delete('/user/delete',function(req,res){
        const id= req.body.id;
    
        adminModel.deleteOne({_id:id})
        .then(function(result){
            res.status(201).json({message: "User Deleted Success"})
        })
        .catch(function(err){
            res.status(500).json({message: err })
        })
    })
})
})  

router.post('/user/login',/*auth.verifyUser,*/function(req,res){
    //firstly we need adminname and password
    const email= req.body.email;
    const password= req.body.password;

    //then we check does adminname exists or not 

    userModel.findOne({email : "a@gmail.com"})
    .then(function(data){
        if (data===null){
            return res.status(403).json({message:"User not found"})
        }
        //valid user
        //compare the password stored in database
        bcrypt.compare(password, data.password, function(err,result){
                if (result===false){
                    //if password is incorrect
                    return res.status(403).json({message:"Password doesnot match the username"})
                }

            const token = jwt.sign({_id : data.id},'anykey');
            res.status(200).json({t:token, message :'Auth Success'})


        })

        //both username and password are valid
        console.log("login successful")

    })
    .catch()

})

module.exports=router;