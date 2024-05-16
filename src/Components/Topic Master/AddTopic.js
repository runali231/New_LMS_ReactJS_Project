import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { Add, ArrowBack, Delete, Edit } from "@material-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UrlData from "../UrlData";
import { v4 as uuidv4 } from "uuid";
import {
  handlePageClick,
  handlePrevious,
  handleNext,
  calculatePaginationRange,
} from "../PaginationUtils";
import { getAllDepartment } from "../Api/DesignationAndDepartment";
import UserId from "../UserId";
import ErrorHandler from "../ErrorHandler";

const AddTopic = () => {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [tId, setTId] = useState("");
  const [trainingCode, setTrainingCode] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [trainingType, setTrainingType] = useState("");
  const [trainingDuration, setTrainingDuration] = useState("");
  const [content, setContent] = useState("");
  const [subContent, setSubContent] = useState("");
  const [subject, setSubject] = useState("");
  const [allSubject, setAllSubject] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10);
  const handleClose = () => setModalOpen(false);
  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)", // Replace with desired background color
    color: "#fff", // Optional: Set the text color to contrast with the background
  };
  useEffect(() => {
    getAllData();

    if (id) {
      axios({
        method: "get",
        url: new URL(UrlData + `TopicMaster/GetTopics?t_id=${id}`),
      })
        .then((response) => {
          console.log(response, "get topics");
          setTrainingCode(response.data.data.t_code);
          setDescription(response.data.data.t_description);
          setDepartment(response.data.data.t_department);
          setTrainingType(response.data.data.t_trainingtype);
          setTrainingDuration(response.data.data.t_duration);
          setTId(response.data.data.t_id);
          getAllSubject();
          console.log(response.data.data.t_id, "45");
          console.log(tId, "tId get");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [tId]);

  const addTopic = () => {
    if (trainingCode === "") {
      alert("Please enter training code!");
    } else if (description === "") {
      alert("Please enter description!");
    } else if (department === "") {
      alert("Please enter department!");
    } else if (trainingType === "") {
      alert("Please enter training type!");
    } else if (trainingDuration === "") {
      alert("Please enter training duration!");
    } else {
      let data = {
        userId: UserId,
        t_code: trainingCode,
        t_description: description,
        t_department: department,
        t_trainingtype: trainingType,
        t_duration: trainingDuration,
        t_creadtedby: "",
        t_updatedby: "",
        t_isactive: "1",
        subject: subjects,
      };
      if (id !== null && id !== undefined && id !== ":id") {
        data.t_id = id;
      }
      axios({
        method: "post",
        url: new URL(UrlData + `TopicMaster`),
        data: data,
      })
        .then((response) => {
          console.log(response);
          if (id !== null && id !== undefined && id !== ":id") {
            alert("Topic updated successfully!");
          } else {
            alert("Topic added successfully!");
          }
          navigate("/topicMaster");
        })
        .catch((error) => {
          console.log(error);
          let errors = ErrorHandler(error);
          alert(errors);
        });
    }
  };

  const getAllSubject = () => {
    console.log(tId, "tID get all subject");
    axios
      .get(
        new URL(UrlData + `TopicMaster/GetAllSubject?t_isactive=1&t_id=${tId}`)
      )
      .then((response) => {
        console.log("get all subject", response.data.data);
        setSubjects(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllData = async () => {
    const departmentData = await getAllDepartment();
    setSelectedDepartment(departmentData);
  };

  const handleDepartment = (e) => {
    const selectedValue = e.target.value;
    setDepartment(selectedValue);
  };

  const addSubject = () => {
    if (content === "") {
      alert("Please enter content!");
    } else if (subContent === "") {
      alert("Please enter sub content!");
    } else if (subject === "") {
      alert("Please enter subject!");
    } else {
      const newSubject = {
        s_subject: subject,
        s_content: content,
        s_subcontent: subContent,
      };
      setSubjects([...subjects, newSubject]);
      console.log([...subjects], "subjects");
      alert("Subject added successfully!");
      setModalOpen(false);
    }
  };

  const editSubject = (index) => {
    const subjectToEdit = subjects[index];
    setSubject(subjectToEdit.s_subject);
    setContent(subjectToEdit.s_content);
    setSubContent(subjectToEdit.s_subcontent);
    const adjustedIndex = indexOfFirstItem + index;
    console.log("Received index:", adjustedIndex);
    setEditIndex(index);
  };

  const updateSubject = () => {
    if (editIndex !== null) {
      const updatedSubjects = [...subjects];
      updatedSubjects[editIndex] = {
        s_subject: subject,
        s_content: content,
        s_subcontent: subContent,
      };
      setSubjects(updatedSubjects);
      alert("Subject updated successfully!");
      resetForm();
      setModalOpen(false);
    }
  };

  const handleChange = (e) => {
    setSelectedItemsPerPage(parseInt(e.target.value)); // Update selectedItemsPerPage state
    setItemsPerPage(parseInt(e.target.value)); // Update itemsPerPage state
    setCurrentPage(1); // Reset currentPage to 1 when changing items per page
  };

  const resetForm = () => {
    setSubject("");
    setContent("");
    setSubContent("");
    setEditIndex(null);
  };

  const deleteSubject = (index) => {
    const adjustedIndex = indexOfFirstItem + index;
    console.log("Received index:", adjustedIndex);
    const updatedSubjects = [...subjects];
    updatedSubjects.splice(index, 1);
    setSubjects(updatedSubjects);
    alert("Subject deleted successfully!");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subjects.slice(indexOfFirstItem, indexOfLastItem);
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
                    <h4 className="card-title fw-bold">Add Topic</h4>
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
                      title="Back"
                      onClick={() => {
                        navigate("/topicMaster");
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
                      <label className="control-label fw-bold">Code:</label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="text"
                        id="tCode"
                        name="tCode"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Code"
                        value={trainingCode}
                        onChange={(e) => setTrainingCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Description:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <textarea
                        className="form-control"
                        rows="1"
                        id="description"
                        name="text"
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
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
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Type
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <select
                        className="form-select"
                        id="sel1"
                        value={trainingType}
                        onChange={(e) => setTrainingType(e.target.value)}
                      >
                        <option value="" disabled>
                          Select Training Type
                        </option>
                        <option value="Induction">Induction</option>
                        <option value="New Training">New Training</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Duration:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="time"
                        id="duration"
                        name="duration"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Training Duration"
                        value={trainingDuration}
                        onChange={(e) => setTrainingDuration(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="card-header bg-white">
                      <div className="row align-items-center">
                        <div className="col">
                          {/* <h4 className="card-title">Topic Master</h4> */}
                        </div>
                        <div className="col-md-2  justify-content-end">
                          <input
                            type="text"
                            id="custom-search"
                            className="form-control d-none"
                            placeholder="Search"
                          />
                        </div>
                        <div className="col-auto d-flex flex-wrap">
                          <div className="btn btn-add " title="Add New">
                            <button
                              className="btn btn-md text-light"
                              type="button"
                              // data-bs-toggle="modal"
                              // data-bs-target="#exampleModal"
                              style={{ backgroundColor: "#1B5A90" }}
                              onClick={() => {
                                setModalOpen(true);
                                resetForm();
                              }}
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
                            value={selectedItemsPerPage}
                            onChange={handleChange}
                          >
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
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
                        className="table text-left"
                      >
                        <thead>
                          <tr>
                            <th scope="col" style={headerCellStyle}>
                              Sr.No
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Subject
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Content
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Sub Content
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Action
                            </th>
                          </tr>
                        </thead>
                        {/* <tbody>
                          {subjects.map((data, index) => (
                            <tr key={index}>
                              <td>
                                {(currentPage - 1) * itemsPerPage + index + 1}
                              </td>
                              <td>{data.s_subject}</td>
                              <td>{data.s_content}</td>
                              <td>{data.s_subcontent}</td>
                              <td>
                                <Edit
                                  className="text-success mr-2"
                                  // onClick={() => GetSubject(data.s_id)}
                                  onClick={() => {
                                    editSubject(index);
                                    setModalOpen(true);
                                  }}
                                  type="button"
                                  // data-bs-toggle="modal"
                                  // data-bs-target="#exampleModal"
                                />
                                <Delete
                                  className="text-danger"
                                  type="button"
                                  style={{ marginLeft: "0.5rem" }}
                                  // onClick={() => DeleteSubject(data.s_id)}
                                  // onClick={() => deleteSubject(index)}
                                  onClick={() => deleteSubject(index)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody> */}
                        <tbody>
                          {subjects.length === 0 ? (
                            <tr>
                              <td colSpan="5" className="text-center">
                                Data not available
                              </td>
                            </tr>
                          ) : (
                            currentItems.map((data, index) => {
                              const adjustedIndex = indexOfFirstItem + index;
                              return (
                                <tr key={index}>
                                  <td>
                                    {(currentPage - 1) * itemsPerPage +
                                      index +
                                      1}
                                  </td>
                                  <td>{data.s_subject}</td>
                                  <td>{data.s_content}</td>
                                  <td>{data.s_subcontent}</td>
                                  <td>
                                    <Edit
                                      className="text-success mr-2"
                                      onClick={() => {
                                        editSubject(adjustedIndex);
                                        setModalOpen(true);
                                      }}
                                      type="button"
                                    />
                                    <Delete
                                      className="text-danger"
                                      type="button"
                                      style={{ marginLeft: "0.5rem" }}
                                      onClick={() =>
                                        deleteSubject(adjustedIndex)
                                      }
                                    />
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </Table>
                      <div className="row mt-4 mt-xl-3">
                        <div className="col-lg-4 col-12">
                          <h6 className="text-lg-start text-center">
                            Showing {indexOfFirstItem + 1} to{" "}
                            {Math.min(indexOfLastItem, subjects.length)} of{" "}
                            {subjects.length} entries
                          </h6>
                        </div>
                        <div className="col-lg-4 col-12"></div>
                        <div className="col-lg-4 col-12 mt-3 mt-lg-0">
                          <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center justify-content-lg-end">
                              <li className="page-item">
                                <button
                                  className="page-link"
                                  onClick={() =>
                                    handlePrevious(currentPage, setCurrentPage)
                                  }
                                  disabled={currentPage === 1}
                                  aria-label="Previous"
                                >
                                  <span aria-hidden="true">&laquo;</span>
                                </button>
                              </li>
                              {calculatePaginationRange(
                                currentPage,
                                subjects,
                                itemsPerPage
                              ).map((number) => (
                                <li
                                  key={number}
                                  className={`page-item ${
                                    currentPage === number ? "active" : ""
                                  }`}
                                >
                                  <button
                                    className="page-link"
                                    onClick={() =>
                                      handlePageClick(number, setCurrentPage)
                                    }
                                  >
                                    {number}
                                  </button>
                                </li>
                              ))}
                              <li className="page-item">
                                <button
                                  className="page-link"
                                  onClick={() =>
                                    handleNext(
                                      currentPage,
                                      subjects,
                                      itemsPerPage,
                                      setCurrentPage
                                    )
                                  }
                                  disabled={
                                    currentPage ===
                                    Math.ceil(subjects.length / itemsPerPage)
                                  }
                                  aria-label="Next"
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
                      // onClick={() => {
                      //   addTopic();
                      //   // editTopic();
                      // }}
                      onClick={addTopic}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={modalOpen} onHide={handleClose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>
              <h5 className="fw-bold">Add Topic</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formContent">
                <Form.Label className="fw-bold">Content</Form.Label>{" "}
                <span className="text-danger">*</span>
                <Form.Control
                  type="text"
                  placeholder="Enter Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formSubContent">
                <Form.Label className="fw-bold">Sub Content</Form.Label>{" "}
                <span className="text-danger">*</span>
                <Form.Control
                  type="text"
                  placeholder="Enter Sub Content"
                  value={subContent}
                  onChange={(e) => setSubContent(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formSubject">
                <Form.Label className="fw-bold">Subject</Form.Label>{" "}
                <span className="text-danger">*</span>
                <Form.Control
                  type="text"
                  placeholder="Enter Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {editIndex !== null ? (
              <Button
                style={{ backgroundColor: "#1B5A90" }}
                onClick={updateSubject}
              >
                Update Subject
              </Button>
            ) : (
              <Button
                style={{ backgroundColor: "#1B5A90" }}
                onClick={addSubject}
              >
                Add Subject
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

export default AddTopic;
