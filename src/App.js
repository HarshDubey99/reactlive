import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import SignIn from "./Components/Pages/SignIn";
import SignUp from "./Components/Pages/SignUp";
import AdminPanel from "./Components/Pages/Admin/AdminPanel";
import Logout from "./Components/Pages/Admin/Logout";
import Student from "./Components/Pages/Admin/Student";
import AddStudent from "./Components/Pages/Admin/AddStudent";
import EditStudent from "./Components/Pages/Admin/EditStudent";
import ViewStudent from "./Components/Pages/Admin/ViewStudent";
import Faculty from "./Components/Pages/Admin/Faculty/Faculty";
import AddFaculty from "./Components/Pages/Admin/Faculty/AddFaculty";
import ViewFaculty from "./Components/Pages/Admin/Faculty/ViewFaculty";
import EditFaculty from "./Components/Pages/Admin/Faculty/EditFaculty";
import Management from "./Components/Pages/Admin/Management/Management";
import AddEmployee from "./Components/Pages/Admin/Management/AddEmployee";
import ViewEmployee from "./Components/Pages/Admin/Management/ViewEmployee";
import EditEmployee from "./Components/Pages/Admin/Management/EditEmployee";
import HeadNavbar from "./Components/Layouts/Head-Navbar";
// For Routing
import {BrowserRouter,Route,Switch,Redirect} from "react-router-dom";
// Not Found Page
// import NotFound from "./Components/Pages/NotFound";

function App() {
  return (
  	<BrowserRouter>
	    <div className="App">
		    <HeadNavbar />
		    <Switch>
		    	<Route exact path="/" component={SignIn}></Route>

		    	<Route exact path="/SignUp" component={SignUp}></Route>

		    	<Route exact path="/AdminPanel" component={AdminPanel}></Route>

		    	<Route exact path="/Student" component={Student}></Route>

		    	<Route exact path="/AddStudent" component={AddStudent}></Route>

		    	<Route exact path="/EditStudent/:id" component={EditStudent}></Route>

		    	<Route exact path="/ViewStudent/:id" component={ViewStudent}></Route>

		    	<Route exact path="/Faculty" component={Faculty}></Route>

		    	<Route exact path="/AddFaculty" component={AddFaculty}></Route>

		    	<Route exact path="/ViewFaculty/:id" component={ViewFaculty}></Route>

		    	<Route exact path="/EditFaculty/:id" component={EditFaculty}></Route>

		    	<Route exact path="/Logout" component={Logout}></Route>

		    	<Route exact path="/Management" component={Management}></Route>

		    	<Route exact path="/AddEmployee" component={AddEmployee}></Route>

		    	<Route exact path="/ViewEmployee/:id" component={ViewEmployee}></Route>

		    	<Route exact path="/EditEmployee/:id" component={EditEmployee}></Route>

		    	{/* <Route component={NotFound}></Route> */}
				<Redirect to="/"/>
		    </Switch>
	    </div>
	</BrowserRouter>
  );
}

export default App;
