import React, { useState, useEffect } from "react";
import { ArrowBack } from "@material-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UrlData from "../UrlData";

const AddStateMaster = () => {
  const navigate = useNavigate();
  const { id, countryId, countryName  } = useParams();
  const [stateName, setStateName] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [active, setActive] = useState(true);
console.log(id,"id")
  useEffect(() => {
    if (id) {
      axios({
        method: "get",
        url: new URL(UrlData + `StateMaster/GetStateById?status=1&s_id=${id}`),
      })
        .then((response) => {
          console.log(
            response.data.data.s_state_name,
            "state_name"
          );
          setStateName(response.data.data.s_state_name);
          setStateCode(response.data.data.s_state_code);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);


  const addState = () => {
    let data;
    const countryId = localStorage.getItem('countryId');
    const countryName = localStorage.getItem('countryName');
    console.log(countryName)
    console.log(countryId)
    console.log(stateName)
    console.log(stateCode)

    if (stateName === "" || stateCode === "") {
      alert("Please fill all the details");
    } 
    // else if (!/^[a-zA-Z\s~`!@#$%^&*()-_+=|{}[\]:;"'<>,.?/]+$/.test(stateName)) {
    //   alert(
    //     "Please enter a valid designation name (alphabetic characters only)"
    //   );
    // } 
    else {
      data = {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        s_country_name: countryName,
        s_country_id: countryId,
        s_state_name: stateName,
        s_state_code: stateCode,
        s_isactive: "1",
        s_id: id
      };
    //   if (id !== null && id !== undefined && id !== ":id") {
    //     data.s_id = "43ae886d-ae67-445b-8140-fe172c59f035";
    //     console.log(data.s_id ,"id")
    //   }

      axios({
        method: "post",
        url: new URL(UrlData + `StateMaster`),
        data: data, // Make sure to stringify the data object
      })
        .then((response) => {
          console.log(response, "add state");
          alert("State added successfully");
          navigate(`/stateMaster/${countryId}/${countryName}`);
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
                    <h4 className="card-title fw-bold">Add State</h4>
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
                        navigate(`/stateMaster/${id}/${countryName}`);
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
                        State Code:
                      </label>
                      <input
                        type="number"
                        id="stateCode"
                        name="stateCode"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter State Code"
                        value={stateCode}
                        onChange={(e) => setStateCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-lg-0 mt-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        State Name:
                      </label>
                      <input
                        type="text"
                        id="stateName"
                        name="stateName"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter State Name"
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
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
                        addState();
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

export default AddStateMaster;
