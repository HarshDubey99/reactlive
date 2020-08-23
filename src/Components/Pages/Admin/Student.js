import React,{useState,useEffect} from "react";
import {useHistory,Link} from "react-router-dom";
import axios from "axios";
import "./css/Student.css";
import Back from "./img/back.ico";
import Add from "./img/add.ico";
import Edit from "./img/edit.ico";
import View from "./img/view.ico";
import Delete from "./img/delete.ico";

const Student = () => {	
	const [Studata, setStudata]=useState([]);

	let history=useHistory();		

	useEffect(() => {		
		getStudentData();
		CheckSession();								
	}, []);
	

	const getStudentData = async () => {
		const result = await axios.get("http://localhost:4400/student");				
		setStudata(result.data);		
	};

	const CheckSession=()=>{
		// Admin Session
		const aid=sessionStorage.getItem("aid");		
		if(aid!==null){
			history.push("/Student");
		}else{
			history.push("/");
		}
	}

	const handleBackButton = () =>{		
		history.push("./AdminPanel");
	}	
	const handleAddButton = () =>{
		history.push("./AddStudent");
	}
	const handleDeleteData = async(id) =>{
		if(window.confirm("Do You Wan't To Delete This Record")){
			await axios.delete(`http://localhost:4400/student/deletestudent/${id}`);
			getStudentData();
		}
		else{
			getStudentData();
		}
	}
    return(<>
    	<div className="container-fluid py-5 bg-dark" id="Student-Main-Box">
    		<div className="jumbotron" id="panel-box">
    			<div className="d-md-flex justify-content-between my-5">
		    		<button className="btn btn-warning px-5" onClick={handleBackButton} id="back-btn"><img src={Back} className="shadow rounded-circle mr-2"/>Back</button>
		    		<center><h1 className="align-middle" id="panel-label">Student Panel</h1></center>       		 					
		    		<button className="btn btn-primary" onClick={handleAddButton} id="add-btn"><img src={Add} className="shadow rounded-circle mr-2"/>Add New Student</button>
	    		</div>
	    		<table className="table table-hover text-center table-responsive-md">    			
				  	<thead>
						<tr className="text-left">
							<th colSpan="7"><h3>List Of Students</h3></th>						
						</tr>
				    	<tr>
				    		<th>#</th>			      		
				      		<th scope="col">RollNo</th>
				      		<th scope="col">Name</th>
				      		<th scope="col">Age</th>
				      		<th scope="col">Contact</th>
				      		<th scope="col">Standard</th>
				      		<th scope="col">Section</th>
				      		<th scope="col">Action</th>
				    	</tr>
				  	</thead>
				  	<tbody>			  	
				  	{
				  		Studata.map((student, index)=>(
				  			<tr>
				  				<td>{index+1}</td>
				  				<td>{student.rollno}</td>
				  				<td>{student.name}</td>
				  				<td>{student.age}</td>
				  				<td>{student.contact}</td>
				  				<td>{student.std}</td>
				  				<td>{student.div}</td>
				  				<td>
				  					<Link className="btn btn-primary mx-2" to={`/ViewStudent/${student._id}`} id="btn-view"><img src={View} className="shadow rounded-circle mr-2"/>View</Link>
				  					<Link className="btn btn-warning mx-2" to={`/EditStudent/${student._id}`} id="btn-edit"><img src={Edit} className="shadow rounded-circle mr-2"/>Edit</Link>
				  					<Link className="btn btn-danger mx-2" onClick={()=>handleDeleteData(student._id)} id="btn-delete"><img src={Delete} className="shadow rounded-circle mr-2"/>Delete</Link>
				  				</td>
				  			</tr>
				  		))
				  	}			   		
					</tbody>
				</table>
			</div>
		</div>
    </>);
}
export default Student;