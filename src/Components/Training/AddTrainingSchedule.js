import React, {useState} from "react";
import { Table } from "react-bootstrap";
import { Add, ArrowBack, Delete, Edit, } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

const AddTrainingSchedule = () => {
  const navigate = useNavigate();
  const [trainingNo, setTrainingNo] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [trainingDept, setTrainingDept] = useState("");
  const [trainingReqBy, setTrainingReqBy] = useState("");
  const [trainingTopics, setTrainingTopics] = useState("");
  const [noOfQues, setNoOfQues] = useState("");
  const [trainingAgency, setTrainingAgency] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [reoccurrence, setReoccurrence] = useState("");
  const [trainingFrom, setTrainingFrom] = useState("");
  const [trainingTo, setTrainingTo] = useState("");
  const [status, setStatus] = useState("");

  const [empCode, setEmpCode] = useState("");
  const [empName, setEmpName] = useState("");
  const [trainingAttended, setTrainingAttended] = useState("");
  const [designation, setDesignation] = useState("");
  const [scheduledHours, setScheduledHours] = useState("");
  const [actualHoursAttended, setActualHoursAttended] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [marksObtained, setMarksObtained] = useState("");
  const [completionStatus, setCompletionStatus] = useState("");
  const [trainingStatus, setTrainingStatus] = useState("");
  const [reTrainingRequired, setReTrainingRequired] = useState("");
  const [trainingCertificate, setTrainingCertificate] = useState("");
  const [status1, setStatus1] = useState("");
  const [remark, setRemark] = useState("");

  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)", // Replace with desired background color
    color: "#fff", // Optional: Set the text color to contrast with the background
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
                    <h4 className="card-title fw-bold">Add Training Schedule</h4>
                  </div>

                  <div className="col-auto d-flex flex-wrap">
                    <div
                      className="btn btn-add"
                      title="Back"
                      onClick={() => {
                        navigate("/trainingSchedule");
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
                        Training No:
                      </label>
                      <input
                        type="number"
                        id="trainingNo"
                        className="form-control "
                        placeholder="Enter Training No"
                        value={trainingNo}
                        onChange={(e)=>setTrainingNo(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Trainer Name:
                      </label>
                      <input
                        type="text"
                        id="trainerName"
                        className="form-control "
                        placeholder="Enter Trainer Name"
                        value={trainerName}
                        onChange={(e)=>setTrainerName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-lg-0 mt-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Dept:
                      </label>
                      <input
                        type="text"
                        id="trainingDept"
                        className="form-control "
                        placeholder="Enter Training Dept"
                        value={trainingDept}
                        onChange={(e)=>setTrainingDept(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Requested By:
                      </label>
                      <select className="form-select" 
                      value={trainingReqBy}
                      onChange={(e)=>setTrainingReqBy(e.target.value)}
                      >
                        <option>Please Select</option>
                        <option>HOD</option>
                        <option>Employee</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Topics:
                      </label>
                      <select className="form-select" 
                      value={trainingTopics}
                      onChange={(e)=>setTrainingTopics(e.target.value)}
                      >
                        <option>Please Select</option>
                        <option>HTML</option>
                        <option>Javascript</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        No of question of evaluation:
                      </label>
                      <input
                        type="number"
                        id="noOfQues"
                        className="form-control "
                        placeholder=" No of question"
                        value={noOfQues}
                        onChange={(e)=>setNoOfQues(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Agency:
                      </label>
                      <input
                        type="text"
                        id="trainingAgency"
                        className="form-control "
                        placeholder="Enter Training Agency"
                        value={trainingAgency}
                        onChange={(e)=>setTrainingAgency(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Type:
                      </label>
                      <select className="form-select" 
                      value={trainingType}
                      onChange={(e)=>setTrainingType(e.target.value)}
                      >
                        <option>Please Select</option>
                        <option>Subjective</option>
                        <option>Informative</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Reoccurrence:
                      </label>
                      <select className="form-select" 
                      value={reoccurrence}
                      onChange={(e)=>setReoccurrence(e.target.value)}
                      >
                        <option>Please Select</option>
                        <option>One Time</option>
                        <option>Monthly</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Date/ Time of Training Form:
                      </label>
                      <input
                        type="date"
                        id="trainingFrom"
                        className="form-control "
                        placeholder="Training Request No"
                        value={trainingFrom}
                      onChange={(e)=>setTrainingFrom(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Date/ Time of Training To:
                      </label>
                      <input
                        type="date"
                        id="trainingTo"
                        className="form-control "
                        placeholder="Search"
                        value={trainingTo}
                      onChange={(e)=>setTrainingTo(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">Status:</label>
                      <select className="form-select"
                      value={status}
                      onChange={(e)=>setStatus(e.target.value)}
                      >
                        <option>Please Select</option>
                        <option>Planned</option>
                        <option>Completed</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
            <div className="col-lg-12">
              <div
                className="card-header bg-white"
              >
                <div className="row align-items-center">
                  <div className="col"></div>
                  <div className="col-md-2  justify-content-end">
                    <input
                      type="text"
                      id="custom-search"
                      className="form-control d-none"
                      placeholder="Search"
                    />
                  </div>
                  <div className="col-auto d-flex flex-wrap">
                    <div
                      className="btn btn-add"
                      title="Add New"
                      onClick={() => {
                        // navigate("/addTopic");
                      }}
                    >
                      <button
                        className="btn btn-md text-light"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#addTrainingSchedule"
                        style={{ backgroundColor: "#1B5A90" }}
                      >
                        <Add />
                        
                      </button>
                      <button
                        className="btn btn-md text-light"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#addTrainingSchedule1"
                        style={{ backgroundColor: "#1B5A90" }}
                      >
                        <Add />  Hr
                        
                      </button>
                      <button
                        className="btn btn-md text-light"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#addTrainingSchedule2"
                        style={{ backgroundColor: "#1B5A90" }}
                      >
                        <Add />  Hod
                        
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body pt-3">
              <div className="row ">
                  <div className="col-lg-3 d-flex justify-content-center justify-content-lg-start">
                    <h6 className="mt-3">Show</h6>&nbsp;&nbsp;
                    <select
                      className="form-select w-auto"
                      aria-label="Default select example"
                    >
                      <option defaultValue>10</option>
                      <option value="1">10</option>
                      <option value="2">50</option>
                      <option value="3">100</option>
                    </select>
                    &nbsp;&nbsp;
                    <h6 className="mt-3">entries</h6>
                  </div>
                </div>
                <br />

                <Table striped hover responsive className="border text-center">
                  <thead>
                    <tr>
                      <th scope="col" style={headerCellStyle}>
                        Sr.No
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Employee Code
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Employee Name
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Training Attended
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Designation
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Scheduled Hours
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Actual Hours Attended
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Completion Status
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Total Marks
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Marks Obtained
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Training Status
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Re-Training Required
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Training Certificate
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Status
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Remark
                      </th>
                      <th
                        scope="col" style={headerCellStyle}
                        className="fw-bold" /* style={headerCellStyle} */
                      >
                       Action
                      </th> 
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr>
                      <td>1</td>
                      <td>E001</td>
                      <td>Ramesh</td>
                      <td>Yes</td>
                      <td>Acct head</td>
                      <td>Hours</td>
                      <td>Hours</td>
                      <td>Yes</td>
                      <td>Enterable</td>
                      <td>Enterable</td>
                      <td>Pass</td>
                      <td>yes</td>
                      <td>Attachment</td>
                      <td>OPen</td>
                      <td>-</td>
                      <td>
                        <Edit className="text-success mr-2" type="button" />
                        <Delete className="text-danger" type="button" style={{ marginLeft: "0.5rem" }}/>
                      </td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>E001</td>
                      <td>Ramesh</td>
                      <td>Yes</td>
                      <td>Acct head</td>
                      <td>Hours</td>
                      <td>Hours</td>
                      <td>Yes</td>
                      <td>Enterable</td>
                      <td>Enterable</td>
                      <td>Pass</td>
                      <td>yes</td>
                      <td>Attachment</td>
                      <td>OPen</td>
                      <td>-</td>
                      <td>
                        <Edit className="text-success mr-2" type="button" />
                        <Delete className="text-danger" type="button" style={{ marginLeft: "0.5rem" }}/>
                      </td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>E001</td>
                      <td>Ramesh</td>
                      <td>Yes</td>
                      <td>Acct head</td>
                      <td>Hours</td>
                      <td>Hours</td>
                      <td>Yes</td>
                      <td>Enterable</td>
                      <td>Enterable</td>
                      <td>Pass</td>
                      <td>yes</td>
                      <td>Attachment</td>
                      <td>OPen</td>
                      <td>-</td>
                      <td>
                        <Edit className="text-success mr-2" type="button" />
                        <Delete className="text-danger" type="button" style={{ marginLeft: "0.5rem" }}/>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <div className="row mt-4 mt-xl-3">
                  <div className="col-lg-4 col-12 ">
                    <h6 className="text-lg-start text-center">Showing 1 to 3 of 3 entries</h6>
                  </div>
                  <div className="col-lg-4 col-12"></div>
                  <div className="col-lg-4 col-12 mt-3 mt-lg-0">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination justify-content-lg-end justify-content-center">
                        <li className="page-item">
                          <button
                            className="page-link"
                            /* onClick={handlePrevious} */ aria-label="Previous"
                          >
                            <span aria-hidden="true">&laquo;</span>
                          </button>
                        </li>
                        <li className="page-item active">
                          <button
                            className="page-link" /* onClick={handlePageClick(1)} */
                          >
                            1
                          </button>
                        </li>
                        <li className="page-item">
                          <button
                            className="page-link" /* onClick={handlePageClick(2)} */
                          >
                            2
                          </button>
                        </li>
                        <li className="page-item">
                          <button
                            className="page-link" /* onClick={handlePageClick(3)} */
                          >
                            3
                          </button>
                        </li>
                        <li className="page-item">
                          <button
                            className="page-link"
                            /* onClick={handleNext} */ aria-label="Next"
                          >
                            <span aria-hidden="true">&raquo;</span>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
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
                      >
                        Save
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div
          className="modal fade"
          id="addTrainingSchedule"
          tabIndex="-1"
          aria-labelledby="addTrainingScheduleLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="addTrainingScheduleLabel">
                  Add Training Schedule
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Employee Code:
                      </label>
                      <input
                        type="text"
                        id="empCode"
                        className="form-control "
                        placeholder="Enter Employee Code"
                        value={empCode}
                        onChange={(e)=>setEmpCode(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-lg-0 mt-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Employee Name:
                      </label>
                      <input
                        type="text"
                        id="empName"
                        className="form-control "
                        placeholder="Enter Employee Name"
                        value={empName}
                        onChange={(e)=>setEmpName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Attended:
                      </label>
                      <input
                        type="text"
                        id="trainingAttended"
                        className="form-control "
                        placeholder="Enter Training Attended"
                        value={trainingAttended}
                        onChange={(e)=>setTrainingAttended(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Designation:
                      </label>
                      <input
                        type="text"
                        id="designation"
                        className="form-control "
                        placeholder="Enter Designation"
                        value={designation}
                        onChange={(e)=>setDesignation(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Scheduled Hours:
                      </label>
                      <input
                        type="text"
                        id="scheduledHours"
                        className="form-control "
                        placeholder="Enter Scheduled Hours"
                        value={scheduledHours}
                        onChange={(e)=>setScheduledHours(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Actual Hours Attended:
                      </label>
                      <input
                        type="text"
                        id="actualHoursAttended"
                        className="form-control "
                        placeholder="Enter Actual Hours Attended"
                        value={actualHoursAttended}
                        onChange={(e)=>setActualHoursAttended(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Total Marks:
                      </label>
                      <input
                        type="number"
                        id="totalMarks"
                        className="form-control "
                        placeholder="Enter Total Marks"
                        value={totalMarks}
                        onChange={(e)=>setTotalMarks(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Marks Obtained:
                      </label>
                      <input
                        type="number"
                        id="marksObtained"
                        className="form-control "
                        placeholder="Enter Marks Obtained"
                        value={marksObtained}
                        onChange={(e)=>setMarksObtained(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Completion Status:
                      </label>
                      <input
                        type="text"
                        id="completionStatus"
                        className="form-control "
                        placeholder="Enter completion status"
                        value={completionStatus}
                        onChange={(e)=>setCompletionStatus(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Status:
                      </label>
                      <input
                        type="text"
                        id="trainingStatus"
                        className="form-control "
                        placeholder="Enter Training status"
                        value={trainingStatus}
                        onChange={(e)=>setTrainingStatus(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Re-training Required:
                      </label>
                      <select
                        className="form-select "
                        aria-label="Default select example"
                        value={reTrainingRequired}
                        onChange={(e)=>setReTrainingRequired(e.target.value)}
                      >
                        <option defaultValue>Yes</option>
                        <option value="1">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Certificate:
                      </label>
                      <input
                        type="file"
                        id="trainingCertificate"
                        className="mt-3"
                        placeholder="Training Request No"
                        value={trainingCertificate}
                        onChange={(e)=>setTrainingCertificate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">Status:</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={status1}
                        onChange={(e)=>setStatus1(e.target.value)}
                      >
                        <option defaultValue>Open this select menu</option>
                        <option value="1">Open</option>
                        <option value="2">Close</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">Remark:</label>
                      <input
                        type="text"
                        id="remark"
                        className="form-control "
                        placeholder="Enter Remark"
                        value={remark}
                        onChange={(e)=>setRemark(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">            
              <button
                type="button"
                className="btn text-white"
                style={{ backgroundColor: "#1B5A90" }}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="addTrainingSchedule1"
          tabIndex="-1"
          aria-labelledby="addTrainingSchedule1Label"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="addTrainingSchedule1Label">
                  Add Training Schedule (hr login)
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Attended:
                      </label>
                      <input
                        type="text"
                        id="trainingAttended"
                        className="form-control "
                        placeholder="Enter Training Attended"
                        value={trainingAttended}
                        onChange={(e)=>setTrainingAttended(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Scheduled Hours:
                      </label>
                      <input
                        type="text"
                        id="scheduledHours"
                        className="form-control "
                        placeholder="Enter Scheduled Hours"
                        value={scheduledHours}
                        onChange={(e)=>setScheduledHours(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Actual Hours Attended:
                      </label>
                      <input
                        type="text"
                        id="actualHoursAttended"
                        className="form-control "
                        placeholder="Enter Actual Hours Attended"
                        value={actualHoursAttended}
                        onChange={(e)=>setActualHoursAttended(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              
              </div>
              <div className="modal-footer">            
              <button
                type="button"
                className="btn text-white"
                style={{ backgroundColor: "#1B5A90" }}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="addTrainingSchedule2"
          tabIndex="-1"
          aria-labelledby="addTrainingSchedule2Label"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="addTrainingSchedule2Label">
                  Add Training Schedule(Hod login)
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Total Marks:
                      </label>
                      <input
                        type="number"
                        id="totalMarks"
                        className="form-control "
                        placeholder="Enter Total Marks"
                        value={totalMarks}
                        onChange={(e)=>setTotalMarks(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Marks Obtained:
                      </label>
                      <input
                        type="number"
                        id="marksObtained"
                        className="form-control "
                        placeholder="Enter Marks Obtained"
                        value={marksObtained}
                        onChange={(e)=>setMarksObtained(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Completion Status:
                      </label>
                      <input
                        type="text"
                        id="completionStatus"
                        className="form-control "
                        placeholder="Enter completion status"
                        value={completionStatus}
                        onChange={(e)=>setCompletionStatus(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Status:
                      </label>
                      <input
                        type="text"
                        id="trainingStatus"
                        className="form-control "
                        placeholder="Enter Training status"
                        value={trainingStatus}
                        onChange={(e)=>setTrainingStatus(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Re-training Required:
                      </label>
                      <select
                        className="form-select "
                        aria-label="Default select example"
                        value={reTrainingRequired}
                        onChange={(e)=>setReTrainingRequired(e.target.value)}
                      >
                        <option defaultValue>Yes</option>
                        <option value="1">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Certificate:
                      </label>
                      <input
                        type="file"
                        id="trainingCertificate"
                        className="mt-3"
                        placeholder="Training Request No"
                        value={trainingCertificate}
                        onChange={(e)=>setTrainingCertificate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">Status:</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={status1}
                        onChange={(e)=>setStatus1(e.target.value)}
                      >
                        <option defaultValue>Open this select menu</option>
                        <option value="1">Open</option>
                        <option value="2">Close</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">Remark:</label>
                      <input
                        type="text"
                        id="remark"
                        className="form-control "
                        placeholder="Enter Remark"
                        value={remark}
                        onChange={(e)=>setRemark(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">            
              <button
                type="button"
                className="btn text-white"
                style={{ backgroundColor: "#1B5A90" }}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTrainingSchedule;
