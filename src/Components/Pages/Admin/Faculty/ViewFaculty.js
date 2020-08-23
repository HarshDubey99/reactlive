import React,{ useState, useEffect }  from "react";
import {useHistory,Link,useParams} from "react-router-dom";
import axios from "axios";
import "../css/AddStudent.css";
import Print from "../img/print.ico";
import Back from "../img/back.ico";

const ViewFaculty = () =>{
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
			history.push("/ViewFaculty/"+id);
		}else{
			history.push("/");
		}
	}		
	const getFaculty = async e =>{
		const result = await axios.get("http://localhost:4400/faculty/viewfaculty/"+id);
		setFaculty(result.data);				
	}
	const handleBackButton = () =>{
		history.push("/Faculty");
	}
	const handlePrintButton = () =>{
		window.print();
	}
	return(<>
		<div className="container-fluid" id="AddStudent-Main-Box">
			<div className="row justify-content-center">
				<div className="col-md-10 jumbotron my-5">					
	    			<div className="d-flex justify-content-around my-5">			    		
			    		<h1 className="align-middle" id="panel-label">Faculty Profile</h1>			    		
		    		</div>		    		
		    		<div className="card">
		    			<div className="card-header d-flex justify-content-between">
		    				<h2>NAME: <b>{Faculty.name} </b></h2>
		    				<h2>SUBJECT: <b>{Faculty.subject} </b></h2>
		    			</div>
		    			<div className="card-body">
		    				<h3>Faculty Details:</h3>
		    				<table className="table table-bordered">
		    					<thead>
		    						<tr><th className="w-25">GENDER</th><td><h5>{Faculty.gender}</h5></td></tr>
		    						<tr><th>AGE</th><td><h5>{Faculty.age}</h5></td></tr>
		    						<tr><th>CITY</th><td><h5>{Faculty.city}</h5></td></tr>
		    						<tr><th>CONTACT</th><td><h5>{Faculty.contact}</h5></td></tr>
		    					</thead>
		    				</table>		    				
		    			</div>
		    			<div className="card-footer bg-dark d-print-none">
		    				<button className="btn btn-outline-primary px-5 mx-5 py-3" onClick={handlePrintButton}><img src={Print} className="shadow rounded-circle mr-2"/>PRINT</button>
		    				<button className="btn btn-outline-warning px-5 mx-5 py-3" onClick={handleBackButton}><img src={Back} className="shadow rounded-circle mr-2"/>BACK</button>
		    			</div>
		    		</div>
	    		</div>
			</div>
		</div>
	</>);
};
export default ViewFaculty;