import React,{useState,useEffect} from "react";
import {useHistory,Link} from "react-router-dom";
import axios from "axios";
import "../css/Student.css";
import Back from "../img/back.ico";
import Add from "../img/add.ico";
import Edit from "../img/edit.ico";
import View from "../img/view.ico";
import Delete from "../img/delete.ico";

const Management = () => {	
	const [Mandata, setMandata]=useState([]);

	let history=useHistory();		

	useEffect(() => {		
		getManagementData();
		CheckSession();								
	}, []);
	

	const getManagementData = async () => {
		const result = await axios.get("http://localhost:4400/employee");				
		setMandata(result.data);		
	};

	const CheckSession=()=>{
		// Admin Session
		const aid=sessionStorage.getItem("aid");		
		if(aid!==null){
			history.push("/Management");
		}else{
			history.push("/");
		}
	}

	const handleBackButton = () =>{
		history.push("./AdminPanel");
	}	
	const handleAddButton = () =>{
		history.push("./AddEmployee");
	}
	const handleDeleteData = async(id) =>{
		if(window.confirm("Do You Wan't To Delete This Record")){
			await axios.delete(`http://localhost:4400/employee/deleteemployee/${id}`);
			getManagementData();
		}
		else{
			getManagementData();
		}
	}
    return(<>
    	<div className="container-fluid py-5 " id="Student-Main-Box">
    		<div className="jumbotron">
    			<div className="d-flex justify-content-between my-5">
		    		<button className="btn btn-warning px-5" onClick={handleBackButton} id="back-btn"><img src={Back} className="shadow rounded-circle mr-2"/>Back</button>
		    		<center><h1 className="align-middle" id="panel-label">Management Panel</h1></center>       		 					
		    		<button className="btn btn-primary" onClick={handleAddButton} id="add-btn"><img src={Add} className="shadow rounded-circle mr-2"/>Add New Employee</button>
	    		</div>
	    		<table className="table table-hover text-center">    			
				  	<thead>
						<tr className="text-left">
							<th colSpan="7"><h3>List Of Employee</h3></th>						
						</tr>
				    	<tr>
				    		<th scope="col">#</th>			      						      		
				      		<th scope="col">Name</th>
				      		<th scope="col">Age</th>
				      		<th scope="col">Gender</th>
				      		<th scope="col">Department</th>
				      		<th scope="col">City</th>
				      		<th scope="col">Contact</th>
				      		<th scope="col">Action</th>
				    	</tr>
				  	</thead>
				  	<tbody>			  	
				  	{
				  		Mandata.map((emp, index)=>(
				  			<tr>
				  				<td>{index+1}</td>
				  				<td>{emp.name}</td>
				  				<td>{emp.age}</td>
				  				<td>{emp.gender}</td>
				  				<td>{emp.department}</td>
				  				<td>{emp.city}</td>
				  				<td>{emp.contact}</td>
				  				<td>
				  					<Link className="btn btn-primary mx-2" to={`/ViewEmployee/${emp._id}`} id="btn-view"><img src={View} className="shadow rounded-circle mr-2"/>View</Link>
				  					<Link className="btn btn-warning mx-2" to={`/EditEmployee/${emp._id}`} id="btn-edit"><img src={Edit} className="shadow rounded-circle mr-2"/>Edit</Link>
				  					<Link className="btn btn-danger mx-2" onClick={()=>handleDeleteData(emp._id)} id="btn-delete"><img src={Delete} className="shadow rounded-circle mr-2"/>Delete</Link>
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
export default Management;