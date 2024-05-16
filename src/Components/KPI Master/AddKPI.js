import React, { useState, useEffect } from "react";
import { ArrowBack } from "@material-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UrlData from "../UrlData";
import {
  GetAllDesignation,
  getAllDepartment,
} from "../Api/DesignationAndDepartment";
import UserId from "../UserId";
import ErrorHandler from "../ErrorHandler";

const AddKPI = () => {
  const navigate = useNavigate();
  const [empCode, setEmpCode] = useState("");
  const [empName, setEmpName] = useState("");
  const [kpiCode, setKpiCode] = useState("");
  const [kpiDescription, setKpiDescription] = useState("");
  const [designation, setDesignation] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState([]);
  const [department, setDepartment] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [uom, setUom] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [occurrence, setOccurrence] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    if (id) {
      axios({
        method: "get",
        url: new URL(UrlData + `KPIMaster/Get?status=1&k_id=${id}`),
      })
        .then((response) => {
          setEmpCode(response.data.data.k_emp_code);
          setEmpName(response.data.data.k_emp_name);
          setKpiCode(response.data.data.k_kpi_code);
          setKpiDescription(response.data.data.k_kpi_des);
          setDesignation(response.data.data.k_designation);
          setDepartment(response.data.data.k_department);
          setUom(response.data.data.k_uom);
          setTargetDate(extractDate(response.data.data.k_targetdate));
          setOccurrence(response.data.data.k_occurance);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const handleEmpCodeChange = (e) => {
    const code = e.target.value;
    setEmpCode(code);
    if (!code) {
      // If empCode is null, set all fields to blank
      setEmpName('');
      setDesignation('');
      setDepartment('');
      // You can similarly update other state values for KPI fields
      return; // Exit the function early since there's no need to make the API call
    }
    axios({
      method: "get",
      url: new URL(UrlData + `EmployeeMaster/GetByCode?emp_code=${code}`),
    })
      .then((response) => {
        setEmpName(
          response.data.data.emp_fname
          //  +
          //   " " +
          //   response.data.data.emp_mname +
          //   " " +
          //   response.data.data.emp_lname
        );
        setDesignation(response.data.data.emp_des);
        setDepartment(response.data.data.emp_dep);
        console.log(response.data.data.emp_des);
        // Update other state values for KPI fields similarly
      })
      .catch((error) => {
        console.log(error);
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
    setDepartment(selectedValue);
  };

  const addKpi = () => {
    let data;
    if (empCode === "") {
      alert("Please enter employee code!");
    } else if (empName === "") {
      alert("Please enter employee name!");
    } else if (kpiCode === "") {
      alert("Please enter kpi code!");
    } else if (department === "") {
      alert("Please enter department!");
    } else if (designation === "") {
      alert("Please enter designation!");
    } else if (targetDate === "") {
      alert("Please enter target date!");
    } else if (occurrence === "") {
      alert("Please enter occurrence!");
    } else if (!/^[^\d]+$/.test(empName)) {
      alert("Please enter a valid employee name (alphabetic characters only)");
    } else {
      data = {
        userId: UserId,
        k_emp_code: empCode,
        k_emp_name: empName,
        k_kpi_code: kpiCode,
        k_kpi_des: kpiDescription,
        k_department: department.toString(),
        k_designation: designation.toString(),
        k_uom: uom,
        k_occurance: occurrence,
        k_isactive: "1",
        k_targetdate: targetDate,
      };
      if (id !== null && id !== undefined && id !== ":id") {
        data.k_id = id;
      }
      axios({
        method: "post",
        url: new URL(UrlData + `KPIMaster`),
        data: data,
      })
        .then((response) => {
          console.log(response);
          if (id !== null && id !== undefined && id !== ":id") {
            alert("KPI updated successfully!");
          } else {
            alert("KPI added successfully!");
          }
          navigate("/kpiMaster");
        })
        .catch((error) => {
          console.log(error);
          // alert("Something went wrong");
          let errors= ErrorHandler(error)
          alert(errors)
        });
    }
  };

  const extractDate = (dateTimeString) => {
    return dateTimeString.split("T")[0];
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
                    <h4 className="card-title fw-bold">Add KPI</h4>
                  </div>
                  <div className="col-md-2  justify-content-end d-none"></div>
                  <div className="col-auto d-flex flex-wrap">
                    <div className="form-custom me-1">
                      <div
                        id="tableSearch"
                        className="dataTables_wrapper"
                      ></div>
                    </div>

                    <div
                      className="btn btn-add"
                      title="Back"
                      onClick={() => {
                        navigate("/kpiMaster");
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
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-6 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Employee Code:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="number"
                        id="eCode"
                        name="eCode"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Employee Code"
                        value={empCode}
                        // onChange={(e) => setEmpCode(e.target.value)}
                        onChange={handleEmpCodeChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-lg-0 mt-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Employee Name:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="text"
                        id="eName"
                        name="eName"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Employee Name"
                        value={empName}
                        onChange={(e) => setEmpName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Designation:
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
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Department:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={department}
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
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">KPI Code:</label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="number"
                        id="kpiCode"
                        name="kpiCode"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter KPI Code"
                        value={kpiCode}
                        onChange={(e) => setKpiCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        KPI Description:
                      </label>{" "}
                      {/* <span className="text-danger fw-bold">*</span> */}
                      <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        placeholder="Enter KPI Description"
                        value={kpiDescription}
                        onChange={(e) => setKpiDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>      
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">UOM:</label>
                      <br />
                      <input
                        type="text"
                        id="uom"
                        name="uom"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter UOM"
                        value={uom}
                        onChange={(e) => setUom(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Target Date:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="date"
                        id="targetDate"
                        name="targetDate"
                        className="form-control"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Occurrence:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={occurrence}
                        onChange={(e) => setOccurrence(e.target.value)}
                      >
                        <option value="" disabled>
                          Select Occurrence
                        </option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="On the Event">On the Event</option>
                      </select>
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
                        addKpi();
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

export default AddKPI;
