import React, { useState, useEffect } from "react";
import { ArrowBack } from "@material-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UrlData from "../UrlData";

const AddDesignation = () => {
  const navigate = useNavigate();
  const { de_id } = useParams();
  const [dsgName, setDsgName] = useState("");
  const [dsgCode, setDsgCode] = useState("");
  const [active, setActive] = useState(true);

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
          alert("Something went wrong")
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
                    <h4 className="card-title fw-bold">Add Designation</h4>
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
                        navigate("/designationMaster");
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
                        Designation Code:
                      </label>
                      <input
                        type="number"
                        id="dsgCode"
                        name="dsgCode"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Designation Code"
                        value={dsgCode}
                        onChange={(e) => setDsgCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-lg-0 mt-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Designation Name:
                      </label>
                      <input
                        type="text"
                        id="dsgName"
                        name="dsgName"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Designation Name"
                        value={dsgName}
                        onChange={(e) => setDsgName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
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

export default AddDesignation;
