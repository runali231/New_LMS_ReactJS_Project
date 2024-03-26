import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Row, Col, Button } from "react-bootstrap";
import { Add, Delete, Edit } from "@material-ui/icons";
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

const DesignationMaster = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("")
  const [dsgId, setDsgId] = useState("")
  const [dsgName, setDsgName] = useState("");
  const [dsgCode, setDsgCode] = useState("");
  const [active, setActive] = useState(true);
  const [toggleActive, setToggleActive] = useState(true);
  const [allDesignation, setAllDesignation] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Initial value
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10); // State for dropdown value
  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setShowModal(true); 
    ResetForm()
    // Add any additional logic here if needed // This line might cause recursion, make sure it's intended
  };
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
          `DesignationMaster/GetAll?status=${toggleActive ? "1": "0"}&pageSize=${itemsPerPage}&pageNumber=${currentPage}`
      ), // Include pageSize and pageNumber in the URL
    })
      .then((response) => {
        console.log("response", response.data.data);
        setAllDesignation(response.data.data);
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

  const GetDesignation = (de_id) => {
        // navigate(`/addDesignation/${dId}`);
        handleShow();
        axios({
          method: "get",
          url: new URL(UrlData + `DesignationMaster/Get?status=1&de_id=${de_id}`),
        })
          .then((response) => {
            console.log(
              response.data.data.de_designation_name,
              "designation_name"
            );
            setDsgName(response.data.data.de_designation_name);
            setDsgCode(response.data.data.de_designation_code);
            setDsgId(response.data.data.de_id)
          })
          .catch((error) => {
            console.log(error);
          });
  };

  const addDesignation = () => {
    let data;
    if (dsgCode === "") {
      alert("Please enter designation code!");
    }
    else if(dsgName === "" ){
      alert("Please enter designation name!")
    }
    else if (!(/^[^\d]+$/.test(dsgName))) {
      alert(
        "Please enter a valid designation name (alphabetic characters only)"
      );
    } 
    else {
      data = {
        userId: UserId,
        de_designation_name: dsgName,
        de_designation_code: dsgCode,
        de_isactive: active === true ? "1" : "0",
        de_createddate: "2024-02-22T10:49:48.190Z",
        de_updateddate: "2024-02-22T10:49:48.190Z",
      };
      if (dsgId) {
        data.de_id = dsgId;
      }
      axios({
        method: "post",
        url: new URL(UrlData + `DesignationMaster`),
        data: data, // Make sure to stringify the data object
      })
        .then((response) => {
          console.log(response, "add designation");
          if (dsgId) {
            alert("Designation updated successfully!");
          }
          else {
            alert("Designation added successfully!");
          }

          handleClose();
          ResetForm();
          getAllData();
        })
        .catch((error) => {
          let errors = ErrorHandler(error);
          console.log(errors);
          alert(errors)
          // alert("Something went wrong")

        });
    }
  };

  const DeleteDesignation = (dId) => {
    const data = {
      userId: UserId,
      de_id: dId,
    };
    axios({
      method: "post",
      url: new URL(UrlData + `DesignationMaster/Delete`),
      data: data,
    })
      .then((response) => {
        console.log("response", response);
        alert("Designation deleted successfully!")
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
      const filteredData = allDesignation.filter(
        (designation) =>
        designation.de_designation_name.toLowerCase().includes(searchDataValue) ||
        designation.de_designation_code.toLowerCase().includes(searchDataValue)
      );
      setAllDesignation(filteredData);
    }
  };

  const ResetForm=()=>{
    setDsgCode("");
    setDsgName("");
    setDsgId("")
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allDesignation.slice(indexOfFirstItem, indexOfLastItem);

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
                    <h4 className="card-title fw-bold">Designation Master</h4>
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
                        onClick={() => {
                          // navigate("/addDesignation/:d_id");
                         handleShow();
                        }}
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
                      value={selectedItemsPerPage} // Set value to selectedItemsPerPage
                      onChange={handleChange} // Handle change event
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
                <br />
                <Table striped hover responsive className="border text-left">
                  <thead>
                    <tr>
                      <th scope="col" style={headerCellStyle}>
                        Sr.No
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Designation Code
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Designation Name
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
                    {allDesignation &&
                      currentItems.map((data, index) => {
                        return (
                          <tr key={data.de_id}>
                            <td>
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td>{data.de_designation_code}</td>
                            <td>{data.de_designation_name}</td>
                            <td>{data.de_isactive}</td>
                            <td>
                              <Edit
                                className="text-success mr-2"
                                type="button"
                                onClick={() => GetDesignation(data.de_id)}
                              />
                              <Delete
                                className="text-danger"
                                type="button"
                                style={{ marginLeft: "0.5rem" }}
                                onClick={() => DeleteDesignation(data.de_id)}
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
                      {Math.min(indexOfLastItem, allDesignation.length)} of{" "}
                      {allDesignation.length} entries
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
                          allDesignation,
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
                                allDesignation,
                                itemsPerPage,
                                setCurrentPage
                              )
                            }
                            disabled={
                              currentPage ===
                              Math.ceil(allDesignation.length / itemsPerPage)
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
            <h5 className="fw-bold">Add Designation</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6} className="mt-4 mt-lg-0">
                <Form.Group className="mb-3" controlId="designationCode">
                  <Form.Label className="fw-bold">Designation Code:</Form.Label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <Form.Control
                    type="number"
                    placeholder="Enter Designation Code"
                    value={dsgCode}
                    onChange={(e) => setDsgCode(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} className="mt-4 mt-lg-0">
                <Form.Group className="mb-3" controlId="designationName">
                  <Form.Label className="fw-bold">Designation Name:</Form.Label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <Form.Control
                    type="text"
                    placeholder="Enter Designation Name"
                    value={dsgName}
                    onChange={(e) => setDsgName(e.target.value)}
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
              addDesignation();
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

export default DesignationMaster;
