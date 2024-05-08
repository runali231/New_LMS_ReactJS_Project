import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
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

const CompetencyMaster = () => {
  const navigate = useNavigate();
  const [allCompetency, setAllCompetency] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchData, setSearchData] = useState("");
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10);
  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)", // Replace with desired background color
    color: "#fff", // Optional: Set the text color to contrast with the background
  };

  useEffect(() => {
    getAllData();
  }, [currentPage]);

  const getAllData = () => {
    axios
      .get(new URL(UrlData + `CompentencyMaster/GetAll?status=1`))
      .then((response) => {
        console.log("response", response.data.data);
        setAllCompetency(response.data.data);
      })
      .catch((error) => {
        let errors = ErrorHandler(error);
        alert(errors);
      });
  };

  const GetCompetency = (cId) => {
    navigate(`/addCompetency/${cId}`);
  };

  const DeleteCompetency = (cId) => {
    const data = {
      userId: UserId,
      cp_id: cId,
    };
    console.log("cID", cId);
    axios({
      method: "post",
      url: new URL(UrlData + `CompentencyMaster/Delete`),
      data: data,
    })
      .then((response) => {
        console.log("response", response);
        alert("Competency deleted successfully!");
        getAllData();
      })
      .catch((error) => {
        let errors = ErrorHandler(error);
        alert(errors);
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
      const filteredData = allCompetency.filter(
        (competency) =>
          competency.cp_designation.toLowerCase().includes(searchDataValue) ||
          competency.cp_qualification.toLowerCase().includes(searchDataValue) ||
          competency.cp_experiance.toLowerCase().includes(searchDataValue) ||
          competency.cp_skillreq.toLowerCase().includes(searchDataValue) ||
          // Search in the concatenated training string
          competency.cp_training
            .split(/,(?=[a-zA-Z])/)
            .some((item) => item.trim().toLowerCase().includes(searchDataValue))
      );
      setAllCompetency(filteredData);
      setCurrentPage(1); // Reset pagination to first page
    }
  };

  const handleChange = (e) => {
    setSelectedItemsPerPage(parseInt(e.target.value));
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allCompetency.slice(indexOfFirstItem, indexOfLastItem);

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
                    <h4 className="card-title fw-bold">Competency Master</h4>
                  </div>
                  <div className="col-md-2  justify-content-end d-none">
                    <input
                      type="text"
                      id="custom-search"
                      className="form-control d-none"
                      placeholder="Search"
                    />
                  </div>
                  <div className="col-auto d-flex flex-wrap">
                    <div
                      className="btn btn-add"
                      title="Add New"
                      onClick={() => {
                        // navigate("/addCompetency/:id");
                        navigate("/addCompetency");
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
                      value={selectedItemsPerPage} // Set value to selectedItemsPerPage
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

                <Table
                  striped
                  hover
                  responsive
                  className="table text-left"
                  id="dataTable"
                  width="100%"
                  cellSpacing="0"
                >
                  <thead className="text-left">
                    <tr>
                      <th scope="col" style={headerCellStyle}>
                        Sr.No
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Designation
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Minimum Educational Qualification
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Minimum Experience
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Skill Requirement
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Training
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
                    {allCompetency &&
                      currentItems.map((data, index) => {
                        return (
                          <tr className="text-left" key={data.cp_id}>
                            <td>
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td>{data.cp_designation}</td>
                            <td>{data.cp_qualification}</td>
                            <td>{data.cp_experiance}</td>
                            <td>{data.cp_skillreq}</td>
                            <td>
                              {data.cp_training
                                .split(/,(?=[a-zA-Z])/)
                                .map((item, index) => (
                                  <React.Fragment key={index}>
                                    {item.trim()}
                                    <br />
                                  </React.Fragment>
                                ))}
                            </td>
                            <td>{data.cp_isactive}</td>
                            <td>
                              <Edit
                                className="text-success mr-2"
                                type="button"
                                onClick={() => GetCompetency(data.cp_id)}
                              />
                              <Delete
                                className="text-danger"
                                type="button"
                                style={{ marginLeft: "0.5rem" }}
                                onClick={() => DeleteCompetency(data.cp_id)}
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
                      {Math.min(indexOfLastItem, allCompetency.length)} of{" "}
                      {allCompetency.length} entries
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
                          allCompetency,
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
                                allCompetency,
                                itemsPerPage,
                                setCurrentPage
                              )
                            }
                            disabled={
                              currentPage ===
                              Math.ceil(allCompetency.length / itemsPerPage)
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

export default CompetencyMaster;
