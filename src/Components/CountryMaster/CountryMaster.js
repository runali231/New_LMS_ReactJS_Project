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

const CountryMaster = () => {
  const navigate = useNavigate();
  const [allCountry, setAllCountry] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);

  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [active, setActive] = useState(true);
  const [toggleActive, setToggleActive] = useState(true);
  const [countryId, setCountryId] = useState("");
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
          `CountryMaster/GetAll?status=${
            toggleActive ? "1" : "0"
          }&pageSize=${itemsPerPage}&pageNumber=${currentPage}`
      ),
    })
      .then((response) => {
        console.log("response", response.data.data);
        setAllCountry(response.data.data);
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
    if (countryCode === "") {
      alert(" Please enter country code!");
    } else if (countryName === "") {
      alert(" Please enter country name!");
    } else {
      data = {
        userId: UserId,
        co_country_name: countryName,
        co_country_code: countryCode,
        co_isactive: active === true ? "1" : "0",
      };
      if (countryId !== null && countryId !== "") {
        data.co_id = countryId;
      }
      axios({
        method: "post",
        url: new URL(UrlData + `CountryMaster`),
        data: data,
      })
        .then((response) => {
          console.log(response, "add Country");
          if (countryId !== null && countryId !== "") {
            alert("Country updated successfully!");
          } else {
            alert("Country added successfully!");
          }
          getAllData();
          setCountryCode("");
          setCountryName("");
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

  const GetCountry = (coId) => {
    axios({
      method: "get",
      url: new URL(UrlData + `CountryMaster/Get?status=1&co_id=${coId}`),
    })
      .then((response) => {
        console.log(response.data.data, "get country");
        setCountryName(response.data.data.co_country_name);
        setCountryCode(response.data.data.co_country_code);
        setCountryId(response.data.data.co_id);
        handleShow(); // Show modal for editing
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeleteCity = (coId) => {
    const data = {
      userId: UserId,
      co_id: coId,
    };
    axios({
      method: "post",
      url: new URL(UrlData + `CountryMaster/Delete`),
      data: data,
    })
      .then((response) => {
        console.log("response", response);
        alert("Country deleted successfully!");
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
      const filteredData = allCountry.filter(
        (country) =>
          country.co_country_name.toLowerCase().includes(searchDataValue) ||
          country.co_country_code.toLowerCase().includes(searchDataValue)
      );
      setAllCountry(filteredData);
      setCurrentPage(1);
    }
  };

  const handleCountryNameClick = (coId, countryName) => {
    console.log("Clicked on country:", countryName);
    navigate(`/stateMaster/${coId}/${encodeURIComponent(countryName)}`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allCountry.slice(indexOfFirstItem, indexOfLastItem);

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
                    <h4 className="card-title fw-bold">Country Master</h4>
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
                          setCountryCode("");
                          setCountryName("");
                          setCountryId("");
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
                        Country Code
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Country Name
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
                    {allCountry.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center">
                          Data not available
                        </td>
                      </tr>
                    ) : (
                      allCountry &&
                      currentItems.map((data, index) => {
                        return (
                          <tr key={data.co_id}>
                            <td>
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td>{data.co_country_code}</td>
                            <td
                              type="button"
                              onClick={() =>
                                handleCountryNameClick(
                                  data.co_id,
                                  data.co_country_name
                                )
                              }
                            >
                              {data.co_country_name}
                            </td>
                            <td>{data.co_isactive}</td>
                            <td>
                              <Edit
                                className="text-success mr-2"
                                type="button"
                                // data-bs-toggle="modal"
                                // data-bs-target="#countryForm"
                                // onClick={handleShow}

                                onClick={() => {
                                  GetCountry(data.co_id);
                                }}
                              />

                              <Delete
                                className="text-danger"
                                type="button"
                                style={{ marginLeft: "0.5rem" }}
                                onClick={() => DeleteCity(data.co_id)}
                              />
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </Table>
                <div className="row mt-4 mt-xl-3">
                  <div className="col-lg-4 col-12 ">
                    <h6 className="text-lg-start text-center">
                      Showing {indexOfFirstItem + 1} to{" "}
                      {Math.min(indexOfLastItem, allCountry.length)} of{" "}
                      {allCountry.length} entries
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
                          allCountry,
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
                                allCountry,
                                itemsPerPage,
                                setCurrentPage
                              )
                            }
                            disabled={
                              currentPage ===
                              Math.ceil(allCountry.length / itemsPerPage)
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
            <h5 className="fw-bold">Add Country</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6} className="mt-2 mt-lg-0">
                <Form.Group className="mb-3" controlId="countryCode">
                  <Form.Label className="fw-bold">Country Code:</Form.Label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <Form.Control
                    type="number"
                    placeholder="Enter Country Code"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} className="mt-2 mt-lg-0">
                <Form.Group className="mb-3" controlId="countryName">
                  <Form.Label className="fw-bold">Country Name:</Form.Label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <Form.Control
                    type="text"
                    placeholder="Enter Country Name"
                    value={countryName}
                    onChange={(e) => setCountryName(e.target.value)}
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

export default CountryMaster;
