var express = require('express');
var router = express.Router();

const credential ={
    email: "sai@gmail.com",
    password: "sai123"
}

router.post('/login',(req,res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password){
       req.session.user = req.body.email;
       res.redirect('/route/dashboard');
       res.end("Login Successfully");
    }else{
        res.end("Invalid Username")
    }
});


router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        res.send('unauthorised user')
    }
});

router.get('/logout',(req,res)=>{
     req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("error")
        }else{
            res.render('base',{title: "express",logout: "logout successfully"})
        }
     })
    })
module.exports = router;