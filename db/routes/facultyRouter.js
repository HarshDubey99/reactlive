const router = require("express").Router();
const mongoose = require("mongoose");
const bodyParser=require("body-parser");
let Faculty =require("../model/faculty.model");
let jsonParser = bodyParser.json();	

// Getting Faculty's Data
router.route("/").get((req, res)=>{
	Faculty.find().then(result => res.json(result))
	.catch(err=> res.status(200).json("Error: "+err));
});

// Getting One Faculty's Data
router.route("/viewfaculty/:id").get(jsonParser,(req, res) =>{	
	
	// Finding....
	Faculty.findOne({_id:req.params.id}).then((result)=>{
		res.status(202).json(result)
	})
	.catch(err => console.log("Error To Find: "+err))
});

// Inserting Into Faculty's DB

router.route("/add").post(jsonParser,(req, res) =>{	

	const newFaculty = new Faculty({	
		_id:new mongoose.Types.ObjectId(),
		name:req.body.name,
		age:req.body.age,
		gender:req.body.gender,
		subject:req.body.subject,
		city:req.body.city,		
		contact:req.body.contact
	});
	// Inserting....
	newFaculty.save().then((result)=>{
		res.status(202).json(result)
	})
	.catch(err => console.log("Error To Add: "+err))
});

// Updating Faculty Records
router.route("/updatefaculty/:id").put(jsonParser,(req, res) =>{
	// Updating...
	Faculty.updateOne(
		{_id:req.params.id},
		{$set:{
			name:req.body.name,
			age:req.body.age,
			gender:req.body.gender,
			subject:req.body.subject,
			city:req.body.city,		
			contact:req.body.contact
		}}).then((result)=>{
		res.status(201).json(result)
	})
	.catch(err => console.log("Error To Update: "+err))
});

// Deleting From Faculty's DB
router.route("/deletefaculty/:id").delete(jsonParser,(req, res) =>{	
	
	// Deleting....
	Faculty.deleteOne({_id:req.params.id}).then((result)=>{
		res.status(202).json(result)
	})
	.catch(err => console.log("Error To Delete: "+err))
});
module.exports = router;


