import React, { useState, useEffect } from "react";
import { ArrowBack } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import {useParams } from "react-router-dom";
import axios from "axios";
import UrlData from "../UrlData";

const AddDepartment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [deptName, setDeptName] = useState("");
  const [deptCode, setDeptCode] = useState("");
  const [deptHead, setDeptHead] = useState("");
  const [selectedDeptHead, setSelectedDeptHead] = useState([]);
  const [active, setActive] = useState(true)

  useEffect(() => {
    GetAllDepartmentHead()
    // Fetch department details based on the id
    if (id) {
      axios({
        method: "get",
        url: new URL(UrlData +`DepartmentMaster/Get?status=1&d_id=${id}`),
      })
        .then((response) => {
          setDeptName(response.data.data.d_department_name);
          setDeptCode(response.data.data.d_department_code);
          setDeptHead(response.data.data.d_head);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const addDepartment = () => {
    let data;
    if (deptName === "" || deptCode === "" || deptHead === "") {
      alert("Please fill all the details");
    } else if (!/^[a-zA-Z]+$/.test(deptName)) {
      alert(
        "Please enter a valid designation name (alphabetic characters only)"
      );
    } else {
      data = {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        d_department_name: deptName,
        d_department_code: deptCode,
        d_head: deptHead,
        d_isactive: active === true ? "1" : "0",
      };
    
      if (id !== null && id !== undefined && id !== ":id" ) {
        data.d_id = id;
    }
    axios({
      method: "post",
      url: new URL(UrlData +`DepartmentMaster`),
      data: data, // Make sure to stringify the data object
    })
      .then((response) => {
        console.log(response)
        alert("Department added successfully!")
        navigate("/departmentMaster");
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong")
      })
    }
  };
  
  const handleDepartmentHead = (e) => {
    const selectedValue = e.target.value;
    setDeptHead(selectedValue);
    console.log(selectedValue);
    GetAllDepartmentHead();
  };

  const GetAllDepartmentHead = () => {
    axios({
      method: "get",
      url: new URL(UrlData +`EmployeeMaster/GetAll?status=1`),
    })
      .then((response) => {
        console.log("response", response.data.data);
        setSelectedDeptHead(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
                    <h4 className="card-title fw-bold">Add Department</h4>
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
                        navigate("/departmentMaster");
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
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Department Code:
                      </label>
                      <input
                        type="number"
                        id="deptCode"
                        name="deptCode"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Department Code"
                        value={deptCode}
                        onChange={(e) => setDeptCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-lg-0 mt-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Department Name:
                      </label>
                      <input
                        type="text"
                        id="deptName"
                        name="deptName"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Department Name"
                        value={deptName}
                        onChange={(e) => setDeptName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Department Head:
                      </label>
                      {/* <select
                        className="form-select"
                        aria-label="Default select example"
                        value={deptHead}
                        onChange={(e)=>setDeptHead(e.target.value)}
                      >
                        <option value="" disabled>select Department Head</option>
                        <option value="Boss">Boss</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="executive">executive</option>
                      </select> */}
                             <select
                        className="form-select"
                        aria-label="Default select example"
                        value={deptHead}
                        onChange={handleDepartmentHead}
                      >
                        <option value="" disabled>
                          Select Department Head
                        </option>
                        {selectedDeptHead.map((data, index) => (
                          <option key={index} value={data.emp_fname}>
                            {data.emp_fname}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-5 mt-lg-0 pt-1">
                    <label className="control-label fw-bold">
                      {/* Department Head: */}
                    </label>
                    <div className="form-group form-group-sm">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={active}
                          onChange={(e)=>setActive(e.target.checked)}
                          id="defaultCheck1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="defaultCheck1"
                        >
                          Is Active
                        </label>
                      </div>
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
                      onClick={()=>{
                        addDepartment();
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

export default AddDepartment;
