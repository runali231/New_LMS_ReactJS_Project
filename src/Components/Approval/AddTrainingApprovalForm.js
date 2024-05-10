import React, { useState, useEffect } from "react";
import { Table, Alert } from "react-bootstrap";
import { Add, ArrowBack, Edit, Delete } from "@material-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UrlData from "../UrlData";
import Select from "react-select";
import UserId from "../UserId";

// import Alert from 'react-popup-alert';

const AddTrainingApprovalForm = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [trainingNature, setTrainingNature] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [trainingReqNo, setTrainingReqNo] = useState("");
  const [trainingReqDate, setTrainingReqDate] = useState("");
  const [trainingHours, setTrainingHours] = useState("");
  const [trainingDay, setTrainingDay] = useState("");
  const [action, setAction] = useState("");
  const [selectedAction, setSelectedAction] = useState([]);
  const [isEmployeeNameDisabled, setIsEmployeeNameDisabled] = useState(false);
  // const [isEmployeeNameEnabled, setIsEmployeeNameEnabled] = useState(true);
  const [departments, setDepartments] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [designation, setDesignation] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState([]);
  const [empCode, setEmpCode] = useState("");
  const [empName, setEmpName] = useState("");
  const [trainingDept, setTrainingDept] = useState("");
  const [trainingDate, setTrainingDate] = useState("");
  const [trainingTopic, setTrainingTopic] = useState("");
  const [selectedTrainingTopic, setSelectedTrainingTopic] = useState([]);
  const [trId, setTrId] = useState("");
  const [allTraining, setAllTraining] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [editingIndex, setEditingIndex] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editIndex1, setEditIndex1] = useState();
  // const [allByDepartments, setAllByDepartments] = useState([]);
  const [allByDepartments, setAllByDepartments] = useState([]);
  const [getAllTrainingCalled, setGetAllTrainingCalled] = useState(false);
  const [empCodeOptions, setEmpCodeOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [empNameOptions, setEmpNameOptions] = useState([]);
  const [selectedNameOption, setSelectedNameOption] = useState("");
  const [allTrainingNature, setAllTrainingNature] = useState([]);
  const [allTrainingType, setAllTrainingType] = useState([]);
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10);
  const [code, setCode] = useState("");
  const [remark, setRemark] = useState("");
  // const [action, setAction] = useState([])

  // const [alert, setAlert] = React.useState({
  //   type: "error",
  //   text: "This is a alert message",
  //   show: false,
  // });

  // function onCloseAlert() {
  //   setAlert({
  //     type: "",
  //     text: "",
  //     show: false,
  //   });
  // }

  // function onShowAlert(type) {
  //   setAlert({
  //     type: type,
  //     text: "Demo alert",
  //     show: true,
  //   });
  // }
  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)", // Replace with desired background color
    color: "#fff", // Optional: Set the text color to contrast with the background
  };
  const extractDate = (dateTimeString) => {
    return dateTimeString.split("T")[0];
  };
  useEffect(() => {
    getAllDepartment();
    GetAllDesignation();
    getAllTrainingTopic();
    getAllTraining();
    getAllEmployee();
    getAllTrainingNature();
    getAllTrainingType();
    getAllActions();
    if (id) {
      axios({
        method: "get",
        url: new URL(
          UrlData + `TrainingForm/GetTrainingNeed?tr_isactive=1&tr_id=${id}`
        ),
      })
        .then((response) => {
          console.log(response, "get training approval");
          setTrainingNature(response.data.data.tr_nature);
          setTrainingType(response.data.data.tr_type);
          setTrainingReqNo(response.data.data.tr_req_no);
          setTrainingReqDate(extractDate(response.data.data.tr_req_date));
          setTrainingHours(response.data.data.tr_hours);
          setTrainingDay(response.data.data.tr_days);
          setTrId(response.data.data.tr_id);
          setRemark(response.data.data.tr_remark);
          console.log(response.data.data.tr_id, "trId");
          getAllTrainingTopic();
          getAllTraining();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [trId]);

  useEffect(() => {
    if (!id) {
      getByOrder();
    }
  }, [id]);

  const getAllTrainingNature = () => {
    axios
      .get(
        new URL(
          UrlData +
            `ParameterValueMaster/GetAll?Parameterid=548F0539-D785-4221-A241-D259BB9B3E15&status=1`
        )
      )
      .then((response) => {
        console.log("get all training nature", response.data.data);
        setAllTrainingNature(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAllTrainingType = () => {
    axios
      .get(
        new URL(
          UrlData +
            `ParameterValueMaster/GetAll?Parameterid=BD289F00-EF2B-42AD-A7CB-9A3179E2AC31&status=1`
        )
      )
      .then((response) => {
        console.log("get all training Type", response.data.data);
        setAllTrainingType(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getByOrder = () => {
    axios
      .get(new URL(UrlData + `TrainingForm/GetOrder`))
      .then((response) => {
        console.log("get by order", response.data.data.tr_req_no);
        setTrainingReqNo(response.data.data.tr_req_no);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addTrainingNeedForm = () => {
    console.log(allByDepartments, "101");
    let data = {
      userId: UserId,
      tr_nature: trainingNature,
      tr_type: trainingType,
      tr_req_no: trainingReqNo,
      tr_req_date: trainingReqDate,
      tr_hours: trainingHours,
      tr_days: trainingDay,
      tr_action: "1",
      tr_createddate: "2024-02-26T10:56:05.214Z",
      tr_updateddate: "2024-02-26T10:56:05.214Z",
      tr_creadtedby: "",
      tr_updatedby: "",
      tr_isactive: "1",
      training: allByDepartments,
    };
    if (id !== null && id !== undefined && id !== ":id") {
      data.tr_id = id;
    }
    axios({
      method: "post",
      url: new URL(UrlData + `TrainingForm`),
      data: data,
    })
      .then((response) => {
        console.log(response, "add training need form");
        // getAllTraining();
        navigate("/trainingForm");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllTraining = () => {
    console.log(trId, "trID");
    axios
      .get(
        new URL(
          UrlData + `TrainingForm/GetAllTraining?td_isactive=1&tr_id=${trId}`
        )
      )
      .then((response) => {
        console.log("get all training", response.data.data);
        setAllByDepartments(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetAllByDepart = () => {
    axios
      .get(
        new URL(UrlData + `TrainingForm/GetAllByDepart?td_dept=${departments}`)
      )
      .then((response) => {
        console.log("response", response.data.data);
        const modifiedData = response.data.data.map((item) => ({
          ...item,

          td_req_dept: trainingDept,
          td_date_training: trainingDate,
          td_topic_training: trainingTopic,
        }));
        setAllByDepartments([...allByDepartments, ...modifiedData]);
        console.log([...allByDepartments, ...modifiedData], "309");
        // addSingleTraining()
        resetForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDepartment = (e) => {
    const selectedValue = e.target.value;
    setDepartments(selectedValue);
    console.log(selectedValue);
    setIsEmployeeNameDisabled(selectedValue !== "");
    getAllDepartment();
  };
  const getAllDepartment = () => {
    axios({
      method: "get",
      url: new URL(UrlData + `DepartmentMaster/GetAll?status=1`),
    })
      .then((response) => {
        console.log("response", response.data.data);
        setSelectedDepartment(response.data.data);
        console.log(selectedDepartment, "department");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDesignation = (e) => {
    const selectedValue = e.target.value;
    setDesignation(selectedValue);
    console.log(selectedValue);
    GetAllDesignation();
  };

  const GetAllDesignation = () => {
    axios({
      method: "get",
      url: new URL(UrlData + `DesignationMaster/GetAll?status=1`),
    })
      .then((response) => {
        console.log("response", response.data.data);
        setSelectedDesignation(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTopics = (e) => {
    const selectedValue = e.target.value;
    setTrainingTopic(selectedValue);
    console.log(selectedValue);
    getAllTrainingTopic();
  };

  const getAllTrainingTopic = () => {
    axios
      .get(new URL(UrlData + `TopicMaster/GetAllTopics?t_isactive=1`))
      .then((response) => {
        console.log("response", response.data.data);
        setSelectedTrainingTopic(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const addSingleTraining = () => {
    console.log(selectedOption.value, "272 emp code");
    const newTraining = {
      td_dept: departments,
      td_des: designation,
      td_emp_code: selectedOption.value,
      td_emp_name: empName,
      td_req_dept: trainingDept,
      td_date_training: trainingDate,
      td_topic_training: trainingTopic,
    };

    setAllByDepartments((prevAllByDepartments) => [
      ...prevAllByDepartments,
      newTraining,
    ]);
    console.log(allByDepartments, "269 single add training");
    resetForm();
  };
  // useEffect(() => {
  //   console.log(allByDepartments);
  // }, [allByDepartments]);

  const getSingleTraining = (index) => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const trainingToEdit = allByDepartments[index];
    const var1 = trainingToEdit.td_date_training.split(" ")[0];
    const var2 = formatDate(var1);

    setDepartments(trainingToEdit.td_dept);
    setDesignation(trainingToEdit.td_des);
    setEmpCode(trainingToEdit.td_emp_code);
    setEmpName(trainingToEdit.td_emp_name);
    setTrainingDept(trainingToEdit.td_req_dept);
    setTrainingDate(var2);
    setTrainingTopic(trainingToEdit.td_topic_training);
    setEditIndex(index);
    setEditIndex1(index); // Update editIndex1 as well
  };

  const updateSingleTraining = () => {
    if (
      editIndex !== null &&
      editIndex >= 0 &&
      editIndex < allByDepartments.length
    ) {
      const updatedTrainings = [...allByDepartments]; // Create a copy of allByDepartments
      updatedTrainings[editIndex] = {
        // Update the training item at editIndex
        td_dept: departments,
        td_des: designation,
        td_emp_code: empCode,
        td_emp_name: empName,
        td_req_dept: trainingDept,
        td_date_training: trainingDate,
        td_topic_training: trainingTopic,
      };
      setAllByDepartments(updatedTrainings);
      console.log(updatedTrainings, "update training 1");
      console.log(allByDepartments, "update training 2");
      // Set the updated array back to state
      resetForm(); // Reset the form fields
    }
  };

  const deleteTraining = (index) => {
    const updatedTraining = [...allByDepartments];
    updatedTraining.splice(index, 1);
    setAllByDepartments(updatedTraining);
  };

  const resetForm = () => {
    setDepartments("");
    setDesignation("");
    setEmpCode("");
    setEmpName("");
    setTrainingDept("");
    setTrainingDate("");
    setTrainingTopic("");
    setIsEmployeeNameDisabled(false);
  };

  const handleEmpCodeChange = (selected) => {
    // const code = e.target.value;
    setSelectedOption(selected);

    // setSelectedOption(code);
    console.log(selected.value, "empCode 366");
    setCode(selected);
    console.log(code, "Code");

    // Fetch employee data based on entered code
    axios({
      method: "get",
      url: new URL(
        UrlData + `TrainingForm/GetByCode?td_emp_code=${selected.value}`
      ),
    })
      .then((response) => {
        console.log(response.data.data, "handleEmpCodeChange");
        setSelectedNameOption(response.data.data.td_emp_name);
        console.log(selectedNameOption, "376");
        setDepartments(response.data.data.td_dept);
        setDesignation(response.data.data.td_des);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEmpNameChange = (selected) => {
    setSelectedNameOption(selected);

    // setSelectedOption(code);
    console.log(selected.value, "empName 388");
    axios({
      method: "get",
      url: new URL(
        UrlData + `TrainingForm/GetByName?td_emp_name=${selected.value}`
      ),
    })
      .then((response) => {
        console.log(response.data.data, "handleEmpNameChange");
        const empCodeVariable = response.data.data.td_emp_code;
        setSelectedOption(empCodeVariable);
        console.log(selectedOption, "397");
        setDepartments(response.data.data.td_dept);
        console.log(departments, "departments");
        setDesignation(response.data.data.td_des);
        console.log(response.data.data.td_emp_code, "399");

        // You can access the updated selectedOption here
        console.log(response.data.data.td_emp_code, "Updated selectedOption");
        console.log(selectedOption);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption]);
  const getAllEmployee = () => {
    axios
      .get(new URL(UrlData + `EmployeeMaster/GetAll?status=1`))
      .then((response) => {
        console.log("response", response.data.data);
        // setAllEmployee(response.data.data);
        const emp = response.data.data.map((item, index) => ({
          value: item.emp_code,
          label: item.emp_code,
        }));
        setEmpCodeOptions(emp);
        // setEmpCodeOptions(response.data.data);
        const emp1 = response.data.data.map((item, index) => ({
          // value: item.emp_fname,
          value: item.emp_fname + "" + item.emp_mname + "" + item.emp_lname,
          label: item.emp_fname + "" + item.emp_mname + "" + item.emp_lname,
        }));
        setEmpNameOptions(emp1);
        console.log(empNameOptions, "422");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getLoginId = localStorage.getItem("loginId");
  const getAllActions = () => {
    axios({
      method: "get",
      url: new URL(UrlData + `ApproveStages/Get?roleid=${getLoginId}`),
      // url: new URL(UrlData +`ApproveStages/Get?roleid=4CA10CB9-F0EA-406E-8B01-428E62670FE9`),
      // url: new URL(UrlData +`ApproveStages/Get?roleid=C4E34142-1525-4E06-9D31-D40150CBB573`),
    })
      .then((response) => {
        console.log("get all action", response.data.data);
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
    if (action === "3" || action === "5") {
      if (!remark) {
        alert("Please enter the remark!");
        return; // Added return to exit function
      }
    }
    // Adjusted logic for data assignment
    data = {
      tr_action: action,
      tr_remark: remark,
      tr_id: id,
    };

    axios({
      method: "post",
      url: new URL(UrlData + `TrainingForm/UpdateStatus`),
      data: data, // Make sure to stringify the data object
    })
      .then(
        (response) => {
          console.log(response, "add action");
          // if (response.data.success) { // Check if response indicates success
          if (action === "2" || action === "4") {
            // Changed to || operator
            alert("Training Approved Successfully!");
          }
          if (action === "3" || action === "5") {
            // Changed to || operator
            alert("Training Rejected Successfully!");
          }
          navigate("/trainingApprovalForm");
        }
        // else {
        //   alert("Failed to update status: " + response.data.message);
        // }
        // }
      )
      .catch((error) => {
        console.log(error);
        alert("Failed to update status. Please try again.");
      });
  };

  const handleChange = (e) => {
    setSelectedItemsPerPage(parseInt(e.target.value));
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allByDepartments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
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
                    <h4 className="card-title fw-bold">
                      Add Training Approval Form
                    </h4>
                  </div>

                  <div className="col-auto d-flex flex-wrap">
                    <div
                      className="btn btn-add"
                      title="Back"
                      onClick={() => {
                        navigate("/trainingApprovalForm");
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
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 ">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Nature:
                      </label>
                      <select
                        className="form-select"
                        value={trainingNature}
                        onChange={(e) => setTrainingNature(e.target.value)}
                        disabled
                      >
                        {/* <option>Please Select</option>
                        <option>Induction</option>
                        <option>New Training</option> */}
                        <option value="" disabled>
                          Select Training Nature
                        </option>
                        {allTrainingNature.map((data, index) => (
                          <option key={index} value={data.pv_id}>
                            {data.pv_parametervalue}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
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
                          Select Training Type
                        </option>
                        {allTrainingType.map((data, index) => (
                          <option key={index} value={data.pv_id}>
                            {data.pv_parametervalue}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Request No:
                      </label>
                      <input
                        type="text"
                        id="custom-search"
                        className="form-control"
                        placeholder="Training Request No"
                        value={trainingReqNo}
                        onChange={(e) => setTrainingReqNo(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Request Date:
                      </label>
                      <input
                        type="date"
                        id="custom-search"
                        className="form-control "
                        placeholder="Search"
                        value={trainingReqDate}
                        onChange={(e) => setTrainingReqDate(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        No of Hours:
                      </label>
                      <input
                        type="text"
                        id="noHours"
                        className="form-control"
                        placeholder="Enter No of Hours"
                        value={trainingHours}
                        onChange={(e) => setTrainingHours(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        No of Days:
                      </label>
                      <input
                        type="number"
                        id="custom-search"
                        className="form-control "
                        placeholder="No of Days"
                        value={trainingDay}
                        onChange={(e) => setTrainingDay(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-lg-12">
                    <div
                      className="card-header bg-white" /* style={{ backgroundColor: 'white' }} */
                    >
                      <div className="row align-items-center">
                        <div className="col">
                          {/* <h4 className="card-title">Topic Master</h4> */}
                        </div>
                        <div className="col-md-2  justify-content-end">
                          <input
                            type="text"
                            id="custom-search"
                            className="form-control d-none"
                            placeholder="Search"
                          />
                        </div>
                        <div className="col-auto d-flex flex-wrap">
                          {/* <div
                            className="btn btn-add "
                            title="Add New"
                            onClick={() => {
                              getAllTrainingTopic();
                            }}
                          >
                            <button
                              className="btn btn-md text-light"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#addTrainingForm"
                              style={{ backgroundColor: "#1B5A90" }}
                            >
                              <Add />
                            </button> */}
                          {/* </div> */}
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
                      {show ? (
                        <Alert
                          variant="success"
                          onClose={() => setShow(false)}
                          dismissible
                        >
                          <Alert.Heading>Status Approved by HOD</Alert.Heading>
                        </Alert>
                      ) : null}
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
                              Training required dept
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Employee Code
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Employee Name
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Department
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Designation
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Date of training required
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Topic for training required
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-start">
                          {allByDepartments.length === 0 ? (
                            <tr>
                              <td colSpan="9" className="text-center">
                                Data not available
                              </td>
                            </tr>
                          ) : (
                            allByDepartments &&
                            currentItems.map((departmentItem, index) => (
                              <tr key={index}>
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>{departmentItem.td_req_dept}</td>
                                <td>{departmentItem.td_emp_code}</td>
                                <td>{departmentItem.td_emp_name}</td>
                                <td>{departmentItem.td_dept}</td>
                                <td>{departmentItem.td_des}</td>
                                <td>
                                  {formatDate(departmentItem.td_date_training)}
                                </td>
                                <td
                                  style={{ whiteSpace: "pre-line" }}
                                  className="d-none"
                                >
                                  {departmentItem.td_topic_training &&
                                  typeof departmentItem.td_topic_training ===
                                    "string"
                                    ? departmentItem.td_topic_training
                                        .split(",")
                                        .map((value, index) => (
                                          <div key={index}>{value.trim()}</div>
                                        ))
                                    : departmentItem.td_topic_training}
                                </td>
                                <td>
                                  {departmentItem.td_topic_training_name
                                    .split(/,(?=[a-zA-Z])/)
                                    .map((item, index) => (
                                      <React.Fragment key={index}>
                                        {item.trim()}
                                        <br />
                                      </React.Fragment>
                                    ))}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </Table>
                      <br />
                      <div className="row">
                        <div className="col-lg-4 col-12 mt-3">
                          <h6 className="text-lg-start text-center">
                            Showing {indexOfFirstItem + 1} to{" "}
                            {Math.min(indexOfLastItem, allByDepartments.length)}{" "}
                            of {allByDepartments.length} entries
                          </h6>
                        </div>
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4 mt-3">
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
                                      allByDepartments.length /
                                        itemsPerPage
                                    );
                                  const shouldDisplayPage =
                                    pageNumber >= 1 &&
                                    pageNumber <=
                                      Math.ceil(
                                        allByDepartments.length /
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
                                      allByDepartments.length /
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
                    </div>
                  </div>
                </div>
                <div className="row mt-4 me-3">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">Action:</label>{" "}
                      <span className="text-danger">*</span>
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
                      <label className="control-label fw-bold">Remark:</label>{" "}
                      {action === "3" || action === "5" ? (
                        <span className="text-danger">*</span>
                      ) : null}
                      <textarea
                        className="form-control"
                        id=""
                        rows="3"
                        placeholder="Enter Remark"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <br />
              </div>

              <div className="card-footer ">
                <div className="row text-end">
                  <div className="col-lg-12 ">
                    <button
                      className="btn text-light me-lg-2"
                      type="button"
                      style={{ backgroundColor: "#1B5A90" }}
                      onClick={() => {
                        // addTrainingNeedForm();
                        addByAction();
                      }}
                    >
                      Save
                    </button>

                    <button type="button" className="btn btn-secondary me-lg-2">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="addTrainingForm"
          tabIndex="-1"
          aria-labelledby="addTrainingFormLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="addTrainingFormLabel">
                  Add Training Approval Form
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
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 ">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Department
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={departments}
                        onChange={handleDepartment}
                      >
                        <option value="" disabled>
                          Select Department
                        </option>
                        {selectedDepartment.map((data, index) => (
                          <option key={index} value={data.d_department_name}>
                            {data.d_department_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Designation:
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={designation}
                        onChange={handleDesignation}
                      >
                        <option value="" disabled>
                          Select Designation
                        </option>
                        {selectedDesignation.map((data, index) => (
                          <option key={index} value={data.de_designation_name}>
                            {data.de_designation_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 ">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Employee Code:
                      </label>
                      {/* <input
                        type="text"
                        id="empCode"
                        className="form-control "
                        placeholder="Enter Employee Code"
                        value={empCode}
                        onChange={handleEmpCodeChange}
                        disabled={isEmployeeNameDisabled}
                        
                      /> */}
                      <Select
                        // options={empCodeOptions.map((option) => ({
                        //   value: option.emp_code,
                        //   label: option.emp_code,
                        // }))}
                        options={empCodeOptions}
                        value={selectedOption}
                        onChange={handleEmpCodeChange}
                        isDisabled={isEmployeeNameDisabled}
                        className="mt-2"
                        // defaultInputValue={selectedNameOption}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Employee Name:
                      </label>
                      {/* <input
                        type="text"
                        id="empName"
                        className="form-control "
                        placeholder="Enter Employee Name"
                        value={empName}
                        onChange={handleEmpNameChange}
                        disabled={isEmployeeNameDisabled}
                      /> */}
                      <Select
                        options={empNameOptions}
                        value={selectedNameOption}
                        onChange={handleEmpNameChange}
                        // disabled={isEmployeeNameDisabled}
                        isDisabled={isEmployeeNameDisabled}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Required Dept:
                      </label>
                      <input
                        type="text"
                        id="trainingDept"
                        className="form-control "
                        placeholder="Enter Training Required Dept"
                        value={trainingDept}
                        onChange={(e) => setTrainingDept(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Date of Training Required:
                      </label>
                      <input
                        type="date"
                        id="trainingDate"
                        className="form-control "
                        placeholder="Search"
                        value={trainingDate}
                        // value="2024-12-22"
                        onChange={(e) => setTrainingDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Topics for Training Required:
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={trainingTopic}
                        onChange={handleTopics}
                      >
                        <option value="" disabled>
                          Select Topics
                        </option>
                        {selectedTrainingTopic.map((data, index) => (
                          <option key={index} value={data.t_description}>
                            {data.t_description}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                {/* {editIndex !== null ? (
                  <button
                    onClick={updateTraining}
                    type="button"
                    className="btn text-white"
                    style={{ backgroundColor: "#1B5A90" }}
                    data-bs-dismiss="modal"
                  >
                    Update Training
                  </button>
                ) : (
                  <button
                    // onClick={addTraining}
                    onClick={GetAllByDepart}
                    type="button"
                    className="btn text-white"
                    style={{ backgroundColor: "#1B5A90" }}
                    data-bs-dismiss="modal"
                  >
                    Add Training
                  </button>
                )} */}

                {departments && !code ? (
                  <button
                    onClick={() => {
                      GetAllByDepart();
                    }}
                    type="button"
                    className="btn text-white"
                    style={{ backgroundColor: "#1B5A90" }}
                    data-bs-dismiss="modal"
                  >
                    Add Department Training
                  </button>
                ) : editIndex !== null ? (
                  // departments && code ?
                  <button
                    onClick={updateSingleTraining}
                    type="button"
                    className="btn text-white"
                    style={{ backgroundColor: "#1B5A90" }}
                    data-bs-dismiss="modal"
                  >
                    Update Training
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      addSingleTraining();
                    }}
                    type="button"
                    className="btn text-white"
                    style={{ backgroundColor: "#1B5A90" }}
                    data-bs-dismiss="modal"
                  >
                    Add single Training
                  </button>
                )}

                {/* <button
                    onClick={() => {
                      addSingleTraining();
                    }}
                    type="button"
                    className="btn text-white"
                    style={{ backgroundColor: "#1B5A90" }}
                    data-bs-dismiss="modal"
                  >
                    Add single Training
                  </button> */}
                <button
                  onClick={updateSingleTraining}
                  type="button"
                  className="btn text-white"
                  style={{ backgroundColor: "#1B5A90" }}
                  data-bs-dismiss="modal"
                >
                  Update Training
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

        {/* <Alert
          header={"Header"}
          btnText={"Close"}
          text={alert.text}
          type={alert.type}
          show={alert.show}
          onClosePress={onCloseAlert}
          pressCloseOnOutsideClick={true}
          showBorderBottom={true}
          alertStyles={{}}
          headerStyles={{}}
          textStyles={{}}
          buttonStyles={{}}
        /> */}
      </div>
    </>
  );
};

export default AddTrainingApprovalForm;
