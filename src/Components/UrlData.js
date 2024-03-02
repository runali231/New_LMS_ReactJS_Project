
const UrlData = "https://localhost:44355/api/";
// const UrlData = "https://tms.initialinfinity.com/api/"


export default UrlData

// import React, { useState, useEffect } from "react";
// import { ArrowBack } from "@material-ui/icons";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import UrlData from "../UrlData";
// import Select from "react-select";

// const AddCompetency = () => {
//   const [designation, setDesignation] = useState("");
//   const [selectedDesignation, setSelectedDesignation] = useState([]);
//   const [qualification, setQualification] = useState("");
//   const [experience, setExperience] = useState("");
//   const [skillRequirement, setSkillRequirement] = useState("");
//   const [training, setTraining] = useState("");
//   const [selectedTraining, setSelectedTraining] = useState(null); // State to store selected training
//   const [options, setOptions] = useState([]);
//   const [trainingOptions, setTrainingOptions] = useState();
//   const { id } = useParams();
//   const navigate = useNavigate();
//   // const options = [
//   //   { value: 'Quality Policy Awareness', label: 'Quality Policy Awareness' },
//   //   { value: 'HSE Policy Awareness', label: 'HSE Policy Awareness' },
//   //   { value: 'SAP Operation', label: 'SAP Operation' },
//   //   { value: 'Awareness of ISO 9001:2015 QMS', label: 'Awareness of ISO 9001:2015 QMS' },
//   //   { value: 'Awareness of ASME BPE-2022 QMS', label: 'Awareness of ASME BPE-2022 QMS' }
//   // ]
//   useEffect(() => {
//     GetAllDesignation();
//     getAllTrainingTopic();
//   }, []);

//   const handleDesignation = (e) => {
//     const selectedValue = e.target.value;
//     setDesignation(selectedValue);
//     console.log(selectedValue);
//   };

//   const GetAllDesignation = () => {
//     axios({
//       method: "get",
//       url: new URL(UrlData + `DesignationMaster/GetAll?status=1`),
//     })
//       .then((response) => {
//         console.log("response", response.data.data);
//         setSelectedDesignation(response.data.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   useEffect(() => {
//     if (id) {
//       axios({
//         method: "get",
//         url: new URL(UrlData + `CompentencyMaster/Get?cp_id=${id}`),
//       })
//         .then((response) => {
//           console.log(response.data.data, "designation_name");
//           setDesignation(response.data.data.cp_designation);
//           setQualification(response.data.data.cp_qualification);
//           setExperience(response.data.data.cp_experiance);
//           setSkillRequirement(response.data.data.cp_skillreq);
//           // setTraining(response.data.data.cp_training);
//           const valuesArray = response.data.data.cp_training.split(",");

//           // Creating an array of objects similar to your options array
//           // const reversedOptions = valuesArray.map((value) => ({ value }));
//           const reversedOptions = valuesArray

//           // Setting the reversed options
//           setTraining(reversedOptions);

//           console.log(reversedOptions, "reversedOptions");
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   }, [id]);

//   const addCompetency = () => {
//     let data;
//     // if (designation === "" || qualification === "" || experience === "" || skillRequirement === "" || training === "") {
//     //   alert("Please fill all the details");
//     // } else if (!/^[a-zA-Z\s~`!@#$%^&*()-_+=|{}[\]:;"'<>,.?/]+$/.test(qualification) || !/^[a-zA-Z\s~`!@#$%^&*()-_+=|{}[\]:;"'<>,.?/]+$/.test(skillRequirement) || !/^[a-zA-Z\s~`!@#$%^&*()-_+=|{}[\]:;"'<>,.?/]+$/.test(training)){
//     //   alert(
//     //     "Please enter a valid data (alphabetic characters only)"
//     //   )
//     // } else {
//     console.log(trainingOptions, "81");
//     data = {
//       userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       cp_designation: designation,
//       cp_qualification: qualification,
//       cp_experiance: experience,
//       cp_skillreq: skillRequirement,
//       cp_training: trainingOptions,
//       cp_isactive: "1",
//     };
//     if (id !== null && id !== undefined && id !== ":id") {
//       data.cp_id = id;
//     }
//     axios({
//       method: "post",
//       url: new URL(UrlData + `CompentencyMaster`),
//       data: data, // Make sure to stringify the data object
//     })
//       .then((response) => {
//         console.log(response, "add competency");
//         getAllTrainingTopic();
//         alert("Competency added successfully!");
//         navigate("/competencyMaster");
//       })
//       .catch((error) => {
//         console.log(error);
//         alert("Something went wrong");
//       });
//     // }
//   };

//   const handleTopics = (e) => {
//     const selectedValue = e.target.value;
//     setTraining(selectedValue);
//     console.log(selectedValue);
//     getAllTrainingTopic();
//   };

//   // Function to fetch training topics
//   const getAllTrainingTopic = () => {
//     axios
//       .get(new URL(UrlData + `TopicMaster/GetAllTopics?t_isactive=1`))
//       .then((response) => {
//         console.log("response", response.data.data);
//         const topics = response.data.data.map((item, index) => ({
//           value: item.t_id,
//           label: item.t_description,
//         }));
//         setOptions(topics);
//         console.log(topics, "options");

//         // Map 'options' directly to generate 'valuesString'
//         const valuesString = topics.map((option) => option.value).join(",");
//         console.log(valuesString, "valuesString");
//         setTrainingOptions(valuesString);
//         console.log(options, "setOptions");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <>
//       <div className="container-fluid">
//         <div
//           className="card m-3"
//           style={{ boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)" }}
//         >
//           <div className="row">
//             <div className="col-lg-12">
//               <div
//                 className="card-header" /* style={{ backgroundColor: 'white' }} */
//               >
//                 <div className="row align-items-center">
//                   <div className="col">
//                     <h4 className="card-title fw-bold">Competency Master</h4>
//                   </div>
//                   <div className="col-md-2  justify-content-end d-none">
//                     {/* <input
//                                             type="text"
//                                             id="custom-search"
//                                             className="form-control "
//                                             placeholder="Search"
//                                         /> */}
//                   </div>
//                   <div className="col-auto d-flex flex-wrap">
//                     <div
//                       className="btn btn-add "
//                       title="Add New"
//                       onClick={() => {
//                         navigate("/competencyMaster");
//                       }}
//                     >
//                       <button
//                         className="btn btn-md text-light"
//                         type="button"
//                         style={{ backgroundColor: "#1B5A90" }}
//                       >
//                         <ArrowBack />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="card-body pt-3">
//                 <div className="row">
//                   <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 ">
//                     <div className="form-group form-group-sm">
//                       <label className="control-label fw-bold">
//                         Designation:
//                       </label>
//                       <select
//                         className="form-select"
//                         aria-label="Default select example"
//                         value={designation}
//                         onChange={handleDesignation}
//                       >
//                         <option value="" disabled>
//                           Select Designation
//                         </option>
//                         {selectedDesignation.map((data, index) => (
//                           <option key={index} value={data.de_id}>
//                             {data.de_designation_name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                   <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
//                     <div className="form-group form-group-sm">
//                       <label className="control-label fw-bold">
//                         Qualification:
//                       </label>
//                       <input
//                         type="text"
//                         id="qualification"
//                         name="qualification"
//                         className="form-control "
//                         autoComplete="off"
//                         placeholder="Enter Qualification"
//                         value={qualification}
//                         onChange={(e) => setQualification(e.target.value)}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
//                     <div className="form-group form-group-sm">
//                       <label className="control-label fw-bold">
//                         Experience:
//                       </label>
//                       <input
//                         type="text"
//                         id="experience"
//                         name="experience"
//                         className="form-control "
//                         autoComplete="off"
//                         placeholder="Enter Experience"
//                         value={experience}
//                         onChange={(e) => setExperience(e.target.value)}
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row mt-4">
//                   <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
//                     <div className="form-group form-group-sm">
//                       <label className="control-label fw-bold">
//                         Skill Requirement:
//                       </label>
//                       <textarea
//                         className="form-control"
//                         id="skillRequirement"
//                         rows="4"
//                         placeholder="Enter Skill Requirement"
//                         value={skillRequirement}
//                         onChange={(e) => setSkillRequirement(e.target.value)}
//                         style={{ height: "59px" }}
//                       ></textarea>
//                     </div>
//                   </div>
//                   <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-4 mt-lg-0">
//                     <div className="form-group form-group-sm">
//                       <label className="control-label fw-bold">Training:</label>
//                       {/* <textarea
//                         className="form-control"
//                         id="training"
//                         rows="4"
//                         placeholder="Enter Training"
//                         value={training}
//                         onChange={(e) => setTraining(e.target.value)}
//                         style={{ height: "59px" }}
//                       ></textarea> */}
//                       {/* <Select options={options} isMulti className="mt-2"/> */}
//                       {options && (
//                         <Select options={options} isMulti className="mt-2" />
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <br />
//               </div>
//               <div className="card-footer">
//                 <div className="row">
//                   <div className="col-lg-12 text-end">
//                     <button
//                       className="btn btn-md text-light"
//                       type="button"
//                       style={{ backgroundColor: "#1B5A90" }}
//                       onClick={() => {
//                         addCompetency();
//                       }}
//                     >
//                       Save
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddCompetency;
