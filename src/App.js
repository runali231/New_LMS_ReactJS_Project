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

const App = (props) => {
  const sessions = [
    { date: "2024-02-16", time: "10:00", topic: "Topic 1" },
    { date: "2024-02-17", time: "11:00", topic: "Topic 2" },
    { date: "2024-02-18", time: "14:00", topic: "Topic 3" },
  ];

  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<SignUpForm/>}/>  */}
          {/* <Route path="/" element={<Home/>}/> */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/*" element={<Home />} />
          <Route path="/sample" element={<Sample />} sessions={sessions} />
          {/* <Layout/> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
