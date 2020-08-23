import React,{ useState, useEffect }  from "react";
import {useHistory,Link,useParams} from "react-router-dom";
import axios from "axios";
import "./css/AddStudent.css";

const EditStudent = () =>{
	const [ Student,setStudent ] = useState({
		rollno:"",
		name:"",
		age:"",
		contact:"",
		std:"",
		div:""
	});
	let history=useHistory();	
	const { id } = useParams();

	useEffect(() => {				
		getStudent();
		CheckSession();									
	}, []);
	
	const CheckSession = () =>{
		// Admin Session
		const aid=sessionStorage.getItem("aid");		
		if(aid!==null){
			history.push("/EditStudent/"+id);
		}else{
			history.push("/");
		}
	}	
	const handleInp = (e) => {
		setStudent({...Student,[e.target.name]:e.target.value})
	}
	const handleUpdate= async e => {
		e.preventDefault();
		
		console.log(Student);		
		if(await axios.put(`http://localhost:4400/student/updatestudent/${id}`, Student)){
			alert("Student Is Updated");
			history.push("/Student");
		}else{
			alert("Student Record Is Not Updated");
		}
								
	};
	const getStudent = async e =>{
		const result = await axios.get("http://localhost:4400/student/viewstudent/"+id);
		setStudent(result.data);		
	}
	const handleBackButton = (e) =>{
		history.push("/Student");
	}
	return(<>
		<div className="container-fluid" id="AddStudent-Main-Box">
			<div className="row justify-content-center">
				<div className="col-md-10 jumbotron my-5">
	    			<div className="d-flex justify-content-around my-5">			    		
			    		<h1 className="align-middle" id="panel-label">Edit Student</h1>
		    		</div>
		    		<form id="add-new-student-form" onSubmit={handleUpdate}>
		    			<div className="form-group">		    			
		    				<div className="form-row py-4">
		    					<div className="col-md">
				    				<label>Student Roll No</label>
				    				<input type="text" className="form-control form-control-lg w-75" defaultValue={Student.rollno} name="rollno" required onChange={handleInp}/>
				    			</div>
				    			<div className="col-md">
				    				<label>Student Name</label>
				    				<input type="text" className="form-control form-control-lg w-75" defaultValue={Student.name} name="name" placeholder="Enter Student Full Name..." required onChange={handleInp}/>
				    			</div>
		    				</div>
		    			</div>
		    			<div className="form-group">
		    				<div className="form-row py-4">
		    					<div className="col-md">
				    				<label>Age</label>
				    				<input type="text" className="form-control form-control-lg w-75" defaultValue={Student.age} name="age" placeholder="Enter Student Age..." required onChange={handleInp}/>
				    			</div>
				    			<div className="col-md">
				    				<label>Contact</label>
				    				<input type="text" className="form-control form-control-lg w-75" defaultValue={Student.contact} name="contact" placeholder="Enter Student Contact No..." required onChange={handleInp} />
				    			</div>
		    				</div>
		    			</div>
		    			<div className="form-group">
		    				<div className="form-row py-4">
		    					<div className="col-md">
				    				<label>Standard</label>
				    				<input type="text" className="form-control form-control-lg w-75" defaultValue={Student.std} name="std" placeholder="Enter Student Standard..." required onChange={handleInp}/>
				    			</div>
				    			<div className="col-md">
				    				<label>Section</label>
				    				<input type="text" className="form-control form-control-lg w-75" defaultValue={Student.div} name="section" placeholder="Enter Student Section..." required onChange={handleInp}/>
				    			</div>
		    				</div>
		    			</div>
		    			<div className="form-group">
		    				<div className="form-row py-4">
		    					<div className="col-md text-center">				    				
				    				<button type="submit" className="btn btn-success px-5 py-3 w-50" id="add-student-btn">UPDATE</button>
				    			</div>
				    			<div className="col-md">
				    				<button type="button" className="btn btn-warning px-5 py-3 w-50" id="back-btn" onClick={handleBackButton}>BACK</button>
				    			</div>
		    				</div>		    		
		    			</div>	
		    		</form>
	    		</div>
			</div>
		</div>
	</>);
};
export default EditStudent;