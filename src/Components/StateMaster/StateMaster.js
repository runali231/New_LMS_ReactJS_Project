import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form, Col, Row } from "react-bootstrap";
import { Add, ArrowBack, Delete, Edit } from "@material-ui/icons";
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

const StateMaster = () => {
  const navigate = useNavigate();
  // const { id, countryName  } = useParams();
  const [searchData, setSearchData] = useState("")
  const [allState, setAllState] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Initial value
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10);
  const { id, countryId, countryName } = useParams();
  const [stateName, setStateName] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [active, setActive] = useState(true);
  const [toggleActive, setToggleActive] = useState(true);
  const [stateId, setStateId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  // State for dropdown value
  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)",
    color: "#fff",
  };

  useEffect(() => {
    getAllData();
  }, [currentPage, itemsPerPage, toggleActive]); // Fetch data when currentPage or itemsPerPage changes

  const getAllData = () => {
    axios({
      method: "get",
      url: new URL(
        UrlData +
          `StateMaster/GetStateMasterByCoId?CountryId=${countryId}&UserId=3fa85f64-5717-4562-b3fc-2c963f66afa6&status=${toggleActive ? "1" : "0"}`
      ), // Include pageSize and pageNumber in the URL
    })
      .then((response) => {
        console.log("response all state", response.data.data);
        setAllState(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setSelectedItemsPerPage(parseInt(e.target.value)); // Update selectedItemsPerPage state
    setItemsPerPage(parseInt(e.target.value)); // Update itemsPerPage state
    setCurrentPage(1); // Reset currentPage to 1 when changing items per page
  };

  //   const GetState = (sId, countryId, countryName) => {
  //     navigate(`/addStateMaster/${sId}/${countryId}/${encodeURIComponent(countryName)}`);
  //   };
  const GetState = (sId) => {
    axios({
      method: "get",
      url: new URL(UrlData + `StateMaster/GetStateById?status=1&s_id=${sId}`),
    })
      .then((response) => {
        console.log(response.data.data.s_state_name, "state_name");
        setStateName(response.data.data.s_state_name);
        setStateCode(response.data.data.s_state_code);
        setStateId(sId);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addState = () => {
    let data;

    if (stateCode === "") {
      alert("Please enter state code!");
    } 
    else if(stateName === ""){
      alert("Please enter state name!");
    }
    else {
      data = {
        userId: UserId,
        s_country_name: countryName,
        s_country_id: countryId,
        s_state_name: stateName,
        s_state_code: stateCode,
        s_isactive: active === true ? "1" : "0",
      };

      if (stateId) {
        data.s_id = stateId;
      }
      axios({
        method: "post",
        url: new URL(UrlData + `StateMaster`),
        data: data,
      })
        .then((response) => {
          console.log(response, "add state");
          if (stateId) {
            alert("State updated successfully!");
          } else {
            alert("State added successfully!");
          }
          getAllData();
          setStateCode("");
          setStateName("");
          handleClose();
        })
        .catch((error) => {
          console.log(error);
          // alert("Something went wrong");
          let errors = ErrorHandler(error)
          alert(errors)
        });
    }
  };

  const DeleteState = (sId) => {
    const data = {
      userId: UserId,
      s_id: sId,
    };
    axios({
      method: "post",
      url: new URL(UrlData + `StateMaster/DeleteState`),
      data: data,
    })
      .then((response) => {
        console.log("response", response);
        alert("State deleted successfully!");
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
      const filteredData = allState.filter(
        (state) =>
          state.s_state_name.toLowerCase().includes(searchDataValue) ||
          state.s_state_code.toLowerCase().includes(searchDataValue)
      );
      setAllState(filteredData);
      setCurrentPage(1);
    }
  };

  const handleStateNameClick = (coId, countryName, sId, stateName) => {
    console.log("Clicked on state:", countryName);
    navigate(`/cityMaster/${coId}/${countryName}/${sId}/${stateName}`);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allState.slice(indexOfFirstItem, indexOfLastItem);

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
                    <h4 className="card-title fw-bold">State Master</h4>
                  </div>
                  <div className="col-md-2 justify-content-end d-none">
                    <input
                      type="text"
                      id="custom-search"
                      className="form-control d-none"
                      placeholder="Search"
                    />
                  </div>
                  <div className="col-auto d-flex flex-wrap">
                  <div className="form-check form-switch mt-2 pt-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        checked={toggleActive} // Bind the checked state to the state variable
                        onChange={()=>setToggleActive(!toggleActive)}
                      />
                    </div>
                    <div className="btn btn-add" title="Add New">
                      <button
                        className="btn btn-md text-light"
                        type="button"
                        style={{ backgroundColor: "#1B5A90" }}
                        onClick={()=>{handleShow();setStateCode("");
                        setStateName("");setStateId();}}
                      >
                        <Add />
                      </button>
                    </div>
                    <div
                      className="btn btn-add"
                      title="Back"
                      onClick={() => {
                        navigate(-1)
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
                  <div className="col-lg-3 d-flex justify-content-center justify-content-lg-start">
                    <h6 className="mt-3">Show</h6>&nbsp;&nbsp;
                    <select
                    style={{ height: "35px" }}
                      className="form-select w-auto"
                      aria-label="Default select example"
                      value={selectedItemsPerPage} // Set value to selectedItemsPerPage
                      onChange={handleChange} // Handle change event
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
                        State Code
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        State Name
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
                    {
                    allState.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center">
                          Data not available
                        </td>
                      </tr>
                    ) : (
                    allState &&
                      currentItems.map((data, index) => {
                        return (
                          <tr key={data.s_id}>
                            <td>
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td>{data.s_state_code}</td>
                            <td
                              type="button"
                              onClick={() =>
                                handleStateNameClick(
                                  data.s_country_id,
                                  data.s_country_name,
                                  data.s_id,
                                  data.s_state_name
                                )
                              }
                            >
                              {data.s_state_name}
                            </td>
                            <td>{data.s_isactive}</td>
                            <td>
                              <Edit
                                className="text-success mr-2"
                                type="button"
                                // data-bs-toggle="modal"
                                // data-bs-target="#stateForm"
                                onClick={() => {GetState(data.s_id); handleShow()}}
                              />
                              <Delete
                                className="text-danger"
                                type="button"
                                style={{ marginLeft: "0.5rem" }}
                                onClick={() => DeleteState(data.s_id)}
                              />
                            </td>
                          </tr>
                        );
                      }))}
                  </tbody>
                </Table>
                <div className="row mt-4 mt-xl-3">
                  <div className="col-lg-4 col-12 ">
                    <h6 className="text-lg-start text-center">
                      Showing {indexOfFirstItem + 1} to{" "}
                      {Math.min(indexOfLastItem, allState.length)} of{" "}
                      {allState.length} entries
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
                          allState,
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
                                allState,
                                itemsPerPage,
                                setCurrentPage
                              )
                            }
                            disabled={
                              currentPage ===
                              Math.ceil(allState.length / itemsPerPage)
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
          <Modal.Title><h5 className="fw-bold">Add State</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} sm={12} md={12} lg={6} className="mt-2 mt-lg-0">
              <Form.Group className="form-group form-group-sm">
                <Form.Label className="control-label fw-bold">
                  State Code:
                </Form.Label> <span className="text-danger fw-bold">*</span>
                <Form.Control
                  type="number"
                  id="stateCode"
                  name="stateCode"
                  autoComplete="off"
                  placeholder="Enter State Code"
                  value={stateCode}
                  onChange={(e) => setStateCode(e.target.value)}
                  
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} className="mt-2 mt-lg-0">
              <Form.Group className="form-group form-group-sm">
                <Form.Label className="control-label fw-bold">
                  State Name:
                </Form.Label> <span className="text-danger fw-bold">*</span>
                <Form.Control
                  type="text"
                  id="stateName"
                  name="stateName"
                  autoComplete="off"
                  placeholder="Enter State Name"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs={12} sm={12} md={12} lg={6}>
              <Form.Group className="form-group form-group-sm">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  id="defaultCheck1"
                />
                <label className="form-check-label mx-2" htmlFor="defaultCheck1">
                  Is Active
                </label>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#1B5A90" }}
            onClick={() => {
              addState();
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

export default StateMaster;
