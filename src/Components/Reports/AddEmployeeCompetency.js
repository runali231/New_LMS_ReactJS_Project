import React, { useState } from "react";
import { ArrowBack, Edit, Delete} from "@material-ui/icons";
import {  useNavigate } from "react-router-dom";
import { Table} from "react-bootstrap";

const AddEmployeeCompetency = () => {
   const navigate = useNavigate();
const [empCode, setEmpCode] = useState("");
const [empName, setEmpName] = useState("");
const [designation, setDesignation] = useState("");
const [department, setDepartment] = useState("");
const [qualification, setQualification] = useState("");
const [address, setAddress] = useState("");
const [dateOfJoining, setDateOfJoining] = useState("");
const [organization, setOrganization] = useState("");
const [requirement, setRequirement] = useState("");
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
                    <h4 className="card-title fw-bold">Add Employee Competency</h4>
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
                        navigate("/employeeCompetency")
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
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 ">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Employee Code:
                      </label>
                      <input
                        type="text"
                        id="empCode"
                        name="empCode"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Employee Code"
                        value={empCode}
                        onChange={(e)=>setEmpCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Employee Name:
                      </label>
                      <input
                        type="text"
                        id="empName"
                        name="empName"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Employee Name"
                        value={empName}
                        onChange={(e)=>setEmpName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Designation:
                      </label>
                      <input
                        type="text"
                        id="designation"
                        name="designation"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Designation"
                        value={designation}
                        onChange={(e)=>setDesignation(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Department:
                      </label>
                      <input
                        type="text"
                        id="department"
                        name="department"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Department"
                        value={department}
                        onChange={(e)=>setDepartment(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Qualification:
                      </label>
                      <input
                        type="text"
                        id="qualification"
                        name="qualification"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Qualification"
                        value={qualification}
                        onChange={(e)=>setQualification(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">Address:</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Address"
                        value={address}
                        onChange={(e)=>setAddress(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Date of Joining:
                      </label>
                      <input
                        type="date"
                        id="dateOfJoining"
                        name="dateOfJoining"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Date Of Joining"
                        value={dateOfJoining}
                        onChange={(e)=>setDateOfJoining(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Experience before joining organization:
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Experience before joining organization"
                        value={organization}
                        onChange={(e)=>setOrganization(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Is Meeting with the Competency Requirement:
                      </label>
                      <br />
                      <div className="form-check form-check-inline mt-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value="option1"
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
                          value="option2"
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
                </div>
                <br />
              </div>
              <Table
                  striped
                  hover
                  responsive
                  className="table-bordered table mx-3 mt-2"
                  id="dataTable"
                  width="100%"
                  cellSpacing="0"
                >
                  <thead className="text-center">
                    <tr>
                      <th scope="col" className="fw-bold">Sr.No</th>
                      <th scope="col" className="fw-bold">
                        Training need assessed and skill development need
                        recognized
                      </th>
                      <th scope="col" className="fw-bold">Training need Assessed by</th>
                      <th scope="col" className="fw-bold">Date of Need Assessment</th>
                      <th scope="col" className="fw-bold">
                        Training need fulfilled by training on the job/ seminar
                        etc
                      </th>
                      <th scope="col" className="fw-bold">Person/ organization giving training</th>
                      <th scope="col" className="fw-bold">Date of Training</th>
                      <th scope="col" className="fw-bold">
                        Remark & review of the effectiveness of Training and
                        Skill Development
                      </th>
                      <th scope="col" className="fw-bold">Sign and Date of Reviewing Officer</th>
                      <th
                        scope="col"
                        className="fw-bold" /* style={headerCellStyle} */
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>
                        <Edit className="text-success mr-2" type="button" />
                        <Delete className="text-danger" type="button" style={{ marginLeft: "0.5rem" }}/>
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>
                        <Edit className="text-success mr-2" type="button" />
                        <Delete className="text-danger" type="button" style={{ marginLeft: "0.5rem" }}/>
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>
                        <Edit className="text-success mr-2" type="button" />
                        <Delete className="text-danger" type="button" style={{ marginLeft: "0.5rem" }}/>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              <div className="card-footer">
              <div className="row">
                  <div className="col-lg-12 text-end">
                  <button
                        className="btn btn-md text-light"
                        type="button"
                        style={{ backgroundColor: "#1B5A90" }}
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

export default AddEmployeeCompetency;
