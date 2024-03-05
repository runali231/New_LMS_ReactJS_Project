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

const CityMaster = () => {
  const navigate = useNavigate();
  // const {id, stateName, coId, coName} = useParams();
  const [allCity, setAllCity] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Initial value
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10); // State for dropdown value

  const {id, stateId, stateName, coId, coName } = useParams();
  const [cityName, setCityName] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [active, setActive] = useState(true);
  const [cityId, setCityId] = useState("")
  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)",
    color: "#fff",
  };

  useEffect(() => {
    getAllData();
  }, [currentPage, itemsPerPage]); // Fetch data when currentPage or itemsPerPage changes

  const getAllData = () => {
    axios({
      method: "get",
      url: new URL(
        UrlData +
        `CityMaster/GetCity?status=1&StateId=${stateId}&UserId=3fa85f64-5717-4562-b3fc-2c963f66afa6`
        //   `CityMaster/GetCity?StateId=${id}?status=1&pageSize=${itemsPerPage}&pageNumber=${currentPage}`
      ), // Include pageSize and pageNumber in the URL
    })
      .then((response) => {
        console.log("response", response.data.data);
        setAllCity(response.data.data);
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

  const GetCity = (cId) => {
    axios({
      method: "get",
      url: new URL(UrlData + `CityMaster/GetCityById?ci_id=${cId}`),
    })
      .then((response) => {
        console.log(
          response.data.data.ci_city_name,
          "designation_name"
        );
        setCityName(response.data.data.ci_city_name);
        setCityCode(response.data.data.ci_city_code);
        setCityId(cId)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

  const addCity = () => {
    let data;
    if (cityName === "" || cityCode === "") {
      alert("Please fill all the details");
    } 
    // else if (!/^[a-zA-Z\s~`!@#$%^&*()-_+=|{}[\]:;"'<>,.?/]+$/.test(cityName)) {
    //   alert(
    //     "Please enter a valid designation name (alphabetic characters only)"
    //   );
    // } 
    else {
      data = {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        ci_country_name: coName,
        ci_state_name: stateName,
        ci_country_id: coId,
        ci_state_id: stateId,
        ci_city_name: cityName,
        ci_city_code: cityCode,
        ci_isactive: "1",
      };
      if (cityId) {
        data.ci_id = cityId;
      }
      axios({
        method: "post",
        url: new URL(UrlData + `CityMaster`),
        data: data, // Make sure to stringify the data object
      })
        .then((response) => {
          console.log(response, "add city");
          alert("City added successfully");
          getAllData();
          setCityCode("")
          setCityName("")
        })
        .catch((error) => {
          console.log(error);
          alert("Something went wrong")
        });
    }
  };
  const DeleteCity = (ciId) => {
    const data = {
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      ci_id: ciId,
    };
    axios({
      method: "post",
      url: new URL(UrlData + `CityMaster/DeleteCity`),
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allCity.slice(indexOfFirstItem, indexOfLastItem);

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
                    <h4 className="card-title fw-bold">City Master</h4>
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
                    <div className="btn btn-add" title="Add New">
                      <button
                        className="btn btn-md text-light"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#cityForm"
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
                </div>
                <br />
                <Table striped hover responsive className="border text-left">
                  <thead>
                    <tr>
                      <th scope="col" style={headerCellStyle}>
                        Sr.No
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        City Code
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        City Name
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCity &&
                      currentItems.map((data, index) => {
                        return (
                          <tr key={data.ci_id}>
                            <td>
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td>{data.ci_city_code}</td>
                            <td>{data.ci_city_name}</td>
                            <td>
                              <Edit
                                className="text-success mr-2"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#cityForm"
                                onClick={() => GetCity(data.ci_id)}
                              />
                              <Delete
                                className="text-danger"
                                type="button"
                                style={{ marginLeft: "0.5rem" }}
                                onClick={() => DeleteCity(data.ci_id)}
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
                      {Math.min(indexOfLastItem, allCity.length)} of{" "}
                      {allCity.length} entries
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
                          allCity,
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
                                allCity,
                                itemsPerPage,
                                setCurrentPage
                              )
                            }
                            disabled={
                              currentPage ===
                              Math.ceil(allCity.length / itemsPerPage)
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
        id="cityForm"
        tabIndex="-1"
        aria-labelledby="cityFormLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="cityFormLabel">
                City Master
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
                        City Code:
                      </label>
                      <input
                        type="number"
                        id="cityCode"
                        name="cityCode"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter City Code"
                        value={cityCode}
                        onChange={(e) => setCityCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-lg-0 mt-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        City Name:
                      </label>
                      <input
                        type="text"
                        id="cityName"
                        name="cityName"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter City Name"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
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
                      addCity();
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

export default CityMaster;
