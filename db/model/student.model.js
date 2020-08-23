const mongoose = require("mongoose");
let studentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    rollno:String,
    age: String,
    contact:String,
    std: String,
    div:String
});

module.exports = mongoose.model("students", studentSchema);