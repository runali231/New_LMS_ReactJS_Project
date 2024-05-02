import React, { useEffect, useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { Add, ArrowBack, Delete, Edit } from "@material-ui/icons";
import { EyeFill } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UrlData from "../UrlData";
import UserId from "../UserId";
import ErrorHandler from "../ErrorHandler";
import Select from "react-select";

const AddTrainingFeedback = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10); 
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  const handleShow = () => setModalOpen(true);
  const { id } = useParams();
  const [facultyName, setFacultyName] = useState("");
  const [title, setTitle] = useState("");
  const [feedbackNo, setFeedbackNo] = useState("");
  const [feedbackDate, setFeedbackDate] = useState("");
  const [feedbackGivenBy, setFeedbackGivenBy] = useState("");

  const [allEmployee, setAllEmployee] = useState([]);
  const [empCode, setEmpCode] = useState("");
  const [empName, setEmpName] = useState("");
  const [trainingNo, setTrainingNo] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [allTrainingType, setAllTrainingType] = useState([]);
  const [dateTrainingFrom, setDateTrainingFrom] = useState("");
  const [dateTrainingTo, setDateTrainingTo] = useState("");
  const [timeTrainingFrom, setTimeTrainingFrom] = useState("");
  const [timeTrainingTo, setTimeTrainingTo] = useState("");
  const [trainingReqBy, setTrainingReqBy] = useState("");
  const [trainingAttended, setTrainingAttended] = useState("");
  const [designation, setDesignation] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState([]);
  const [department, setDepartment] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [trainingFeedback, setTrainingFeedback] = useState();
  const [trainerFeedback, setTrainerFeedback] = useState();
  const [score, setScore] = useState("");
  const [allSubFeedback, setAllSubFeedback] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [trainingPdfFile, setTrainingPdfFile] = useState();
  const [trainingFileName, setTrainingFileName] = useState("");
  const [trainingFileType, setTrainingFileType] = useState("");
  const [trainerPdfFile, setTrainerPdfFile] = useState();
  const [trainerFileName, setTrainerFileName] = useState("");
  const [trainerFileType, setTrainerFileType] = useState("");

  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)", // Replace with desired background color
    color: "#fff", // Optional: Set the text color to contrast with the background
  };

  useEffect(() => {
    getAllSubData();
    getAllEmployee();
    getAllDepartment();
    GetAllDesignation();
    getAllTrainingType();
  }, []);

  useEffect(() => {
    if (id) {
      axios({
        method: "get",
        url: new URL(UrlData + `Feedback/GetFeedbackForm?fb_id=${id}`),
      })
        .then((response) => {
          console.log(response, "get Feedback");
          setFeedbackNo(response.data.data.fb_no);
          setFacultyName(response.data.data.fb_name);
          setFeedbackDate(extractDate(response.data.data.fb_date));
          setTitle(response.data.data.fb_title);
          setFeedbackGivenBy(response.data.data.fb_givenBy);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (!id) {
      getByOrder();
    }
  }, [id]);

  const getAllTrainingType = () => {
    axios
      .get(
        new URL(
          UrlData +
            `ParameterValueMaster/GetAll?Parameterid=B019FBF2-7B14-4A0A-ADC0-F9F12FC4DB88&status=1`
        )
      )
      .then((response) => {
        console.log("get all training nature", response.data.data);
        setAllTrainingType(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getByOrder = () => {
    axios
      .get(new URL(UrlData + `Feedback/GetOrder`))
      .then((response) => {
        console.log("get by order", response.data.data.fb_no);
        setFeedbackNo(response.data.data.fb_no);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addFeedback = () => {
    let data;
    if (facultyName === "") {
      alert("Please enter faculty name!");
    } else if (title === "") {
      alert("Please enter training title!");
    } else if (feedbackNo === "") {
      alert("Please enter feedback no!");
    } else if (feedbackDate === "") {
      alert("Please enter feedback date!");
    } else {
      data = {
        userId: UserId,
        fb_name: facultyName,
        fb_no: feedbackNo,
        fb_title: title,
        fb_date: feedbackDate,
        fb_givenBy: feedbackGivenBy,
        fb_isactive: "1",
        feedback: allSubFeedback,
      };
      if (id !== null && id !== undefined && id !== ":id") {
        data.fb_id = id;
      }
      axios({
        method: "post",
        url: new URL(UrlData + `Feedback`),
        data: data,
      })
        .then((response) => {
          console.log(response);
          if (id !== null && id !== undefined && id !== ":id") {
            alert("Training feedback updated successfully!");
          } else {
            alert("Training Feedback added successfully!");
          }
          navigate("/trainingFeedback");
        })
        .catch((error) => {
          console.log(error);
          let errors = ErrorHandler(error);
          alert(errors);
        });
    }
  };

  const getAllSubData = () => {
    axios({
      method: "get",
      url: new URL(
        UrlData +
          `Feedback/GetAllFeedback?user_id=${UserId}&fb_isactive=1&fb_id=${id}`
      ),
    })
      .then((response) => {
        console.log("response all sub feedback", response.data.data);
        setAllSubFeedback(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addSubFeedback = () => {
    if (
      trainingNo === "" ||
      trainingType === "" ||
      dateTrainingFrom === "" ||
      timeTrainingFrom === "" ||
      dateTrainingTo === "" ||
      timeTrainingTo === "" ||
      empCode === "" ||
      empName === "" ||
      trainingAttended === "" ||
      designation === "" ||
      department === "" ||
      score === ""
    ) {
      alert("Please fill in all the details!");
    } else {
      const newFeedback = {
        f_trnNo: trainingNo,
        f_trnType: trainingType,
        f_trnReqBy: trainingReqBy,
        f_dateTrnForm: dateTrainingFrom,
        f_TimeTrnForm: timeTrainingFrom,
        f_dateTrnTo: dateTrainingTo,
        f_TimeTrnTo: timeTrainingTo,
        f_empCode: empCode.label,
        emp_id: (empCode.value).toString(),
        f_empName: empName,
        f_trnAttend: trainingAttended,
        f_des: designation ? designation.label : "",
        f_desId: designation ? (designation.value).toString() : "",
        f_depid: department ? (department.value).toString() : "",
        f_dep: department ? department.label : "",
        // f_feedback: feedback,
        f_Trainerfeedback: trainerFeedback,
        f_Trainingfeedback: trainingFeedback,
        f_score: score,
        f_fb_id: id,
      };

      // Updating state with new training entry
      setAllSubFeedback((prevFeedbackArray) => [
        ...prevFeedbackArray,
        newFeedback,
      ]);

      // Log the updated state inside the callback of setAllSubFeedback
      // This ensures that you are logging the state after it has been updated
      console.log("New Feedback added:", newFeedback);
      console.log("All Sub Feedback after update:", allSubFeedback);

      alert("Feedback added successfully!");

      handleClose();
      resetForm();
    }
  };

  const getSubFeedback = (index) => {
    handleShow();
    const feedbackToEdit = allSubFeedback[index];
    setEmpCode({
      value: feedbackToEdit.emp_id,
      label: feedbackToEdit.f_empCode,
    });
    setEmpName(feedbackToEdit.f_empName);
    setTrainingNo(feedbackToEdit.f_trnNo);
    setTrainingType(feedbackToEdit.f_trnType);
    setDateTrainingFrom(feedbackToEdit.f_dateTrnForm);
    setTimeTrainingFrom(feedbackToEdit.f_TimeTrnForm);
    setDateTrainingTo(feedbackToEdit.f_dateTrnTo);
    setTimeTrainingTo(feedbackToEdit.f_TimeTrnTo);
    setTrainingReqBy(feedbackToEdit.f_trnReqBy);
    setTrainingAttended(feedbackToEdit.f_trnAttend);
    setDepartment({
      value: feedbackToEdit.f_desId,
      label: feedbackToEdit.f_des,
    });
    setDesignation({
      value: feedbackToEdit.f_depid,
      label: feedbackToEdit.f_dep,
    });
    setTrainingFeedback(feedbackToEdit.f_Trainingfeedback);
    setTrainerFeedback(feedbackToEdit.f_Trainerfeedback);
    setScore(feedbackToEdit.f_score);
    setEditIndex(index);
    console.log(feedbackToEdit);
  };

  const updateSubFeedback = () => {
    if (
      trainingNo === "" ||
      trainingType === "" ||
      dateTrainingFrom === "" ||
      timeTrainingFrom === "" ||
      dateTrainingTo === "" ||
      timeTrainingTo === "" ||
      empCode === "" ||
      empName === "" ||
      trainingAttended === "" ||
      designation === "" ||
      department === "" ||
      score === ""
    ) {
      alert("Please fill the details!");
    } else {
      if (editIndex !== null) {
        const updatedFeedback = [...allSubFeedback];
        updatedFeedback[editIndex] = {
          f_trnNo: trainingNo,
          f_trnType: trainingType,
          f_trnReqBy: trainingReqBy,
          f_dateTrnForm: dateTrainingFrom,
          f_TimeTrnForm: timeTrainingFrom,
          f_dateTrnTo: dateTrainingTo,
          f_TimeTrnTo: timeTrainingTo,
          f_empCode: empCode.label,
          emp_id: empCode.value,
          f_empName: empName,
          f_trnAttend: trainingAttended,
          f_des: designation.label,
          f_desId: (designation.value).toString(),
          f_dep: department.label,
          f_depid: (department.value).toString(),
          // f_feedback: feedback,
          f_Trainerfeedback: trainerFeedback,
          f_Trainingfeedback: trainingFeedback,
          f_score: score,
          f_fb_id: id,
        };
        setAllSubFeedback(updatedFeedback);
        alert("Feedback updated successfully!");
        resetForm();
        handleClose();
      }
    }
  };

  const handleDepartment = (selected) => {
    // const selectedValue = e.target.value;
    setDepartment(selected);
    console.log(selected);
  };
  const getAllDepartment = () => {
    axios({
      method: "get",
      url: new URL(UrlData + `DepartmentMaster/GetAll?status=1`),
    })
      .then((response) => {
        console.log("response", response.data.data);
        const department = response.data.data.map((item, index) => ({
          value: item.d_department_name,
          label: item.d_department_name,
        }));
        setSelectedDepartment(department);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDesignation = (selectedValue) => {
    // const selectedValue = e.target.value;
    setDesignation(selectedValue);
    console.log(selectedValue);
  };
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
        console.log(error);
      });
  };

  const deleteSubFeedback = (index) => {
    const updateFeedback = [...allSubFeedback];
    updateFeedback.splice(index, 1);
    setAllSubFeedback(updateFeedback);
    alert("Feedback deleted successfully!");
  };
  const getAllEmployee = () => {
    axios({
      method: "get",
      url: new URL(UrlData + `EmployeeMaster/GetAll?status=1`),
    })
      .then((response) => {
        console.log("response all employee", response.data.data);
        setAllEmployee(response.data.data);
        const emp = response.data.data.map((item, index) => ({
          value: item.emp_id,
          label: item.emp_code,
        }));
        setAllEmployee(emp);
        const desg = response.data.data.map((item, index) => ({
          value: item.emp_des,
        }));
        setSelectedDesignation(desg);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeByTrn = (e) => {
    setTrainingNo(e.target.value);

    // setUserName(selected.label);
    axios({
      method: "get",
      url: new URL(UrlData + `Feedback/GetByTrn?fb_trnNo=${e.target.value}`),
    })
      .then((response) => {
        console.log(response.data.data, "get training no");
        const emp = response.data.data.map((item, index) => ({
          value: item.emp_id,
          label: item.EmpCode,
        }));
        setAllEmployee(emp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeByCode = (selected) => {
    setEmpCode(selected);
    console.log(selected, "selected");
    // setUserName(selected.label);
    axios({
      method: "get",
      url: new URL(
        UrlData +
          `Feedback/GetByCodeName?fb_empCode=${selected.label}&fb_trnNo=${trainingNo}`
      ),
    })
      .then((response) => {
        console.log(response.data.data, "get employee");
        setEmpName(response.data.data.f_empName);
        setDateTrainingFrom(extractDate(response.data.data.f_dateTrnForm));
        setDateTrainingTo(extractDate(response.data.data.f_dateTrnTo));
        setTimeTrainingFrom(response.data.data.f_TimeTrnForm);
        setTimeTrainingTo(response.data.data.f_TimeTrnTo);
        setDepartment({
          value: response.data.data.f_depid,
          label: response.data.data.f_dep,
        });
        setDesignation({
          value: response.data.data.f_desId,
          label: response.data.data.f_des,
        });
        setTrainingAttended(response.data.data.f_trnAttend);
        setTrainingReqBy(response.data.data.f_trnReqBy);
        setTrainingType(response.data.data.f_trnType);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleTrainingFeedbackChange = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files[0], "target value");
    console.log(file.name, "237");
    setTrainingFileName(file.name);
    setTrainingFileType(file.type);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; // Remove data url prefix
        setTrainingFeedback(base64String);
        console.log(base64String, "base64String");
        console.log(setTrainingFeedback, "cerificate");
      };
      reader.readAsDataURL(file);
    }
  };

  const TrainingFeedbackViewModal = (file) => {
    setTrainingPdfFile(file);
    console.log(file, "file 265");
    console.log(trainingPdfFile, "file 266");
  };
  useEffect(() => {
    console.log(trainingPdfFile, "trainingPdfFile");
    setTrainingPdfFile(trainingPdfFile);
    console.log(trainingPdfFile, "trainingPdfFile1"); // This will reflect the updated value of trainingPdfFile
  }, [trainingPdfFile]);

  const handleTrainerFeedbackChange = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files[0], "target value");
    console.log(file.name, "237");
    setTrainerFileName(file.name);
    setTrainerFileType(file.type);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; // Remove data url prefix
        setTrainerFeedback(base64String);
        console.log(base64String, "base64String");
        console.log(setTrainerFeedback, "cerificate");
      };
      reader.readAsDataURL(file);
    }
  };

  const TrainerFeedbackViewModal = (file) => {
    setTrainerPdfFile(file);
    console.log(file, "file 265");
    console.log(trainingPdfFile, "file 266");
  };
  useEffect(() => {
    console.log(trainingPdfFile, "trainingPdfFile");
    setTrainerPdfFile(trainingPdfFile);
    console.log(trainingPdfFile, "trainingPdfFile1"); // This will reflect the updated value of trainingPdfFile
  }, [trainingPdfFile]);

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
  const trainingFeedbackFileType = getBase64Type(trainingPdfFile);
  const trainerFeedbackFileType = getBase64Type(trainerPdfFile);
  const resetForm = () => {
    setEmpCode("");
    setEmpName("");
    setTrainingNo("");
    setTrainingType("");
    setDateTrainingFrom("");
    setTimeTrainingFrom("");
    setDateTrainingTo("");
    setTimeTrainingTo("");
    setTrainingReqBy("");
    setTrainingAttended("");
    setDesignation("");
    setDepartment("");
    setTrainerFeedback("");
    setTrainingFeedback("");
    setScore("");
    setEditIndex(null)
  };
  const extractDate = (dateTimeString) => {
    return dateTimeString.split("T")[0];
  };

  const handleChange = (e) => {
    setSelectedItemsPerPage(parseInt(e.target.value)); // Update selectedItemsPerPage state
    setItemsPerPage(parseInt(e.target.value)); // Update itemsPerPage state
    setCurrentPage(1); // Reset currentPage to 1 when changing items per page
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allSubFeedback.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (page) => {
    setCurrentPage(page);
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
                    <h4 className="card-title fw-bold">
                      Add Training Feedback
                    </h4>
                  </div>

                  <div className="col-auto d-flex flex-wrap">
                    <div
                      className="btn btn-add"
                      title="Back"
                      onClick={() => {
                        navigate("/trainingFeedback");
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
                        Faculty Name:
                      </label>
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="text"
                        id="facultyName"
                        className="form-control "
                        placeholder="Faculty Name"
                        value={facultyName}
                        onChange={(e) => setFacultyName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Training Title:
                      </label>
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="text"
                        id="title"
                        className="form-control "
                        placeholder="Training Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Feedback No:
                      </label>
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="text"
                        id="feedbackNo"
                        className="form-control "
                        placeholder="Feedback No"
                        value={feedbackNo}
                        onChange={(e) => setFeedbackNo(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Feedback Date:
                      </label>
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="date"
                        id="feedbackDate"
                        className="form-control "
                        placeholder="Search"
                        value={feedbackDate}
                        onChange={(e) => setFeedbackDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 ">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Feedback Given By:
                      </label>
                      <input
                        type="text"
                        id="feedbackGivenBy"
                        className="form-control "
                        placeholder="Feedback given by"
                        value={feedbackGivenBy}
                        onChange={(e) => setFeedbackGivenBy(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-lg-12">
                    <div className="card-header bg-white">
                      <div className="row align-items-center">
                        <div className="col"></div>
                        <div className="col-md-2  justify-content-end d-none">
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
                              // addSubFeedback();
                            }}
                          >
                            <button
                              className="btn btn-md text-light"
                              type="button"
                              onClick={() => {
                                handleShow();
                                resetForm();
                              }}
                              style={{ backgroundColor: "#1B5A90" }}
                            >
                              <Add />
                            </button>
                          </div>
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
                            value={selectedItemsPerPage} // Set value to selectedItemsPerPage
                            onChange={handleChange} 
                          >
                           
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
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
                        className="border text-start"
                      >
                        <thead>
                          <tr>
                            <th scope="col" style={headerCellStyle}>
                              Sr.No
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Training No
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Training Type
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Employee Code
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Employee Name
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Designation
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Department
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Date of training from
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Date of training to
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Time of training from
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Time of training to
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Training requested by
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Training attended
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Training Feedback
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Trainer Feedback
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Score
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-start">
                          {allSubFeedback &&
                            currentItems.map((data, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{data.f_trnNo}</td>
                                  <td>{data.f_trnType}</td>
                                  <td>{data.f_empCode}</td>
                                  <td>{data.f_empName}</td>
                                  <td>{data.f_des}</td>
                                  <td>{data.f_dep}</td>
                                  <td>{data.f_dateTrnForm}</td>
                                  <td>{data.f_dateTrnTo}</td>
                                  <td>{data.f_TimeTrnForm}</td>
                                  <td>{data.f_TimeTrnTo}</td>
                                  <td>{data.f_trnReqBy}</td>
                                  <td>{data.f_trnAttend}</td>
                                  <td>
                                    {data.f_Trainingfeedback !== null && (
                                      <span
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#viewModal"
                                        onClick={() =>
                                          TrainingFeedbackViewModal(
                                            data.f_Trainingfeedback
                                          )
                                        }
                                      >
                                        {trainingFileName ===
                                        data.f_Trainingfeedback ? (
                                          trainingFileName
                                        ) : (
                                          // `File uploaded`
                                          // {trainingFileName}
                                          <EyeFill
                                            className="text-success"
                                            style={{ fontSize: "23px" }}
                                          />
                                        )}
                                      </span>
                                    )}
                                    {!data.f_Trainingfeedback && (
                                      <span
                                        type="button"
                                        // data-bs-toggle="modal"
                                        // data-bs-target="#viewModal"
                                      >
                                        File not uploaded
                                      </span>
                                    )}
                                  </td>
                                  <td>
                                    {data.f_Trainerfeedback !== null && (
                                      <span
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#trainerViewModal"
                                        onClick={() =>
                                          TrainerFeedbackViewModal(
                                            data.f_Trainerfeedback
                                          )
                                        }
                                      >
                                        {trainingFileName ===
                                        data.f_Trainerfeedback ? (
                                          trainingFileName
                                        ) : (
                                          // `File uploaded`
                                          // {trainingFileName}
                                          <EyeFill
                                            className="text-success"
                                            style={{ fontSize: "23px" }}
                                          />
                                        )}
                                      </span>
                                    )}
                                    {!data.f_Trainerfeedback && (
                                      <span
                                        type="button"
                                        // data-bs-toggle="modal"
                                        // data-bs-target="#viewModal"
                                      >
                                        File not uploaded
                                      </span>
                                    )}
                                  </td>
                                  <td>{data.f_score}</td>
                                  <td>
                                    <Edit
                                      className="text-success mr-2"
                                      type="button"
                                      onClick={() => getSubFeedback(index)}
                                    />
                                    <Delete
                                      className="text-danger"
                                      type="button"
                                      style={{ marginLeft: "0.5rem" }}
                                      onClick={() => deleteSubFeedback(index)}
                                    />
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table>
                      <div className="row mt-4 mt-xl-3">
                        <div className="col-lg-4 col-12 ">
                          <h6 className="text-lg-start text-center">
                            Showing {indexOfFirstItem + 1} to{" "}
                            {Math.min(indexOfLastItem, allSubFeedback.length)}{" "}
                            of {allSubFeedback.length} entries
                          </h6>
                        </div>
                        <div className="col-lg-4 col-12"></div>
                        <div className="col-lg-4 col-12 mt-3 mt-lg-0">
                          <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-lg-end justify-content-center">
                              {/* Previous button */}
                              <li className="page-item">
                                <button
                                  className="page-link"
                                  onClick={() =>
                                    handlePageClick(currentPage - 1)
                                  }
                                  disabled={currentPage === 1}
                                >
                                  <span aria-hidden="true">&laquo;</span>
                                </button>
                              </li>
                              {/* Page numbers */}
                              {[
                                ...Array(
                                  Math.ceil(
                                    allSubFeedback.length / itemsPerPage
                                  )
                                ).keys(),
                              ].map((number) => (
                                <li
                                  key={number}
                                  className={`page-item ${
                                    currentPage === number + 1 ? "active" : ""
                                  }`}
                                >
                                  <button
                                    className="page-link"
                                    onClick={() => handlePageClick(number + 1)}
                                  >
                                    {number + 1}
                                  </button>
                                </li>
                              ))}
                              {/* Next button */}
                              <li className="page-item">
                                <button
                                  className="page-link"
                                  onClick={() =>
                                    handlePageClick(currentPage + 1)
                                  }
                                  disabled={
                                    currentPage ===
                                    Math.ceil(
                                      allSubFeedback.length / itemsPerPage
                                    )
                                  }
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
                <br />
              </div>
              <div className="card-footer">
                <div className="row">
                  <div className="col-lg-12 text-end">
                    <button
                      className="btn btn-md text-light"
                      type="button"
                      style={{ backgroundColor: "#1B5A90" }}
                      onClick={addFeedback}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          show={modalOpen}
          onHide={handleClose}
          backdrop="static"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h5 className="fw-bold">Add Training Feedback</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row ">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 ">
                <div className="form-group form-group-sm">
                  <label className="control-label fw-bold">Training No:</label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <input
                    type="text"
                    id="trainingNo"
                    className="form-control "
                    placeholder="Enter Training No"
                    value={trainingNo}
                    onChange={handleChangeByTrn}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-lg-0 mt-4">
                <div className="form-group form-group-sm">
                  <label className="control-label fw-bold">
                    Training Type:
                  </label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <select
                    className="form-select"
                    value={trainingType}
                    onChange={(e) => setTrainingType(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Training Type
                    </option>
                    {allTrainingType.map((data, index) => (
                      <option key={index} value={data.pv_parametervalue}>
                        {data.pv_parametervalue}
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
                  </label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <Select
                    options={allEmployee}
                    value={empCode}
                    // value={empCode || ""}
                    onChange={handleChangeByCode}
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                <div className="form-group form-group-sm">
                  <label className="control-label fw-bold">
                    Employee Name:
                  </label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <input
                    type="text"
                    id="empName"
                    className="form-control"
                    placeholder="Enter Employee Name"
                    value={empName}
                    onChange={(e) => setEmpName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <div className="form-group form-group-sm">
                  <label className="control-label fw-bold">Designation:</label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <Select
                    options={selectedDesignation}
                    value={designation}
                    onChange={handleDesignation}
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                <div className="form-group form-group-sm">
                  <label className="control-label fw-bold">Department:</label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <br />
                  <Select
                    options={selectedDepartment}
                    value={department}
                    onChange={handleDepartment}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 ">
                <div className="form-group form-group-sm">
                  <label className="control-label fw-bold">
                    Date of Training From:
                  </label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <input
                    type="date"
                    id="dateTrainingFrom"
                    className="form-control "
                    placeholder="Faculty Name"
                    value={dateTrainingFrom}
                    onChange={(e) => setDateTrainingFrom(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                <div className="form-group form-group-sm">
                  <label className="control-label fw-bold">
                    Date of Training To:
                  </label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <input
                    type="date"
                    id="dateTrainingTo"
                    className="form-control "
                    placeholder="Training Title"
                    value={dateTrainingTo}
                    onChange={(e) => setDateTrainingTo(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 ">
                <div className="form-group form-group-sm">
                  <label className="control-label fw-bold">
                    Time of Training From:
                  </label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <input
                    type="time"
                    id="timeTrainingFrom"
                    className="form-control "
                    placeholder="Faculty Name"
                    value={timeTrainingFrom}
                    onChange={(e) => setTimeTrainingFrom(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                <div className="form-group form-group-sm">
                  <label className="control-label fw-bold">
                    Time of Training To:
                  </label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <input
                    type="time"
                    id="timeTrainingTo"
                    className="form-control "
                    placeholder="Training Title"
                    value={timeTrainingTo}
                    onChange={(e) => setTimeTrainingTo(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <div className="form-group form-group-sm">
                  <label className="control-label fw-bold">
                    Training Requested By:
                  </label>
                  <input
                    type="text"
                    id="trainingReqBy"
                    className="form-control "
                    placeholder="Enter Training Requested By"
                    value={trainingReqBy}
                    onChange={(e) => setTrainingReqBy(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-lg-0 mt-4">
                <div className="form-group form-group-sm">
                  <label className="control-label fw-bold">
                    Training Attended:
                  </label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <input
                    type="text"
                    id="trainingAttended"
                    className="form-control "
                    placeholder="Enter Training Attended"
                    value={trainingAttended}
                    onChange={(e) => setTrainingAttended(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                <div className="form-group form-group-sm">
                  <label className="control-label fw-bold">
                    Training Feedback:
                  </label>
                  <br />

                  <input
                    type="file"
                    className="form-control" // Apply any necessary class if required
                    onChange={(e) => handleTrainingFeedbackChange(e)}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <div className="form-group form-group-sm">
                  <label className="control-label fw-bold">
                    Trainer Feedback:
                  </label>
                  <br />
                  {/* <input
                    type="file"
                    id="trainerFeedback"
                    className="mt-3"
                    placeholder="Search"
                    
                    onChange={(e) => handleTrainerFeedbackChange(e)}
                  /> */}
                  <input
                    type="file"
                    className="form-control" // Apply any necessary class if required
                    onChange={(e) => handleTrainerFeedbackChange(e)}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                <div className="form-group form-group-sm">
                  <label className="control-label fw-bold">Score:</label>{" "}
                  <span className="text-danger fw-bold">*</span>
                  <input
                    type="text"
                    id="score"
                    className="form-control "
                    placeholder="Enter Score"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {editIndex !== null ? (
              <Button
                style={{ backgroundColor: "#1B5A90" }}
                onClick={updateSubFeedback}
              >
                Update
              </Button>
            ) : (
              <Button
                style={{ backgroundColor: "#1B5A90" }}
                onClick={addSubFeedback}
              >
                Save
              </Button>
            )}
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
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
                  Training Feedback
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
                    {trainingPdfFile ? (
                      trainingFeedbackFileType === "pdf" ? (
                        <embed
                          src={`data:application/pdf;base64,${trainingPdfFile}`}
                          type="application/pdf"
                          width="200%"
                          height="550px"
                        />
                      ) : (
                        <img
                          src={`data:image/png;base64,${trainingPdfFile}`}
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
          id="trainerViewModal"
          tabIndex="-1"
          aria-labelledby="trainerViewModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="trainerViewModalLabel">
                  Trainer Feedback
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
                    {trainerPdfFile ? (
                      trainerFeedbackFileType === "pdf" ? (
                        <embed
                          src={`data:application/pdf;base64,${trainerPdfFile}`}
                          type="application/pdf"
                          width="200%"
                          height="550px"
                        />
                      ) : (
                        <img
                          src={`data:image/png;base64,${trainerPdfFile}`}
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

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTrainingFeedback;
