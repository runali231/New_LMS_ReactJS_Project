import React,{useState, useEffect} from "react";
import { Table } from "react-bootstrap";
import { Add, Delete, Edit } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UrlData from "../UrlData";
import { handlePageClick, handlePrevious, handleNext, calculatePaginationRange } from "../PaginationUtils";

const EmployeeMaster = () => {
  const navigate = useNavigate();
  const [allEmployee, setAllEmployee] = useState([])
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
      .get(new URL(UrlData +`EmployeeMaster/GetAll?status=1`))
      .then((response) => {
        console.log("response", response.data.data);
        setAllEmployee(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetEmployee = (emp_Id) => {
    navigate(`/addEmployee/${emp_Id}`);
  };

  const DeleteEmployee = (emp_Id) => {
    const data = {
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      emp_id: emp_Id
    };
    axios
      .post(new URL(UrlData +`EmployeeMaster/Delete`), data)
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
  const currentItems = allEmployee.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="container-fluid">
        <div
          className="card m-3"
          style={{ boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="row">
            <div className="col-lg-12">
              <div
                className="card-header" /* style={{ backgroundColor: 'white' }} */
              >
                <div className="row align-items-center">
                  <div className="col">
                    <h4 className="card-title fw-bold">Employee Master</h4>
                  </div>
                  <div className="col-md-2  justify-content-end d-none">
                    <input
                      type="text"
                      id="custom-search"
                      className="form-control"
                      placeholder="Search"
                    />
                  </div>
                  <div className="col-auto d-flex flex-wrap">
                    <div
                      className="btn btn-add"
                      title="Add New"
                      onClick={() => {
                        // navigate("/addEmployee/:id");
                        navigate("/addEmployee");
                      }}
                    >
                      <button
                        className="btn btn-md text-light"
                        type="button"
                        // data-bs-toggle="modal"
                        // data-bs-target="#exampleModal1"
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
                      className="form-select w-auto"
                      aria-label="Default select example"
                    >
                      <option defaultValue>10</option>
                      <option value="1">10</option>
                      <option value="2">50</option>
                      <option value="3">100</option>
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
                        Id
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Emp Code
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Full Name
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Title
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Designation
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Department
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        City
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Mobile No
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Office No
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Email Id
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-left">
                  {allEmployee && currentItems.map((data, index) => (
                      <tr key={data.emp_id}>
                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td>{data.emp_code}</td>
                        <td>{data.emp_fname +" " + data.emp_mname + " " + data.emp_lname}</td>
                        <td>{data.emp_job_title}</td>
                        <td>{data.emp_des}</td>
                        <td>{data.emp_dep}</td>
                        <td>{data.emp_city}</td>
                        <td>{data.emp_mob_no}</td>
                        <td>{data.emp_off_no}</td>
                        <td>{data.emp_email}</td>
                        <td>
                          <Edit
                            className="text-success mr-2"
                            onClick={() => GetEmployee(data.emp_id)}
                          />
                          <Delete
                            className="text-danger"
                            style={{ marginLeft: "0.5rem" }}
                            onClick={() => DeleteEmployee(data.emp_id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="row mt-4 mt-xl-3">
                  <div className="col-lg-4 col-12 ">
                    <h6 className="text-lg-start text-center"> Showing {indexOfFirstItem + 1} to{" "}
                      {Math.min(indexOfLastItem, allEmployee.length)} of{" "}
                      {allEmployee.length} entries</h6>
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
                        {calculatePaginationRange(currentPage, allEmployee, itemsPerPage).map((number) =>
                          <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
                            <button className="page-link" onClick={() => handlePageClick(number, setCurrentPage)}>{number}</button>
                          </li>
                        )}
                        <li className="page-item">
                          <button className="page-link"
                            onClick={() => handleNext(currentPage, allEmployee, itemsPerPage, setCurrentPage)}
                            disabled={currentPage === Math.ceil(allEmployee.length / itemsPerPage)}
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

export default EmployeeMaster;
