const PassportConfig = require('passport-local');
const bcrypt = require('bcrypt');
const UserModel = require('../../models/user')
const LocalStrategy = PassportConfig.Strategy;

function initPassport(passport){

    const Authenticate = async(username,password,done)=>{
        const User = await UserModel.findOne({Username:username});
        if(User){
            const match = await bcrypt.compare(password, User.password);
            if(match){
                return done(null,User)
            }
            return done(null,false,{message:"Incorrect Password"})
        }
        return done(null,false,{message:"No user found with this Username"})

    }

    passport.use(new LocalStrategy({usernameField:'Username',passwordField:'password'},Authenticate));
    passport.serializeUser((user,done)=>{
        done(null,user.id)
    });
    passport.deserializeUser((id,done)=>{
        UserModel.findById(id,(err,user)=>{
            done(err,user)
        });
    });

}

module.exports = initPassport;