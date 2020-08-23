import React,{ useState, useEffect }  from "react";
import {useHistory,Link} from "react-router-dom";
import axios from "axios";
import "./css/AddStudent.css";
import Profile from "./img/user.png";
import Back from "./img/back.ico";
import Add from "./img/add.ico";
const AddStudent = () =>{
	const [Student,setStudent] = useState();
	let history=useHistory();		

	useEffect(() => {				
		CheckSession();								
	}, []);


	const CheckSession=()=>{
		// Admin Session
		const aid=sessionStorage.getItem("aid");		
		if(aid!==null){
			history.push("/AddStudent");
		}else{
			history.push("/");
		}
	}	
	const handleInp = (e) => {
		setStudent({...Student,[e.target.name]:e.target.value})
	}
	const handleSubmit = async e => {
		e.preventDefault();
		const ToSaveData = {
			rollno:Student.rollno,
			name:Student.name,
			age:Student.age,
			contact:Student.contact,
			std:Student.std,
			div:Student.div
		}		
		//Storing Data Into DB
		if(await axios.post("http://localhost:4400/student/addstudent",ToSaveData)){
			alert("New Student Is Created Successfully");	
			history.push("./Student");		
		}else{
			alert("Something Goes Wrong!! Please Try Again");
			history.push("./AddStudent");
		}
	}
	const handleBackButton = (e) =>{
		history.push("./Student");
	}	
	return(<>
		<div className="container-fluid bg-dark" id="AddStudent-Main-Box">
			<div className="row justify-content-center">
				<div className="col-md-10 jumbotron my-5">
					<center><img src={Profile} className="shadow rounded-circle"/></center>
	    			<div className="d-flex justify-content-around my-5">			    		
			    		<h1 className="align-middle" id="panel-label">Add New Student</h1>
		    		</div>
		    		<form id="add-new-student-form" onSubmit={handleSubmit}>
		    			<div className="form-group ml-5 ">
		    				<div className="form-row py-4">
		    					<div className="col-md">
				    				<label>Student Roll No</label>
				    				<input type="text" className="form-control form-control-lg w-75" name="rollno" placeholder="Enter Student Roll No..." required onChange={handleInp}/>
				    			</div>
				    			<div className="col-md">
				    				<label>Student Name</label>
				    				<input type="text" className="form-control form-control-lg w-75" name="name" placeholder="Enter Student Full Name..." required onChange={handleInp}/>
				    			</div>
		    				</div>

		    				<div className="form-row py-4">
		    					<div className="col-md">
				    				<label>Age</label>
				    				<input type="text" className="form-control form-control-lg w-75" name="age" placeholder="Enter Student Age..." required onChange={handleInp}/>
				    			</div>
				    			<div className="col-md">
				    				<label>Contact</label>
				    				<input type="text" className="form-control form-control-lg w-75" name="contact" placeholder="Enter Student Contact No..." required onChange={handleInp}/>
				    			</div>
		    				</div>

		    				<div className="form-row py-4">
		    					<div className="col-md">
				    				<label>Standard</label>
				    				<input type="text" className="form-control form-control-lg w-75" name="std" placeholder="Enter Student Standard..." required onChange={handleInp}/>
				    			</div>
				    			<div className="col-md">
				    				<label>Section</label>
				    				<input type="text" className="form-control form-control-lg w-75" name="div" placeholder="Enter Student Section..." required onChange={handleInp}/>
				    			</div>
		    				</div>

		    				<div className="form-row py-4">
		    					<div className="col-md text-center">				    				
				    				<button type="submit" className="btn btn-success px-5 py-3 w-50" id="add-student-btn"><img src={Add} className="shadow rounded-circle mr-2"/>ADD</button>
				    			</div>
				    			<div className="col-md">
				    				<button type="button" className="btn btn-warning px-5 py-3 w-50" id="back-btn" onClick={handleBackButton}><img src={Back} className="shadow rounded-circle mr-2"/>BACK</button>
				    			</div>
		    				</div>
		    			</div>
		    		</form>
	    		</div>
			</div>
		</div>
	</>);
};
export default AddStudent;