const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../../models/user')
const Router = express.Router();

// Handiling Routes :-

// homepage
Router.get('/',(req,res)=>{
    res.render('index.ejs',{is_error:0});
})

// handle Register 
Router.post('/users',async (req,res)=>{
    let {name,Username,password } = req.body
    User = await UserModel.findOne({Username : Username});
    if(User){
        res.render('index.ejs',{is_error:1,error_msg:"User Already Exists"});
    }
    else{
        //Create a new user model

        const newUser = new UserModel({
            name,
            Username,
            password
        });

        // Hashing password :

        bcrypt.genSalt(10,async (err,salt)=>{
             bcrypt.hash(newUser.password,salt,(error,hash)=>{
                if(error) throw error;
                newUser.password=hash

                // saving to db
                newUser.save()
                    .then(()=>{console.log("user added to db")})
                    .catch((error)=>{console.log("Error while updating db")})
            })
        });

    }


});

module.exports = Router;