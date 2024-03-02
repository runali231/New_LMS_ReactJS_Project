import React, { useState, useEffect } from "react";
import { ArrowBack } from "@material-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UrlData from "../UrlData";
import { getAllDepartment , GetAllDesignation} from "../Api/DesignationAndDepartment";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [empCode, setEmpCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [designation, setDesignation] = useState("");
  const [departments, setDepartments] = useState("");
  const [hod, setHod] = useState("");
  const [hodToEmployee, setHodToEmployee] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [officeNo, setOfficeNo] = useState("");
  const [emailId, setEmailId] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const { id } = useParams();

  useEffect(() => {
   getAllData()
  }, []);

  useEffect(() => {
    console.log(id, "id");
    if (id) {
      axios({
        method: "get",
        url: new URL(UrlData + `EmployeeMaster/Get?status=1&emp_id=${id}`),
      })
        .then((response) => {
          console.log(response.data.data, "get employee");
          setEmpCode(response.data.data.emp_code);
          setFirstName(response.data.data.emp_fname);
          setMiddleName(response.data.data.emp_mname);
          setLastName(response.data.data.emp_lname);
          setJobTitle(response.data.data.emp_job_title);
          setDesignation(response.data.data.emp_des);
          setDepartments(response.data.data.emp_dep);
          setHod(response.data.data.emp_hod);
          setHodToEmployee(response.data.data.emp_hodToEmp);
          setAddress1(response.data.data.emp_add1);
          setAddress2(response.data.data.emp_add2);
          setCity(response.data.data.emp_city);
          setState(response.data.data.emp_state);
          setCountry(response.data.data.emp_country);
          setPinCode(response.data.data.emp_pincode);
          setMobileNo(response.data.data.emp_mob_no);
          setOfficeNo(response.data.data.emp_off_no);
          setEmailId(response.data.data.emp_email);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const addEmployee = () => {
    let data;
    var mobNo = /^[0-9\b]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      empCode === "" ||
      firstName === "" ||
      lastName === "" ||
      jobTitle === "" ||
      designation === "" ||
      departments === "" ||
      address1 === "" ||
      city === "" ||
      state === "" ||
      country === "" ||
      pinCode === "" ||
      mobileNo === "" ||
      emailId === ""
    ) {
      alert("Please fill all the details");
    } else if (mobNo.test(mobileNo) === false) {
      alert("Please Enter Only Numbers");
    } else if (mobileNo.length !== 10) {
      alert("Please enter valid Mobile number");
    } else if (mobNo.test(officeNo) === false) {
      alert("Please Enter Only Numbers");
    } else if (officeNo.length !== 10) {
      alert("Please enter valid office number");
    } 
   else if (pinCode.length !== 6) {
      alert("Please enter valid pin code");
    } 
    else if (!emailRegex.test(emailId)){
      alert("Please enter valid email id");
    }
    else {
      data = {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        emp_code: empCode,
        emp_fname: firstName,
        emp_mname: middleName,
        emp_lname: lastName,
        emp_job_title: jobTitle,
        emp_des: designation,
        emp_dep: departments,
        emp_hod: hod,
        emp_hodToEmp: hodToEmployee,
        emp_add1: address1,
        emp_add2: address2,
        emp_city: city,
        emp_state: state,
        emp_country: country,
        emp_pincode: pinCode,
        emp_mob_no: mobileNo,
        emp_off_no: officeNo,
        emp_email: emailId,
        emp_isactive: "1",
      };
      if (id !== null && id !== undefined && id !== ":id") {
        data.emp_id = id;
      }
      axios({
        method: "post",
        url: new URL(UrlData + `EmployeeMaster`),
        data: data, // Make sure to stringify the data object
      })
        .then((response) => {
          console.log(response);
          if (id !== null && id !== undefined && id !== ":id") {
            alert("Employee edited successfully!");
          }
          else{
            alert("Employee added successfully!");
          }
          
          navigate("/employeeMaster");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getAllData = async () => {
    const designationData = await GetAllDesignation();
    const departmentData = await getAllDepartment();

    setSelectedDesignation(designationData);
    setSelectedDepartment(departmentData);
  };

  const handleDesignation = (e) => {
    const selectedValue = e.target.value;
    setDesignation(selectedValue);
  };

  const handleDepartment = (e) => {
    const selectedValue = e.target.value;
    setDepartments(selectedValue);
  };
  return (
    <>
      <div className="container-fluid">
        <div
          className="card m-3"
          style={{ boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="row">
            <div className="col-lg-12">
              <div
                className="card-header" /* style={{ backgroundColor: 'white' }} */
              >
                <div className="row align-items-center">
                  <div className="col">
                    <h4 className="card-title fw-bold">Add Employee</h4>
                  </div>
                  <div className="col-md-2  justify-content-end d-none">
                    {/* <input
                      type="text"
                      id="custom-search"
                      className="form-control "
                      placeholder="Search"
                    /> */}
                  </div>
                  <div className="col-auto d-flex flex-wrap">
                    <div className="form-custom me-1">
                      <div
                        id="tableSearch"
                        className="dataTables_wrapper"
                      ></div>
                    </div>

                    <div
                      className="btn btn-add"
                      title="Add New"
                      onClick={() => {
                        navigate("/employeeMaster");
                      }}
                    >
                      <button
                        className="btn btn-md text-light"
                        type="button"
                        style={{ backgroundColor: "#1B5A90" }}
                      >
                        <ArrowBack />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body pt-3">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Employee Code:
                      </label>
                      <input
                        type="text"
                        id="eCode"
                        name="eCode"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Employee Code"
                        value={empCode}
                        onChange={(e) => setEmpCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-lg-0 mt-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        First Name:
                      </label>
                      <input
                        type="text"
                        id="fName"
                        name="fName"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Middle Name:
                      </label>

                      <input
                        type="text"
                        id="mName"
                        name="mName"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Middle Name"
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 ">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Last Name:
                      </label>
                      <input
                        type="text"
                        id="lName"
                        name="lName"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Job Title:
                      </label>
                      <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Job Title"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Designation
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={designation}
                        onChange={handleDesignation}
                      >
                        <option value="" disabled>
                          Select Designation
                        </option>
                        {selectedDesignation.map((data, index) => (
                          <option key={index} value={data.de_id}>
                            {data.de_designation_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Departments
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={departments}
                        onChange={handleDepartment}
                      >
                        <option value="" disabled>
                          Select Department
                        </option>
                        {selectedDepartment.map((data, index) => (
                          <option key={index} value={data.d_id}>
                            {data.d_department_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">HOD</label>
                      <br />
                      <div className="form-check form-check-inline mt-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value="Yes"
                          checked={hod === "Yes"}
                          onChange={(e) => setHod(e.target.value)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio1"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          value="No"
                          checked={hod === "No"}
                          onChange={(e) => setHod(e.target.value)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio2"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        HOD to Employee
                      </label>
                      <select
                        className="form-select"
                        onChange={(e) => setHodToEmployee(e.target.value)}
                        value={hodToEmployee}
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="Runali">Runali</option>
                        <option value="Shraddha">Shraddha</option>
                        <option value="Mansi">Mansi</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Address 1:
                      </label>
                      <textarea
                        className="form-control"
                        rows="2"
                        id="address1"
                        name="text"
                        placeholder="Enter Address"
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Address 2:
                      </label>
                      <textarea
                        className="form-control"
                        rows="2"
                        id="address2"
                        name="text"
                        placeholder="Enter Address"
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">City:</label>
                      <select
                        className="form-select"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Thane">Thane</option>
                        <option value="Nagpur">Nagpur</option>
                        <option value="Pune">Pune</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">State:</label>
                      <select
                        className="form-select"
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">Country:</label>
                      <select
                        className="form-select"
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                      >
                        <option>Select</option>
                        <option>India</option>
                        <option>Afghanistan</option>
                        <option>Bangladesh</option>
                        <option>Canada</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">Pin Code:</label>
                      <input
                        type="text"
                        id="pinCode"
                        name="pinCode"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Pin Code"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Mobile Phone:
                      </label>
                      <input
                        type="number"
                        id="mobile"
                        name="mobile"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Mobile Number"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Office Number:
                      </label>
                      <input
                        type="text"
                        id="officeNo"
                        name="officeNo"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Office Number"
                        value={officeNo}
                        onChange={(e) => setOfficeNo(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">Email Id:</label>
                      <input
                        type="text"
                        id="emailId"
                        name="emailId"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Email Id"
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <br />
              </div>
              <div className="card-footer">
                <div className="row">
                  <div className="col-lg-12 text-end">
                    <button
                      className="btn btn-md text-light"
                      type="button"
                      style={{ backgroundColor: "#1B5A90" }}
                      onClick={() => {
                        addEmployee();
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
