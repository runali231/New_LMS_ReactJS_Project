import React from "react";
import { Table } from "react-bootstrap";
import { Add, Delete, Edit } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

const TrainingFeedback = () => {
  const navigate = useNavigate();
  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)", // Replace with desired background color
    color: "#fff", // Optional: Set the text color to contrast with the background
  };

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
                    <h4 className="card-title fw-bold">Training Feedback</h4>
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
                        navigate("/addTrainingFeedback");
                      }}
                    >
                      <button
                        className="btn btn-md text-light"
                        type="button"
                        style={{ backgroundColor: "#1B5A90" }}
                      >
                        <Add/>
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

                <Table striped hover responsive className="border text-center">
                  <thead>
                    <tr>
                      <th scope="col" style={headerCellStyle}>
                        Sr.No
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Feedback No
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Training Title
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Faculty Name
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Feedback Date
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Feedback Given By
                      </th>
                      <th
                        scope="col" style={headerCellStyle}
                        className="fw-bold" /* style={headerCellStyle} */
                      >
                       Action
                      </th> 
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>12</td>
                      <td>IT Training</td>
                      <td>xyz</td>
                      <td>1/5/2024</td>
                      <td>abc</td>  
                      <td>
                        <Edit className="text-success mr-2" type="button" />
                        <Delete className="text-danger" type="button" style={{ marginLeft: "0.5rem" }}/>
                      </td>                    
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>12</td>
                      <td>IT Training</td>
                      <td>xyz</td>
                      <td>1/5/2024</td>
                      <td>abc</td>   
                      <td>
                        <Edit className="text-success mr-2" type="button" />
                        <Delete className="text-danger" type="button" style={{ marginLeft: "0.5rem" }}/>
                      </td>                   
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>12</td>
                      <td>IT Training</td>
                      <td>xyz</td>
                      <td>1/5/2024</td>
                      <td>abc</td>  
                      <td>
                        <Edit className="text-success mr-2" type="button" />
                        <Delete className="text-danger" type="button" style={{ marginLeft: "0.5rem" }}/>
                      </td>                    
                    </tr>
                  </tbody>
                </Table>
                <div className="row mt-4 mt-xl-3">
                  <div className="col-lg-4 col-12 ">
                    <h6 className="text-lg-start text-center">Showing 1 to 3 of 3 entries</h6>
                  </div>
                  <div className="col-lg-4 col-12"></div>
                  <div className="col-lg-4 col-12 mt-3 mt-lg-0">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination justify-content-lg-end justify-content-center">
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

export default TrainingFeedback;
