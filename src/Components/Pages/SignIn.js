import React,{useState,useEffect} from "react";
import "./Css/SignIn.css";
import axios from "axios";
import {useHistory} from "react-router-dom";
import Logo from "./Img/admin1.png";
import Email from "./Img/email.ico";
import Pass from "./Img/pass.ico";
const SignIn = (props)=> {
	let history=useHistory();
	const [Admin,setAdmin]=useState();

	const handleInp=(e)=>{
		setAdmin({...Admin,[e.target.name]:[e.target.value]});
	}

	const [Dbdata,setData]=useState();

	useEffect(()=>{
		GetAdminData();
		CheckSession();
	},[]);

	const GetAdminData= async(e)=>{
		const result=await axios.get("http://localhost:4400/admin");		
		setData(result.data);
	}

	// Encrypting Password
	const CryptoJS=require('crypto-js');
	const encryptPass = (pass) =>{
		return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(pass));
	};

	const CheckSession=()=>{
		// Admin Session
		const aid=sessionStorage.getItem("aid");
		if(aid!==null){
			history.push("/AdminPanel");
		}
	}

	const handleLogin=async e =>{
		e.preventDefault();
		var getpass=Admin.admin_password[0];
		var encpass=encryptPass(getpass);
		// 	Checking User Authentication
		for(var i = 0;i < Dbdata.length; i++){
			if(Dbdata[i].email == Admin.admin_email[0] && Dbdata[i].password == encpass){
				// Storing Data In Session
				sessionStorage.setItem("aid",Admin.admin_email[0]);
				history.push("./AdminPanel");
				break;
			}else{
				document.getElementById("warn-invalid").style.display="block";
				console.log("Invalid Input Details!");
			}
		}

	}

	return(
		<div className="container-fluid bg-primary px-5 py-5">
			<div className="row justify-content-center">
				<div className="col-md-7 jumbotron shadow">
					<form onSubmit={handleLogin} id="login-form">
					<center><img src={Logo} className="img-fluid shadow rounded-circle my-2"/></center>
						<h1 className="text-center" id="login-label">LOG-IN</h1>
						<div className="from-group py-3">
							<label className="px-3"><img src={Email} className="shadow rounded-circle mr-2"/> Admin Email</label>
							<input type="email"
							className="form-control form-control-lg"
							name="admin_email"
							placeholder="Enter Admin Email..."
							required
							onChange={handleInp}/>
						</div>
						<div className="from-group py-3">
							<label className="px-3"><img src={Pass} className="shadow rounded-circle mr-2"/> Admin Password</label>
							<input type="password"
							className="form-control form-control-lg"
							name="admin_password"
							placeholder="Enter Password..."
							required
							onChange={handleInp}/>
							<span className="text-danger" id="warn-invalid">* Email Or Password is Wrong!! Please Try Valid Details.</span>
						</div>
						<div className="from-group py-3 text-center">
							<button type="submit"
							className="btn btn-primary w-50 py-3"
							name="login_btn"
							id="login-btn">
								LOG IN
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
export default SignIn;
