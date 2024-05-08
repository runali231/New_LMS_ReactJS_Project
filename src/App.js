import "./App.css";
import React from "react";
import "./Dashboard/Home.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.css";
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

// import "../node_modules/bootstrap/dist/js/bootstrap.js";

import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";
import "datatables.net-responsive";
import Home from "./Dashboard/Home";
import SignUpForm from "./Components/Signup/Signup";
import LoginForm from "./Components/Login/loginForm";
import HomePage from "./Dashboard/HomePage";
import Sample from "./Components/Scheduling/Sample.js";
import ApprovalEmail from "./Components/Training/ApprovalEmail.js";
import Email from "./Components/Training/Email.js";

const App = (props) => {
  const loginId = localStorage.getItem("loginId");

  return (
    <>
      {/* <Router>
        <Routes>
        <Route path="/*" element={<Home />} />
          {loginId !== null && <Route path="/" element={<Home />} />}
          {loginId === null && <Route path="/" element={<LoginForm />} />}
        </Routes>
      </Router> */}
       {/* <Router>
        <Routes>
          <Route path="/*" element={<Home />} />
          {loginId !== null ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<LoginForm />} />
        )}
        </Routes>
      </Router> */}
      {/* <Router>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/" element={loginId ? <Home /> : <LoginForm />} />
      </Routes>
    </Router> */}
    <Router>
  <Routes>
    {/* If the user is logged in, render the Home component */}
    {loginId && <Route exact path="/" element={<Home />} />}

    {/* If the user is not logged in, render the LoginForm component */}
    {!loginId && <Route exact path="/" element={<LoginForm />} />}
    
    {/* Additional routes */}
    <Route exact path="/*" element={<Home/>} />
    <Route exact path="/approvalEmail" element={<ApprovalEmail/>} />
    <Route exact path="/email" element={<Email/>} />
    {/* { path: '/approvalEmail', name: 'approvalEmail', element:ApprovalEmail}, */}
  </Routes>
</Router>
    </>
  );
};

export default App;
