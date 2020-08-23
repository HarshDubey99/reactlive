const router = require("express").Router();
const mongoose = require("mongoose");
const bodyParser=require("body-parser");
let Employee =require("../model/employee.model");
let jsonParser = bodyParser.json();	

// Getting Employee's Data
router.route("/").get((req, res)=>{
	Employee.find().then(result => res.json(result))
	.catch(err=> res.status(200).json("Error: "+err));
});

// Getting One Employee's Data
router.route("/viewemployee/:id").get(jsonParser,(req, res) =>{	
	
	// Finding....
	Employee.findOne({_id:req.params.id}).then((result)=>{
		res.status(202).json(result)
	})
	.catch(err => console.log("Error To Find: "+err))
});

// Inserting Into Employee's DB
router.route("/add").post(jsonParser,(req, res) =>{	

	const newEmployee = new Employee({	
		_id:new mongoose.Types.ObjectId(),
		name:req.body.name,
		age:req.body.age,
		gender:req.body.gender,
		department:req.body.department,
		city:req.body.city,		
		contact:req.body.contact
	});
	// Inserting....
	newEmployee.save().then((result)=>{
		res.status(202).json(result)
	})
	.catch(err => console.log("Error To Add: "+err))
});

// Updating Employee Records
router.route("/updateemployee/:id").put(jsonParser,(req, res) =>{
	// Updating...
	Employee.updateOne(
		{_id:req.params.id},
		{$set:{
			name:req.body.name,
			age:req.body.age,
			gender:req.body.gender,
			department:req.body.department,
			city:req.body.city,		
			contact:req.body.contact
		}}).then((result)=>{
		res.status(201).json(result)
	})
	.catch(err => console.log("Error To Update: "+err))
});

// Deleting From Employee's DB
router.route("/deleteemployee/:id").delete(jsonParser,(req, res) =>{	
	
	// Deleting....
	Employee.deleteOne({_id:req.params.id}).then((result)=>{
		res.status(202).json(result)
	})
	.catch(err => console.log("Error To Delete: "+err))
});

module.exports = router;


