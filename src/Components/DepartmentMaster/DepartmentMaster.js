// DepartmentMaster.jsx
import React, { useState, useEffect } from "react";
import { Table, Modal, Row, Col, Button, Form } from "react-bootstrap";
import { Add, Delete, Edit } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  handlePageClick,
  handlePrevious,
  handleNext,
  calculatePaginationRange,
} from "../PaginationUtils";
import UrlData from "../UrlData";
import UserId from "../UserId";
import ErrorHandler from "../ErrorHandler";

const DepartmentMaster = () => {
  const navigate = useNavigate();
  const [allDepartment, setAllDepartment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchData, setSearchData] = useState("");
  const [deptName, setDeptName] = useState("");
  const [deptCode, setDeptCode] = useState("");
  const [deptHead, setDeptHead] = useState("");
  const [deptId, setDeptId] = useState("");
  const [selectedDeptHead, setSelectedDeptHead] = useState([]);
  const [active, setActive] = useState(true);
  const [toggleActive, setToggleActive] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setShowModal(true);
    ResetForm();
    // Add any additional logic here if needed // This line might cause recursion, make sure it's intended
  };

  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)",
    color: "#fff",
  };

  useEffect(() => {
    getAllData();
  }, [currentPage, toggleActive]);

  useEffect(() => {
    GetAllDepartmentHead();
  }, []);

  const getAllData = () => {
    axios({
      method: "get",
      url: new URL(
        UrlData + `DepartmentMaster/GetAll?status=${toggleActive ? "1" : "0"}`
      ),
    })
      .then((response) => {
        console.log("response", response.data.data);
        setAllDepartment(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addDepartment = () => {
    let data;
    if (deptCode === "") {
      alert("Please enter department code!");
    } else if (deptName === "") {
      alert("Please enter department name!");
    } else if (!/^[^\d]+$/.test(deptName)) {
      alert(
        "Please enter a valid department name (alphabetic characters only)"
      );
    } else {
      data = {
        userId: UserId,
        d_department_name: deptName,
        d_department_code: deptCode,
        d_head: deptHead,
        d_isactive: active === true ? "1" : "0",
      };

      if (deptId) {
        data.d_id = deptId;
      }
      axios({
        method: "post",
        url: new URL(UrlData + `DepartmentMaster`),
        data: data, // Make sure to stringify the data object
      })
        .then((response) => {
          console.log(response);

          if (deptId) {
            alert("Department updated successfully!");
          } else {
            alert("Department added successfully!");
          }

          handleClose();
          getAllData();
        })
        .catch((error) => {
          console.log(error);
          // alert("Something went wrong");
          let errors = ErrorHandler(error);
          alert(errors);
        });
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
      url: new URL(UrlData + `EmployeeMaster/GetAll?status=1`),
    })
      .then((response) => {
        console.log("response", response.data.data);
        setSelectedDeptHead(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const GetDepartment = (d_id) => {
    handleShow();
    axios({
      method: "get",
      url: new URL(UrlData + `DepartmentMaster/Get?status=1&d_id=${d_id}`),
    })
      .then((response) => {
        console.log(response, "get department");
        setDeptName(response.data.data.d_department_name);
        setDeptCode(response.data.data.d_department_code);
        setDeptHead(response.data.data.d_head);
        setDeptId(response.data.data.d_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeleteDepartment = (dId) => {
    const data = {
      userId: UserId,
      d_id: dId,
    };
    axios({
      method: "post",
      url: new URL(UrlData + `DepartmentMaster/Delete`),
      data: data,
    })
      .then((response) => {
        console.log("response", response);
        alert("Department deleted successfully!");
        getAllData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (e) => {
    const searchDataValue = e.target.value.toLowerCase();
    setSearchData(searchDataValue);

    if (searchDataValue.trim() === "") {
      // If search input is empty, fetch all data
      getAllData();
    } else {
      // Filter data based on search input value
      const filteredData = allDepartment.filter(
        (department) =>
          department.d_department_name
            .toLowerCase()
            .includes(searchDataValue) ||
          department.d_department_code.toLowerCase().includes(searchDataValue)
      );
      setAllDepartment(filteredData);
    }
  };

  const ResetForm = () => {
    setDeptCode("");
    setDeptName("");
    setDeptHead("");
    setDeptId("");
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allDepartment.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="container-fluid">
        <div
          className="card m-3"
          style={{ boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="row">
            <div className="col-lg-12">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h4 className="card-title fw-bold">Department Master</h4>
                  </div>
                  <div className="col-auto d-flex flex-wrap">
                    <div className="form-check form-switch mt-2 pt-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        checked={toggleActive} // Bind the checked state to the state variable
                        onChange={() => setToggleActive(!toggleActive)}
                      />
                    </div>
                    <div
                      className="btn btn-add"
                      title="Add New"
                      onClick={() => {
                        handleShow();
                      }}
                    >
                      <button
                        className="btn btn-md text-light"
                        type="button"
                        style={{ backgroundColor: "#1B5A90" }}
                      >
                        <Add />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body pt-3">
                <div className="row">
                  <div className="col-lg-3 d-flex justify-content-center justify-content-lg-start">
                    <h6 className="mt-3">Show</h6>&nbsp;&nbsp;
                    <select
                      style={{ height: "35px" }}
                      className="form-select w-auto"
                      aria-label="Default select example"
                      // value={selectedItemsPerPage}
                      // onChange={handleChange}
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                    </select>
                    &nbsp;&nbsp;
                    <h6 className="mt-3">entries</h6>
                  </div>
                  <div className="col-lg-6 d-flex justify-content-center justify-content-lg-end"></div>
                  <div className="col-lg-3 d-flex justify-content-center justify-content-lg-end">
                    <input
                      className="form-control"
                      placeholder="Search here"
                      value={searchData}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
                <Table
                  striped
                  hover
                  responsive
                  className="border text-left mt-4"
                >
                  <thead>
                    <tr>
                      <th scope="col" style={headerCellStyle}>
                        Sr.No
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Department Code
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Department Name
                      </th>
                      {/* <th scope="col" style={headerCellStyle}>
                        Department Head
                      </th> */}
                      <th scope="col" style={headerCellStyle}>
                        Status
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allDepartment &&
                      currentItems.map((data, index) => {
                        return (
                          <tr key={data.d_id}>
                            <td>
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td>{data.d_department_code}</td>
                            <td>{data.d_department_name}</td>
                            {/* <td>{data.d_head}</td> */}
                            <td>{data.d_isactive}</td>
                            <td>
                              <Edit
                                className="text-success mr-2"
                                type="button"
                                onClick={() => GetDepartment(data.d_id)}
                              />
                              <Delete
                                className="text-danger"
                                type="button"
                                style={{ marginLeft: "0.5rem" }}
                                onClick={() => DeleteDepartment(data.d_id)}
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
                      {Math.min(indexOfLastItem, allDepartment.length)} of{" "}
                      {allDepartment.length} entries
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
                          allDepartment,
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
                                allDepartment,
                                itemsPerPage,
                                setCurrentPage
                              )
                            }
                            disabled={
                              currentPage ===
                              Math.ceil(allDepartment.length / itemsPerPage)
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
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose} size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="fw-bold">Add Department</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6} className="mt-4 mt-lg-0">
                <Form.Group className="mb-3" controlId="departmentCode">
                  <Form.Label className="fw-bold">Department Code:</Form.Label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <Form.Control
                    type="number"
                    placeholder="Enter Department Code"
                    value={deptCode}
                    onChange={(e) => setDeptCode(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} className="mt-4 mt-lg-0">
                <Form.Group className="mb-3" controlId="departmentName">
                  <Form.Label className="fw-bold">Department Name:</Form.Label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <Form.Control
                    type="text"
                    placeholder="Enter Department Name"
                    value={deptName}
                    onChange={(e) => setDeptName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {/* <Col xs={12} sm={12} md={6} lg={6} className="mt-4 mt-lg-0">
                <Form.Group className="mt-4 mt-lg-0">
                  <Form.Label className="fw-bold">Department Head:</Form.Label>
                  <Form.Select
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
                  </Form.Select>
                </Form.Group>
              </Col> */}
              <Col xs={12} sm={12} md={6} lg={6} className="mt-3 mt-lg-0">
                <Form.Group className="" controlId="isActive">
                  <Form.Check
                    type="checkbox"
                    label="Is Active"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#1B5A90" }}
            onClick={() => {
              addDepartment();
            }}
          >
            Save
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DepartmentMaster;
