const mongoose = require("mongoose");
let employeeSchema = new mongoose.Schema({
	_id:mongoose.Schema.Types.ObjectId,
	name:String,
	age:Number,
	gender:String,
	department:String,
	city:String,
	contact:String
});

module.exports = mongoose.model("employees", employeeSchema);