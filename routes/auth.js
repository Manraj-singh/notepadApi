const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require ("../model/user")
const usermodel = mongoose.model('userModel');
const { existEmail} = require ("../middlewares/authorize")



// login route
router.post('/test',(req,res,)=>{
	res.send(req.body);
})

router.post('/login',(req,res)=>{
	var password = req.body.password;
	var checkemail = usermodel.findOne({email:req.body.email})
 	checkemail.exec((err,user)=>{
		 if(err) res.send("check email");
		
 		var getuserId = user._id;
 		var getpassword =user.password;

 		if (bcrypt.compareSync(req.body.password, getpassword)){
			 const token =jwt.sign({_id :getuserId},process.env.TOKEN_SECRET);
			 res.header('auth-token',token).send(token);
			 }

 		else{
 			res.status(400).json({msg :" password is incorrect"});
			 }

 	})
	
})




//registerr
router.post('/register',existEmail,(req,res,next)=>{

 if(req.body.password != req.body.cnfpassword){
 	res.send("password do not match");
 }
else{
	var pass =req.body.password
	var password = bcrypt.hashSync( pass , 10 );
	 var newuser = new usermodel({
		    name:req.body.name,
	 		email:req.body.email,
	 		password:password 
	 	 })
			newuser.save((err,data)=>{
			if(err) throw err;
			res.status(200).json([{"status":"success"},{"user added":data}])
			console.log('new user saved')
		})
 
};

});


module.exports = router
