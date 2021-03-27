const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const router = require('./src/routes/routes')
const flash = require('connect-flash');
const sessions = require('express-session')
require('./src/config/passportconfig')(passport);


const app = express();
const PORT = process.env.PORT || 5000 ;

// Passport config

// static files 
app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/images',express.static(__dirname + 'public/images'))

//Templating engine 
app.set('view engine','ejs')
app.set('views','./src/views')

//bodyparser 
app.use(express.urlencoded({ extended: false }));

//sessions 
app.use(sessions({
    secret:"my secretkey",
    resave:false,
    saveUninitialized:false,
}))

// Passport middlewares 
app.use(passport.initialize());
app.use(passport.session());

// Flash messages
app.use(flash())

// variables for flash messages 
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.user_error_msg = req.flash("user_error_msg");
    res.locals.server_error_msg = req.flash("server_error_msg");
    res.locals.error = req.flash("error");
    next();
})

//Database config 
const mongoURI = 'mongodb://localhost:27017/musicplayer';
mongoose.connect(mongoURI,{useNewUrlParser:true,useUnifiedTopology: true })
    .then(()=>{console.log("DB connected")})
    .catch((err)=>{console.log("error")});

//Routes 

app.get('/',router)
app.post('/users',router)
app.get('/users/login',router)
app.post('/users/login',router);


// Server 
app.listen(PORT,()=>{
    console.log("server up and running")
})