const express = require('express');
const Router = express.Router();

// Handiling Routes :-

Router.get('/',(req,res)=>{
    res.render('index.ejs');
})

module.exports = Router;