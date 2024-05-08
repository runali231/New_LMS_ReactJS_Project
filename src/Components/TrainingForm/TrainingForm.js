import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Add, ArrowBack, Edit, Delete } from "@material-ui/icons";
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

const TrainingForm = () => {
  const navigate = useNavigate();
  const [allTrainingNeed, setAllTrainingNeed] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10);

  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)", // Replace with desired background color
    color: "#fff", // Optional: Set the text color to contrast with the background
  };

  const handleApprove = (trainingRequestId) => {
    console.log("Training need approved:", trainingRequestId);
  };
  const handleApproveByHOD = (trainingRequestId) => {
    console.log("Training need approved by HOD:", trainingRequestId);
  };
  useEffect(() => {
    getAllData();
  }, [currentPage, itemsPerPage]);

  const getAllData = () => {
    axios
      .get(new URL(UrlData + `TrainingForm/GetAllTrainingNeed?tr_isactive=1`))
      .then((response) => {
        console.log("response", response.data.data);
        setAllTrainingNeed(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetTrainingNeed = (tr_Id) => {
    navigate(`/addTrainingForm/${tr_Id}`);
  };

  const DeleteTrainingNeed = (tr_Id) => {
    const data = {
      // userId: UserId,
      tr_id: tr_Id,
    };
    axios
      .post(new URL(UrlData + `TrainingForm/DeleteTrainingNeed`), data)
      .then((response) => {
        console.log("delete topics", response);
        alert("Training deleted successfully!");
        getAllData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (e) => {
    const searchDataValue = (e.target.value || "").toLowerCase().trim(); // Ensure e.target.value is not null
    setSearchData(searchDataValue);

    if (!searchDataValue) {
      // If search input is empty, fetch all data
      getAllData();
    } else {
      // Filter data based on search input value
      const filteredData = allTrainingNeed.filter(
        (training) =>
          (training.tr_req_no || "").toLowerCase().includes(searchDataValue) ||
          (training.tr_nature || "").toLowerCase().includes(searchDataValue)
      );
      setAllTrainingNeed(filteredData);
      setCurrentPage(1);
    }
  };

  const handleChange = (e) => {
    setSelectedItemsPerPage(parseInt(e.target.value)); // Update selectedItemsPerPage state
    setItemsPerPage(parseInt(e.target.value)); // Update itemsPerPage state
    setCurrentPage(1); // Reset currentPage to 1 when changing items per page
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allTrainingNeed.slice(indexOfFirstItem, indexOfLastItem);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
  return (
    <>
      <div className="container-fluid">
        <div
          className="card m-3 mt-5"
          style={{ boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="row">
            <div className="col-lg-12">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h4 className="card-title fw-bold">Training Need Form</h4>
                  </div>

                  <div className="col-auto d-flex flex-wrap">
                    <div
                      className="btn btn-add"
                      title="Add"
                      onClick={() => {
                        navigate("/addTrainingForm");
                      }}
                    >
                      <button
                        className="btn btn-md text-light"
                        type="button"
                        style={{ backgroundColor: "#1B5A90" }}
                      >
                        <Add />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body pt-3">
                <div className="row ">
                  <div className="col-lg-3 d-flex justify-content-center justify-content-lg-start">
                    <h6 className="mt-3">Show</h6>&nbsp;&nbsp;
                    <select
                      style={{ height: "35px" }}
                      className="form-select w-auto"
                      aria-label="Default select example"
                     value={selectedItemsPerPage}
                            onChange={handleChange}
                    >
                      <option value={10}>10</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
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


                <Table striped hover responsive className="border text-center">
                  <thead className="text-start">
                    <tr>
                      <th scope="col" style={headerCellStyle}>
                        Sr.No
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Training required No
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Training Nature
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Training Type
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Training Request Date
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        No of Hours
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        No of Days
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Approval Status
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Remark
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-start">
                    {currentItems.map((data, index) => (
                      <tr key={data.tr_id}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>{data.tr_req_no}</td>
                        <td>{data.tr_nature}</td>
                        <td>{data.tr_type}</td>
                        <td>{formatDate(data.tr_req_date)}</td>
                        <td>{data.tr_hours}</td>
                        <td>{data.tr_days}</td>
                        <td>{data.tr_action}</td>
                        <td>{data.tr_remark}</td>
                        <td>
                          {[
                            "Approved By Hr",
                            "Approved By Hod",
                            "Rejected by Hr",
                            "Rejected by HOD",
                          ].includes(data.tr_action) ? (
                            <>
                              <Edit
                                className="text-success mr-2"
                                style={{ opacity: 0.5, pointerEvents: "none" }} // Reduce opacity and disable pointer events
                                type="button"
                                onClick={() => GetTrainingNeed(data.tr_id)}
                              />
                              <Delete
                                className="text-danger"
                                type="button"
                                style={{
                                  opacity: 0.5,
                                  marginLeft: "0.5rem",
                                  pointerEvents: "none",
                                }} // Reduce opacity and disable pointer events
                                onClick={() => DeleteTrainingNeed(data.tr_id)}
                              />
                            </>
                          ) : (
                            <>
                              <Edit
                                className="text-success mr-2"
                                type="button"
                                onClick={() => GetTrainingNeed(data.tr_id)}
                              />
                              <Delete
                                className="text-danger"
                                type="button"
                                style={{ marginLeft: "0.5rem" }}
                                onClick={() => DeleteTrainingNeed(data.tr_id)}
                              />
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="row mt-4 mt-xl-3">
                  <div className="col-lg-4 col-12 ">
                    <h6 className="text-lg-start text-center">
                      {" "}
                      Showing {indexOfFirstItem + 1} to{" "}
                      {Math.min(indexOfLastItem, allTrainingNeed.length)} of{" "}
                      {allTrainingNeed.length} entries
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
                          allTrainingNeed,
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
                                allTrainingNeed,
                                itemsPerPage,
                                setCurrentPage
                              )
                            }
                            disabled={
                              currentPage ===
                              Math.ceil(allTrainingNeed.length / itemsPerPage)
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

export default TrainingForm;
