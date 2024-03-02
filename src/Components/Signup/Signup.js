import { useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import './Signup.css'

const SignUpForm = () => {


  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
//   const handleSignUp = async () => {
//     try {
//       if (contactNo === "" || email === "" || password === "") {
//         alert("Please enter the required details");
//       } else {
//         const data = await signUpUser(contactNo, email, password);
//         console.log(data);
// navigate('/login')
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//       alert(error.message);
//     }
//   };

  return (
    <div className="main">
      <div className="container signup">
        <div className="row overlay justify-content-center">
          <div className="col-lg-7 col-md-12 d-flex align-items-center">
            <div className="text">
              <h2 className="text-white">
                Sign into your LMS account to get our best courses.
              </h2>
            </div>
          </div>
          <div className="col-lg-5 col-md-10 col-sm-12">
            <div className="form-box px-5 py-4">
              <form>
                <div className="px-3 py-4">
                  <h2 className="text-light mb-4">Sign Up</h2>
                  <input
                    type="text"
                    name=""
                    placeholder="Contact No"
                    className="form-control mb-4"
                    value={contactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                  />
                  <input
                    type="email"
                    name=""
                    placeholder="Email Address"
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
                  </div>

                    <button
                      className="register-btn form-control btn bg-light"
                    //   onClick={handleSignUp}
                    >
                      Sign Up
                    </button>
                  {/* </NextLink> */}

                  <p className="text-center text-light mt-3">
                    Already a member{" "}
                    <NavLink to="/login">
                      <b>Log In</b>
                    </NavLink>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;






