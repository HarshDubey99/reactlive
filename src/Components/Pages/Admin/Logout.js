import React,{useState,useEffect} from "react";
import {NavLink,useHistory} from "react-router-dom";
import "./css/Logout.css";
const Logout=()=>{
	let history=useHistory();
	useEffect(()=>{		
		CheckSession();			
	},[]);

	const CheckSession=()=>{
		// Admin Session
		const aid=sessionStorage.getItem("aid");		
		if(aid!==null){
			history.push("./Logout");
		}else{
			history.push("./");
		}
	}

	const handleBack = () => {
		history.push("./AdminPanel");		
	}

	const handleYesButton = () => {		
		sessionStorage.removeItem("aid");
		history.push("./");
	}

    return(<>
    	<div id="Logout-Main-Box">    		
	    	<div className="jumbotron text-center" id="Logout-Controll-Box">
	    		<h1 className="mb-5 display-1">Do You Really Want To Logout?</h1>
	    		<button type="button" className="btn btn-outline-danger w-25 py-3 mx-4 my-4" id="yes-btn" onClick={handleYesButton}>YES</button>
	    		<button type="button" className="btn btn-outline-primary w-25 py-3 mx-4 my-4" id="no-btn" onClick={handleBack}>NO</button>
	    	</div>	    		
		</div>
    </>);
}
export default Logout;