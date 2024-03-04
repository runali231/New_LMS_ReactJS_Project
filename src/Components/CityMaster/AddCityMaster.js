import React, { useState, useEffect } from "react";
import { ArrowBack } from "@material-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UrlData from "../UrlData";

const AddCityMaster = () => {
  const navigate = useNavigate();
  
  const {id, stateId, stateName, coId, coName } = useParams();
  const [cityName, setCityName] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (id) {
      axios({
        method: "get",
        url: new URL(UrlData + `CityMaster/GetCityById?ci_id=${id}`),
      })
        .then((response) => {
          console.log(
            response.data.data.ci_city_name,
            "designation_name"
          );
          setCityName(response.data.data.ci_city_name);
          setCityCode(response.data.data.ci_city_code);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const addDesignation = () => {
    let data;
    if (cityName === "" || cityCode === "") {
      alert("Please fill all the details");
    } 
    // else if (!/^[a-zA-Z\s~`!@#$%^&*()-_+=|{}[\]:;"'<>,.?/]+$/.test(cityName)) {
    //   alert(
    //     "Please enter a valid designation name (alphabetic characters only)"
    //   );
    // } 
    else {
      data = {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        ci_country_name: coName,
        ci_state_name: stateName,
        ci_country_id: coId,
        ci_state_id: stateId,
        ci_city_name: cityName,
        ci_city_code: cityCode,
        ci_isactive: "1",
      };
      if (stateId !== null && stateId !== undefined && stateId !== ":id") {
        data.ci_id = id;
      }
      axios({
        method: "post",
        url: new URL(UrlData + `CityMaster`),
        data: data, // Make sure to stringify the data object
      })
        .then((response) => {
          console.log(response, "add city");
          alert("City added successfully");
          navigate(`/cityMaster/${coId}/${coName}/${stateId}/${stateName}`);
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
                    <h4 className="card-title fw-bold">Add City</h4>
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
                        navigate("/cityMaster");
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
                        City Code:
                      </label>
                      <input
                        type="number"
                        id="cityCode"
                        name="cityCode"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter City Code"
                        value={cityCode}
                        onChange={(e) => setCityCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-lg-0 mt-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        City Name:
                      </label>
                      <input
                        type="text"
                        id="cityName"
                        name="cityName"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter City Name"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
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

export default AddCityMaster;
