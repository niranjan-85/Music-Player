const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../../models/user')
const Router = express.Router();

// Handiling Routes :-

// homepage
Router.get('/',(req,res)=>{
    res.render('index.ejs');
})

// handle Register 
Router.post('/users',async (req,res)=>{
    let {name,Username,password } = req.body
    User = await UserModel.findOne({Username : Username});
    if(User){
        req.flash('user_error_msg','User already exists');
        res.redirect('/');
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
                    .then(()=>{
                        console.log("user added to db")
                        req.flash('success_msg','Registered Successfully');
                        res.redirect('/users/login')
                    })
                    .catch((error)=>{
                        console.log("Error while updating db")
                        req.flash('server_error_msg','Error While registering. Please try later');
                        res.redirect('/users/login')
                    })
            })
        });

    }
});

// handle Login : 

Router.get('/users/login',(req,res)=>{
    res.render('login.ejs');
})

module.exports = Router;