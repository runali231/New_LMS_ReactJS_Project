import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Add, ArrowBack, Delete, Edit } from "@material-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UrlData from "../UrlData";
import Select from "react-select";
import UserId from "../UserId";

const AddTrainingSchedule = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [trainingNo, setTrainingNo] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [trainingDept, setTrainingDept] = useState("");
  const [trainingReqBy, setTrainingReqBy] = useState("");
  const [trainingTopics, setTrainingTopics] = useState("");
  const [selectedTrainingTopic, setSelectedTrainingTopic] = useState([]);
  const [noOfQues, setNoOfQues] = useState("");
  const [trainingAgency, setTrainingAgency] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [reoccurrence, setReoccurrence] = useState("");
  const [trainingFrom, setTrainingFrom] = useState("");
  const [trainingTo, setTrainingTo] = useState("");
  const [status, setStatus] = useState("");

  const [empCode, setEmpCode] = useState("");
  const [empName, setEmpName] = useState("");
  const [trainingAttended, setTrainingAttended] = useState("");
  const [designation, setDesignation] = useState("");
  const [scheduledHours, setScheduledHours] = useState("");
  const [actualHoursAttended, setActualHoursAttended] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [marksObtained, setMarksObtained] = useState("");
  const [completionStatus, setCompletionStatus] = useState("");
  const [trainingStatus, setTrainingStatus] = useState("");
  const [reTrainingRequired, setReTrainingRequired] = useState("");
  const [trainingCertificate, setTrainingCertificate] = useState();
  const [status1, setStatus1] = useState("");
  const [remark, setRemark] = useState("");
  const [remark1, setRemark1] = useState("");
  const [allSubTrainingSchedule, setAllSubTrainingSchedule] = useState([]);
  const [trainingArray, setTrainingArray] = useState([]);
  const [tsId, setTsId] = useState("");
  const [tss_id, setTss_id] = useState("");
  const [action, setAction] = useState("");
  const [pdfFile, setPdfFile] = useState();
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [certificateUploaded, setCertificateUploaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [allTrainingScheduleTypes, setAllTrainingScheduleTypes] = useState([]);
  const [allTrainingStatus, setAllTrainingStatus] = useState([]);
  const [allTrainingRequestedBy, setAllTrainingRequestedBy] = useState([]);
  const [allTrainingReoccurrence, setAllTrainingReoccurrence] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10);
  const [selectedAction, setSelectedAction] = useState([]);
  const getLoginId = localStorage.getItem("loginId");
  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)", // Replace with desired background color
    color: "#fff", // Optional: Set the text color to contrast with the background
  };

  useEffect(() => {
    if (id) {
      axios({
        method: "get",
        url: new URL(
          UrlData + `TrainingSchedule/GetTrainingSchedule?ts_id=${id}`
        ),
      })
        .then((response) => {
          console.log(response, "get Training Schedule");
          console.log(response.data.data.ts_training_no);
          setTrainingNo(response.data.data.ts_training_no);
          setTrainerName(response.data.data.ts_trainer_name);
          setTrainingDept(response.data.data.ts_training_dept);
          setTrainingReqBy(response.data.data.ts_req_by);
          setTrainingTopics({
            value: response.data.data.ts_topic,
            label: response.data.data.ts_topic_name,
          });

          setNoOfQues(response.data.data.ts_no_que);
          setTrainingAgency(response.data.data.ts_training_agency);
          setTrainingType(response.data.data.ts_training_type);
          setReoccurrence(response.data.data.ts_reoccurence);
          setTrainingFrom(
            // new Date(response.data.data.ts_dt_tm_fromtraining)
            //   .toISOString()
            //   .split("T")[0]
            response.data.data.ts_dt_tm_fromtraining
              .replace("T", " ")
              .substring(0, 16)
          );
          setTrainingTo(
            // new Date(response.data.data.ts_dt_tm_totraining)
            //   .toISOString()
            //   .split("T")[0]
            response.data.data.ts_dt_tm_totraining
              .replace("T", " ")
              .substring(0, 16)
          );
          setStatus(response.data.data.ts_status);
          setTsId(id);
          console.log(response.data.data.ts_id, "tsId");
          console.log(response.data.data.ts_dt_tm_fromtraining);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  useEffect(() => {
    getAllSubTrainingSchedule();
    getAllTrainingScheduleTypes();
    getAllTrainingStatus();
    getAllTrainingRequestedBy();
    getAllTrainingReoccurrence();
    getAllTrainingTopic();
    getAllActions();
  }, []);

  const getAllSubTrainingSchedule = () => {
    console.log(id);
    axios
      .get(
        new URL(
          UrlData +
            `TrainingSchedule/GetAllTraining?user_id=3fa85f64-5717-4562-b3fc-2c963f66afa6&ts_isactive=1&ts_id=${id}`
        )
      )
      .then((response) => {
        console.log("get all Sub Schedule", response.data.data);
        setAllSubTrainingSchedule(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllTrainingTopic = () => {
    axios
      .get(new URL(UrlData + `TopicMaster/GetAllTopics?t_isactive=1`))
      .then((response) => {
        console.log("response", response.data.data);
        const trainingTopics = response.data.data.map((item, index) => ({
          value: item.t_id,
          label: item.t_description,
        }));
        setSelectedTrainingTopic(trainingTopics);
        console.log(trainingTopics);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTopics = (selected) => {
    // const selectedData = selected.map((option) => ({
    //   value: option.value,
    //   label: option.label,
    // }));
    setTrainingTopics(selected);
    console.log(selected);
  };

  const getAllTrainingScheduleTypes = () => {
    axios
      .get(
        new URL(
          UrlData +
            `ParameterValueMaster/GetAll?Parameterid=B019FBF2-7B14-4A0A-ADC0-F9F12FC4DB88&status=1`
        )
      )
      .then((response) => {
        console.log("get all training types", response.data.data);
        setAllTrainingScheduleTypes(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAllTrainingStatus = () => {
    axios
      .get(
        new URL(
          UrlData +
            `ParameterValueMaster/GetAll?Parameterid=107FAF5C-04BD-4D6F-A6FD-AF919556FD91&status=1`
        )
      )
      .then((response) => {
        console.log("get all training Status", response.data.data);
        setAllTrainingStatus(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAllTrainingRequestedBy = () => {
    axios
      .get(
        new URL(
          UrlData +
            `ParameterValueMaster/GetAll?Parameterid=CFE554B4-18F8-4DBE-91B4-BFDD878C32B9&status=1`
        )
      )
      .then((response) => {
        console.log("get all training Requested by", response.data.data);
        setAllTrainingRequestedBy(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAllTrainingReoccurrence = () => {
    axios
      .get(
        new URL(
          UrlData +
            `ParameterValueMaster/GetAll?Parameterid=4CB055B0-AD3C-4CD8-87E5-932FAB77E74C&status=1`
        )
      )
      .then((response) => {
        console.log("get all training Reoccurrence", response.data.data);
        setAllTrainingReoccurrence(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAllActions = () => {
    axios({
      method: "get",
      url: new URL(UrlData + `ApproveStages/Get?roleid=${getLoginId}`),
      // url: new URL(UrlData +`ApproveStages/Get?roleid=4CA10CB9-F0EA-406E-8B01-428E62670FE9`),
      // url: new URL(UrlData +`ApproveStages/Get?roleid=C4E34142-1525-4E06-9D31-D40150CBB573`),
    })
      .then((response) => {
        console.log("response all action", response.data.data);
        setSelectedAction(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addByAction = () => {
    console.log(action, "selectedAction");
    console.log(id, "id");
    let data;
    if (action === "") {
      alert("Please select action!");
      return; // Added return to exit function
    }
    if (action === "7") {
      if (!remark1) {
        alert("Please enter the remark!");
        return; // Added return to exit function
      }
    }
    data = {
      ts_action: action,
      ts_remark: remark1,
      ts_id: id,
    };
    axios({
      method: "post",
      url: new URL(UrlData + `TrainingSchedule/UpdateStatus`),
      data: data, // Make sure to stringify the data object
    })
      .then((response) => {
        console.log(response, "add action");
        if (action === "6") {
          alert("Training Scheduled Approved Successfully!");
        }
        if (action === "7") {
          alert("Training Scheduled Rejected Successfully!");
        }
        navigate("/trainingScheduleApproval");
      })
      .catch((error) => {
        console.log(error);
        // alert("Something went wrong")
      });
  };

  const addSingleHrTraining = () => {
    // Create a new array by mapping over the existing sub-training schedules
    const updatedAllSubTrainingSchedule = allSubTrainingSchedule.map(
      (training) => {
        // If the current sub-training schedule has the same tss_id as the one being edited
        if (training.tss_id === tss_id) {
          // Return a new object with updated values
          return {
            ...training,
            tss_traning_attend: trainingAttended,
            tss_sch_hour: scheduledHours,
            tss_actual_attend: actualHoursAttended,
          };
        }
        // If the current sub-training schedule doesn't match the one being edited, return it unchanged
        return training;
      }
    );
    // Update the state with the updated array
    setAllSubTrainingSchedule(updatedAllSubTrainingSchedule);
    console.log(allSubTrainingSchedule, "all single sub training");
    resetForm();
  };
  const addSingleHodTraining = () => {
    // Create a new array by mapping over the existing sub-training schedules
    const updatedAllSubTrainingSchedule = allSubTrainingSchedule.map(
      (training) => {
        // If the current sub-training schedule has the same tss_id as the one being edited
        if (training.tss_id === tss_id) {
          // Return a new object with updated values
          return {
            ...training,
            tss_to_marks: totalMarks,
            tss_marks_obt: marksObtained,
            tss_com_status: completionStatus,
            tss_traning_status: trainingStatus,
            tss_re_traning_req: reTrainingRequired,
            tss_traning_cert: trainingCertificate,
            tss_status: status1,
            tss_remark: remark,
          };
        }
        // If the current sub-training schedule doesn't match the one being edited, return it unchanged
        return training;
      }
    );

    // Update the state with the updated array
    setAllSubTrainingSchedule(updatedAllSubTrainingSchedule);
    console.log(allSubTrainingSchedule, "all single sub training");
    resetForm();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files[0], "target value");
    console.log(file.name, "237");
    setFileName(file.name);
    setFileType(file.type);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; // Remove data url prefix
        setTrainingCertificate(base64String);
        console.log(base64String, "base64String");
        console.log(trainingCertificate, "cerificate");
      };
      reader.readAsDataURL(file);
    }
  };

  const ViewModal = (file) => {
    setPdfFile(file);
    console.log(file, "file 265");
    console.log(pdfFile, "file 266");
  };
  useEffect(() => {
    console.log(pdfFile, "pdfFile");
    setPdfFile(pdfFile);
    console.log(pdfFile, "pdfFile1"); // This will reflect the updated value of pdfFile
  }, [pdfFile]);

  const getBase64Type = (base64String) => {
    // Remove metadata prefix from base64 string if present
    if (!base64String) {
      return "unknown"; // Return 'unknown' if base64String is undefined
    }

    // Remove metadata prefix from base64 string if present
    const base64PrefixRemoved = base64String
      .replace(/^data:image\/[a-z]+;base64,/, "")
      .replace(/^data:application\/pdf;base64,/, "");

    // Get the first few characters of the base64 string
    const prefix = base64PrefixRemoved.substring(0, 10);

    // Check if it matches the signature of an image or a PDF
    if (
      prefix.startsWith("/9j/") ||
      prefix.startsWith("iVBORw") ||
      prefix.startsWith("R0lGOD")
    ) {
      return "image";
    } else if (prefix.startsWith("JVBERi0xLj")) {
      return "pdf";
    } else {
      return "unknown";
    }
  };
  const fileType1 = getBase64Type(pdfFile);
  // Empty dependency array ensures that this effect runs only once after the initial render

  const resetForm = () => {
    setTrainingAttended("");
    setScheduledHours("");
    setActualHoursAttended();
    setTotalMarks("");
    setMarksObtained("");
    setCompletionStatus("");
    setTrainingStatus("");
    setReTrainingRequired("");
    setTrainingCertificate("");
    setStatus1("");
    setRemark("");
  };

  const handleChange = (e) => {
    setSelectedItemsPerPage(parseInt(e.target.value));
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allSubTrainingSchedule.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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
                    <h4 className="card-title fw-bold">
                      Training Schedule Approval
                    </h4>
                  </div>

                  <div className="col-auto d-flex flex-wrap">
                    <div
                      className="btn btn-add"
                      title="Back"
                      onClick={() => {
                        navigate("/trainingScheduleApproval");
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
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training No:
                      </label>
                      <input
                        type="text"
                        id="trainingNo"
                        className="form-control "
                        placeholder="Enter Training No"
                        value={trainingNo}
                        onChange={(e) => setTrainingNo(e.target.value)}
                        disabled
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
                        id="trainerName"
                        className="form-control "
                        placeholder="Enter Trainer Name"
                        value={trainerName}
                        onChange={(e) => setTrainerName(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-lg-0 mt-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Dept:
                      </label>
                      <input
                        type="text"
                        id="trainingDept"
                        className="form-control "
                        placeholder="Enter Training Dept"
                        value={trainingDept}
                        onChange={(e) => setTrainingDept(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Requested By:
                      </label>
                      <select
                        className="form-select"
                        value={trainingReqBy}
                        onChange={(e) => setTrainingReqBy(e.target.value)}
                        disabled
                      >
                        <option value="" disabled>
                          Select Status
                        </option>
                        {allTrainingRequestedBy.map((data, index) => (
                          <option key={index} value={data.pv_id}>
                            {data.pv_parametervalue}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Topics:
                      </label>
                      {/* <select
                        className="form-select"
                        value={trainingTopics}
                        onChange={(e) => setTrainingTopics(e.target.value)}
                      >
                        <option>Please Select</option>
                        <option>HTML</option>
                        <option>Javascript</option>
                      </select> */}
                      <Select
                        options={selectedTrainingTopic}
                        value={trainingTopics}
                        // value={selectedTrainingTopic.filter(option => trainingTopics.includes(option.value))}
                        onChange={handleTopics}
                        className="mt-2"
                        isDisabled
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        No of question of evaluation:
                      </label>
                      <input
                        type="number"
                        id="noOfQues"
                        className="form-control "
                        placeholder=" No of question"
                        value={noOfQues}
                        onChange={(e) => setNoOfQues(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Agency:
                      </label>
                      <input
                        type="text"
                        id="trainingAgency"
                        className="form-control "
                        placeholder="Enter Training Agency"
                        value={trainingAgency}
                        onChange={(e) => setTrainingAgency(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Type:
                      </label>
                      <select
                        className="form-select"
                        value={trainingType}
                        onChange={(e) => setTrainingType(e.target.value)}
                        disabled
                      >
                        <option value="" disabled>
                          Select Training Types
                        </option>
                        {allTrainingScheduleTypes.map((data, index) => (
                          <option key={index} value={data.pv_id}>
                            {data.pv_parametervalue}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Reoccurrence:
                      </label>
                      <select
                        className="form-select"
                        value={reoccurrence}
                        onChange={(e) => setReoccurrence(e.target.value)}
                        disabled
                      >
                        <option value="" disabled>
                          Select Reoccurrence
                        </option>
                        {allTrainingReoccurrence.map((data, index) => (
                          <option key={index} value={data.pv_id}>
                            {data.pv_parametervalue}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Date/ Time of Training Form:
                      </label>
                      <input
                        // type="date"
                        type="datetime-local"
                        id="trainingFrom"
                        className="form-control "
                        placeholder="Training Request No"
                        value={trainingFrom}
                        onChange={(e) => setTrainingFrom(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Date/ Time of Training To:
                      </label>
                      <input
                        // type="date"
                        type="datetime-local"
                        id="trainingTo"
                        className="form-control "
                        placeholder="Search"
                        value={trainingTo}
                        onChange={(e) => setTrainingTo(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">Status:</label>
                      <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        disabled
                      >
                        <option value="" disabled>
                          Select Status
                        </option>
                        {allTrainingStatus.map((data, index) => (
                          <option key={index} value={data.pv_id}>
                            {data.pv_parametervalue}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-lg-12">
                    <div className="card-header bg-white">
                      <div className="row align-items-center">
                        <div className="col"></div>
                        <div className="col-md-2  justify-content-end">
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
                              // navigate("/addTopic");
                            }}
                          ></div>
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
                            value={selectedItemsPerPage}
                            onChange={handleChange}
                          >
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                          </select>
                          &nbsp;&nbsp;
                          <h6 className="mt-3">entries</h6>
                        </div>
                      </div>
                      <br />

                      <Table
                        striped
                        hover
                        responsive
                        className="border text-center"
                      >
                        <thead className="text-start">
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
                              Training Topic
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
                        <tbody className="text-start">
                          {allSubTrainingSchedule.length === 0 ? (
                            <tr>
                              <td colSpan="9" className="text-center">
                                Data not available
                              </td>
                            </tr>
                          ) : (
                            allSubTrainingSchedule &&
                            currentItems.map((data, index) => (
                              <tr>
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>{data.tss_emp_code}</td>
                                <td>{data.tss_emp_name}</td>
                                <td>
                                  {data.tss_topic
                                    .split(/,(?=[a-zA-Z])/)
                                    .map((item, index) => (
                                      <React.Fragment key={index}>
                                        {item.trim()}
                                        <br />
                                      </React.Fragment>
                                    ))}
                                </td>
                                <td>{data.tss_traning_attend}</td>
                                <td>{data.tss_traning_des}</td>
                                <td>{data.tss_sch_hour}</td>
                                <td>{data.tss_actual_attend}</td>
                                <td>{data.tss_com_status}</td>
                                <td>{data.tss_to_marks}</td>
                                <td>{data.tss_marks_obt}</td>
                                <td>{data.tss_traning_status}</td>
                                <td>{data.tss_re_traning_req}</td>

                                <td>
                                  {data.tss_traning_cert !== null &&
                                    data.tss_id && (
                                      <span
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#viewModal"
                                        onClick={() =>
                                          ViewModal(data.tss_traning_cert)
                                        }
                                      >
                                        {
                                          fileName === data.tss_traning_cert
                                            ? fileName
                                            : `File uploaded`
                                          // {fileName}
                                        }
                                      </span>
                                    )}
                                  {!data.tss_traning_cert && (
                                    <span
                                      type="button"
                                      // data-bs-toggle="modal"
                                      // data-bs-target="#viewModal"
                                    >
                                      File not uploaded
                                    </span>
                                  )}
                                </td>
                                <td>{data.tss_status}</td>
                                <td>{data.tss_remark}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </Table>
                      <div className="row mt-4 mt-xl-3">
                        <div className="col-lg-4 col-12 ">
                          <h6 className="text-lg-start text-center">
                          <h6 className="text-lg-start text-center">
                            Showing {indexOfFirstItem + 1} to{" "}
                            {Math.min(indexOfLastItem, allSubTrainingSchedule.length)}{" "}
                            of {allSubTrainingSchedule.length} entries
                          </h6>
                          </h6>
                        </div>
                        <div className="col-lg-4 col-12"></div>
                        <div className="col-lg-4 col-12 mt-3 mt-lg-0">
                          <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-end">
                              <li className="page-item">
                                <button
                                  className="page-link"
                                  onClick={() =>
                                    setCurrentPage(currentPage - 1)
                                  }
                                  aria-label="Previous"
                                  disabled={currentPage === 1}
                                >
                                  <span aria-hidden="true">&laquo;</span>
                                </button>
                              </li>
                              {Array.from(
                                { length: 5 }, // Display only five page number buttons
                                (_, index) => {
                                  const pageNumber = currentPage + index - 2;
                                  const isLastPage =
                                    pageNumber ===
                                    Math.ceil(
                                      allSubTrainingSchedule.length /
                                        itemsPerPage
                                    );
                                  const shouldDisplayPage =
                                    pageNumber >= 1 &&
                                    pageNumber <=
                                      Math.ceil(
                                        allSubTrainingSchedule.length /
                                          itemsPerPage
                                      );
                                  const isCurrentPage =
                                    currentPage === pageNumber;

                                  return shouldDisplayPage ? (
                                    <li
                                      className={`page-item ${
                                        isCurrentPage ? "active" : ""
                                      }`}
                                      key={index}
                                    >
                                      <button
                                        className="page-link"
                                        onClick={() =>
                                          setCurrentPage(pageNumber)
                                        }
                                      >
                                        {pageNumber}
                                      </button>
                                    </li>
                                  ) : null;
                                }
                              )}
                              <li className="page-item">
                                <button
                                  className="page-link"
                                  onClick={() =>
                                    setCurrentPage(currentPage + 1)
                                  }
                                  disabled={
                                    currentPage ===
                                    Math.ceil(
                                      allSubTrainingSchedule.length /
                                        itemsPerPage
                                    )
                                  }
                                  aria-label="Next"
                                >
                                  <span aria-hidden="true">&raquo;</span>
                                </button>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                      <div className="row mt-4 me-3">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                          <div className="form-group form-group-sm">
                            <label className="control-label fw-bold">
                              Action:
                            </label>
                            <span className="text-danger fw-bold">*</span>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={action}
                              onChange={(e) => setAction(e.target.value)}
                            >
                              <option value="" disabled>
                                Select Actions
                              </option>
                              {selectedAction.map((data, index) => (
                                <option key={index} value={data.as_stage}>
                                  {data.as_action}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                          <div className="form-group form-group-sm">
                            <label className="control-label fw-bold">
                              Remark:
                            </label>{" "}
                            {action === "7" ? (
                              <span className="text-danger">*</span>
                            ) : null}
                            <textarea
                              className="form-control"
                              id=""
                              rows="3"
                              placeholder="Enter Remark"
                              value={remark1}
                              onChange={(e) => setRemark1(e.target.value)}
                            ></textarea>
                          </div>
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
                      // onClick={addTrainingScheduleForm}
                      onClick={() => addByAction()}
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
          className="modal fade"
          id="viewModal"
          tabIndex="-1"
          aria-labelledby="viewModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="viewModalLabel">
                  Training Certificate
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    {pdfFile ? (
                      fileType1 === "pdf" ? (
                        <embed
                          src={`data:application/pdf;base64,${pdfFile}`}
                          type="application/pdf"
                          width="200%"
                          height="550px"
                        />
                      ) : (
                        <img
                          src={`data:image/png;base64,${pdfFile}`}
                          type="image/png"
                          className="img-fluid"
                          width="auto"
                          height="auto"
                          alt=""
                        />
                      )
                    ) : null}
                  </div>
                </div>
              </div>
              {/* <div className="modal-footer">
                <button
                  type="button"
                  className="btn text-white"
                  style={{ backgroundColor: "#1B5A90" }}
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div> */}
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="addTrainingSchedule1"
          tabIndex="-1"
          aria-labelledby="addTrainingSchedule1Label"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title fw-bold"
                  id="addTrainingSchedule1Label"
                >
                  Add Training Schedule (hr login)
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Attended:
                      </label>
                      <input
                        type="text"
                        id="trainingAttended"
                        className="form-control"
                        placeholder="Enter Training Attended"
                        value={trainingAttended}
                        onChange={(e) => setTrainingAttended(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Scheduled Hours:
                      </label>
                      <input
                        type="text"
                        id="scheduledHours"
                        className="form-control"
                        placeholder="Enter Scheduled Hours"
                        value={scheduledHours}
                        onChange={(e) => setScheduledHours(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Actual Hours Attended:
                      </label>
                      <input
                        type="text"
                        id="actualHoursAttended"
                        className="form-control"
                        placeholder="Enter Actual Hours Attended"
                        value={actualHoursAttended}
                        onChange={(e) => setActualHoursAttended(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn text-white"
                  style={{ backgroundColor: "#1B5A90" }}
                  data-bs-dismiss="modal"
                  onClick={() => addSingleHrTraining()}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="addTrainingSchedule2"
          tabIndex="-1"
          aria-labelledby="addTrainingSchedule2Label"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title fw-bold"
                  id="addTrainingSchedule2Label"
                >
                  Add Training Schedule(Hod login)
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Total Marks:
                      </label>
                      <input
                        type="number"
                        id="totalMarks"
                        className="form-control "
                        placeholder="Enter Total Marks"
                        value={totalMarks}
                        onChange={(e) => setTotalMarks(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Marks Obtained:
                      </label>
                      <input
                        type="number"
                        id="marksObtained"
                        className="form-control "
                        placeholder="Enter Marks Obtained"
                        value={marksObtained}
                        onChange={(e) => setMarksObtained(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Completion Status:
                      </label>
                      <input
                        type="text"
                        id="completionStatus"
                        className="form-control "
                        placeholder="Enter completion status"
                        value={completionStatus}
                        onChange={(e) => setCompletionStatus(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Status:
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={trainingStatus}
                        onChange={(e) => setTrainingStatus(e.target.value)}
                      >
                        <option defaultValue>Select Training Status</option>
                        <option value="Pass">Pass</option>
                        <option value="Fail">Fail</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Re-training Required:
                      </label>
                      <select
                        className="form-select "
                        aria-label="Default select example"
                        value={reTrainingRequired}
                        onChange={(e) => setReTrainingRequired(e.target.value)}
                      >
                        <option defaultValue>
                          Select Re-training Required
                        </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Certificate:
                      </label>
                      <input
                        type="file"
                        id="trainingCertificate"
                        className="mt-3"
                        placeholder="Training Request No"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">Status:</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={status1}
                        onChange={(e) => setStatus1(e.target.value)}
                      >
                        <option defaultValue>select status</option>
                        <option value="Open">Open</option>
                        <option value="Close">Close</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">Remark:</label>
                      <input
                        type="text"
                        id="remark"
                        className="form-control "
                        placeholder="Enter Remark"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn text-white"
                  style={{ backgroundColor: "#1B5A90" }}
                  onClick={addSingleHodTraining}
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTrainingSchedule;
