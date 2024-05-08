import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Add, Delete, Edit, Height } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UrlData from "../UrlData";
import {
  handlePageClick,
  handlePrevious,
  handleNext,
  calculatePaginationRange,
} from "../PaginationUtils";
import UserId from "../UserId";
import ErrorHandler from "../ErrorHandler";

const ParameterMaster = () => {
  const navigate = useNavigate();
  const [allParameter, setAllParameter] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);

  const [parameterName, setParameterName] = useState("");
  const [parameterCode, setParameterCode] = useState("");
  const [active, setActive] = useState(true);
  const [toggleActive, setToggleActive] = useState(true);
  const [parameterId, setParameterId] = useState("");
  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)",
    color: "#fff",
  };

  useEffect(() => {
    getAllData();
  }, [currentPage, itemsPerPage, toggleActive]);

  const getAllData = () => {
    console.log(UserId, "userID")
    axios({
      method: "get",
      url: new URL(
        UrlData +
          `ParameterMaster/GetAll?status=${
            toggleActive ? "1" : "0"
          }&UserId=${UserId}&pageSize=${itemsPerPage}&pageNumber=${currentPage}`
        //   `ParameterMaster/GetAll?status=${
        //     toggleActive ? "1" : "0"
        //   }&UserId=${UserId}`
      ),
    })
      .then((response) => {
        console.log("response all parameter", response.data.data);
        setAllParameter(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setSelectedItemsPerPage(parseInt(e.target.value));
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const addParameter = () => {
    let data;
    if (parameterCode === "") {
      alert(" Please enter parameter code!");
    } else if (parameterName === "") {
      alert(" Please enter parameter name!");
    } else {
      data = {
        userId: UserId,
        p_parametername: parameterName,
        p_code: parameterCode,
        p_isactive: active === true ? "1" : "0",
      };
      if (parameterId !== null && parameterId !== "") {
        data.p_id = parameterId;
      }
      axios({
        method: "post",
        url: new URL(UrlData + `ParameterMaster`),
        data: data,
      })
        .then((response) => {
          console.log(response, "add Parameter");
          if (parameterId !== null && parameterId !== "") {
            alert("Parameter updated successfully!");
          } else {
            alert("Parameter added successfully!");
          }
          getAllData();
          setParameterCode("");
          setParameterName("");
          handleClose(); // Close modal after adding/updating
        })
        .catch((error) => {
          console.log(error);
          // alert("Something went wrong");
          let errors = ErrorHandler(error);
          alert(errors);
        });
    }
  };

  const GetParameter = (pId) => {
    axios({
      method: "get",
      url: new URL(UrlData + `ParameterMaster/Get?status=1&p_id=${pId}`),
    })
      .then((response) => {
        console.log(response.data.data, "get country");
        setParameterName(response.data.data.p_parametername);
        setParameterCode(response.data.data.p_code);
        setParameterId(response.data.data.p_id);
        handleShow(); // Show modal for editing
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeleteParameter = (pId) => {
    const data = {
      userId: UserId,
      p_id: pId,
    };
    axios({
      method: "post",
      url: new URL(UrlData + `ParameterMaster/Delete`),
      data: data,
    })
      .then((response) => {
        console.log("response", response);
        alert("Parameter deleted successfully!");
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
      const filteredData = allParameter.filter(
        (parameter) =>
        parameter.p_code.toLowerCase().includes(searchDataValue) ||
        parameter.p_parametername.toLowerCase().includes(searchDataValue)
      );
      setAllParameter(filteredData);
      setCurrentPage(1);
    }
  };

  const handleParameterNameClick = (pId, parameterName) => {
    console.log("Clicked on parameter:", parameterName);
    navigate(`/parameterValueMaster/${pId}/${encodeURIComponent(parameterName)}`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allParameter.slice(indexOfFirstItem, indexOfLastItem);

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
                    <h4 className="card-title fw-bold">Parameter Master</h4>
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
                      <Button
                        // onClick={handleShow}
                        onClick={() => {
                          setParameterCode("");
                          setParameterName("");
                          setParameterId("");
                          handleShow();
                        }}
                        style={{ backgroundColor: "#1B5A90" }}
                      >
                        <Add />
                      </Button>
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
                        Parameter Code
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Parameter Name
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
                    {allParameter &&
                      currentItems.map((data, index) => {
                        return (
                          <tr key={data.p_id}>
                            <td>
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td>{data.p_code}</td>
                            <td
                              type="button"
                              onClick={() =>
                                handleParameterNameClick(
                                  data.p_id,
                                  data.p_parametername
                                )
                              }
                            >
                              {data.p_parametername}
                            </td>
                            <td>{data.p_isactive}</td>
                            <td>
                              <Edit
                                className="text-success mr-2"
                                type="button"
                                // data-bs-toggle="modal"
                                // data-bs-target="#countryForm"
                                // onClick={handleShow}

                                onClick={() => {
                                  GetParameter(data.p_id);
                                }}
                              />

                              <Delete
                                className="text-danger"
                                type="button"
                                style={{ marginLeft: "0.5rem" }}
                                onClick={() => DeleteParameter(data.p_id)}
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
                      {Math.min(indexOfLastItem, allParameter.length)} of{" "}
                      {allParameter.length} entries
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
                          allParameter,
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
                                allParameter,
                                itemsPerPage,
                                setCurrentPage
                              )
                            }
                            disabled={
                              currentPage ===
                              Math.ceil(allParameter.length / itemsPerPage)
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
            <h5 className="fw-bold">Add Parameter</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6} className="mt-2 mt-lg-0">
                <Form.Group className="mb-3" controlId="parameterCode">
                  <Form.Label className="fw-bold">Parameter Code:</Form.Label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <Form.Control
                    type="number"
                    placeholder="Enter Parameter Code"
                    value={parameterCode}
                    onChange={(e) => setParameterCode(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} className="mt-2 mt-lg-0">
                <Form.Group className="mb-3" controlId="parameterName">
                  <Form.Label className="fw-bold">Parameter Name:</Form.Label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <Form.Control
                    type="text"
                    placeholder="Enter Parameter Name"
                    value={parameterName}
                    onChange={(e) => setParameterName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="isActive">
              <Form.Check
                type="checkbox"
                label="Is Active"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#1B5A90" }}
            onClick={() => {
              addParameter();
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

export default ParameterMaster;
