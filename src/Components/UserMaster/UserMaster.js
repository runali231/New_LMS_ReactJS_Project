import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
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

const UserMaster = () => {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [allRole, setAllRole] = useState([]);
  const [allEmployee, setAllEmployee] = useState([]);
  const [role, setRole] = useState("");
  const [employee, setEmployee] = useState("");
  const [userName, setUserName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10);

  const [active, setActive] = useState(true);
  const [umId, setUmId] = useState("");
  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)",
    color: "#fff",
  };

  useEffect(() => {
    getAllData();
    getAllRole();
    getAllEmployee();
  }, [currentPage, itemsPerPage]);

  const getAllData = () => {
    axios({
      method: "get",
      url: new URL(
        UrlData +
          `UserMaster/GetAll?status=1&pageSize=${itemsPerPage}&pageNumber=${currentPage}`
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
          label: item.emp_fname,
        }));
        setAllEmployee(emp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEmployee = (selected) => {
    setEmployee(selected);
  };
  const handleRole = (selected) => {
    setRole(selected);
  };

  const handleChange = (e) => {
    setSelectedItemsPerPage(parseInt(e.target.value));
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const addCountry = () => {
    let data;
    if (userName === "" || role === "" || employee === "") {
      alert("Please fill all the details");
    } else {
    data = {
      userId: UserId,
      um_user_name: userName,
      um_password: "",
      um_staffname: employee.label,
      um_staffid: employee.value,
      um_isactive: "1",
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
        }
        else{
          alert("User added successfully!");
        }
        getAllData();
        setEmployee("");
        setRole("");
        setUserName("")
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong");
      });
    }
  };

  const GetRole = (umId) => {
    // navigate(`/addCountryMaster/${coId}`);
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
      });
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
                    <div className="btn btn-add" title="Add New">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#userForm"
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
                      className="form-select w-auto"
                      aria-label="Default select example"
                      value={selectedItemsPerPage}
                      onChange={handleChange}
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                    </select>
                    &nbsp;&nbsp;
                    <h6 className="mt-3">entries</h6>
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
                        Employee Name
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        User Name
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
                            <td type="button">{data.um_user_name}</td>
                            <td>
                              <Edit
                                className="text-success mr-2"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#userForm"
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
      <div
        className="modal fade"
        id="userForm"
        tabIndex="-1"
        aria-labelledby="userFormLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="userFormLabel">
                User Master
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
                      Employee Name:
                    </label>{" "}
                    <span className="text-danger fw-bold">*</span>

                    <Select
                      options={allEmployee}
                      value={employee}
                      // value={selectedTrainingTopic.filter(option => trainingTopics.includes(option.value))}
                      onChange={handleEmployee}
                      className="mt-2"
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-lg-0 mt-4">
                  <div className="form-group form-group-sm">
                    <label className="control-label fw-bold">User Name:</label>{" "}
                    <span className="text-danger fw-bold">*</span>
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      className="form-control "
                      autoComplete="off"
                      placeholder="Enter User Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-lg-0 mt-4">
                  <div className="form-group form-group-sm">
                    <label className="control-label fw-bold">Role:</label>{" "}
                    <span className="text-danger fw-bold">*</span>
                    {/* <select
                        className="form-select"
                        aria-label="Default select example"
                        value={role}
                        onChange={(e)=>setRole(e.target.value)}
                      >
                        <option value="" disabled>
                          Select Role
                        </option>
                        {allRole.map((data, index) => (
                          <option key={index} value={data.r_id}>
                            {data.r_rolename}
                          </option>
                        ))}
                      </select> */}
                    <Select
                      options={allRole}
                      value={role}
                      // value={selectedTrainingTopic.filter(option => trainingTopics.includes(option.value))}
                      onChange={handleRole}
                      className="mt-2"
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                  <div className="form-group form-group-sm">
                    <label className="control-label fw-bold">
                      {/* Department Head: */}
                    </label>
                    <div className="form-group form-group-sm">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={active}
                          onChange={(e) => setActive(e.target.checked)}
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
              </div>
            </div>
            <div className="modal-footer">
              <div className="row">
                <div className="col-lg-12 text-end">
                  <button
                    className="btn text-light"
                    type="button"
                    data-bs-dismiss="modal"
                    style={{ backgroundColor: "#1B5A90" }}
                    onClick={() => {
                      addCountry();
                      // editDesignation();
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary mx-2"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMaster;
