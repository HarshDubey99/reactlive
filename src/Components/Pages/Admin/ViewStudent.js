import React,{ useState, useEffect }  from "react";
import {useHistory,Link,useParams} from "react-router-dom";
import axios from "axios";
import "./css/AddStudent.css";
import Print from "./img/print.ico";
import Back from "./img/back.ico";

const ViewStudent = () =>{
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
			history.push("/ViewStudent/"+id);
		}else{
			history.push("/");
		}
	}		
	const getStudent = async e =>{
		const result = await axios.get("http://localhost:4400/student/viewstudent/"+id);
		setStudent(result.data);				
	}
	const handleBackButton = () =>{	
		console.log(Student);
		history.push("/Student");
	}
	const handlePrintButton = () =>{
		window.print();
	}
	return(<>
		<div className="container-fluid" id="AddStudent-Main-Box">
			<div className="row justify-content-center">
				<div className="col-md-10 jumbotron my-5">					
	    			<div className="d-flex justify-content-around my-5">			    		
			    		<h1 className="align-middle" id="panel-label">Student Profile</h1>			    		
		    		</div>		    		
		    		<div className="card">
		    			<div className="card-header d-flex justify-content-around">
		    				<h1 className="display-4 ">NAME: <b>{Student.name} </b></h1>
		    				<h1 className="display-4 ">ROLL-NO: <b>{Student.rollno} </b></h1>
		    			</div>
		    			<div className="card-body">
		    				<h1>Student Details:</h1>
		    				<table className="table table-bordered">
		    					<thead>
		    						<tr><th className="w-25">AGE</th><td><h2>{Student.age}</h2></td></tr>
		    						<tr><th>CONTACT</th><td><h2>{Student.contact}</h2></td></tr>
		    						<tr><th>STANDARD</th><td><h2>{Student.std}</h2></td></tr>
		    						<tr><th>SECTION</th><td><h2>{Student.div}</h2></td></tr>
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
export default ViewStudent;