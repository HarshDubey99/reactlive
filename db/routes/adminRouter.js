const router = require("express").Router();
const mongoose = require("mongoose");
const bodyParser=require("body-parser");
let Admin =require("../model/admin.model");
let jsonParser = bodyParser.json();	

// Getting Admin's Data
router.route("/").get((req, res)=>{
	Admin.find().then(result => res.json(result))
	.catch(err=> res.status(200).json("Error: "+err));
});

// Inserting Into Admin's DB

router.route("/add").post(jsonParser,(req, res) =>{	

	const newAdmin = new Admin({	
		_id:new mongoose.Types.ObjectId(),
		name:req.body.name,
		email:req.body.email,
		password:req.body.password		
	});
	// Inserting....
	newAdmin.save().then((result)=>{
		res.status(202).json(result)
	})
	.catch(err => console.log("Error To Add: "+err))
});

module.exports = router;


