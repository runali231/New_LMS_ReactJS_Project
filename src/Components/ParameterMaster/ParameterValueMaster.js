import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Add, Delete, Edit, Height , ArrowBack} from "@material-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
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

const ParameterValueMaster = () => {
  const navigate = useNavigate();
  const [allParameterValue, setAllParameterValue] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [parameterName, setParameterName] = useState("");
  const [active, setActive] = useState(true);
  const [toggleActive, setToggleActive] = useState(true);
  const [parameterValueId, setParameterValueId] = useState("");
  const { id, parameterId, parameterNamee } = useParams();
  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)",
    color: "#fff",
  };

  useEffect(() => {
    getAllData();
  }, [currentPage, itemsPerPage, toggleActive]);

  const getAllData = () => {
    axios({
      method: "get",
      url: new URL(
        UrlData +
          `ParameterValueMaster/GetAll?Parameterid=${parameterId}&UserId=${UserId}&status=${
            toggleActive ? "1" : "0"
          }`
      ),
    })
      .then((response) => {
        console.log("response", response.data.data);
        setAllParameterValue(response.data.data);
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

  const addCountry = () => {
    let data;
    if (code === "") {
      alert(" Please enter code!");
    } else if (name === "") {
      alert(" Please enter name!");
    } else {
      data = {
        userId: UserId,
        pv_parameterid: parameterId,
        pv_parametervalue: name,
        pv_code: code,
        pv_parametername: parameterNamee,
        pv_isactive: active === true ? "1" : "0",
      };
      if (parameterValueId !== null && parameterValueId !== "") {
        data.pv_id = parameterValueId;
      }
      axios({
        method: "post",
        url: new URL(UrlData + `ParameterValueMaster`),
        data: data,
      })
        .then((response) => {
          console.log(response, "add parameter value master");
          if (parameterValueId !== null && parameterValueId !== "") {
            alert("Parameter value updated successfully!");
          } else {
            alert("Parameter value added successfully!");
          }
          getAllData();
          setCode("");
          setName("");
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

  const GetParameterValue = (pvId) => {
    axios({
      method: "get",
      url: new URL(
        UrlData +
          `ParameterValueMaster/Get?status=1&pv_id=${pvId}&UserId=${UserId}`
      ),
    })
      .then((response) => {
        console.log(response, "get parameter value");
        setCode(response.data.data.pv_code);
        setName(response.data.data.pv_parametervalue);
        setParameterName(response.data.data.pv_parametername);
        setParameterValueId(response.data.data.pv_id);
        handleShow(); // Show modal for editing
      })
      .catch((error) => {
        // console.log(error);
        let errors = ErrorHandler(error);
        alert(errors);
      });
  };

  const DeleteParameterValue = (pvId) => {
    const data = {
      userId: UserId,
      pv_id: pvId,
    };
    axios({
      method: "post",
      url: new URL(UrlData + `ParameterValueMaster/Delete`),
      data: data,
    })
      .then((response) => {
        console.log("response", response);
        alert("Parameter value deleted successfully!");
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
      const filteredData = allParameterValue.filter(
        (parameterValue) =>
          parameterValue.pv_parametername.toLowerCase().includes(searchDataValue) ||
          parameterValue.pv_code.toLowerCase().includes(searchDataValue) ||
          parameterValue.pv_parametervalue.toLowerCase().includes(searchDataValue)
          
      );
      setAllParameterValue(filteredData);
      setCurrentPage(1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allParameterValue.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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
                    <h4 className="card-title fw-bold">
                      Parameter Value Master
                    </h4>
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
                          setCode("");
                          setName("");
                          setParameterValueId("");
                          handleShow();
                        }}
                        style={{ backgroundColor: "#1B5A90" }}
                      >
                        <Add />
                      </Button>
                      <Button
                        // onClick={handleShow}
                        className="mx-2"
                        onClick={() => {
                          navigate(-1);
                        }}
                        style={{ backgroundColor: "#1B5A90" }}
                      >
                        <ArrowBack />
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
                        Code
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Name
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
                    {allParameterValue &&
                      currentItems.map((data, index) => {
                        return (
                          <tr key={data.pv_id}>
                            <td>
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td>{data.pv_code}</td>
                            <td type="button">{data.pv_parametername}</td>
                            <td>{data.pv_parametervalue}</td>
                            <td>{data.pv_isactive}</td>
                            <td>
                              <Edit
                                className="text-success mr-2"
                                type="button"
                                // data-bs-toggle="modal"
                                // data-bs-target="#countryForm"
                                // onClick={handleShow}

                                onClick={() => {
                                  GetParameterValue(data.pv_id);
                                }}
                              />

                              <Delete
                                className="text-danger"
                                type="button"
                                style={{ marginLeft: "0.5rem" }}
                                onClick={() => DeleteParameterValue(data.pv_id)}
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
                      {Math.min(indexOfLastItem, allParameterValue.length)} of{" "}
                      {allParameterValue.length} entries
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
                          allParameterValue,
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
                                allParameterValue,
                                itemsPerPage,
                                setCurrentPage
                              )
                            }
                            disabled={
                              currentPage ===
                              Math.ceil(allParameterValue.length / itemsPerPage)
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

      <Modal show={showModal} onHide={handleClose} size="md" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="fw-bold">Add Parameter Value</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} className="mt-4 mt-lg-0">
                <Form.Group className="mb-3" controlId="code">
                  <Form.Label className="fw-bold"> Parameter Name:</Form.Label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <Form.Control
                    type="text"
                    placeholder="Enter Parameter Name"
                    value={parameterNamee}
                    onChange={(e) => setParameterName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6} className="mt-4 mt-lg-0">
                <Form.Group className="mb-3" controlId="code">
                  <Form.Label className="fw-bold"> Code:</Form.Label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <Form.Control
                    type="number"
                    placeholder="Enter Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} className="mt-4 mt-lg-0">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="fw-bold">Name:</Form.Label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
              addCountry();
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

export default ParameterValueMaster;
