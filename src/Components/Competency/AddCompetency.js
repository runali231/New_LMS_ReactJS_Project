import React, { useState, useEffect } from "react";
import { ArrowBack } from "@material-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UrlData from "../UrlData";
import Select from "react-select";
import { GetAllDesignation } from "../Api/DesignationAndDepartment";
import UserId from "../UserId";
import ErrorHandler from "../ErrorHandler";

const AddCompetency = () => {
  const [designation, setDesignation] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState([]);
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [skillRequirement, setSkillRequirement] = useState("");
  const [training, setTraining] = useState([]);
  const [options, setOptions] = useState([]);
  // const [trainingOptions, setTrainingOptions] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    GetAllDesignation();
    getAllTrainingTopic();
    if (id) {
      getCompetencyDetails(id);
    }
  }, [id]);

  const GetAllDesignation = () => {
    axios({
      method: "get",
      url: new URL(UrlData + `DesignationMaster/GetAll?status=1`),
    })
      .then((response) => {
        console.log("response get all designation", response.data.data);
        // setSelectedDesignation(response.data.data);
        const designation = response.data.data.map((item, index) => ({
          value: item.de_id,
          label: item.de_designation_name,
        }));
        setSelectedDesignation(designation);
        console.log(selectedDesignation, "all designation");
      })
      .catch((error) => {
        let errors = ErrorHandler(error)
        alert(errors)
      });
  };

  const handleDesignation = (selectedValue) => {
    // const selectedValue = e.target.value;
    setDesignation(selectedValue);
  };

  const getCompetencyDetails = (id) => {
    axios({
      method: "get",
      url: new URL(UrlData + `CompentencyMaster/Get?cp_id=${id}`),
    })
      .then((response) => {
        console.log(response.data.data, "designation_name");
        const data = response.data.data;
        setDesignation({
          value: data.cp_designation,
          label: data.cp_description,
        });

        setQualification(data.cp_qualification);
        setExperience(data.cp_experiance);
        setSkillRequirement(data.cp_skillreq);
        if (data.cp_training !== null) {
          setTraining(data.cp_training.split(","));
        } else {
          setTraining([]);
        }
      })
      .catch((error) => {
        let errors = ErrorHandler(error)
        alert(errors)
      });
  };

  const addCompetency = () => {
    if (designation === "") {
      alert("Please enter designation");
      // return;
    } else if (qualification === "") {
      alert("Please enter qualification!");
    } else if (experience === "") {
      alert("Please enter experience!");
    } else if (skillRequirement === "") {
      alert("Please enter skill requirement!");
    } else if (training.length === 0) {
      alert("Please enter training!");
    }
    else{
    axios({
      method: "post",
      url: new URL(UrlData + `CompentencyMaster`),
      data: {
        userId: UserId,
        cp_designation: (designation.value).toString(),
        cp_qualification: qualification,
        cp_experiance: experience,
        cp_skillreq: skillRequirement,
        cp_training: training.join(","),
        cp_isactive: "1",
        cp_id: id !== null && id !== undefined && id !== ":id" ? id : undefined,
      },
    })
      .then((response) => {
        console.log(response, "add competency");
        getAllTrainingTopic();
        if (id !== null && id !== undefined && id !== ":id" ? id : undefined) {
          alert("Competency updated successfully!");
        } else {
          alert("Competency added successfully!");
        }
        navigate("/CompentencyMaster");
      })
      .catch((error) => {
        console.log(error);
        // alert("Something went wrong");
        let errors = ErrorHandler(error)
        alert(errors)
      });
    }
  };

  const handleTopics = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setTraining(selectedValues);
    console.log(selectedValues);
  };

  const getAllTrainingTopic = () => {
    axios
      .get(new URL(UrlData + `TopicMaster/GetAllTopics?t_isactive=1`))
      .then((response) => {
        console.log("response", response.data.data);
        const topics = response.data.data.map((item, index) => ({
          value: item.t_id,
          label: item.t_description,
        }));
        setOptions(topics);
        console.log(topics, "options");
      })
      .catch((error) => {
        let errors = ErrorHandler(error)
        alert(errors)
      });
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
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h4 className="card-title fw-bold">Add Competency Master</h4>
                  </div>
                  <div className="col-auto d-flex flex-wrap">
                    <div
                      className="btn btn-add"
                      title="Back"
                      onClick={() => {
                        navigate("/CompentencyMaster");
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
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 ">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Designation:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      {/* <select
                        className="form-select"
                        aria-label="Default select example"
                        value={designation}
                        onChange={handleDesignation}
                      >
                        <option value="" disabled>
                          Select Designation
                        </option>
                        {selectedDesignation.map((data, index) => (
                          <option key={index} value={data.de_id}>
                            {data.de_designation_name}
                          </option>
                        ))}
                      </select> */}
                      <Select
                        options={selectedDesignation}
                        value={designation}
                        onChange={handleDesignation}
                        className="mt-2"
                      />
                      {/* <Select
                        options={selectedDesignation.map((data) => ({
                          value: data.de_id,
                          label: data.de_designation_name,
                        }))}
                        className="mt-2"
                        value={designation}
                        onChange={handleDesignation}
                      /> */}
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Qualification:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="text"
                        id="qualification"
                        name="qualification"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Qualification"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Experience:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="text"
                        id="experience"
                        name="experience"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Experience"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Skill Requirement:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <textarea
                        className="form-control"
                        id="skillRequirement"
                        rows="4"
                        placeholder="Enter Skill Requirement"
                        value={skillRequirement}
                        onChange={(e) => setSkillRequirement(e.target.value)}
                        style={{ height: "59px" }}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">Training:</label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <Select
                        options={options}
                        isMulti
                        className="mt-2"
                        value={options.filter((option) =>
                          training.includes(option.value)
                        )}
                        onChange={handleTopics}
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
                      onClick={() => {
                        addCompetency();
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

export default AddCompetency;
