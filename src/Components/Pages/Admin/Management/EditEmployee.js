import React,{ useState, useEffect }  from "react";
import {useHistory,Link,useParams} from "react-router-dom";
import axios from "axios";
import "../css/AddStudent.css";

const EditEmployee = () =>{
	const [ Emp,setEmp ] = useState({
		name:"",
		age:"",
		gender:"",
		department:"",
		city:"",
		contact:""
	});
	let history=useHistory();	
	const { id } = useParams();

	useEffect(() => {				
		getEmp();
		CheckSession();									
	}, []);
	
	const CheckSession = () =>{
		// Admin Session
		const aid=sessionStorage.getItem("aid");		
		if(aid!==null){
			history.push("/EditEmployee/"+id);
		}else{
			history.push("/");
		}
	}	
	const handleInp = (e) => {
		setEmp({...Emp,[e.target.name]:e.target.value})
	}
	const handleUpdate= async e => {
		e.preventDefault();			
		if(await axios.put(`http://localhost:4400/employee/updateemployee/${id}`, Emp)){
			alert("Employee Is Updated");
			history.push("/Management");
		}else{
			alert("Employee Record Is Not Updated");
		}
								
	};
	const getEmp = async e =>{
		const result = await axios.get("http://localhost:4400/employee/viewemployee/"+id);
		setEmp(result.data);		
	}
	const handleBackButton = (e) =>{
		history.push("/Management");
	}
	return(<>
		<div className="container-fluid" id="AddStudent-Main-Box">
			<div className="row justify-content-center">
				<div className="col-md-10 jumbotron my-5">
	    			<div className="d-flex justify-content-around my-5">			    		
			    		<h1 className="align-middle" id="panel-label">Edit Employee</h1>
		    		</div>
		    		<form id="add-new-student-form" onSubmit={handleUpdate}>
		    			<div className="form-group">		    			
		    				<div className="form-row py-4">
		    					<div className="col-md">
				    				<label>Employee Name</label>
				    				<input type="text" className="form-control form-control-lg w-75" defaultValue={Emp.name} name="name" required onChange={handleInp}/>
				    			</div>
				    			<div className="col-md">
				    				<label>Employee Age</label>
				    				<input type="text" className="form-control form-control-lg w-75" defaultValue={Emp.age} name="age"  required onChange={handleInp}/>
				    			</div>
		    				</div>
		    			</div>
		    			<div className="form-group">
		    				<div className="form-row py-4">
		    					<div className="col-md">
				    				<label>Gender</label>
				    				<input type="text" className="form-control form-control-lg w-75" defaultValue={Emp.gender} name="gender"  required onChange={handleInp}/>
				    			</div>
				    			<div className="col-md">
				    				<label>Department</label>
				    				<input type="text" className="form-control form-control-lg w-75" defaultValue={Emp.department} name="department" required onChange={handleInp} />
				    			</div>
		    				</div>
		    			</div>
		    			<div className="form-group">
		    				<div className="form-row py-4">
		    					<div className="col-md">
				    				<label>City</label>
				    				<input type="text" className="form-control form-control-lg w-75" defaultValue={Emp.city} name="city" required onChange={handleInp}/>
				    			</div>
				    			<div className="col-md">
				    				<label>Contact</label>
				    				<input type="text" className="form-control form-control-lg w-75" defaultValue={Emp.contact} name="contact" required onChange={handleInp}/>
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
export default EditEmployee;