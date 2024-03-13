// DepartmentMaster.jsx
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Add, Delete, Edit } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  handlePageClick,
  handlePrevious,
  handleNext,
  calculatePaginationRange,
} from "../PaginationUtils";
import UrlData from "../UrlData";
import UserId from "../UserId";

const DepartmentMaster = () => {
  const navigate = useNavigate();
  const [allDepartment, setAllDepartment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)",
    color: "#fff",
  };

  useEffect(() => {
    getAllData();
  }, [currentPage]);

  const getAllData = () => {
    axios({
      method: "get",
      url: new URL(UrlData + `DepartmentMaster/GetAll?status=1`),
    })
      .then((response) => {
        console.log("response", response.data.data);
        setAllDepartment(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetDepartment = (dId) => {
    axios({
      method: "get",
      url: new URL(UrlData + `DepartmentMaster/Get?status=1&d_id=${dId}`),
    })
      .then((response) => {
        console.log("response", response);
        console.log(dId, "dId");
        navigate(`/addDepartment/${dId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeleteDepartment = (dId) => {
    const data = {
      userId: UserId,
      d_id: dId,
    };
    axios({
      method: "post",
      url: new URL(UrlData + `DepartmentMaster/Delete`),
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
  const currentItems = allDepartment.slice(indexOfFirstItem, indexOfLastItem);

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
                    <h4 className="card-title fw-bold">Department Master</h4>
                  </div>
                  <div className="col-auto d-flex flex-wrap">
                    <div
                      className="btn btn-add"
                      title="Add New"
                      onClick={() => {
                        // navigate("/addDepartment/:id");
                        navigate("/addDepartment");
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
                        Sr.No
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Department Code
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Department Name
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Department Head
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allDepartment &&
                      currentItems.map((data, index) => {
                        return (
                          <tr key={data.d_id}>
                            <td>
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td>{data.d_department_code}</td>
                            <td>{data.d_department_name}</td>
                            <td>{data.d_head}</td>
                            <td>
                              <Edit
                                className="text-success mr-2"
                                type="button"
                                onClick={() => GetDepartment(data.d_id)}
                              />
                              <Delete
                                className="text-danger"
                                type="button"
                                style={{ marginLeft: "0.5rem" }}
                                onClick={() => DeleteDepartment(data.d_id)}
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
                      {Math.min(indexOfLastItem, allDepartment.length)} of{" "}
                      {allDepartment.length} entries
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
                          allDepartment,
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
                                allDepartment,
                                itemsPerPage,
                                setCurrentPage
                              )
                            }
                            disabled={
                              currentPage ===
                              Math.ceil(allDepartment.length / itemsPerPage)
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

export default DepartmentMaster;
