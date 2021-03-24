const express = require('express');
const bodyparser = require('body-parser');

const router = require('./src/routes/routes')
const app = express();

const PORT = process.env.PORT || 5000 ;

// static files 
app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/images',express.static(__dirname + 'public/images'))

//Templating engine 
app.set('view engine','ejs')
app.set('views','./src/views')

//Routes 

app.get('/',router)


// Server 
app.listen(PORT,()=>{
    console.log("server up and running")
})