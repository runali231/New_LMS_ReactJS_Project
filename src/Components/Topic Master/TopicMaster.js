import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Add, Delete, Edit } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UrlData from "../UrlData";
import { handlePageClick, handlePrevious, handleNext, calculatePaginationRange } from "../PaginationUtils";

const TopicMaster = () => {
  const navigate = useNavigate();
  const [allTopics, setAllTopics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)", // Replace with your desired background color
    color: "#fff", // Optional: Set the text color to contrast with the background
  };

  useEffect(() => {
    getAllData();
  }, [currentPage]);

  const getAllData = () => {
    axios
      .get(new URL(UrlData +`TopicMaster/GetAllTopics?t_isactive=1`))
      .then((response) => {
        console.log("response", response.data.data);
        setAllTopics(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetTopics = (tId) => {
    navigate(`/addTopic/${tId}`);
  };

  const DeleteTopics = (tId) => {
    const data = {
      t_id: tId,
    };
    axios
      .post(new URL(UrlData +`TopicMaster/DeleteTopics`), data)
      .then((response) => {
        console.log("delete topics", response);
        alert("Topic deleted successfully!")
        getAllData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allTopics.slice(indexOfFirstItem, indexOfLastItem);

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
                    <h4 className="card-title fw-bold">Topic Master</h4>
                  </div>
                  <div className="col-auto d-flex flex-wrap">
                    <div
                      className="btn btn-add"
                      title="Add New"
                      onClick={() => {
                        navigate("/addTopic");
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
                <Table striped hover responsive className="border text-left">
                  <thead>
                    <tr>
                      <th scope="col" style={headerCellStyle}>
                        Sr No
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Training Topic Code
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Description
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Department
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Training Type
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Training Duration
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems && currentItems.map((data, index) => (
                      <tr key={data.t_id}>
                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td>{data.t_code}</td>
                        <td>{data.t_description}</td>
                        <td>{data.t_department}</td>
                        <td>{data.t_trainingtype}</td>
                        <td>{data.t_duration}</td>
                        <td>
                          <Edit
                            className="text-success mr-2"
                            type="button"
                            onClick={() => GetTopics(data.t_id)}
                          />
                          <Delete
                            className="text-danger"
                            type="button"
                            style={{ marginLeft: "0.5rem" }}
                            onClick={() => DeleteTopics(data.t_id)}
                          />
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
                      {Math.min(indexOfLastItem, allTopics.length)} of{" "}
                      {allTopics.length} entries
                    </h6>
                  </div>
                  <div className="col-lg-4 col-12"></div>
                  <div className="col-lg-4 col-12 mt-3 mt-lg-0">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination justify-content-center justify-content-lg-end">
                        <li className="page-item">
                          <button className="page-link"
                            onClick={() => handlePrevious(currentPage, setCurrentPage)}
                            disabled={currentPage === 1}
                            aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                          </button>
                        </li>
                        {calculatePaginationRange(currentPage, allTopics, itemsPerPage).map((number) =>
                          <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
                            <button className="page-link" onClick={() => handlePageClick(number, setCurrentPage)}>{number}</button>
                          </li>
                        )}
                        <li className="page-item">
                          <button className="page-link"
                            onClick={() => handleNext(currentPage, allTopics, itemsPerPage, setCurrentPage)}
                            disabled={currentPage === Math.ceil(allTopics.length / itemsPerPage)}
                            aria-label="Next">
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

export default TopicMaster;
