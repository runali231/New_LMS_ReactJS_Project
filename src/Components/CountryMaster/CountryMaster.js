import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Add, Delete, Edit } from "@material-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UrlData from "../UrlData";
import {
  handlePageClick,
  handlePrevious,
  handleNext,
  calculatePaginationRange,
} from "../PaginationUtils";

const CountryMaster = () => {
  const navigate = useNavigate();
  const [allCountry, setAllCountry] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10);

  // const { id } = useParams();
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [active, setActive] = useState(true);
  const [countryId, setCountryId] = useState("");
  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)",
    color: "#fff",
  };

  useEffect(() => {
    getAllData();
  }, [currentPage, itemsPerPage]);

  const getAllData = () => {
    axios({
      method: "get",
      url: new URL(
        UrlData +
          `CountryMaster/GetAll?status=1&pageSize=${itemsPerPage}&pageNumber=${currentPage}`
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

  const addCountry = () => {
    let data;
    if (countryName === "" || countryCode === "") {
      alert("Please fill all the details");
    } else {
      data = {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        co_country_name: countryName,
        co_country_code: countryCode,
        co_isactive: "1",
      };
      if (countryId) {
        data.co_id = countryId;
      }
      axios({
        method: "post",
        url: new URL(UrlData + `CountryMaster`),
        data: data,
      })
        .then((response) => {
          console.log(response, "add Country");
          alert("Country added successfully");
          
          // navigate("/countryMaster");
          getAllData();
          setCountryCode("")
          setCountryName("")
        })
        .catch((error) => {
          console.log(error);
          alert("Something went wrong");
        });
    }
  };

  const GetCity = (coId) => {
    // navigate(`/addCountryMaster/${coId}`);
    axios({
      method: "get",
      url: new URL(UrlData + `CountryMaster/Get?status=1&co_id=${coId}`),
    })
      .then((response) => {
        console.log(response.data.data.co_country_name, "country  name");
        setCountryName(response.data.data.co_country_name);
        setCountryCode(response.data.data.co_country_code);
        setCountryId(coId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeleteCity = (coId) => {
    const data = {
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      co_id: coId,
    };
    axios({
      method: "post",
      url: new URL(UrlData + `CountryMaster/Delete`),
      data: data,
    })
      .then((response) => {
        console.log("response", response);
        getAllData();
      })
      .catch((error) => {
        console.log(error);
      });
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
                    <div className="btn btn-add" title="Add New">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#countryForm"
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
                        Country Code
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Country Name
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCountry &&
                      currentItems.map((data, index) => {
                        return (
                          <tr key={data.co_id}>
                            <td>
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td>{data.co_country_code}</td>
                            <td type="button"
                              onClick={() =>
                                handleCountryNameClick(
                                  data.co_id,
                                  data.co_country_name
                                )
                              }
                            >
                              {data.co_country_name}
                            </td>
                            <td>
                              <Edit
                                className="text-success mr-2"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#countryForm"
                                onClick={() => GetCity(data.co_id)}
                              />
                              <Delete
                                className="text-danger"
                                style={{ marginLeft: "0.5rem" }}
                                onClick={() => DeleteCity(data.co_id)}
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
      <div
        className="modal fade"
        id="countryForm"
        tabIndex="-1"
        aria-labelledby="countryFormLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="countryFormLabel">
               Country Master
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
                      Country Code:
                    </label> <span className="text-danger fw-bold">*</span>
                    <input
                      type="number"
                      id="countryCode"
                      name="countryCode"
                      className="form-control "
                      autoComplete="off"
                      placeholder="Enter Country Code"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-lg-0 mt-4">
                  <div className="form-group form-group-sm">
                    <label className="control-label fw-bold">
                      Country Name:
                    </label> <span className="text-danger fw-bold">*</span>
                    <input
                      type="text"
                      id="countryName"
                      name="countryName"
                      className="form-control "
                      autoComplete="off"
                      placeholder="Enter Country Name"
                      value={countryName}
                      onChange={(e) => setCountryName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
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

export default CountryMaster;
