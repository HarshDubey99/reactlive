const router = require("express").Router();
const mongoose = require("mongoose");
const bodyParser=require("body-parser");
let Student =require("../model/student.model");
let jsonParser = bodyParser.json();	

// Getting AllStudent's Data
router.route("/").get((req, res)=>{
	Student.find().then(result => res.json(result))
	.catch(err=> res.status(200).json("Error: "+err));
});

// Getting One Student's Data
router.route("/viewstudent/:id").get(jsonParser,(req, res) =>{	
	
	// Finding....
	Student.findOne({_id:req.params.id}).then((result)=>{
		res.status(202).json(result)
	})
	.catch(err => console.log("Error To Find: "+err))
});

// Inserting Into Student's DB
router.route("/addstudent").post(jsonParser,(req, res) =>{	

	const newStudent = new Student({	
		_id:new mongoose.Types.ObjectId(),
		name:req.body.name,
		rollno:req.body.rollno,
		age:req.body.age,
		contact:req.body.contact,
		std:req.body.std,
		div:req.body.div		
	});
	// Inserting....
	newStudent.save().then((result)=>{
		res.status(202).json(result)
	})
	.catch(err => console.log("Error To Add: "+err))
});

// Updating Student Records
router.route("/updatestudent/:id").put(jsonParser,(req, res) =>{
	// Updating...
	Student.updateOne(
		{_id:req.params.id},
		{$set:{
			name:req.body.name,
			rollno:req.body.rollno,
			age:req.body.age,
			contact:req.body.contact,
			std:req.body.std,
			div:req.body.div
		}}).then((result)=>{
		res.status(201).json(result)
	})
	.catch(err => console.log("Error To Update: "+err))
});
// Deleting From Student's DB
router.route("/deletestudent/:id").delete(jsonParser,(req, res) =>{	
	
	// Deleting....
	Student.deleteOne({_id:req.params.id}).then((result)=>{
		res.status(202).json(result)
	})
	.catch(err => console.log("Error To Delete: "+err))
});
module.exports = router;


