import React,{ useState, useEffect }  from "react";
import {useHistory,Link} from "react-router-dom";
import axios from "axios";
import "../css/AddStudent.css";
import Profile from "../img/user.png";
import Back from "../img/back.ico";
import Add from "../img/add.ico";
const AddEmployee = () =>{
	const [Employee,setEmployee] = useState();
	let history=useHistory();		

	useEffect(() => {				
		CheckSession();								
	}, []);


	const CheckSession=()=>{
		// Admin Session
		const aid=sessionStorage.getItem("aid");		
		if(aid!==null){
			history.push("/AddEmployee");
		}else{
			history.push("/");
		}
	}	
	const handleInp = (e) => {
		setEmployee({...Employee,[e.target.name]:e.target.value})
	}
	const handleSubmit = async e => {
		e.preventDefault();
		const ToSaveData = {
			name:Employee.name,
			department:Employee.department,
			age:Employee.age,
			gender:Employee.gender,
			city:Employee.city,
			contact:Employee.contact
		}	
		//Storing Data Into DB
		if(await axios.post("http://localhost:4400/employee/add",ToSaveData)){
			alert("New Employee Is Created Successfully");	
			history.push("./Management");		
		}else{
			alert("Something Goes Wrong!! Please Try Again");
			history.push("./AddEmployee");
		}
	}
	const handleBackButton = (e) =>{
		history.push("./Management");
	}	
	return(<>
		<div className="container-fluid" id="AddStudent-Main-Box">
			<div className="row justify-content-center">
				<div className="col-md-10 jumbotron my-5">
					<center><img src={Profile} className="shadow rounded-circle"/></center>
	    			<div className="d-flex justify-content-around my-5">			    		
			    		<h1 className="align-middle" id="panel-label">Add New Employee</h1>
		    		</div>
		    		<form id="add-new-student-form" onSubmit={handleSubmit}>
		    			<div className="form-group ml-5 ">
		    				<div className="form-row py-4">		    					
				    			<div className="col-md">
				    				<label>Employee Name</label>
				    				<input type="text" className="form-control form-control-lg w-75" name="name" placeholder="Enter Full Name..." required onChange={handleInp}/>
				    			</div>
				    			<div className="col-md">
				    				<label>Department</label>
				    				<input type="text" className="form-control form-control-lg w-75" name="department" placeholder="Enter Employee Department Name..." required onChange={handleInp}/>
				    			</div>
		    				</div>

		    				<div className="form-row py-4">
		    					<div className="col-md">
				    				<label>Age</label>
				    				<input type="text" className="form-control form-control-lg w-75" name="age" placeholder="Enter Employee Age..." required onChange={handleInp}/>
				    			</div>
				    			<div className="col-md">
				    				<label>Gender</label>
				    				<select className="form-control form-control-lg w-75" name="gender" required onChange={handleInp}>
				    					<option>SELECT</option>
				    					<option defaultValue="Male">Male</option>
				    					<option defaultValue="Female">Female</option>
				    					<option defaultValue="Other">Other</option>
				    				</select>
				    			</div>
		    				</div>

		    				<div className="form-row py-4">
		    					<div className="col-md">
				    				<label>City</label>
				    				<input type="text" className="form-control form-control-lg w-75" name="city" placeholder="Enter City Name..." required onChange={handleInp}/>
				    			</div>
				    			<div className="col-md">
				    				<label>Contact</label>
				    				<input type="text" className="form-control form-control-lg w-75" name="contact" placeholder="Enter Contact No..." required onChange={handleInp}/>
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
export default AddEmployee;