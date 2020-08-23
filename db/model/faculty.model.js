const mongoose = require("mongoose");
let facultySchema = new mongoose.Schema({
	_id:mongoose.Schema.Types.ObjectId,
	name:String,
	age:Number,
	gender:String,
	subject:String,
	city:String,
	contact:String
});

module.exports = mongoose.model("faculties", facultySchema);