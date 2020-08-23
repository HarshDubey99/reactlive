import React from "react";
import {NavLink} from "react-router-dom";
import "./Css/Head-Navbar.css";

const HeadNavbar = () =>{
	return(
		<nav className="navbar navbar-expand-sm navbar-dark bg-dark" id="Head-Nav">
			<a href="/" className="navbar-brand text-light"><h1>S M S</h1></a>			
			<ul className="navbar-nav flex-row offset-md-4">	
			    <li className="nav-item">
			       	<NavLink className="nav-link px-3" exact  to="/">Sign-In</NavLink>
			    </li>
			    <li className="nav-item">
			        <NavLink className="nav-link px-3" exact to="/SignUp">Sign-Up</NavLink>
			    </li>
			</ul>			 
		</nav>

	);
}
export default HeadNavbar;