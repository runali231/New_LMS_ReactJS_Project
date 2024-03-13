import React, { useState, useEffect } from "react";
import { ArrowBack } from "@material-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UrlData from "../UrlData";
import Select from "react-select";
import {
  getAllDepartment,
  GetAllDesignation,
} from "../Api/DesignationAndDepartment";
import UserId from "../UserId";

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
  const [allCity, setAllCity] = useState([]);
  const [city, setCity] = useState("");
  const [allState, setAllState] = useState([]);
  const [state, setState] = useState("");
  const [allCountry, setAllCountry] = useState([]);
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [officeNo, setOfficeNo] = useState("");
  const [emailId, setEmailId] = useState("");
  const [joiningDate, setJoiningDate] = useState([])
  const [selectedDesignation, setSelectedDesignation] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getAllData();
    getAllCity();
    getAllCountry();
    getAllState();
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
          setCity(
            {
              value :response.data.data.emp_city,
              label: response.data.data.emp_city_name
            }
            );
          setState(response.data.data.emp_state);
          setCountry(response.data.data.emp_country);
          setPinCode(response.data.data.emp_pincode);
          setMobileNo(response.data.data.emp_mob_no);
          setOfficeNo(response.data.data.emp_off_no);
          setEmailId(response.data.data.emp_email);
          setJoiningDate(response.data.data.emp_joiningDate.split('T')[0])
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
    } else if (pinCode.length !== 6) {
      alert("Please enter valid pin code");
    } else if (!emailRegex.test(emailId)) {
      alert("Please enter valid email id");
    } else {
      data = {
        userId: UserId,
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
        emp_city: city.value,
        emp_state: state,
        emp_country: country,
        emp_pincode: pinCode,
        emp_mob_no: mobileNo,
        emp_off_no: officeNo,
        emp_email: emailId,
        emp_joiningDate: joiningDate,
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
            alert("Employee updated successfully!");
          } else {
            alert("Employee added successfully!");
          }

          navigate("/employeeMaster");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getAllCountry = () => {
    axios
      .get(new URL(UrlData + `CountryMaster/GetAll?status=1`))
      .then((response) => {
        console.log("all country", response.data.data);
        setAllCountry(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllState = () => {
    axios
      .get(new URL(UrlData + `StateMaster/GetAll?status=1`))
      .then((response) => {
        console.log("all state", response.data.data);
        setAllState(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllCity = () => {
    axios
      .get(new URL(UrlData + `CityMaster/GetAll?status=1`))
      .then((response) => {
        console.log("response", response.data.data);
        setAllCity(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const CityHandleChange = (selected) => {
    console.log("Selected city:", selected);

    setCity(selected);

    console.log("City state after setting:", city);

    axios
      .get(
        new URL(
          UrlData + `CityMaster/GetCityById?status=1&ci_id=${selected.value}`
        )
      )
      .then((response) => {
        console.log("API response:", response.data.data);
        const newState = response.data.data.ci_state_id;
        const newCountry = response.data.data.ci_country_id;
        setState(newState);
        setCountry(newCountry);
      })
      .catch((error) => {
        console.log("Error fetching city data:", error);
      });
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
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
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
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
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
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
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
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
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
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
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
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
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
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
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
                      <label className="control-label fw-bold">HOD</label>{" "}
                      <span className="text-danger fw-bold">*</span>
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
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
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
                      <label className="control-label fw-bold">City:</label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      {/* <select
                        className="form-select"
                        onChange={CityHandleChange}
                        value={city}
                      >
                         <option value="" disabled>
                          Select City
                        </option>
                        {allCity.map((data, index) => (
                          <option key={index} value={data.ci_id}>
                            {data.ci_city_name}
                          </option>
                        ))}
                      </select> */}
                      <Select
                        options={allCity.map((data) => ({
                          value: data.ci_id,
                          label: data.ci_city_name,
                        }))}
                        value={city}
                        onChange={CityHandleChange}
                        className="mt-2"
                      />
                    
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">State:</label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      {/* <input className="form-control" value={state} onChange={(e) => setState(e.target.value)}
                      /> */}
                      <select
                        className="form-select"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      >
                        <option value="" disabled>
                          Select State
                        </option>
                        {allState.map((data) => (
                          <option key={data.s_id} value={data.s_id}>
                            {data.s_state_name}
                          </option>
                        ))}
                      </select>
                      {/* <Select
                        options={allCountry.map((data) => ({
                          value: data.co_id,
                          label: data.co_country_name,
                        }))}
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="mt-2"
                      /> */}
                    </div>
                  </div>

                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">Country:</label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <select
                        className="form-select"
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                      >
                        <option value="" disabled>
                          Select Country
                        </option>
                        {allCountry.map((data, index) => (
                          <option key={index} value={data.co_id}>
                            {data.co_country_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">Pin Code:</label>{" "}
                      <span className="text-danger fw-bold">*</span>
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
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
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
                      <label className="control-label fw-bold">Email Id:</label>{" "}
                      <span className="text-danger fw-bold">*</span>
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
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Joining Date:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="date"
                        id="joiningDate"
                        name="joiningDate"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Joining Date"
                        value={joiningDate}
                        onChange={(e) => setJoiningDate(e.target.value)}
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
