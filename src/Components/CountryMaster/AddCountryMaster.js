import React, { useState, useEffect } from "react";
import { ArrowBack } from "@material-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UrlData from "../UrlData";

const AddCountryMaster = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (id) {
      axios({
        method: "get",
        url: new URL(UrlData + `CountryMaster/Get?status=1&co_id=${id}`),
      })
        .then((response) => {
          console.log(
            response.data.data.co_country_name,
            "country  name"
          );
          setCountryName(response.data.data.co_country_name);
          setCountryCode(response.data.data.co_country_code);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const addDesignation = () => {
    let data;
    if (countryName === "" || countryCode === "") {
      alert("Please fill all the details");
    } 
    // else if (!/^[a-zA-Z\s~`!@#$%^&*()-_+=|{}[\]:;"'<>,.?/]+$/.test(countryName)) {
    //   alert(
    //     "Please enter a valid designation name (alphabetic characters only)"
    //   );
    // } 
    else {
      data = {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        co_country_name: countryName,
        co_country_code: countryCode,
        co_isactive: "1"
      };
      if (id !== null && id !== undefined && id !== ":id") {
        data.co_id = id;
      }
      axios({
        method: "post",
        url: new URL(UrlData + `CountryMaster`),
        data: data, // Make sure to stringify the data object
      })
        .then((response) => {
          console.log(response, "add Country");
          alert("Country added successfully");
          navigate("/countryMaster");
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
                    <h4 className="card-title fw-bold">Add Country</h4>
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
                        navigate("/countryMaster");
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
                        Country Code:
                      </label>
                      <input
                        type="number"
                        id="countryCode"
                        name="countryCode"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Country Code"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-lg-0 mt-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Country Name:
                      </label>
                      <input
                        type="text"
                        id="countryName"
                        name="countryName"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Country Name"
                        value={countryName}
                        onChange={(e) => setCountryName(e.target.value)}
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

export default AddCountryMaster;
