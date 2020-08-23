const mongoose = require("mongoose");
let adminSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String    
});

module.exports = mongoose.model("admins", adminSchema);