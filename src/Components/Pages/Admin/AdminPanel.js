import React,{useState,useEffect} from "react";
import {NavLink,useHistory} from "react-router-dom";
import "./css/AdminPanel.css";
import Students from "./img/students.png";
import Teachers from "./img/teachers.png";
import Management from "./img/management.png";
import axios from "axios";
const AdminPanel=()=>{
	const [totalStu, setTotalStu]=useState([]);
	const [totalFac, setTotalFac]=useState([]);
	const [totalEmp, setTotalEmp]=useState([]);
	let history=useHistory();


	useEffect(()=>{		
		GetStudentData();
		GetFacultyData();
		GetEmployeeData();
		CheckSession();					
	},[]);

	const CheckSession = () =>{
		// Admin Session
		const aid=sessionStorage.getItem("aid");		
		if(aid!==null){
			history.push("/AdminPanel");
		}else{
			history.push("/");
		}
	}
	const handleStudentView = (e) => {		
		history.push("/Student");
	}
	const GetStudentData = async () =>{
		const result = await axios.get("http://localhost:4400/student");
		setTotalStu(result.data);
	}
	const GetFacultyData = async () =>{
		const resultFac = await axios.get("http://localhost:4400/faculty");
		setTotalFac(resultFac.data);
	}
	const GetEmployeeData = async () =>{
		const resultEmp = await axios.get("http://localhost:4400/employee");
		setTotalEmp(resultEmp.data);
	}
	const handleFacultyView = () => {
		history.push("/Faculty");		
	}
	const handleManagementView = () => {
		history.push("/Management");
	}
    return(<>
    	<div className="bg-dark" id="Admin-Main-Box">
    		<nav className="navbar navbar-light bg-light" id="Admin-Head-Nav">						
				<ul className="navbar-nav flex-row">	
					<li className="nav-item">						
						<NavLink className="nav-link px-3 text-dark" exact  to="/AdminPanel" id="BrandName">S M S</NavLink>
					</li>
				    <li className="nav-item">
				       	<NavLink className="nav-link px-3 mt-2 ml-5" exact  to="/AdminPanel">Home</NavLink>
				    </li>
				   
				    <li className="nav-item">
				        <NavLink className="nav-link px-3 mt-2" exact to="/Logout">Logout</NavLink>
				    </li>
				</ul>			 
			</nav>			
			<div className="container-fluid py-5">
				<div className="row">
					<div className="col-md-12">
						<div className="card-deck">
							<div className="card text-center jumbotron bg-secondary" id="card-box">
								<center><img className="card-img-top rounded-circle shadow" src={Students} alt="card-image" id="student-card-img"/></center>
								 <div className="card-body">
								    <h3 className="card-title">No Of Student</h3>
								    <h1 className="card-text py-3 text-light">{totalStu.length}</h1>
								    <button type="button" className="btn btn-primary py-3 px-5" onClick={handleStudentView} id="btn-view">View</button>
								  </div>
							</div>
							<div className="card text-center jumbotron bg-secondary" id="card-box">
								<center><img className="card-img-top rounded-circle shadow" src={Teachers} alt="card-image" id="student-card-img"/></center>
								 <div className="card-body">
								    <h3 className="card-title">No Of Faculty</h3>
								    <h1 className="card-text py-3 text-light">{totalFac.length}</h1>
								    <button className="btn btn-primary py-3 px-5" onClick={handleFacultyView} id="btn-view">View</button>
								  </div>
							</div>
							<div className="card text-center jumbotron bg-secondary" id="card-box">
								<center><img className="card-img-top rounded-circle shadow" src={Management} alt="card-image" id="student-card-img"/></center>
								 <div className="card-body">
								    <h3 className="card-title">No Of Management</h3>
								    <h1 className="card-text py-3 text-light">{totalEmp.length}</h1>
								    <button className="btn btn-primary py-3 px-5" onClick={handleManagementView} id="btn-view">View</button>
								  </div>
							</div>
						</div>						
					</div>
				</div>
			</div>
		</div>
    </>);
}
export default AdminPanel;