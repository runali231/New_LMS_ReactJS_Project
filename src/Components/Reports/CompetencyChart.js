import React from "react";
import { Table } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import '../Css/Site.css'
const CompetencyChart = () => {
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
                className="card-header" 
              >
                <div className="row align-items-center">
                  <div className="col">
                    <h4 className="card-title fw-bold py-2">Competency Chart</h4>
                  </div>
                  <div className="col-md-2  justify-content-end">
                    <input
                      type="text"
                      id="custom-search"
                      className="form-control d-none"
                      placeholder="Search"
                    />
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

                <Table striped hover responsive className="table-bordered table " id="dataTable" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th scope="col" className="fw-bold">
                        Sr.No
                      </th>
                      <th scope="col" className="fw-bold">
                        Training need assessment date
                      </th>
                      <th scope="col" className="fw-bold">
                        Date of training
                      </th>
                      <th scope="col" className="fw-bold">
                        Training start
                      </th> 
                      <th scope="col" className="fw-bold">
                        Training end
                      </th>  
                      <th scope="col" className="fw-bold">
                        Training hours
                      </th> 
                      <th scope="col" className="fw-bold text-center">
                        Awareness, CH, Annex, WI & FT WI/<br/>SOP, DPR/FM & SAP, Special Training
                      </th>    
                      <th scope="col" className="fw-bold">
                        Title
                      </th> 
                      <th scope="col" className="fw-bold">
                      Issue No
                      </th> 
                      <th scope="col" className="fw-bold">
                       Rev No.
                      </th>    
                      <th scope="col" className="fw-bold">
                       Rev Date
                      </th> 
                      <th scope="col" className="fw-bold">
                       Other
                      </th>   
                      <th scope="col" className="fw-bold">
                        Training Topic
                      </th>      
                      <th scope="col" className="fw-bold">
                        Training Given By
                      </th>  
                      <th scope="col" className="fw-bold">
                        Emp Code
                      </th> 
                      <th scope="col" className="fw-bold">
                        Name of Employees
                      </th> 
                      <th scope="col" className="fw-bold">
                        Designation
                      </th>  
                      <th scope="col" className="fw-bold">
                        Department
                      </th>   
                      <th scope="col" className="fw-bold">
                        Number Question in Training Evaluation
                      </th>    
                      <th scope="col" className="fw-bold">
                        Marks Obtained in Training Evaluation
                      </th> 
                      <th scope="col" className="fw-bold">
                       Result
                      </th> 
                      <th scope="col" className="fw-bold">
                        Hard Copy Location
                      </th> 
                      <th scope="col" className="fw-bold">
                      Soft Copy Location
                      </th> 
                      {/* <th
                        scope="col" 
                       
                      >
                       Action
                      </th>  */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                    <td>
                       1
                      </td>
                      <td>
                        21/3/2024
                      </td>
                      <td>
                      12/4/2024
                      </td>
                      <td>
                        9:00 
                      </td> 
                      <td>
                        5:00
                      </td>  
                      <td>
                       8
                      </td> 
                      <td>
                       xyz
                      </td>    
                      <td>
                        pqr
                      </td> 
                      <td>
                     5757
                      </td> 
                      <td>
                       232
                      </td>    
                      <td>
                       6
                      </td> 
                      <td>
                       2
                      </td>   
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>

                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      {/* <td>
                        <Edit className="text-success mr-2" type="button" />
                        <Delete className="text-danger" type="button" style={{ marginLeft: "0.5rem" }}/>
                      </td> */}
                    </tr>
                    <tr className="text-center">
                    <td>
                       1
                      </td>
                      <td>
                        21/3/2024
                      </td>
                      <td>
                      12/4/2024
                      </td>
                      <td>
                        9:00 
                      </td> 
                      <td>
                        5:00
                      </td>  
                      <td>
                       8
                      </td> 
                      <td>
                       xyz
                      </td>    
                      <td>
                        pqr
                      </td> 
                      <td>
                     5757
                      </td> 
                      <td>
                       232
                      </td>    
                      <td>
                       6
                      </td> 
                      <td>
                       2
                      </td>   
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>

                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      {/* <td>
                        <Edit className="text-success mr-2" type="button" />
                        <Delete className="text-danger" type="button" style={{ marginLeft: "0.5rem" }}/>
                      </td> */}
                    </tr>
                    <tr className="text-center">
                    <td>
                       1
                      </td>
                      <td>
                        21/3/2024
                      </td>
                      <td>
                      12/4/2024
                      </td>
                      <td>
                        9:00 
                      </td> 
                      <td>
                        5:00
                      </td>  
                      <td>
                       8
                      </td> 
                      <td>
                       xyz
                      </td>    
                      <td>
                        pqr
                      </td> 
                      <td>
                     5757
                      </td> 
                      <td>
                       232
                      </td>    
                      <td>
                       6
                      </td> 
                      <td>
                       2
                      </td>   
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>

                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      <td>
                        -
                      </td>
                      {/* <td>
                        <Edit className="text-success mr-2" type="button" />
                        <Delete className="text-danger" type="button" style={{ marginLeft: "0.5rem" }}/>
                      </td> */}
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

export default CompetencyChart;
