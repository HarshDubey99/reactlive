const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Admin = require("./model/admin.model");
const dbUrl = "mongodb+srv://HD:userpassword@cluster0.ppger.mongodb.net/sms?retryWrites=true&w=majority";
const adminRouter = require("./routes/adminRouter");
const studentRouter = require("./routes/studentRouter");
const facultyRouter = require("./routes/facultyRouter");
const employeeRouter = require("./routes/employeeRouter");

app.use(cors());
app.use(bodyParser.json());

// Connecting To DB
mongoose.connect(dbUrl,{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true}, (err) => {
    if (err){console.log("Error TO Db: "+err)};
    console.log("Connected To DB");
});

app.use("/admin", adminRouter);
app.use("/student", studentRouter);
app.use("/faculty", facultyRouter);
app.use("/employee", employeeRouter);


app.get('/', function (req, res) {
    res.send("Welcome To SMS DataBase");
});

// // Getting Admins Data
// app.get('/admin', function (req, res) {
//     Admin.find({}).exec((err, result) => {
//         if (err) {
//             res.send("Error: " + err);
//         } else {
//             res.json(result);
//         }
//     });
// });

// // Adding Admin
// app.post('/adminInsert',function(req, res){
//     var newAdmin = new Admin();

//     newAdmin.name=req.body.name;
//     newAdmin.email=req.body.email;
//     newAdmin.password=req.body.password;

//     newAdmin.save(function(err, admin){
//         if(err){console.log("Error To Saving Admin: "+err);}else{
//             console.log(admin);
//             res.send(admin);
//         }
//     });
// });

// // Getting Students Data
// app.get('/student', function (req, res) {
//     res.send("List Of Students");
// });

// // Getting Faculty Data
// app.get('/faculty', function (req, res) {
//     res.send("List Of Faculties");
// });

// // Getting Employees Data
// app.get('/employee', function (req, res) {
//     res.send("List Of Employees");
// });


// Creating PORT
app.listen(4400, function () {
    console.log("App Is Running On Port 4400");
});
