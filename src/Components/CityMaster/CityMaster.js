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
  const {id, stateName, coId, coName} = useParams();
  const [allCity, setAllCity] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Initial value
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10); // State for dropdown value
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
        `CityMaster/GetCity?status=1&StateId=${id}&UserId=3fa85f64-5717-4562-b3fc-2c963f66afa6`
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

  const GetCity = (cId, cName, sId, sName) => {
        navigate(`/addCityMaster/${sId}/${sName}/${cId}/${cName}/`);
  };

  const DeleteCity = (dId) => {
    const data = {
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      de_id: dId,
    };
    axios({
      method: "post",
      url: new URL(UrlData + `CityMaster/Delete`),
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
                        style={{ backgroundColor: "#1B5A90" }}
                        onClick={() => {
                          // navigate("/addCity/:d_id");
                          navigate(`/addCityMaster/${coId}/${coName}/${id}/${stateName}`);
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
                                onClick={() => GetCity(data.ci_id, data.ci_city_name, data.ci_state_id, data.ci_state_name)}
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
    </>
  );
};

export default CityMaster;
