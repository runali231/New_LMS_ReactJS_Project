import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Add, ArrowBack, Delete, Edit } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

const AddTrainingFeedback = () => {
  const navigate = useNavigate();
  const [facultyName, setFacultyName] = useState("");
  const [title, setTitle] = useState("");
  const [feedbackNo, setFeedbackNo] = useState("");
  const [feedbackDate, setFeedbackDate] = useState("");
  const [feedbackGivenBy, setFeedbackGivenBy] = useState("");

  const [empCode, setEmpCode] = useState("");
  const [empName, setEmpName] = useState("");
  const [trainingNo, setTrainingNo] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [dateTrainingFrom, setDateTrainingFrom] = useState("");
  const [dateTrainingTo, setDateTrainingTo] = useState("");
  const [timeTrainingFrom, setTimeTrainingFrom] = useState("");
  const [timeTrainingTo, setTimeTrainingTo] = useState("");
  const [trainingReqBy, setTrainingReqBy] = useState("");
  const [trainingAttended, setTrainingAttended] = useState("");
  const [designation, setDesignation] = useState("");
  const [trainingFeedback, setTrainingFeedback] = useState("");
  const [trainerFeedback, setTrainerFeedback] = useState("");
  const [score, setScore] = useState("");

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
                    <h4 className="card-title fw-bold">Add Training Feedback</h4>
                  </div>

                  <div className="col-auto d-flex flex-wrap">
                    <div
                      className="btn btn-add"
                      title="Back"
                      onClick={() => {
                        navigate("/trainingFeedback");
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
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 ">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Faculty Name:
                      </label>
                      <input
                        type="text"
                        id="facultyName"
                        className="form-control "
                        placeholder="Faculty Name"
                        value={facultyName}
                        onChange={(e) => setFacultyName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Title:
                      </label>
                      <input
                        type="text"
                        id="title"
                        className="form-control "
                        placeholder="Training Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Feedback No:
                      </label>
                      <input
                        type="text"
                        id="feedbackNo"
                        className="form-control "
                        placeholder="Feedback No"
                        value={feedbackNo}
                        onChange={(e) => setFeedbackNo(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Feedback Date:
                      </label>
                      <input
                        type="date"
                        id="feedbackDate"
                        className="form-control "
                        placeholder="Search"
                        value={feedbackDate}
                        onChange={(e) => setFeedbackDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 ">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Feedback Given By:
                      </label>
                      <input
                        type="text"
                        id="feedbackGivenBy"
                        className="form-control "
                        placeholder="Feedback given by"
                        value={feedbackGivenBy}
                        onChange={(e) => setFeedbackGivenBy(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-lg-12">
                    <div className="card-header bg-white">
                      <div className="row align-items-center">
                        <div className="col"></div>
                        <div className="col-md-2  justify-content-end d-none">
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
                              data-bs-target="#addTrainingFeedback"
                              style={{ backgroundColor: "#1B5A90" }}
                            >
                              <Add />
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

                      <Table
                        striped
                        hover
                        responsive
                        className="border text-center"
                      >
                        <thead>
                          <tr>
                            <th scope="col" style={headerCellStyle}>
                              Sr.No
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Training No
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Training Type
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Training requested by
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Date of training from
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Time of training from
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Date of training to
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Time of training to
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Employee Code
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Employee Name
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Training attended
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Designation
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Feedback
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Score
                            </th>
                            <th
                              scope="col"
                              style={headerCellStyle}
                              className="fw-bold" /* style={headerCellStyle} */
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>12</td>
                            <td>Online</td>
                            <td>xyz</td>
                            <td>1/5/2024</td>
                            <td>1/5/2024</td>
                            <td>1/5/2024</td>
                            <td>1/5/2024</td>
                            <td>123</td>
                            <td>xyz</td>
                            <td>yes</td>
                            <td>developer</td>
                            <td>Enterable</td>
                            <td>1 to 5</td>
                            <td>
                              <Edit
                                className="text-success mr-2"
                                type="button"
                              />
                              <Delete
                                className="text-danger"
                                type="button"
                                style={{ marginLeft: "0.5rem" }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>12</td>
                            <td>Online</td>
                            <td>xyz</td>
                            <td>1/5/2024</td>
                            <td>1/5/2024</td>
                            <td>1/5/2024</td>
                            <td>1/5/2024</td>
                            <td>123</td>
                            <td>xyz</td>
                            <td>yes</td>
                            <td>developer</td>
                            <td>Enterable</td>
                            <td>1 to 5</td>
                            <td>
                              <Edit
                                className="text-success mr-2"
                                type="button"
                              />
                              <Delete
                                className="text-danger"
                                type="button"
                                style={{ marginLeft: "0.5rem" }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>12</td>
                            <td>Online</td>
                            <td>xyz</td>
                            <td>1/5/2024</td>
                            <td>1/5/2024</td>
                            <td>1/5/2024</td>
                            <td>1/5/2024</td>
                            <td>123</td>
                            <td>xyz</td>
                            <td>yes</td>
                            <td>developer</td>
                            <td>Enterable</td>
                            <td>1 to 5</td>
                            <td>
                              <Edit
                                className="text-success mr-2"
                                type="button"
                              />
                              <Delete
                                className="text-danger"
                                type="button"
                                style={{ marginLeft: "0.5rem" }}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                      <div className="row mt-4 mt-xl-3">
                        <div className="col-lg-4 col-12 ">
                          <h6 className="text-lg-start text-center">
                            Showing 1 to 3 of 3 entries
                          </h6>
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
          id="addTrainingFeedback"
          tabIndex="-1"
          aria-labelledby="addTrainingFeedbackLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="addTrainingFeedbackLabel">
                  Add Training Feedback
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
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 ">
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
                        onChange={(e) => setEmpCode(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
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
                        onChange={(e) => setEmpName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 ">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training No:
                      </label>
                      <input
                        type="text"
                        id="trainingNo"
                        className="form-control "
                        placeholder="Enter Training No"
                        value={trainingNo}
                        onChange={(e) => setTrainingNo(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-lg-0 mt-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Type:
                      </label>
                      <input
                        type="text"
                        id="trainingType"
                        className="form-control "
                        placeholder="Enter Training Type"
                        value={trainingType}
                        onChange={(e) => setTrainingType(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 ">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Date of Training From:
                      </label>
                      <input
                        type="date"
                        id="dateTrainingFrom"
                        className="form-control "
                        placeholder="Faculty Name"
                        value={dateTrainingFrom}
                        onChange={(e) => setDateTrainingFrom(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Date of Training To:
                      </label>
                      <input
                        type="date"
                        id="dateTrainingTo"
                        className="form-control "
                        placeholder="Training Title"
                        value={dateTrainingTo}
                        onChange={(e) => setDateTrainingTo(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 ">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Time of Training From:
                      </label>
                      <input
                        type="time"
                        id="timeTrainingFrom"
                        className="form-control "
                        placeholder="Faculty Name"
                        value={timeTrainingFrom}
                        onChange={(e) => setTimeTrainingFrom(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Time of Training To:
                      </label>
                      <input
                        type="time"
                        id="timeTrainingTo"
                        className="form-control "
                        placeholder="Training Title"
                        value={timeTrainingTo}
                        onChange={(e) => setTimeTrainingTo(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Requested By:
                      </label>
                      <input
                        type="text"
                        id="trainingReqBy"
                        className="form-control "
                        placeholder="Enter Training Requested By"
                        value={trainingReqBy}
                        onChange={(e) => setTrainingReqBy(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-lg-0 mt-4">
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
                        onChange={(e) => setTrainingAttended(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
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
                        onChange={(e) => setDesignation(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Feedback:
                      </label>
                      <br />
                      <input
                        type="file"
                        id="trainingFeedback"
                        className="mt-3"
                        placeholder="Feedback No"
                        value={trainingFeedback}
                        onChange={(e) => setTrainingFeedback(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Trainer Feedback:
                      </label>
                      <br />
                      <input
                        type="file"
                        id="trainerFeedback"
                        className="mt-3"
                        placeholder="Search"
                        value={trainerFeedback}
                        onChange={(e) => setTrainerFeedback(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">Score:</label>
                      <input
                        type="text"
                        id="score"
                        className="form-control "
                        placeholder="Enter Score"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
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

export default AddTrainingFeedback;
