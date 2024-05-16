import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Row, Col, Button } from "react-bootstrap";
import { Add, Delete, Edit } from "@material-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UrlData from "../UrlData";
import Select from "react-select";
import {
  handlePageClick,
  handlePrevious,
  handleNext,
  calculatePaginationRange,
} from "../PaginationUtils";
import UserId from "../UserId";
import ErrorHandler from "../ErrorHandler";
import {
  GetAllDesignation,
  getAllDepartment,
} from "../Api/DesignationAndDepartment";

const UserMaster = () => {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [allRole, setAllRole] = useState([]);
  const [allEmployee, setAllEmployee] = useState([]);
  const [role, setRole] = useState("");
  const [employee, setEmployee] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [userName, setUserName] = useState("");
  const [designation, setDesignation] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState([]);
  const [department, setDepartment] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10);
  const [searchData, setSearchData] = useState("");
  const [active, setActive] = useState(true);
  const [toggleActive, setToggleActive] = useState(true);
  const [umId, setUmId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => {
    setShowModal(true);
    ResetForm();
  };
  const handleClose = () => setShowModal(false);
  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)",
    color: "#fff",
  };

  useEffect(() => {
    // getData();
    GetAllDesignation();
    getAllDepartment();
    getAllData();
    getAllRole();
    getAllEmployee();
  }, [currentPage, itemsPerPage, toggleActive]);

  const getAllData = () => {
    axios({
      method: "get",
      url: new URL(
        UrlData +
          `UserMaster/GetAll?status=${
            toggleActive ? "1" : "0"
          }&pageSize=${itemsPerPage}&pageNumber=${currentPage}`
      ),
    })
      .then((response) => {
        console.log("response all users", response.data.data);
        setAllUsers(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllRole = () => {
    axios({
      method: "get",
      url: new URL(UrlData + `RoleMaster/GetAll?status=1`),
    })
      .then((response) => {
        console.log("response all roles", response.data.data);
        const role = response.data.data.map((item, index) => ({
          value: item.r_id,
          label: item.r_rolename,
        }));
        setAllRole(role);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllEmployee = () => {
    axios({
      method: "get",
      url: new URL(UrlData + `EmployeeMaster/GetAll?status=1`),
    })
      .then((response) => {
        console.log("response all employee", response.data.data);
        setAllEmployee(response.data.data);
        const emp = response.data.data.map((item, index) => ({
          value: item.emp_id,
          label: item.emp_code,
        }));
        setAllEmployee(emp);
        // const desg = response.data.data.map((item, index) => ({
        //   value: item.emp_des,
        // }));
        // setSelectedDesignation(desg);
        // const desg = response.data.data.map((item, index) => ({
        //   de_id: item.emp_des_id, // Assuming 'de_id' is the correct property name for designation ID
        //   de_designation_name: item.emp_des, // Assuming 'desg_name' is the correct property name for designation name
        // }));
        // setSelectedDesignation(desg);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEmployee = (selected) => {
    setEmployee(selected);
    console.log(selected, "selected");
    // setUserName(selected.label);
    axios({
      method: "get",
      url: new URL(
        UrlData + `EmployeeMaster/Get?status=1&emp_id=${selected.value}`
      ),
    })
      .then((response) => {
        console.log(response.data.data, "get employee");
        var fullName = response.data.data.emp_fname;

        // Split the full name into parts based on spaces
        var parts = fullName.split(" ");

        // Extract the first part (first name)
        var firstName = parts[0];

        console.log(firstName);
        setUserName(firstName);
        setDesignation(response.data.data.emp_des);
        setDepartment(response.data.data.emp_dep);
        setEmployeeName(response.data.data.emp_fname);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRole = (selected) => {
    setRole(selected);
  };

  const handleChange = (e) => {
    setSelectedItemsPerPage(parseInt(e.target.value));
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const addUser = () => {
    let data;
    if (employee === "") {
      alert("Please enter employee code!");
    } else if (userName === "") {
      alert("Please enter user name!");
    } else if (role === "") {
      alert("Please enter role!");
    } else {
      data = {
        userId: UserId,
        um_user_name: userName,
        um_password: "",
        um_staffdepid: department.toString(),
        um_staffdesid: designation.toString(),
        um_staffname: employee.label,
        um_fullname: employeeName,
        um_staffid: (employee.value).toString(),
        um_isactive: active === true ? "1" : "0",
        um_roleid: role.value,
        um_rolename: role.label,
      };
      if (umId) {
        data.um_id = umId;
      }
      axios({
        method: "post",
        url: new URL(UrlData + `UserMaster`),
        data: data,
      })
        .then((response) => {
          console.log(response, "add User");
          if (umId) {
            alert("User updated successfully!");
          } else {
            alert("User added successfully!");
          }
          getAllData();
          handleClose();
          ResetForm();
        })
        .catch((error) => {
          console.log(error);
          alert("Something went wrong");
        });
    }
  };

  const GetRole = (umId) => {
    // navigate(`/addCountryMaster/${coId}`);
    handleShow();
    axios({
      method: "get",
      url: new URL(UrlData + `UserMaster/Get?status=1&um_id=${umId}`),
    })
      .then((response) => {
        console.log(response);
        setEmployee({
          value: response.data.data.um_staffid,
          label: response.data.data.um_staffname,
        });
        setUserName(response.data.data.um_user_name);
        setRole({
          value: response.data.data.um_roleid,
          label: response.data.data.um_rolename,
        });
        setDesignation(response.data.data.um_staffdesid);
        setDepartment(response.data.data.um_staffdepid);
        setEmployeeName(response.data.data.um_fullname);
        setUmId(umId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeleteRole = (umId) => {
    const data = {
      userId: UserId,
      um_id: umId,
    };
    axios({
      method: "post",
      url: new URL(UrlData + `UserMaster/Delete`),
      data: data,
    })
      .then((response) => {
        console.log("response", response);
        alert("User deleted successfully!");
        getAllData();
      })
      .catch((error) => {
        console.log(error);
        let errors = ErrorHandler(error);
        alert(errors);
      });
  };

  // const getData = async () => {
  //   const designationData = await GetAllDesignation();
  //   const departmentData = await getAllDepartment();

  //   setSelectedDesignation(designationData);
  //   setSelectedDepartment(departmentData);
  // };

//   const getData = async () => {
//     try {
//         const designationData = await GetAllDesignation();
//         const departmentData = await getAllDepartment();

//         setSelectedDesignation(designationData);
//         setSelectedDepartment(departmentData);
//     } catch (error) {
//         console.log(error);
//     }
// };

 const GetAllDesignation = () => {
  return axios({
      method: "get",
      url: new URL(UrlData + 'DesignationMaster/GetAll?status=1'),
  })
  .then((response) => {
      console.log("response all designation", response.data.data);
      // return response.data.data;
      setSelectedDesignation(response.data.data);
  })
  .catch((error) => {
      console.log(error);
      return [];
  });
};

 const getAllDepartment = () => {
  return axios({
      method: "get",
      url: new URL(UrlData + 'DepartmentMaster/GetAll?status=1'),
  })
  .then((response) => {
      console.log("response all department", response.data.data);
      // return response.data.data;
      setSelectedDepartment(response.data.data);
  })
  .catch((error) => {
      console.log(error);
      return [];
  });
};
  const handleDesignation = (e) => {
    const selectedValue = e.target.value;
    setDesignation(selectedValue);
  };

  const handleDepartment = (e) => {
    const selectedValue = e.target.value;
    setDepartment(selectedValue);
  };

  const handleSearch = (e) => {
    const searchDataValue = e.target.value.toLowerCase();
    setSearchData(searchDataValue);

    if (searchDataValue.trim() === "") {
      // If search input is empty, fetch all data
      getAllData();
    } else {
      // Filter data based on search input value
      const filteredData = allUsers.filter(
        (users) =>
          users.um_staffname.toLowerCase().includes(searchDataValue) ||
          users.um_user_name.toLowerCase().includes(searchDataValue)
      );
      setAllUsers(filteredData);
      setCurrentPage(1);
    }
  };

  const ResetForm = () => {
    setEmployee("");
    setEmployeeName("");
    setRole("");
    setUserName("");
    setUmId("");
    setDesignation("");
    setDepartment("");
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allUsers.slice(indexOfFirstItem, indexOfLastItem);

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
                    <h4 className="card-title fw-bold">User Master</h4>
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
                    <div className="btn btn-add" title="Add New">
                      <button
                        type="button"
                        className="btn btn-primary"
                        // data-bs-toggle="modal"
                        // data-bs-target="#userForm"
                        style={{ backgroundColor: "#1B5A90" }}
                        onClick={handleShow}
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
                <br />
                <Table striped hover responsive className="border text-left">
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
                        User Name
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Status
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers &&
                      currentItems.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td>{data.um_staffname}</td>
                            <td>{data.um_fullname}</td>
                            <td type="button">{data.um_user_name}</td>
                            <td>{data.um_isactive}</td>
                            <td>
                              <Edit
                                className="text-success mr-2"
                                type="button"
                                onClick={() => GetRole(data.um_id)}
                              />
                              <Delete
                                className="text-danger"
                                type="button"
                                style={{ marginLeft: "0.5rem" }}
                                onClick={() => DeleteRole(data.um_id)}
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
                      {Math.min(indexOfLastItem, allUsers.length)} of{" "}
                      {allUsers.length} entries
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
                          allUsers,
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
                                allUsers,
                                itemsPerPage,
                                setCurrentPage
                              )
                            }
                            disabled={
                              currentPage ===
                              Math.ceil(allUsers.length / itemsPerPage)
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
            <h5 className="fw-bold">Add User</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} sm={12} md={12} lg={6} className="mt-4 mt-lg-0">
              <Form.Group className="form-group-sm">
                <Form.Label className="control-label fw-bold">
                  Employee Code:
                </Form.Label>
                <span className="text-danger fw-bold">*</span>
                <Select
                  options={allEmployee}
                  value={employee}
                  onChange={handleEmployee}
                  className="mt-2"
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} className="mt-4 mt-lg-0">
              <Form.Group className="form-group-sm">
                <Form.Label className="control-label fw-bold">
                  Employee Name:
                </Form.Label>
                <span className="text-danger fw-bold">*</span>
                <Form.Control
                  type="text"
                  id="employeeName"
                  name="employeeName"
                  placeholder="Enter Employee Name"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs={12} sm={12} md={12} lg={6}>
              <Form.Group className="form-group-sm">
                <Form.Label className="control-label fw-bold">
                  User Name:
                </Form.Label>
                <span className="text-danger fw-bold">*</span>
                <Form.Control
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder="Enter User Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} className="mt-4 mt-lg-0">
              <div className="form-group form-group-sm">
                <label className="control-label fw-bold">Designation:</label>{" "}
                {/* <span className="text-danger fw-bold">*</span> */}
                <select
                  className="form-select mt-3"
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
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs={12} sm={12} md={12} lg={6}>
              <div className="form-group form-group-sm">
                <label className="control-label fw-bold">Department:</label>{" "}
                {/* <span className="text-danger fw-bold">*</span> */}
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
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} className="mt-lg-0 mt-3">
              <Form.Group className="form-group-sm">
                <Form.Label className="control-label fw-bold">Role:</Form.Label>
                <span className="text-danger fw-bold">*</span>
                <Select
                  options={allRole}
                  value={role}
                  onChange={handleRole}
                  className=""
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs={12} sm={12} md={12} lg={6}>
              <Form.Group className="mb-3" controlId="isActive">
                <Form.Check
                  type="checkbox"
                  label="Is Active"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <div className="col-lg-12 text-end">
            <Button
              className="text-light"
              onClick={() => {
                addUser();
              }}
              style={{ backgroundColor: "#1B5A90" }}
            >
              Save
            </Button>
            <Button variant="secondary" className="mx-2" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserMaster;
