import React,{ useState, useEffect }  from "react";
import {useHistory,Link,useParams} from "react-router-dom";
import axios from "axios";
import "../css/AddStudent.css";

const EditFaculty = () =>{
	const [ Faculty,setFaculty ] = useState({
		name:"",
		age:"",
		gender:"",
		subject:"",
		city:"",
		contact:""
	});
	let history=useHistory();	
	const { id } = useParams();

	useEffect(() => {				
		getFaculty();
		CheckSession();									
	}, []);
	
	const CheckSession = () =>{
		// Admin Session
		const aid=sessionStorage.getItem("aid");		
		if(aid!==null){
			history.push("/EditFaculty/"+id);
		}else{
			history.push("/");
		}
	}	
	const handleInp = (e) => {
		setFaculty({...Faculty,[e.target.name]:e.target.value})
	}
	const handleUpdate= async e => {
		e.preventDefault();			
		if(await axios.put(`http://localhost:4400/faculty/updatefaculty/${id}`, Faculty)){
			alert("Faculty Is Updated");
			history.push("/Faculty");
		}else{
			alert("Faculty Record Is Not Updated");
		}
								
	};
	const getFaculty = async e =>{
		const result = await axios.get("http://localhost:4400/faculty/viewfaculty/"+id);
		setFaculty(result.data);		
	}
	const handleBackButton = (e) =>{
		history.push("/Faculty");
	}
	return(<>
		<div className="container-fluid" id="AddStudent-Main-Box">
			<div className="row justify-content-center">
				<div className="col-md-10 jumbotron my-5">
	    			<div className="d-flex justify-content-around my-5">			    		
			    		<h1 className="align-middle" id="panel-label">Edit Faculty</h1>
		    		</div>
		    		<form id="add-new-student-form" onSubmit={handleUpdate}>
		    			<div className="form-group">		    			
		    				<div className="form-row py-4">
		    					<div className="col-md">
				    				<label>Faculty Name</label>
				    				<input type="text" className="form-control form-control-lg w-75" defaultValue={Faculty.name} name="name" required onChange={handleInp}/>
				    			</div>
				    			<div className="col-md">
				    				<label>Faculty Age</label>
				    				<input type="text" className="form-control form-control-lg w-75" defaultValue={Faculty.age} name="age"  required onChange={handleInp}/>
				    			</div>
		    				</div>
		    			</div>
		    			<div className="form-group">
		    				<div className="form-row py-4">
		    					<div className="col-md">
				    				<label>Gender</label>
				    				<input type="text" className="form-control form-control-lg w-75" defaultValue={Faculty.gender} name="gender"  required onChange={handleInp}/>
				    			</div>
				    			<div className="col-md">
				    				<label>Subject</label>
				    				<input type="text" className="form-control form-control-lg w-75" defaultValue={Faculty.subject} name="subject" required onChange={handleInp} />
				    			</div>
		    				</div>
		    			</div>
		    			<div className="form-group">
		    				<div className="form-row py-4">
		    					<div className="col-md">
				    				<label>City</label>
				    				<input type="text" className="form-control form-control-lg w-75" defaultValue={Faculty.city} name="city" required onChange={handleInp}/>
				    			</div>
				    			<div className="col-md">
				    				<label>Contact</label>
				    				<input type="text" className="form-control form-control-lg w-75" defaultValue={Faculty.contact} name="contact" required onChange={handleInp}/>
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
export default EditFaculty;