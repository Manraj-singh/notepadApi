var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require ("../model/user")
const usermodel = mongoose.model('userModel');
//middleware to check if user has loggedin
 
function checkLoginUser(req,res,next){
	const token = req.header('auth-token');
	if(!token) return res.status(401).send("please login ");

	try {
	  const verified = jwt.verify(token, process.env.TOKEN_SECRET);
	
	  req.user=verified
	  next();

	} catch(err) {
     res.status(500).send("please login to access notes");
	}
}


//to check during signup if email already exists
  function existEmail (req,res,next){
	var checkemail = usermodel.findOne({email:req.body.email})
	checkemail.exec((err,data)=>{
		if(err) throw err;
		if(data){

		return res.send({"msg":'Email already exists'})
	    console.log('working')
		}
		next();

	});
}

module.exports.checkLoginUser =checkLoginUser;
module.exports.existEmail =existEmail;