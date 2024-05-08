import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Add, Edit, Delete } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import UrlData from "../UrlData";
import axios from "axios";
import {
  handlePageClick,
  handlePrevious,
  handleNext,
  calculatePaginationRange,
} from "../PaginationUtils";
import UserId from "../UserId";

const TrainingScheduleApproval = () => {
  const navigate = useNavigate();
  const [allTrainingSchedule, setAllTrainingSchedule] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchData, setSearchData] = useState("");
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10);

  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)", // Replace with desired background color
    color: "#fff", // Optional: Set the text color to contrast with the background
  };

  useEffect(() => {
    // getAllTrainingSchedule();
    getAllApproval();
  }, []);

  const getAllTrainingSchedule = () => {
    axios
      .get(
        new URL(
          UrlData +
            `TrainingSchedule/GetAllTrainingSchedule?user_id=3fa85f64-5717-4562-b3fc-2c963f66afa6&ts_isactive=1`
        )
      )
      .then((response) => {
        console.log("get all Schedule", response.data.data);
        setAllTrainingSchedule(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const GetTrainingSchedule = (ts_Id) => {
    navigate(`/addTrainingScheduleApproval/${ts_Id}`);
  };
  const DeleteTrainingSchedule = (ts_Id) => {
    const data = {
      // userId: UserId,
      ts_id: ts_Id,
    };
    axios
      .post(new URL(UrlData + `TrainingSchedule/DeleteTrainingSchedule`), data)
      .then((response) => {
        console.log("delete topics", response);
        getAllTrainingSchedule();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getLoginId = localStorage.getItem("loginId");
  const getAllApproval = () => {
    axios
      .get(
        new URL(UrlData + `TrainingSchedule/GetAllApprove?roleid=${getLoginId}`)
      )
      .then((response) => {
        console.log("response", response.data.data, "get approval");
        setAllTrainingSchedule(response.data.data);
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
      getAllApproval();
    } else {
      // Filter data based on search input value
      const filteredData = allTrainingSchedule.filter(
        (trainingSchedule) =>
          (trainingSchedule.ts_training_no || "")
            .toLowerCase()
            .includes(searchDataValue) ||
          (trainingSchedule.ts_trainer_name || "")
            .toLowerCase()
            .includes(searchDataValue)
      );
      setAllTrainingSchedule(filteredData);
      setCurrentPage(1);
    }
  };

  const handleChange = (e) => {
    setSelectedItemsPerPage(parseInt(e.target.value));
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allTrainingSchedule.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <>
      <div className="container-fluid">
        <div
          className="card m-3 mt-5"
          style={{ boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="row">
            <div className="col-lg-12">
              <div
                className="card-header" /* style={{ backgroundColor: 'white' }} */
              >
                <div className="row align-items-center">
                  <div className="col">
                    <h4 className="card-title fw-bold">
                      Training Schedule Approval
                    </h4>
                  </div>
                  <div className="col-md-2  justify-content-end d-none">
                    <input
                      type="text"
                      id="custom-search"
                      className="form-control "
                      placeholder="Search"
                    />
                  </div>
                  <div className="col-auto d-flex flex-wrap">
                    {/* <div
                      className="btn btn-add"
                      title="Add New"
                      onClick={() => {
                        navigate("/addTrainingScheduleApproval");
                      }}
                    >
                      <button
                        className="btn btn-md text-light"
                        type="button"
                        style={{ backgroundColor: "#1B5A90" }}
                      >
                        <Add />
                      </button>
                    </div> */}
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
                <Table striped hover responsive className="border ">
                  <thead className="text-start">
                    <tr>
                      <th scope="col" style={headerCellStyle}>
                        Sr.No
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Training No
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Trainer Name
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Training Dept
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Training Topics
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Training Type
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Training Agency
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        No of Question in Evaluation
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Reoccurrence
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Date/Time of Training From
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Date/Time of Training To
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Status
                      </th>
                      {/* <th scope="col" style={headerCellStyle}>
                        Remark
                      </th> */}
                      {/* <th scope="col" style={headerCellStyle}>
                        Status 1
                      </th> */}
                      <th
                        scope="col"
                        style={headerCellStyle}
                        /* style={headerCellStyle} */
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-start">
                    {allTrainingSchedule &&
                      currentItems.map((data, index) => (
                        <tr key={data.ts_id}>
                          <td>
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>
                          <td>{data.ts_training_no}</td>
                          <td>{data.ts_trainer_name}</td>
                          <td>{data.ts_training_dept}</td>
                          <td>{data.ts_topic}</td>
                          <td>{data.ts_training_type}</td>
                          <td>{data.ts_training_agency}</td>
                          <td>{data.ts_no_que}</td>
                          <td>{data.ts_reoccurence}</td>
                          <td>
                            {/* {
                            new Date(data.ts_dt_tm_fromtraining)
                              .toISOString()
                              .split("T")[0]
                          } */}
                            {data.ts_dt_tm_fromtraining
                              .replace("T", " ")
                              .substring(0, 16)}
                          </td>
                          <td>
                            {/* {
                            new Date(data.ts_dt_tm_totraining)
                              .toISOString()
                              .split("T")[0]
                          } */}
                            {data.ts_dt_tm_totraining
                              .replace("T", " ")
                              .substring(0, 16)}
                          </td>
                          <td>{data.ts_status}</td>
                          {/* <td>{data.ts_remark}</td> */}
                          {/* <td>{data.ts_action}</td> */}
                          <td>
                            <Edit
                              className="text-success mr-2"
                              type="button"
                              onClick={() => GetTrainingSchedule(data.ts_id)}
                            />
                            {/* <Delete
                              className="text-danger"
                              style={{ marginLeft: "0.5rem" }}
                              onClick={() => DeleteTrainingSchedule(data.ts_id)}
                            /> */}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <div className="row mt-4 mt-xl-3">
                  <div className="col-lg-4 col-12 ">
                    <h6 className="text-lg-start text-center">
                      Showing {indexOfFirstItem + 1} to{" "}
                      {Math.min(indexOfLastItem, allTrainingSchedule.length)} of{" "}
                      {allTrainingSchedule.length} entries
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
                          allTrainingSchedule,
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
                                allTrainingSchedule,
                                itemsPerPage,
                                setCurrentPage
                              )
                            }
                            disabled={
                              currentPage ===
                              Math.ceil(
                                allTrainingSchedule.length / itemsPerPage
                              )
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

export default TrainingScheduleApproval;
