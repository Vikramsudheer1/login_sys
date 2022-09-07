const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const session =  require('express-session');
const port = process.env.port||8000;
const {v4:uuidv4} = require('uuid');
const router = require('./router');
app.set('view engine','ejs');
app.use(bodyparser.json())
app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));

app.use(bodyparser.urlencoded({extended:true}));
app.use('/static',express.static(path.join(__dirname,'public')));
app.use('/assets',express.static(path.join(__dirname,'public/assets')));

app.use('/route',router);
app.get('/',(req,res)=>{
    res.render('base',{title:"login System"});
});


app.listen(port,()=>{console.log("listening to the server on http://localhost:8000")
});
