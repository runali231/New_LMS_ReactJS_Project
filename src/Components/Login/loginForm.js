
import { useState , useEffect} from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "./loginApi";
import './Login.css'
import UrlData from "../UrlData";
import axios from "axios";

const LoginForm = () => {

  const navigate =  useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("")

  const getLogin = () => {
    axios({
      method: "get",
      url: new URL(
        UrlData +
          `Login/Get?username=${email}&password=${password}`
      ), // Include pageSize and pageNumber in the URL
      headers: {
        // "access-control-allow-origin" : "*",
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        console.log("response", response.data.data);
        // setAllDesignation(response.data.data);
        localStorage.setItem("loginId", response.data.data.RoleId);
        localStorage.setItem("UserId", response.data.data.UserId)
        navigate("/dashboard")
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const Login= ()=>{
    localStorage.setItem("loginId", email);
    navigate("/")
  }
  return (
    // JSX code for your login form...
    <>  
     <div className="main">
      <div className="container signup">
        <div className="row overlay justify-content-center">
          <div className="col-lg-7 col-md-12 d-flex align-items-center">
           
            <div className="text">
              <h2 className="text-white ">
                Login into your LMS account to get our best training.
              </h2>
            </div>
          </div>
          <div className="col-lg-5 col-md-10 col-sm-12">
            <div className="form-box px-5 py-4">
              <form>
                <div className="px-3 py-4">
                  <h2 className="text-light mb-4">Login</h2>
                  <input
                    type="text"
                    name=""
                    placeholder="Username"
                    className="form-control mb-4"
                    value={email}

                    onChange={(e) => setEmail(e.target.value)}
                  />
                   <div className="input-group mb-4">
                    <input
                      type="password"
                      name=""
                      placeholder="Password"
                      className="form-control "
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* <span className="input-group-text bg-white border-start-0"><i className="fa-solid fa-eye"></i></span> */}
                  </div>

                  <div
                    className="register-btn form-control text-center"
                    onClick={getLogin}
                    // onClick={Login}
                  >
                    Login
                  </div>
                  {/* <p className="text-center text-light mt-3">
                    Already a member{" "}
                    <NavLink to="/">
                      <b>Log In</b>
                    </NavLink>
                    
                  </p>                 */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>  
  </>
  );
};

export default LoginForm;