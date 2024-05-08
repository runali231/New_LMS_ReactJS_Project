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

const KPIMaster = () => {
  const navigate = useNavigate();
  const [allKpi, setAllKpi] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchData, setSearchData] = useState("");
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10); 
  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)",
    color: "#fff",
  };

  useEffect(() => {
    getAllData();
  }, [currentPage]);

  const getAllData = () => {
    axios
      .get(new URL(UrlData + `KPIMaster/GetAll?status=1`))
      .then((response) => {
        console.log("response", response.data.data);
        setAllKpi(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetKpi = (kId) => {
    navigate(`/addKPI/${kId}`);
  };

  const DeleteKpi = (kId) => {
    const data = {
      userId: UserId,
      k_id: kId,
    };
    axios
      .post(new URL(UrlData + `KPIMaster/Delete`), data)
      .then((response) => {
        console.log("response", response);
        alert("KPI deleted successfully!");
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
      const filteredData = allKpi.filter(
        (kpi) =>
          kpi.k_emp_code.toLowerCase().includes(searchDataValue) ||
          kpi.k_emp_name.toLowerCase().includes(searchDataValue)
      );
      setAllKpi(filteredData);
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
  const currentItems = allKpi.slice(indexOfFirstItem, indexOfLastItem);

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
          className="card m-3"
          style={{ boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="row">
            <div className="col-lg-12">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h4 className="card-title fw-bold">KPI Master</h4>
                  </div>
                  <div className="col-auto d-flex flex-wrap">
                    <div
                      className="btn btn-add"
                      title="Add New"
                      // onClick={() => navigate("/addKPI/:id")}
                      onClick={() => navigate("/addKPI")}
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
                <Table striped hover responsive className="border text-left">
                  <thead>
                    <tr>
                      <th scope="col" style={headerCellStyle}>
                        Sr.No
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Employee Code
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Employee Name
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Designation
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Department
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        KPI Code
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        KPI Description
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        UOM
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Target Date
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Occurrence
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
                    {allKpi &&
                      currentItems.map((data, index) => (
                        <tr key={data.k_id}>
                          <td>
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>
                          <td>{data.k_emp_code}</td>
                          <td>{data.k_emp_name}</td>
                          <td>{data.k_designation}</td>
                          <td>{data.k_department}</td>
                          <td>{data.k_kpi_code}</td>
                          <td>{data.k_kpi_des}</td>
                          <td>{data.k_uom}</td>
                          {/* <td>{new Date(data.k_targetdate).toLocaleDateString('en-GB')} </td> */}
                          <td>{formatDate(data.k_targetdate)}</td>
                          <td>{data.k_occurance}</td>
                          <td>{data.k_isactive}</td>
                          <td>
                            <Edit
                              className="text-success mr-2"
                              type="button"
                              onClick={() => GetKpi(data.k_id)}
                            />
                            <Delete
                              className="text-danger"
                              type="button"
                              style={{ marginLeft: "0.5rem" }}
                              onClick={() => DeleteKpi(data.k_id)}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <div className="row mt-4 mt-xl-3">
                  <div className="col-lg-4 col-12">
                    <h6 className="text-lg-start text-center">
                      Showing {indexOfFirstItem + 1} to{" "}
                      {Math.min(indexOfLastItem, allKpi.length)} of{" "}
                      {allKpi.length} entries
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
                          allKpi,
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
                                allKpi,
                                itemsPerPage,
                                setCurrentPage
                              )
                            }
                            disabled={
                              currentPage ===
                              Math.ceil(allKpi.length / itemsPerPage)
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

export default KPIMaster;
