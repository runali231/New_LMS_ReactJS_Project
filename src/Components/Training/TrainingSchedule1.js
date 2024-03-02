import React from "react";
import { Table } from "react-bootstrap";
import { ArrowBack } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

const TrainingSchedule1 = () => {
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
                    <h4 className="card-title">Training Schedule</h4>
                  </div>

                  <div className="col-auto d-flex flex-wrap">
                    <div
                      className="btn btn-add"
                      title="Add New"
                      onClick={() => {}}
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
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 ">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Employee Name:
                      </label>
                      <input
                        type="text"
                        id="eName"
                        className="form-control "
                        placeholder="Enter Employee Name"
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Employee Code:
                      </label>
                      <input
                        type="text"
                        id="eCode"
                        className="form-control "
                        placeholder="Enter Employee Code"
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Designation:
                      </label>
                      <input
                        type="text"
                        id="designation"
                        className="form-control "
                        placeholder="Enter Designation"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 ">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Dept:
                      </label>
                      <input
                        type="text"
                        id="custom-search"
                        className="form-control "
                        placeholder="Training Dept"
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Trainer Name:
                      </label>

                      <input
                        type="text"
                        id="custom-search"
                        className="form-control "
                        placeholder="Trainer Name"
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Requested By:
                      </label>

                      <select className="form-select">
                        <option>Please Select</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Topics:
                      </label>
                      <select className="form-select">
                        <option>Please Select</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        No of question of evaluation:
                      </label>
                      <input
                        type="number"
                        id="custom-search"
                        className="form-control "
                        placeholder=" No of question"
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">Status:</label>
                      <select className="form-select">
                        <option>Please Select</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training No:
                      </label>
                      <input
                        type="number"
                        id="custom-search"
                        className="form-control "
                        placeholder="Training No"
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Type:
                      </label>
                      <select className="form-select">
                        <option>Please Select</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Reoccurrence:
                      </label>
                      <select className="form-select">
                        <option>Please Select</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
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
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Scheduled Hours:
                      </label>
                      <input
                        type="text"
                        id="scheduledHours"
                        className="form-control "
                        placeholder="Enter Scheduled Hours"
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Actual Hours Attended:
                      </label>
                      <input
                        type="text"
                        id="scheduledHours"
                        className="form-control "
                        placeholder="Enter Actual Hours Attended"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Total Marks:
                      </label>
                      <input
                        type="number"
                        id="custom-search"
                        className="form-control "
                        placeholder="Enter Total Marks"
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Marks Obtained:
                      </label>
                      <input
                        type="number"
                        id="scheduledHours"
                        className="form-control "
                        placeholder="Enter Marks Obtained"
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Re-training Required:
                      </label>
                      <select
                        className="form-select "
                        aria-label="Default select example"
                      >
                        <option defaultValue>Yes</option>
                        <option value="1">No</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Date/ Time of Training Form:
                      </label>
                      <input
                        type="date"
                        id="custom-search"
                        className="form-control "
                        placeholder="Training Request No"
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Date/ Time of Training To:
                      </label>
                      <input
                        type="date"
                        id="custom-search"
                        className="form-control "
                        placeholder="Search"
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Completion Status:
                      </label>
                      <input
                        type="text"
                        id="custom-search"
                        className="form-control "
                        placeholder="Enter  completion status"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Certificate:
                      </label>
                      <input
                        type="file"
                        id="custom-search"
                        className="mt-3"
                        placeholder="Training Request No"
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Remark:
                      </label>
                      <input
                        type="text"
                        id="custom-search"
                        className="form-control "
                        placeholder="Enter Remark"
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
                  <div className="col"></div>
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
                    <h6 className="mt-2">Show</h6>&nbsp;&nbsp;
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
                    <h6 className="mt-2">entries</h6>
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
                        Employee Code
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Employee Name
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Training Attended
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Designation
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Scheduled Hours
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Actual Hours Attended
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Completion Status
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Total Marks
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Marks Obtained
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Training Status
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Re-Training Required
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Training Certificate
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Status
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Remark
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr>
                      <td>1</td>
                      <td>E001</td>
                      <td>Ramesh</td>
                      <td>Yes</td>
                      <td>Acct head</td>
                      <td>Hours</td>
                      <td>Hours</td>
                      <td>Yes</td>
                      <td>Enterable</td>
                      <td>Enterable</td>
                      <td>Pass</td>
                      <td>yes</td>
                      <td>Attachment</td>
                      <td>OPen</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>E001</td>
                      <td>Ramesh</td>
                      <td>Yes</td>
                      <td>Acct head</td>
                      <td>Hours</td>
                      <td>Hours</td>
                      <td>Yes</td>
                      <td>Enterable</td>
                      <td>Enterable</td>
                      <td>Pass</td>
                      <td>yes</td>
                      <td>Attachment</td>
                      <td>OPen</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>E001</td>
                      <td>Ramesh</td>
                      <td>Yes</td>
                      <td>Acct head</td>
                      <td>Hours</td>
                      <td>Hours</td>
                      <td>Yes</td>
                      <td>Enterable</td>
                      <td>Enterable</td>
                      <td>Pass</td>
                      <td>yes</td>
                      <td>Attachment</td>
                      <td>OPen</td>
                      <td>-</td>
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

export default TrainingSchedule1;
