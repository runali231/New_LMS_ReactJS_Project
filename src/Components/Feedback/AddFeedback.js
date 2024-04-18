import React, { useEffect, useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { Add, ArrowBack, Delete, Edit } from "@material-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UrlData from "../UrlData";
import UserId from "../UserId";
import ErrorHandler from "../ErrorHandler";
import { useTable } from "react-table";

const AddTrainingFeedback = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  const handleShow = () => setModalOpen(true);
  const { id } = useParams();
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
  const [trainingFeedback, setTrainingFeedback] = useState();
  const [trainerFeedback, setTrainerFeedback] = useState();
  const [score, setScore] = useState("");
  const [allSubFeedback, setAllSubFeedback] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)", // Replace with desired background color
    color: "#fff", // Optional: Set the text color to contrast with the background
  };

  useEffect(() => {
    getAllSubData();
  }, []);

  useEffect(() => {
    if (id) {
      axios({
        method: "get",
        url: new URL(UrlData + `Feedback/GetFeedbackForm?fb_id=${id}`),
      })
        .then((response) => {
          console.log(response, "get Feedback");
          setFeedbackNo(response.data.data.fb_no);
          setFacultyName(response.data.data.fb_name);
          setFeedbackDate(extractDate(response.data.data.fb_date));
          setTitle(response.data.data.fb_title);
          setFeedbackGivenBy(response.data.data.fb_givenBy);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const addFeedback = () => {
    let data;
    data = {
      userId: UserId,
      fb_name: facultyName,
      fb_no: feedbackNo,
      fb_title: title,
      fb_date: feedbackDate,
      fb_givenBy: feedbackGivenBy,
      fb_isactive: "1",
      feedback: allSubFeedback,
    };
    if (id !== null && id !== undefined && id !== ":id") {
      data.fb_id = id;
    }
    axios({
      method: "post",
      url: new URL(UrlData + `Feedback`),
      data: data,
    })
      .then((response) => {
        console.log(response);
        if (id !== null && id !== undefined && id !== ":id") {
          alert("Training feedback updated successfully!");
        } else {
          alert("Training Feedback added successfully!");
        }
        navigate("/trainingFeedback");
      })
      .catch((error) => {
        console.log(error);
        let errors = ErrorHandler(error);
        alert(errors);
      });
  };

  const getAllSubData = () => {
    axios({
      method: "get",
      url: new URL(
        UrlData +
          `Feedback/GetAllFeedback?user_id=${UserId}&fb_isactive=1&fb_id=${id}`
      ),
    })
      .then((response) => {
        console.log("response all sub feedback", response.data.data);
        setAllSubFeedback(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addSubFeedback = () => {
    const newFeedback = {
      f_trnNo: trainingNo,
      f_trnType: trainingType,
      f_trnReqBy: trainingReqBy,
      f_dateTrnForm: dateTrainingFrom,
      f_TimeTrnForm: timeTrainingFrom,
      f_dateTrnTo: dateTrainingTo,
      f_TimeTrnTo: timeTrainingTo,
      f_empCode: empCode,
      f_empName: empName,
      f_trnAttend: trainingAttended,
      f_des: designation,
      f_desId: "",
      // f_feedback: feedback,
      f_Trainerfeedback: trainerFeedback,
      f_Trainingfeedback: trainingFeedback,
      f_score: score,
      f_fb_id: id,
    };

    // Updating state with new training entry

    setAllSubFeedback((prevFeedbackArray) => [
      ...prevFeedbackArray,
      newFeedback,
    ]);
    // setFeedbackArray([...feedbackArray, newFeedback]);
    console.log([...allSubFeedback], "subjects");
    alert("Feedback added successfully!");

    // Logging the updated feedbackArray state
    console.log(allSubFeedback);
    handleClose();
    resetForm()
  };
  const handleTrainingFeedbackChange = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files[0], "target value");
    // console.log(file.name, "237");
    // setFileName(file.name);
    // setFileType(file.type);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; // Remove data url prefix
        setTrainingFeedback(base64String);
        console.log(base64String, "base64String");
        console.log(trainingFeedback, "cerificate");
      };
      reader.readAsDataURL(file);
    }
  };
  const handleTrainerFeedbackChange = (e) => {
    const file = e.target.files[0];
    console.log(file, "target value");
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; // Remove data URL prefix
        setTrainerFeedback(base64String);
        console.log(base64String, "base64String");
      };
      reader.readAsDataURL(file);
    }
  };

  const getSubFeedback = (index) => {
    handleShow();
    const feedbackToEdit = allSubFeedback[index];
    setEmpCode(feedbackToEdit.f_empCode);
    setEmpName(feedbackToEdit.f_empName);
    setTrainingNo(feedbackToEdit.f_trnNo);
    setTrainingType(feedbackToEdit.f_trnType);
    setDateTrainingFrom(feedbackToEdit.f_dateTrnForm);
    setTimeTrainingFrom(feedbackToEdit.f_TimeTrnForm);
    setDateTrainingTo(feedbackToEdit.f_dateTrnTo);
    setTimeTrainingTo(feedbackToEdit.f_TimeTrnTo);
    setTrainingReqBy(feedbackToEdit.f_trnReqBy);
    setTrainingAttended(feedbackToEdit.f_trnAttend);
    setDesignation(feedbackToEdit.f_des);
    setTrainingFeedback(feedbackToEdit.f_Trainingfeedback);
    setTrainerFeedback(feedbackToEdit.f_Trainerfeedback);
    setScore(feedbackToEdit.f_score);
    setEditIndex(index);
    console.log(feedbackToEdit);
  };

  const updateSubFeedback = () => {
    if (editIndex !== null) {
      const updatedFeedback = [...allSubFeedback];
      updatedFeedback[editIndex] = {
        f_trnNo: trainingNo,
        f_trnType: trainingType,
        f_trnReqBy: trainingReqBy,
        f_dateTrnForm: dateTrainingFrom,
        f_TimeTrnForm: timeTrainingFrom,
        f_dateTrnTo: dateTrainingTo,
        f_TimeTrnTo: timeTrainingTo,
        f_empCode: empCode,
        f_empName: empName,
        f_trnAttend: trainingAttended,
        f_des: designation,
        f_desId: "",
        // f_feedback: feedback,
        f_Trainerfeedback: trainerFeedback,
        f_Trainingfeedback: trainingFeedback,
        f_score: score,
        f_fb_id: id,
      };
      setAllSubFeedback(updatedFeedback);
      alert("Feedback updated successfully!");
      resetForm();
      handleClose();
    }
  };

  const deleteSubFeedback = (index) => {
    const updateFeedback = [...allSubFeedback];
    updateFeedback.splice(index, 1);
    setAllSubFeedback(updateFeedback);
    alert("Feedback deleted successfully!");
  };

  const resetForm=()=>{
    setEmpCode("")
    setEmpName("")
    setTrainingNo("")
    setTrainingType("")
    setDateTrainingFrom("")
    setTimeTrainingFrom("")
    setDateTrainingTo("")
    setTimeTrainingTo("")
    setTrainingReqBy("")
    setTrainingAttended("")
    setDesignation("")
    setTrainerFeedback("")
    setTrainingFeedback("")
    setScore("")
  }
  const extractDate = (dateTimeString) => {
    return dateTimeString.split("T")[0];
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allSubFeedback.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (page) => {
    setCurrentPage(page);
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
                    <h4 className="card-title fw-bold">
                      Add Training Feedback
                    </h4>
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
                              // addSubFeedback();
                            }}
                          >
                            <button
                              className="btn btn-md text-light"
                              type="button"
                              onClick={()=>{handleShow();resetForm()}}
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
                            <th scope="col" style={headerCellStyle}>
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {allSubFeedback && currentItems.map((data, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.f_trnNo}</td>
                                <td>{data.f_trnType}</td>
                                <td>{data.f_trnReqBy}</td>
                                <td>{data.f_dateTrnForm}</td>
                                <td>{data.f_TimeTrnForm}</td>
                                <td>{data.f_dateTrnTo}</td>
                                <td>{data.f_TimeTrnTo}</td>
                                <td>{data.f_empCode}</td>
                                <td>{data.f_empName}</td>
                                <td>{data.f_trnAttend}</td>
                                <td>{data.f_des}</td>
                                <td>{data.f_feedback}</td>
                                <td>{data.f_score}</td>
                                <td>
                                  <Edit
                                    className="text-success mr-2"
                                    type="button"
                                    onClick={() => getSubFeedback(index)}
                                  />
                                  <Delete
                                    className="text-danger"
                                    type="button"
                                    style={{ marginLeft: "0.5rem" }}
                                    onClick={() => deleteSubFeedback(index)}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                      <div className="row mt-4 mt-xl-3">
        <div className="col-lg-4 col-12 ">
          <h6 className="text-lg-start text-center">
            Showing {indexOfFirstItem + 1} to{" "}
                      {Math.min(indexOfLastItem, allSubFeedback.length)} of{" "}
                      {allSubFeedback.length} entries
          </h6>
        </div>
        <div className="col-lg-4 col-12"></div>
        <div className="col-lg-4 col-12 mt-3 mt-lg-0">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-lg-end justify-content-center">
              {/* Previous button */}
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePageClick(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              {/* Page numbers */}
              {[...Array(Math.ceil(allSubFeedback.length / itemsPerPage)).keys()].map((number) => (
                <li key={number} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageClick(number + 1)}>
                    {number + 1}
                  </button>
                </li>
              ))}
              {/* Next button */}
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePageClick(currentPage + 1)}
                  disabled={currentPage === Math.ceil(allSubFeedback.length / itemsPerPage)}
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
                      onClick={addFeedback}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          show={modalOpen}
          onHide={handleClose}
          backdrop="static"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title><h5 className="fw-bold">Add Training Feedback</h5></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 ">
                <div className="form-group form-group-sm">
                  <label className="control-label fw-bold">
                    Employee Code:
                  </label>
                  <input
                    type="text"
                    id="empCode"
                    className="form-control"
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
                    className="form-control"
                    placeholder="Enter Employee Name"
                    value={empName}
                    onChange={(e) => setEmpName(e.target.value)}
                  />
                </div>
              </div>
              {/* Add other form inputs here */}
            </div>
            <div className="row mt-4">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 ">
                <div className="form-group form-group-sm">
                  <label className="control-label fw-bold">Training No:</label>
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
                  <label className="control-label fw-bold">Designation:</label>
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
                    // value={trainingFeedback}
                    // onChange={(e) => setTrainingFeedback(e.target.value)}
                    onChange={(e) => handleTrainingFeedbackChange(e)}
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
                    // value={trainerFeedback}
                    // onChange={(e) => setTrainerFeedback(e.target.value)}
                    onChange={(e) => handleTrainerFeedbackChange(e)}
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
          </Modal.Body>
          <Modal.Footer>
            {editIndex !== null ? (
              <Button
                style={{ backgroundColor: "#1B5A90" }}
                onClick={updateSubFeedback}
              >
                Update
              </Button>
            ) : (
              <Button
                style={{ backgroundColor: "#1B5A90" }}
                onClick={addSubFeedback}
              >
                Save
              </Button>
            )}
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default AddTrainingFeedback;
