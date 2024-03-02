import React, { useEffect } from "react";
import $ from "jquery";
import { Back, BackspaceReverse, Eye } from "react-bootstrap-icons";
import { Table, Button } from "react-bootstrap";
import { Add, ArrowBack, Delete, Description, Edit } from "@material-ui/icons";
import { NavLink, useNavigate } from "react-router-dom";

const TrainingFeedback1 = () => {
    const navigate = useNavigate();
    const headerCellStyle = {
        backgroundColor: "rgb(27, 90, 144)", // Replace with desired background color
        color: "#fff", // Optional: Set the text color to contrast with the background
    };

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
                                        <h4 className="card-title">Training Feedback</h4>
                                    </div>
                                   
                                    <div className="col-auto d-flex flex-wrap">
                                       
                                        <div
                                            className="btn btn-add"
                                            title="Add New"
                                            onClick={() => { }}
                                        >
                                            <button
                                                className="btn btn-md text-light"
                                                type="button"
                                                style={{ backgroundColor: "#1B5A90" }}
                                            >
                                                <ArrowBack /> Back
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pt-3">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 ">
                                        <div className="form-group form-group-sm">
                                            <label className="control-label fw-bold">
                                                Faculty Name:

                                            </label>
                                            <input
                                            type="text"
                                            id="custom-search"
                                            className="form-control "
                                            placeholder="Faculty Name"
                                        />
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                                        <div className="form-group form-group-sm">
                                            <label className="control-label fw-bold">
                                                Training Title:

                                            </label>

                                            <input
                                            type="text"
                                            id="custom-search"
                                            className="form-control "
                                            placeholder="Training Title"
                                        />
                                        </div>
                                    </div>
                                   

                                </div>
                                <div className="row mt-4">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 ">
                                        <div className="form-group form-group-sm">
                                            <label className="control-label fw-bold">
                                                Training Type:

                                            </label>
                                            <input
                                            type="text"
                                            id="custom-search"
                                            className="form-control "
                                            placeholder="Enter Training Type"
                                        />
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                                        <div className="form-group form-group-sm">
                                            <label className="control-label fw-bold">
                                                Training Requested By:

                                            </label>

                                            <input
                                            type="text"
                                            id="custom-search"
                                            className="form-control "
                                            placeholder="Enter Training Requested By"
                                        />
                                        </div>
                                    </div>
                                   

                                </div>
                                <div className="row mt-4">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 ">
                                        <div className="form-group form-group-sm">
                                            <label className="control-label fw-bold">
                                                Date of Training From:

                                            </label>
                                            <input
                                            type="date"
                                            id="custom-search"
                                            className="form-control "
                                            placeholder="Faculty Name"
                                        />
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                                        <div className="form-group form-group-sm">
                                            <label className="control-label fw-bold">
                                                Date of Training To:

                                            </label>

                                            <input
                                            type="date"
                                            id="custom-search"
                                            className="form-control "
                                            placeholder="Training Title"
                                        />
                                        </div>
                                    </div>
                                   

                                </div>
                                <div className="row mt-4">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 ">
                                        <div className="form-group form-group-sm">
                                            <label className="control-label fw-bold">
                                                Time of Training From:

                                            </label>
                                            <input
                                            type="time"
                                            id="custom-search"
                                            className="form-control "
                                            placeholder="Faculty Name"
                                        />
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                                        <div className="form-group form-group-sm">
                                            <label className="control-label fw-bold">
                                                Time of Training To:

                                            </label>

                                            <input
                                            type="time"
                                            id="custom-search"
                                            className="form-control "
                                            placeholder="Training Title"
                                        />
                                        </div>
                                    </div>
                                   

                                </div>
                                <div className="row mt-4">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 ">
                                        <div className="form-group form-group-sm">
                                            <label className="control-label fw-bold">
                                                Employee Code:

                                            </label>
                                            <input
                                            type="text"
                                            id="custom-search"
                                            className="form-control "
                                            placeholder="Enter Employee Code"
                                        />
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                                        <div className="form-group form-group-sm">
                                            <label className="control-label fw-bold">
                                                Employee Name:

                                            </label>

                                            <input
                                            type="time"
                                            id="custom-search"
                                            className="form-control "
                                            placeholder="Enter Employee Name"
                                        />
                                        </div>
                                    </div>
                                   

                                </div>
                                <div className="row mt-4">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 ">
                                        <div className="form-group form-group-sm">
                                            <label className="control-label fw-bold">
                                                Training Attended:

                                            </label>
                                            <input
                                            type="text"
                                            id="custom-search"
                                            className="form-control "
                                            placeholder="Enter Training Attended"
                                        />
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                                        <div className="form-group form-group-sm">
                                            <label className="control-label fw-bold">
                                                Designation:
                                            </label>
                                            <input
                                            type="time"
                                            id="custom-search"
                                            className="form-control "
                                            placeholder="Enter Designation"
                                        />
                                        </div>
                                    </div>                                
                                </div>
                                <div className="row mt-4">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                                        <div className="form-group form-group-sm">
                                            <label className="control-label fw-bold">
                                               Feedback No:

                                            </label>
                                            <input
                                            type="number"
                                            id="custom-search"
                                            className="form-control "
                                            placeholder="Enter Feedback No"
                                        />
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                                        <div className="form-group form-group-sm">
                                            <label className="control-label fw-bold">
                                                Feedback Date:

                                            </label>
                                            <input
                                            type="date"
                                            id="custom-search"
                                            className="form-control "
                                            placeholder="Search"
                                        />
                                        </div>
                                    </div>
                                  
                                </div>
                                <div className="row mt-4">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                                        <div className="form-group form-group-sm">
                                            <label className="control-label fw-bold">
                                               Training Feedback:

                                            </label>
                                            <br/>
                                            <input
                                            type="file"
                                            id="custom-search"
                                            className="mt-3"
                                            placeholder="Feedback No"
                                        />
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                                        <div className="form-group form-group-sm">
                                            <label className="control-label fw-bold">
                                                Trainer Feedback:

                                            </label>
                                            <br/>
                                            <input
                                            type="file"
                                            id="custom-search"
                                            className="mt-3"
                                            placeholder="Search"
                                        />
                                        </div>
                                    </div>
                                  
                                </div>
                                <div className="row mt-4">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                                        <div className="form-group form-group-sm">
                                            <label className="control-label fw-bold">
                                               Feedback Given By:

                                            </label>
                                            <input
                                            type="text"
                                            id="custom-search"
                                            className="form-control "
                                            placeholder="Enter Feedback given by"
                                        />
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                                        <div className="form-group form-group-sm">
                                            <label className="control-label fw-bold">
                                               Score:

                                            </label>
                                            <input
                                            type="text"
                                            id="custom-search"
                                            className="form-control "
                                            placeholder="Enter Score"
                                        />
                                        </div>
                                    </div>
                                </div>
                            
                                <br />

                            </div>
                            <div className="card-footer">
                            <div className="row">
                  <div className="col-lg-12 text-end">
                  <button
                        className="btn btn-md text-light"
                        type="button"
                        style={{ backgroundColor: "#1B5A90" }}
                      >
                        Save
                      </button>
                  </div>
                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                   
                  </div>
                  <div className="col-md-2  justify-content-end">
                    <input
                      type="text"
                      id="custom-search"
                      className="form-control "
                      placeholder="Search"
                    />
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
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal1"
                        style={{ backgroundColor: "#1B5A90" }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body pt-3">
                <div className="row ">
                  <div className="col-lg-3 d-flex">
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

                <Table striped hover responsive className="border ">
                  <thead>
                    <tr>
                      <th scope="col" style={headerCellStyle}>
                        Sr.No
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Training No
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Training Type
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Training requested by
                      </th>   
                      <th scope="col" style={headerCellStyle}>
                        Date of training from
                      </th> 
                      <th scope="col" style={headerCellStyle}>
                      Time of training from
                      </th> 
                      <th scope="col" style={headerCellStyle}>
                        Date of training to
                      </th> 
                      <th scope="col" style={headerCellStyle}>
                      Time of training to
                      </th>  
                      <th scope="col" style={headerCellStyle}>
                      Employee Code
                      </th>  
                      <th scope="col" style={headerCellStyle}>
                      Employee Name
                      </th>
                      <th scope="col" style={headerCellStyle}>
                      Training attended
                      </th>  
                      <th scope="col" style={headerCellStyle}>
                     Designation
                      </th>  
                      <th scope="col" style={headerCellStyle}>
                      Feedback
                      </th>  
                      <th scope="col" style={headerCellStyle}>
                      Score
                      </th>                     
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>12</td>
                      <td>Online</td>
                      <td>xyz</td>
                      <td>1/5/2024</td>
                     <td>1/5/2024</td>
                     <td>1/5/2024</td>
                      <td>1/5/2024</td>
                      <td>123</td>
                      <td>xyz</td> 
                     <td>yes</td>
                     <td>developer</td>
                     <td>Enterable</td>
                     <td>1 to 5</td>
                    </tr>
                    <tr>
                    <td>2</td>
                      <td>12</td>
                      <td>Online</td>
                      <td>xyz</td>
                      <td>1/5/2024</td>
                     <td>1/5/2024</td>
                     <td>1/5/2024</td>
                      <td>1/5/2024</td>
                      <td>123</td>
                      <td>xyz</td> 
                     <td>yes</td>
                     <td>developer</td>
                     <td>Enterable</td>
                     <td>1 to 5</td>
                    </tr>
                    <tr>
                    
                    <td>3</td>
                      <td>12</td>
                      <td>Online</td>
                      <td>xyz</td>
                      <td>1/5/2024</td>
                     <td>1/5/2024</td>
                     <td>1/5/2024</td>
                      <td>1/5/2024</td>
                      <td>123</td>
                      <td>xyz</td> 
                     <td>yes</td>
                     <td>developer</td>
                     <td>Enterable</td>
                     <td>1 to 5</td>
                    </tr>
                  </tbody>
                </Table>
                <div className="row">
                  <div className="col-lg-4">
                    <h6>Showing 1 to 3 of 3 entries</h6>
                  </div>
                  <div className="col-lg-4"></div>
                  <div className="col-lg-4">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination justify-content-end">
                        <li className="page-item">
                          <button
                            className="page-link"
                            /* onClick={handlePrevious} */ aria-label="Previous"
                          >
                            <span aria-hidden="true">&laquo;</span>
                          </button>
                        </li>
                        <li className="page-item active">
                          <button
                            className="page-link" /* onClick={handlePageClick(1)} */
                          >
                            1
                          </button>
                        </li>
                        <li className="page-item">
                          <button
                            className="page-link" /* onClick={handlePageClick(2)} */
                          >
                            2
                          </button>
                        </li>
                        <li className="page-item">
                          <button
                            className="page-link" /* onClick={handlePageClick(3)} */
                          >
                            3
                          </button>
                        </li>
                        <li className="page-item">
                          <button
                            className="page-link"
                            /* onClick={handleNext} */ aria-label="Next"
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

export default TrainingFeedback1;
