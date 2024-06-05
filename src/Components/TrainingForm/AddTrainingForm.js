import React, { useState, useEffect } from "react";
// import { Table, Alert } from "react-bootstrap";
import { Table, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Add, ArrowBack, Edit, Delete } from "@material-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UrlData from "../UrlData";
import Select from "react-select";
import UserId from "../UserId";
import ErrorHandler from "../ErrorHandler";

// import Alert from 'react-popup-alert';

const AddTrainingForm = () => {
  const { id } = useParams();
  // const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [allTrainingNature, setAllTrainingNature] = useState([]);
  const [trainingNature, setTrainingNature] = useState("");
  const [allTrainingType, setAllTrainingType] = useState([]);
  const [trainingType, setTrainingType] = useState("");
  const [trainingReqNo, setTrainingReqNo] = useState("");
  const [trainingReqDate, setTrainingReqDate] = useState("");
  const [trainingHours, setTrainingHours] = useState("");
  const [trainingDay, setTrainingDay] = useState("");
  const [action, setAction] = useState("");
  const [isEmployeeNameDisabled, setIsEmployeeNameDisabled] = useState(false);
  const [isDesignationDisabled, setIsDesignationDisabled] = useState(false);
  const [isDepartmentDisabled, setIsDepartmentDisabled] = useState(false);
  // const [isEmployeeNameEnabled, setIsEmployeeNameEnabled] = useState(true);
  const [departments, setDepartments] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [designation, setDesignation] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState([]);
  const [trainingDept, setTrainingDept] = useState("");
  const [trainingDate, setTrainingDate] = useState("");
  const [trainingTopic, setTrainingTopic] = useState([]);
  const [selectedTrainingTopic, setSelectedTrainingTopic] = useState([]);
  const [trId, setTrId] = useState("");
  const [allTraining, setAllTraining] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [allByDepartments, setAllByDepartments] = useState([]);
  const [empCodeOptions, setEmpCodeOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [empNameOptions, setEmpNameOptions] = useState([]);
  const [selectedNameOption, setSelectedNameOption] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10);

  const handleShow = () => {
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)", // Replace with desired background color
    color: "#fff", // Optional: Set the text color to contrast with the background
  };
  const extractDate = (dateTimeString) => {
    return dateTimeString.split("T")[0];
  };
  useEffect(() => {
    // getByOrder();
    getAllDepartment();
    GetAllDesignation();
    getAllTrainingTopic();
    getAllTraining();
    getAllEmployee();
    getAllTrainingNature();
    getAllTrainingType();
    if (id) {
      axios({
        method: "get",
        url: new URL(
          UrlData + `TrainingForm/GetTrainingNeed?tr_isactive=1&tr_id=${id}`
        ),
      })
        .then((response) => {
          console.log(response, "get topics");
          setTrainingNature(response.data.data.tr_nature);
          setTrainingType(response.data.data.tr_type);
          setTrainingReqNo(response.data.data.tr_req_no);
          setTrainingReqDate(extractDate(response.data.data.tr_req_date));
          setTrainingHours(response.data.data.tr_hours);
          setTrainingDay(response.data.data.tr_days);
          setTrId(response.data.data.tr_id);
          setAction(response.data.data.tr_action);
          console.log(response.data.data.tr_id, "trId");
          getAllTrainingTopic();
          getAllTraining();
          getAllEmployee();
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

  const currentDate = new Date();

  const addTrainingNeedForm = () => {
    if (trainingNature === "") {
      alert("Please select training nature!");
    } else if (trainingType === "") {
      alert("Please select training type!");
    } else if (trainingReqNo === "") {
      alert("Please enter training request no.!");
    } else if (trainingDate === null) {
      alert("Please enter training date!");
    } else if (trainingHours === "") {
      alert("Please enter no of hours!");
    } else if (trainingDay === "") {
      alert("Please enter no of days!");
    } else if (action === "") {
      alert("Please select action!");
    } else {
      let data = {
        userId: UserId,
        tr_nature: trainingNature,
        tr_type: trainingType,
        tr_req_no: trainingReqNo,
        tr_req_date: trainingReqDate,
        tr_hours: trainingHours,
        tr_days: trainingDay,
        tr_action: action,
        tr_createddate: currentDate,
        tr_updateddate: currentDate,
        tr_creadtedby: "", // Should this be tr_createdby?
        tr_updatedby: "", // Should this be tr_updatedby?
        tr_isactive: "1",
        training: allByDepartments,
      };
      // If id is not null, undefined, or ":id", include it in the data object
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
          console.log(response.data.data.OutcomeDetail);
          // Display success message based on whether it's an update or addition
          if (id !== null && id !== undefined && id !== ":id") {
            alert("Training updated successfully!");
          } else {
            alert("Training added successfully!");
          }
          // Navigate the user to /trainingForm
          navigate("/trainingForm");
        })
        .catch((error) => {
          console.log(error);
          let errors = ErrorHandler(error);
          alert(errors);
          // Handle error cases appropriately, such as displaying an error message
        });
    }
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
    console.log(departments);
    if (departments === "" || trainingTopic === "" || trainingDate === "" ) {
      alert("Please fill the details!");
    } else {
      axios
        .get(
          new URL(
            UrlData + `TrainingForm/GetAllByDepart?td_dept=${departments.value}`
          )
        )
        .then((response) => {
          console.log("response", response.data.data);
          let data = response.data.data;
          if (data.length === 0) {
            alert("Employee not available in this department!");
          } else {
            const modifiedData = response.data.data.map((item) => ({
              ...item,
              td_req_dept: trainingDept,
              td_date_training: trainingDate,
              td_topic_training: trainingTopic
                .map((item) => item.value)
                .join(",")
                .toString(),
              td_topic_training_name: trainingTopic
                .map((item) => item.label)
                .join(",")
                .toString(),
              td_emp_code: item.td_emp_code.toString(),
            }));
            setAllByDepartments([...allByDepartments, ...modifiedData]);
            console.log([...allByDepartments, ...modifiedData], "309");
            alert("Training added  successfully!");
          }
          // addSingleTraining()
          resetForm();
          handleClose();
          getAllEmployee();
        })
        .catch((error) => {
          console.log(error);
          let errors = ErrorHandler(error);
          alert(errors);
        });
    }
  };

  const GetAllByDepart1 = (currentTrainings) => {
    console.log(departments);
    if (departments === "" || trainingTopic === ""|| trainingDate === "" ) {
      alert("Please fill the details!");
    } else {
      axios
        .get(
          new URL(
            UrlData + `TrainingForm/GetAllByDepart?td_dept=${departments.value}`
          )
        )
        .then((response) => {
          console.log("response", response.data.data);
          let data = response.data.data;
          if (data.length === 0) {
            alert("Employee not available in this department!");
          } else {
            const modifiedData = data.map((item) => ({
              ...item,
              td_req_dept: trainingDept,
              td_date_training: trainingDate,
              td_topic_training: trainingTopic
                .map((item) => item.value)
                .join(",")
                .toString(),
              td_topic_training_name: trainingTopic
                .map((item) => item.label)
                .join(",")
                .toString(),
              td_emp_code: item.td_emp_code.toString(),
            }));
            setAllByDepartments([...currentTrainings, ...modifiedData]);
            console.log([...currentTrainings, ...modifiedData], "309");
            alert("Training added successfully!");
          }
          resetForm();
          handleClose();
          getAllEmployee();
        })
        .catch((error) => {
          console.log(error);
          let errors = ErrorHandler(error);
          alert(errors);
        });
    }
  };

  const handleDepartment = (selected) => {
    // const selectedValue = e.target.value;
    setDepartments(selected);
    console.log(selected);
    // setIsEmployeeNameDisabled(selected !== "");
    getAllDepartment();
    getAllTrainingTopic();
  };
  useEffect(() => {
    if (departments.value !== "") {
      GetEmployeeByDept();
    }
  }, [departments]);

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
  const GetEmployeeByDept = () => {
    axios
      .get(
        new URL(
          UrlData + `TrainingForm/GetAllByDepart?td_dept=${departments.value}`
        )
      )
      .then((response) => {
        console.log("response GetEmployeeByDept", response.data.data);
        const temp = response.data.data.map((employee) => ({
          value: employee.td_emp_code,
          label: employee.td_emp_code,
        }));
        // setEmpCodeOptions(temp);
        setEmpCodeOptions([
          { value: "select_all", label: "Select All" },
          ...temp,
        ]);
        setIsDesignationDisabled(true);
      })
      .catch((error) => {
        console.log(error);
        let errors = ErrorHandler(error);
        alert(errors);
      });
  };

  const handleDesignation = (selectedValue) => {
    // const selectedValue = e.target.value;
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

  const getAllTrainingTopic = () => {
    axios
      .get(new URL(UrlData + `TopicMaster/GetAllTopics?t_isactive=1`))
      .then((response) => {
        const responseData = response.data;
        console.log("Response Data:", responseData);
        const topics = responseData.data;
        const trainingTopics = topics.map((item) => ({
          value: item.t_id,
          label: item.t_description,
        }));
        console.log("Training Topics:", trainingTopics);
        setSelectedTrainingTopic(trainingTopics);
        console.log("Selected Training Topics:", selectedTrainingTopic);
      })
      .catch((error) => {
        // Handle errors
        console.log("Error:", error);
      });
  };

  const handleTopics = (selected) => {
    const selectedData = selected.map((option) => ({
      value: option.value,
      label: option.label,
    }));
    setTrainingTopic(selectedData);
    console.log(selectedData);
  };
  useEffect(() => {
    console.log(trainingTopic[0], "355");
    console.log(typeof trainingTopic, "355");

    getByTime();
  }, [trainingTopic]);

  const getByTime = () => {
    if (
      trainingTopic &&
      Array.isArray(trainingTopic) &&
      trainingTopic.length > 0
    ) {
      console.log(trainingTopic[0].value, "360");
      axios
        .get(
          new URL(
            UrlData +
              `TrainingForm/GetByTopic?tr_topic_training=${trainingTopic[0].value}`
          )
        )
        .then((response) => {
          console.log("get time", response.data.data.tr_hours);
          setTrainingHours(response.data.data.tr_hours);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.error("Invalid trainingTopic:", trainingTopic);
    }
  };

  
  const addSingleTraining = () => {
    let data = [];
    if (Array.isArray(trainingTopic)) {
      data = trainingTopic.map((item) => ({
        value: item.value,
        label: item.label,
      }));
    } else {
      console.error("trainingTopic is not an array.");
    }

    console.log(designation, "499");
    if (!selectedOption || data.length <= 0 || trainingDate === "" ) {
      alert("Please fill the details!");
    } else {
      const newTrainings = [];

      selectedOption.forEach((option, index) => {
        const empCode = option.value;
        const des = designation[index]; // Pair the designation with the employee based on index
        if (des) {
          // Check if there is a corresponding designation
          const empName = selectedNameOption[index]?.label || ""; // Get the corresponding employee name from selectedNameOption
          const dpt = departments[index]?.label || "";
          console.log(departments, "712");
          const newTraining = {
            // td_dept: departments ? departments.value.toString() : "",
            td_dept: dpt,
            td_des: des.label,
            td_emp_des: des.value ? des.value.toString() : "",
            td_emp_code: empCode ? empCode.toString() : null,
            td_emp_name: empName, // Bind the employee name directly to td_emp_name
            td_req_dept: trainingDept,
            td_date_training: trainingDate,
            td_topic_training: data.map((item) => item.value).join(","),
            td_topic_training_name: data.map((item) => item.label).join(","),
          };
          newTrainings.push(newTraining);
        }
      });

      setAllByDepartments((prevAllByDepartments) => [
        ...prevAllByDepartments,
        ...newTrainings,
      ]);
      handleClose();
      alert("Training added successfully!");
      console.log(allByDepartments);

      resetForm();
      getAllEmployee();
    }
  };

  const [editIndex, setEditIndex] = useState(null);
  useEffect(() => {
    console.log("Inside useEffect:", editIndex);
  }, [editIndex]);

  const getSingleTraining = (index) => {
    getAllEmployee();
    console.log("Received index:", index);
    const adjustedIndex = indexOfFirstItem + index;
    console.log("Adjusted index:", adjustedIndex);

    getAllTrainingTopic();
    setEditIndex(adjustedIndex);
    setIsDepartmentDisabled(true);
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const trainingToEdit = allByDepartments[adjustedIndex];
    console.log(trainingToEdit, "trainingToEdit");
    const var1 = trainingToEdit.td_date_training.split(" ")[0];
    const var2 = formatDate(var1);

    setDepartments({
      value: trainingToEdit.td_dept,
      label: trainingToEdit.td_dept,
    });

    setDesignation({
      value: trainingToEdit.td_des,
      label: trainingToEdit.td_des,
    });

    const empCodes = trainingToEdit.td_emp_code.split(",");

    // Filter empCodeOptions based on empCodes and set it as selectedOption
    const selectedOptions = empCodeOptions.filter((option) =>
      empCodes.includes(option.value)
    );

    setSelectedOption(selectedOptions);
    console.log(selectedOptions, "selectedOptions");
    setSelectedNameOption({
      value: trainingToEdit.td_emp_name,
      label: trainingToEdit.td_emp_name,
    });

    setTrainingDept(trainingToEdit.td_req_dept);
    setTrainingDate(var2);

    const topicValues = trainingToEdit.td_topic_training.split(",");
    const topicLabels =
      trainingToEdit.td_topic_training_name.split(/,(?=[a-zA-Z])/);

    const maxLength = Math.max(topicValues.length, topicLabels.length);

    const selectedTrainingTopic1 = [];
    for (let i = 0; i < maxLength; i++) {
      selectedTrainingTopic1.push({
        value: topicValues[i] || "", // Use empty string if value is undefined
        label: topicLabels[i] || "", // Use empty string if label is undefined
      });
    }

    setTrainingTopic(selectedTrainingTopic1);
    console.log(selectedTrainingTopic1, "482");
  };

  useEffect(() => {
    console.log("before useEffect:", editIndex);
    setEditIndex(editIndex);
    console.log("after useEffect:", editIndex);
  }, [editIndex]);

  const updateSingleTraining = () => {
    let updatedTrainings = [...allByDepartments]; // Create a copy of allByDepartments
  
    if (selectedOption.some(option => option.value === "select_all")) {
      // Filter employees by the selected department
      const departmentEmployees = allByDepartments.filter(
        (training) => training.td_dept === departments?.value?.toString()
      );
  
      // Remove the training at editIndex
      updatedTrainings.splice(editIndex, 1);
  
      // Add new training entries for all employees in the selected department
      departmentEmployees.forEach((employee) => {
        updatedTrainings.push({
          td_dept: departments?.value?.toString(),
          td_des: designation?.label,
          td_emp_des: designation?.value?.toString(),
          td_emp_code: employee.td_emp_code, // Keep the existing employee code
          td_emp_name: employee.td_emp_name, // Keep the existing employee name
          td_req_dept: trainingDept,
          td_date_training: trainingDate,
          td_topic_training: trainingTopic
            .map((item) => item.value)
            .join(",")
            .toString(),
          td_topic_training_name: trainingTopic
            .map((item) => item.label)
            .join(",")
            .toString(),
        });
      });
  
      setAllByDepartments(updatedTrainings);
      console.log(updatedTrainings, "update all trainings in department");
      alert("All trainings in the department updated successfully!");
    } else if (
      editIndex !== null &&
      editIndex >= 0 &&
      editIndex < allByDepartments.length
    ) {
      const selectedEmpCode = selectedOption?.[0]?.value;
      const selectedEmpName = selectedNameOption?.value;
  
      if (selectedEmpCode && selectedEmpName && departments && designation) {
        updatedTrainings[editIndex] = {
          ...updatedTrainings[editIndex], // Keep the existing training item
          td_dept: departments?.value?.toString(),
          td_des: designation?.label,
          td_emp_des: designation?.value?.toString(),
          td_emp_code: selectedEmpCode?.toString(),
          td_emp_name: selectedEmpName?.toString(),
          td_req_dept: trainingDept,
          td_date_training: trainingDate,
          td_topic_training: trainingTopic
            .map((item) => item.value)
            .join(",")
            .toString(),
          td_topic_training_name: trainingTopic
            .map((item) => item.label)
            .join(",")
            .toString(),
        };
  
        setAllByDepartments(updatedTrainings);
        console.log(updatedTrainings, "update training 1");
        console.log(allByDepartments, "update training 2");
        alert("Training updated successfully!");
      } else {
        alert("Something went wrong!");
      }
    }
    handleClose();
    resetForm(); // Reset the form fields
    getAllEmployee();
  };
  const deleteTraining = (index) => {
    const updatedTraining = [...allByDepartments];
    updatedTraining.splice(index, 1);
    setAllByDepartments(updatedTraining);
    alert("Training deleted successfully!");
  };
  const deleteTraining1 = (index) => {
    const updatedTraining = allByDepartments.filter((_, i) => i !== index);
    setAllByDepartments(updatedTraining); // Update the state

    // Call GetAllByDepart1 to fetch and merge updated data
    setTimeout(() => {
      GetAllByDepart1(updatedTraining);
    }, 0);
  };
  const resetForm = () => {
    setDepartments("");
    setDesignation("");
    setSelectedOption("");
    setSelectedNameOption("");
    setTrainingDept("");
    setTrainingDate("");
    setTrainingTopic("");
    setIsEmployeeNameDisabled(false);
    setIsDesignationDisabled(false);
    setIsDepartmentDisabled(false);
    setEditIndex(null);
    setCode("");
    setName("");
  };
  const removeDoubleQuotes = (input) => {
    return input.replace(/"/g, "");
  };

  const handleEmpCodeChange = (selected) => {
    // Directly set the selected options
    setSelectedOption(selected);
    const selectedValues = selected.map((option) => option.value);
    console.log("Selected values:", selectedValues);
    setCode(selectedValues);

    // Disable the fields as required
    setIsEmployeeNameDisabled(true);
    setIsDesignationDisabled(true);
    setIsDepartmentDisabled(true);

    // Fetch data based on the selected employee codes
    axios({
        method: "get",
        url: new URL(
            UrlData + `TrainingForm/GetByCode?td_emp_code=${selectedValues.join(",")}`
        ),
    })
    .then((response) => {
        console.log("Response data by code:", response.data.data);
        const temp = response.data.data;

        const newDesignations = temp.map((data) => ({
            value: data.td_emp_des,
            label: data.td_des,
        }));

        const newEmpNames = temp.map((data) => ({
            value: data.td_emp_name,
            label: data.td_emp_name,
        }));

        const newDepartments = temp.map((data) => ({
            value: data.td_dept,
            label: data.td_dept,
        }));

        console.log("New Designations:", newDesignations);
        console.log("New Employee Names:", newEmpNames);

        // Update the states with the fetched data
        setDesignation(newDesignations);
        setSelectedNameOption(newEmpNames);
        // Optionally update departments if needed
        // setDepartments(newDepartments);
    })
    .catch((error) => {
        console.error("Error fetching data by code:", error);
    });
};

  useEffect(() => {
    console.log(designation, "designation");
    // GetAllTopicsDes();
  }, [designation]);

  const handleEmpNameChange = (selected) => {
    setSelectedNameOption(selected);

    setName(selected);
    axios({
      method: "get",
      url: new URL(
        UrlData + `TrainingForm/GetByName?td_emp_name=${selected.value}`
        // UrlData + `TrainingForm/GetByName?td_emp_name=${selectedValues.join(",")}`
      ),
    })
      .then((response) => {
        setSelectedOption({
          value: response.data.data.td_emp_code,
          label: response.data.data.td_emp_code,
        });
        // setDepartments(response.data.data.td_dept);
        // setDesignation(response.data.data.td_des);
        setDepartments({
          value: response.data.data.td_dept,
          label: response.data.data.td_dept,
        });
        setDesignation({
          value: response.data.data.td_emp_des,
          label: response.data.data.td_des,
        });
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
        console.log("response get all employee", response.data.data);
        // setAllEmployee(response.data.data);
        const emp = response.data.data.map((item, index) => ({
          value: item.emp_code,
          label: item.emp_code,
        }));
        setEmpCodeOptions(emp);
        // setEmpCodeOptions(response.data.data);
        const emp1 = response.data.data.map((item, index) => ({
          // value: item.emp_fname,
          value: item.emp_fname,
          label: item.emp_fname,
        }));
        setEmpNameOptions(emp1);
        console.log(empNameOptions, "422");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setSelectedItemsPerPage(parseInt(e.target.value)); // Update selectedItemsPerPage state
    setItemsPerPage(parseInt(e.target.value)); // Update itemsPerPage state
    setCurrentPage(1); // Reset currentPage to 1 when changing items per page
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
                      Add Training Need Form
                    </h4>
                  </div>

                  <div className="col-auto d-flex flex-wrap">
                    <div
                      className="btn btn-add"
                      title="Back"
                      onClick={() => {
                        navigate("/trainingForm");
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
                        Training Type:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <select
                        className="form-select"
                        value={trainingNature}
                        onChange={(e) => setTrainingNature(e.target.value)}
                      >
                        {/* <option>Please Select</option>
                        <option>Induction</option>
                        <option>New Training</option> */}
                        <option value="" disabled>
                          Select Training Type
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
                        Training Nature:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <select
                        className="form-select"
                        value={trainingType}
                        onChange={(e) => setTrainingType(e.target.value)}
                      >
                        <option value="" disabled>
                          Select Training Nature
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
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
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
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="date"
                        id="custom-search"
                        className="form-control "
                        placeholder="Search"
                        value={trainingReqDate}
                        onChange={(e) => setTrainingReqDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        No of Hours:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="text"
                        id="noHours"
                        className="form-control"
                        placeholder="Enter No of Hours"
                        value={trainingHours}
                        onChange={(e) => setTrainingHours(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        No of Days:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="number"
                        id="custom-search"
                        className="form-control "
                        placeholder="No of Days"
                        value={trainingDay}
                        onChange={(e) => setTrainingDay(e.target.value)}
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
                          <div
                            className="btn btn-add "
                            title="Add New"
                            onClick={() => {
                              // getAllTrainingTopic();
                              // resetForm();
                              // navigate("/addTopic");
                              getAllEmployee()
                            }}
                          >
                            <button
                              className="btn btn-md text-light"
                              type="button"
                              // data-bs-toggle="modal"
                              // data-bs-target="#addTrainingForm"
                              style={{ backgroundColor: "#1B5A90" }}
                              onClick={() => {
                                handleShow();
                                resetForm();
                              }}
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
                      {/* {show ? (
                        <Alert
                          variant="success"
                          onClose={() => setShow(false)}
                          dismissible
                        >
                          <Alert.Heading>Status Approved by HOD</Alert.Heading>
                        </Alert>
                      ) : null} */}
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
                            <th
                              scope="col"
                              style={headerCellStyle}
                              className="d-none"
                            >
                              Topic for training required
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Topic for training required
                            </th>
                            <th scope="col" style={headerCellStyle}>
                              Action
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
                            currentItems.map((departmentItem, index) => {
                              const adjustedIndex = indexOfFirstItem + index;
                              return (
                                <tr key={adjustedIndex}>
                                  <td>{indexOfFirstItem + index + 1}</td>
                                  <td>{departmentItem.td_req_dept}</td>
                                  <td>{departmentItem.td_emp_code}</td>
                                  <td>{departmentItem.td_emp_name}</td>
                                  <td>{departmentItem.td_dept}</td>
                                  <td>{departmentItem.td_des}</td>
                                  {/* <td>
                                  {formatDate(departmentItem.td_date_training)}
                                </td> */}
                                  <td>{departmentItem.td_date_training}</td>
                                  <td
                                    style={{ whiteSpace: "pre-line" }}
                                    className="d-none"
                                  >
                                    {/* {departmentItem.td_topic_training &&
                                  typeof departmentItem.td_topic_training ===
                                    "string"
                                    ? departmentItem.td_topic_training
                                        .split(",")
                                        .map((value, index) => (
                                          <div key={index}>{value.trim()}</div>
                                        ))
                                    : departmentItem.td_topic_training} */}
                                    {departmentItem.td_topic_training
                                      .split(/,(?=[a-zA-Z])/)
                                      .map((item, index) => (
                                        <React.Fragment key={index}>
                                          {item.trim()}
                                          <br />
                                        </React.Fragment>
                                      ))}
                                    {/* {departmentItem.td_topic_training
                                    .split(",")
                                    .map((item, index) => (
                                      <React.Fragment key={index}>
                                        {item.trim()}
                                        <br />
                                      </React.Fragment>
                                    ))} */}
                                  </td>
                                  <td className="text-start">
                                    {departmentItem.td_topic_training_name
                                      .split(/,(?=[a-zA-Z])/)
                                      .map((item, index) => (
                                        <React.Fragment key={index}>
                                          {item.trim()}
                                          <br />
                                        </React.Fragment>
                                      ))}
                                    {/* {departmentItem.td_topic_training_name
                                    .split(",")
                                    .map((item, index) => (
                                      <React.Fragment key={index}>
                                        {item.trim()}
                                        <br />
                                      </React.Fragment>
                                    ))} */}
                                  </td>
                                  <td>
                                    <Edit
                                      className="text-success mr-2"
                                      type="button"
                                      onClick={() => {
                                        getSingleTraining(adjustedIndex);
                                        handleShow();
                                      }}
                                      // data-bs-toggle="modal"
                                      // data-bs-target="#addTrainingForm"
                                    />
                                    <Delete
                                      className="text-danger"
                                      type="button"
                                      style={{ marginLeft: "0.5rem" }}
                                      onClick={() =>
                                        deleteTraining(adjustedIndex)
                                      }
                                    />
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </Table>

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
                                      allByDepartments.length / itemsPerPage
                                    );
                                  const shouldDisplayPage =
                                    pageNumber >= 1 &&
                                    pageNumber <=
                                      Math.ceil(
                                        allByDepartments.length / itemsPerPage
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
                                      allByDepartments.length / itemsPerPage
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
                      <span className="text-danger fw-bold">*</span>
                      <select
                        className="form-select"
                        value={action}
                        onChange={(e) => {
                          const selectedAction = e.target.value;
                          setAction(selectedAction);
                          console.log(selectedAction, "action");
                        }}
                      >
                        <option value="" disabled>
                          Please Select
                        </option>
                        <option value="1">Submit</option>
                        <option value="0">Save Draft</option>
                      </select>
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
                      // onClick={() => {
                      //   addTrainingNeedForm();
                      // }}
                      onClick={addTrainingNeedForm}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-success me-lg-2 d-none"
                    >
                      Copy to Training Schedule
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
        <Modal
          show={showModal}
          onHide={handleClose}
          size="lg"
          id="addTrainingForm"
          aria-labelledby="addTrainingFormLabel"
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title id="addTrainingFormLabel">
              <h5 className="fw-bold">Add Training Form</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="department">
                    <Form.Label className="fw-bold">Department</Form.Label>{" "}
                    <span className="text-danger fw-bold">*</span>
                    <Select
                      options={selectedDepartment}
                      value={departments}
                      onChange={handleDepartment}
                      className="mt-2"
                      isDisabled={isDepartmentDisabled}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="designation">
                    <Form.Label className="fw-bold">Designation:</Form.Label>
                    <Select
                      options={selectedDesignation}
                      value={designation}
                      onChange={handleDesignation}
                      className="mt-2"
                      isDisabled={isDesignationDisabled}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="employeeCode">
                    <Form.Label className="fw-bold">Employee Code:</Form.Label>{" "}
                    <span className="text-danger fw-bold">*</span>
                    {/* <Select
                      // options={empCodeOptions}
                      // value={selectedOption}
                      // onChange={handleEmpCodeChange}
                      // isDisabled={isEmployeeNameDisabled}
                      isMulti
                      options={empCodeOptions}
                      value={empCodeOptions.filter((option) =>
                        code.includes(option.value)
                      )}
                      onChange={handleEmpCodeChange}
                      className="mt-2"
                    /> */}
                    <Select
                      isMulti
                      options={empCodeOptions}
                      value={selectedOption} // Ensure this directly binds to selectedOption state
                      onChange={handleEmpCodeChange}
                      className="mt-2"
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="employeeName">
                    <Form.Label className="fw-bold">Employee Name:</Form.Label>{" "}
                    <span className="text-danger fw-bold">*</span>
                    <Select
                      options={empNameOptions}
                      value={selectedNameOption}
                      onChange={handleEmpNameChange}
                      // isDisabled={isEmployeeNameDisabled}
                      isDisabled
                      className="mt-2"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="trainingDept">
                    <Form.Label className="fw-bold">
                      Training Required Dept:
                    </Form.Label>{" "}
                    {/* <span className="text-danger fw-bold">*</span> */}
                    <Form.Control
                      type="text"
                      placeholder="Enter Training Required Dept"
                      value={trainingDept}
                      onChange={(e) => setTrainingDept(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="trainingDate">
                    <Form.Label className="fw-bold">
                      Date of Training Required:
                    </Form.Label>{" "}
                    <span className="text-danger fw-bold">*</span>
                    <Form.Control
                      type="date"
                      value={trainingDate}
                      onChange={(e) => setTrainingDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="trainingTopics">
                    <Form.Label className="fw-bold">
                      Topics for Training Required:
                    </Form.Label>{" "}
                    <span className="text-danger fw-bold">*</span>
                    <Select
                      options={selectedTrainingTopic}
                      isMulti
                      value={trainingTopic}
                      onChange={handleTopics}
                      className="mt-2"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {/* {
            departments && !code && !name ? (
              <Button
                onClick={GetAllByDepart}
                type="button"
                className="btn text-white"
                style={{ backgroundColor: "#1B5A90" }}
              >
                Add Department Training
              </Button>
            ) : 
            editIndex !== null || departments || code || name ? (
              <Button
                style={{ backgroundColor: "#1B5A90" }}
                onClick={updateSingleTraining}
              >
                Update Training
              </Button>
            ) 
            : (
              <Button
                style={{ backgroundColor: "#1B5A90" }}
                onClick={addSingleTraining}
              >
                Add Single Training
              </Button>
            )
            } */}
            {editIndex !== null && code.value === "select_all" ? (
              <Button
                onClick={() => deleteTraining1(editIndex)}
                type="button"
                className="btn text-white"
                style={{ backgroundColor: "#1B5A90" }}
              >
                 Add Training
              </Button>
            ) : editIndex !== null ? (
              <Button
                style={{ backgroundColor: "#1B5A90" }}
                onClick={updateSingleTraining}
              >
                Update Training
              </Button>
            ) : departments && !code && !name ? (
              <Button
                onClick={GetAllByDepart}
                type="button"
                className="btn text-white"
                style={{ backgroundColor: "#1B5A90" }}
              >
                 Add Training
              </Button>
            ) : code[0] === "select_all" ? (
              <Button
                onClick={GetAllByDepart}
                type="button"
                className="btn text-white"
                style={{ backgroundColor: "#1B5A90" }}
              >
                 Add Training
              </Button>
            ) : (
              <Button
                style={{ backgroundColor: "#1B5A90" }}
                onClick={addSingleTraining}
              >
                 Add Training
              </Button>
            )}

            {/* <Button
              style={{ backgroundColor: "#1B5A90" }}
              onClick={updateSingleTraining}
            >
              Update Training
            </Button> */}

            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default AddTrainingForm;
