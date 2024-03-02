import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { ArrowBack, Delete, Edit } from "@material-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UrlData from "../UrlData";

const AddRoleMaster = () => {
  const navigate = useNavigate();
  const { de_id } = useParams();
  const [dsgName, setDsgName] = useState("");
  const [dsgCode, setDsgCode] = useState("");
  const [active, setActive] = useState(true);
  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)",
    color: "#fff",
  };
  useEffect(() => {
    if (de_id) {
      axios({
        method: "get",
        url: new URL(UrlData + `DesignationMaster/Get?status=1&de_id=${de_id}`),
      })
        .then((response) => {
          console.log(
            response.data.data.de_designation_name,
            "designation_name"
          );
          setDsgName(response.data.data.de_designation_name);
          setDsgCode(response.data.data.de_designation_code);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [de_id]);

  const addDesignation = () => {
    let data;
    if (dsgName === "" || dsgCode === "") {
      alert("Please fill all the details");
    }
    // else if (!/^[a-zA-Z\s~`!@#$%^&*()-_+=|{}[\]:;"'<>,.?/]+$/.test(dsgName)) {
    //   alert(
    //     "Please enter a valid designation name (alphabetic characters only)"
    //   );
    // }
    else {
      data = {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        de_designation_name: dsgName,
        de_designation_code: dsgCode,
        de_isactive: active === true ? "1" : "0",
        de_createddate: "2024-02-22T10:49:48.190Z",
        de_updateddate: "2024-02-22T10:49:48.190Z",
      };
      if (de_id !== null && de_id !== undefined && de_id !== ":d_id") {
        data.de_id = de_id;
      }
      axios({
        method: "post",
        url: new URL(UrlData + `DesignationMaster`),
        data: data, // Make sure to stringify the data object
      })
        .then((response) => {
          console.log(response, "add designation");
          alert("Designation added successfully");
          navigate("/designationMaster");
        })
        .catch((error) => {
          console.log(error);
          alert("Something went wrong");
        });
    }
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
                    <h4 className="card-title fw-bold">Add Role Master</h4>
                  </div>
                  <div className="col-md-2  justify-content-end d-none">
                    {/* <input
                      type="text"
                      id="custom-search"
                      className="form-control "
                      placeholder="Search"
                    /> */}
                  </div>
                  <div className="col-auto d-flex flex-wrap">
                    <div className="form-custom me-1">
                      <div
                        id="tableSearch"
                        className="dataTables_wrapper"
                      ></div>
                    </div>

                    <div
                      className="btn btn-add"
                      title="Add New"
                      onClick={() => {
                        navigate("/roleMaster");
                      }}
                    >
                      <button
                        className="btn btn-md text-light"
                        type="button"
                        style={{ backgroundColor: "#1B5A90" }}
                      >
                        <ArrowBack />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body pt-3">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Role Name:
                      </label>
                      <input
                        type="number"
                        id="roleName"
                        name="roleName"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Role Name"
                        // value={dsgCode}
                        // onChange={(e) => setDsgCode(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-lg-0 mt-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Description:
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        placeholder="Enter Description"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Enter Module:
                      </label>
                      <input
                        type="text"
                        id="module"
                        name="module"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Module"
                        // value={dsgCode}
                        // onChange={(e) => setDsgCode(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        {/* Department Head: */}
                      </label>
                      <div className="form-group form-group-sm">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={active}
                            onChange={(e) => setActive(e.target.checked)}
                            id="defaultCheck1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck1"
                          >
                            Is Active
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <br />
                <Table striped hover responsive className="border text-left">
                  <thead>
                    <tr>
                      <th scope="col" style={headerCellStyle}></th>
                      <th scope="col" style={headerCellStyle}>
                        Screen Name
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Add
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Update
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        View
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Delete
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Workflow
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                        </div>
                      </td>
                      <td>Training Form</td>
                      <td><div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                        </div></td>
                      <td><div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                        </div></td>
                      <td><div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                        </div></td>
                      <td>
                      <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                        </div>
                      </td>
                      <td>
                      <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                        </div>
                      </td>
                      <td>Training Schedule</td>
                      <td><div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                        </div></td>
                      <td><div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                        </div></td>
                      <td><div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                        </div></td>
                      <td>
                      <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                        </div>
                      </td>
                      <td>
                      <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className="card-footer">
                <div className="row">
                  <div className="col-lg-12 text-end">
                    <button
                      className="btn btn-md text-light"
                      type="button"
                      style={{ backgroundColor: "#1B5A90" }}
                      onClick={() => {
                        addDesignation();
                        // editDesignation();
                      }}
                    >
                      Save
                    </button>
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

export default AddRoleMaster;
