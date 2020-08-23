import React, { useState,useEffect } from "react";
import "./Css/SignUp.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Logo from "./Img/profile.png";
import Name from "./Img/name.ico";
import Email from "./Img/email.ico";
import Pass from "./Img/pass.ico";
import Repass from "./Img/repass.ico";

const SignUp = () => {
	let history=useHistory();
	const [admin, setAdmin] = useState({
		name: "",
		email: "",
		password: "",
		confirmpassword: ""
	});
	const [varifiedAdmin,setData] = useState();

	const { name, email, password,confirmpassword } = admin;

	const handleInp = (e) => {
		setAdmin({ ...admin, [e.target.name]: e.target.value });
	}

	// Encrypting Password
	const CryptoJS=require('crypto-js');
	const encryptPass = (pass) =>{
		return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(pass));
	};

	const handleFormSubmit = async e => {
		e.preventDefault();
		if (admin.password !== admin.confirmpassword) {
			alert("Password Does Not Matched!!");
			e.currentTarget[2].style.borderColor="red";
			e.currentTarget[3].style.borderColor="red";
			document.getElementById("warn-confirmpass").style.display="block";
		} else {
			var pass=admin.password;
			var repass=admin.confirmpassword;
			// Calling Encryption Method
			var encpass=encryptPass(pass);
			var encrepass=encryptPass(repass);

			// Updating Password
			admin.password=encpass;
			admin.confirmpassword=encrepass;

			const ToSaveData={
				name:admin.name,
				email:admin.email,
				password:admin.password
			}			
			//Storing Data Into DB

			if(await axios.post("http://localhost:4400/admin/add",ToSaveData)){
				alert("New Admin Is Created Successfully");
				history.push("./");
			}else{
				alert("Something Goes Wrong!! Please Try Again");
				history.push("./SignUp");
			}
		}
	}
	return (
		<div className="container-fluid bg-warning">
			<div className="row justify-content-center">
				<div className="col-md-7 my-5 jumbotron">
					<center><img src={Logo} className="img-fluid shadow rounded-circle my-2"/></center>
					<h1 className="text-center" id="signup-label">SIGN-UP</h1>
					<form onSubmit={handleFormSubmit} id="signup-form">
						<div className="form-group py-3">
							<label className="px-3"><img src={Name} className="shadow rounded-circle mr-2"/> Admin Name</label>
							<input type="text"
								className="form-control form-control-lg"
								placeholder="Enter Admin Name..."
								name="name" required
								onChange={handleInp} />
						</div>
						<div className="form-group py-3">
							<label className="px-3"><img src={Email} className="shadow rounded-circle mr-2"/> Admin Email</label>
							<input type="email"
								className="form-control form-control-lg"
								placeholder="Enter Email Address..."
								name="email" required
								onChange={handleInp}
							/>
						</div>
						<div className="form-group py-3">

							<label className="px-3"><img src={Pass} className="shadow rounded-circle mr-2"/> Admin Password</label>
							<input type="password"
								className="form-control form-control-lg"
								placeholder="Enter Your Password..."
								name="password"
								required
								onChange={handleInp}
							/>

						</div>
						<div className="form-group py-3">
							<label className="px-3"><img src={Repass} className="shadow rounded-circle mr-2"/> Confirm Password</label>
							<input type="password"
								className="form-control form-control-lg"
								placeholder="Re-Enter Password..."
								name="confirmpassword" required
								onChange={handleInp} />
								<span className="text-danger" id="warn-confirmpass">* Confirm Password Should Be Matched With Password Field</span>
						</div>

						<div className="form-group pt-5">
							<center><button type="submit" className="btn btn-outline-success py-3 px-3 w-50" id="btn-submit">SUBMIT</button></center>
						</div>

					</form>
				</div>
			</div>
		</div>
	);
}
export default SignUp;