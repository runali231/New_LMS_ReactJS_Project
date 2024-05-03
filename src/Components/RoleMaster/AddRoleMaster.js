import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { ArrowBack, Delete, Edit } from "@material-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UrlData from "../UrlData";
import UserId from "../UserId";

const AddRoleMaster = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [module, setModule] = useState("");
  const [active, setActive] = useState(true);
  const [allScreens, setAllScreens] = useState([]);
  const [menuDataArray, setMenuDataArray] = useState([]);

  const headerCellStyle = {
    backgroundColor: "rgb(27, 90, 144)",
    color: "#fff",
  };
  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    if (id) {
      axios({
        method: "get",
        url: new URL(
          UrlData +
            `RoleMaster/GetRoleById?status=1&UserId=3fa85f64-5717-4562-b3fc-2c963f66afa6&r_id=${id}`
        ),
      })
        .then((response) => {
          console.log(response, "get by id role master");
          console.log(response.data.data[0].r_rolename);
          setRoleName(response.data.data[0].r_rolename);
          setRoleDescription(response.data.data[0].r_description);
          setModule(response.data.data[0].r_module);
          setMenuDataArray(response.data.data);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);
  const getAllData = () => {
    axios({
      method: "get",
      url: new URL(UrlData + `RoleMaster/GetMenu`),
    })
      .then((response) => {
        console.log("response screens", response.data.data);
        setAllScreens(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleCheckboxChange = (event, menuid) => {
    const { checked, id } = event.target;
    let newData = [...menuDataArray];
    let found = false;
  
    // Check if the menuData object with the specified menuid exists
    let updatedData = newData.map((menuData) => {
      if (menuData.a_menuid === menuid) {
        found = true;
        // Update the checkbox state
        return { ...menuData, [id]: checked ? "1" : "" };
      }
      return menuData;
    });
  
    // If all five checkboxes are unchecked, remove the menuData object
    if (!checked) {
      const menuData = updatedData.find((data) => data.a_menuid === menuid);
      if (
        menuData &&
        !menuData.a_addaccess &&
        !menuData.a_editaccess &&
        !menuData.a_viewaccess &&
        !menuData.a_deleteaccess &&
        !menuData.a_workflow
      ) {
        updatedData = updatedData.filter((data) => data.a_menuid !== menuid);
      }
    }
  
    // If the menuData object doesn't exist, create a new one
    if (!found && checked) {
      const newMenuData = {
        a_menuid: menuid,
        [id]: "1",
        a_addaccess: id === "a_addaccess" ? "1" : "",
        a_editaccess: id === "a_editaccess" ? "1" : "",
        a_viewaccess: id === "a_viewaccess" ? "1" : "",
        a_deleteaccess: id === "a_deleteaccess" ? "1" : "",
        a_workflow: id === "a_workflow" ? "1" : "",
      };
      updatedData.push(newMenuData);
    }
  
    // Set the updated data array
    setMenuDataArray(updatedData);
  };
  
  

  const handleCheckboxChange1 = (event, menuid) => {
    const { checked, id } = event.target;
    let newData = [...menuDataArray];
    let found = false;
    newData = newData.map((menuData) => {
      if (menuData.a_menuid === menuid) {
        found = true;
        return {
          ...menuData,
          [id]: checked ? "1" : "",
          // Set other permissions to the same value as the clicked checkbox
          a_addaccess: checked ? "1" : "",
          a_editaccess: checked ? "1" : "",
          a_viewaccess: checked ? "1" : "",
          a_deleteaccess: checked ? "1" : "",
          a_workflow: checked ? "1" : "",
        };
      }
      return menuData;
    });

    // If the checkbox is unchecked and there are no other checkboxes checked for this menuid,
    // then remove the menuData object from newData
    if (
      !checked &&
      !newData.some(
        (data) =>
          data.a_menuid === menuid &&
          data.a_addaccess === "1" &&
          data.a_editaccess === "1" &&
          data.a_viewaccess === "1" &&
          data.a_deleteaccess === "1" &&
          data.a_workflow === "1"
      )
    ) {
      newData = newData.filter((data) => data.a_menuid !== menuid);
    }

    setMenuDataArray(newData);
    if (!found && checked) {
      newData.push({
        a_menuid: menuid,
        [id]: "1",
        a_addaccess: "1",
        a_editaccess: "1",
        a_viewaccess: "1",
        a_deleteaccess: "1",
        a_workflow: "1",
      });
      setMenuDataArray(newData);
    }
  };

  useEffect(() => {
    // console.log(menuDataArray);
  }, [menuDataArray]);

  const addRoleMaster = () => {
    // console.log(menuDataArray, "menuDataArray");
    let data;
    if (roleName === "") {
      alert("Please enter role name!");
    }
    else if (module === ""){
      alert("Please enter module!");
    }
    else {
      data = {
        userId: UserId,
        r_rolename: roleName,
        r_description: roleDescription,
        r_module: module,
        r_isactive: active === true ? "1" : "0",
        Privilage: menuDataArray,
      };
      console.log(data.privilage, "privilage");
      if (id !== null && id !== "") {
        data.r_id = id;
      }
      axios({
        method: "post",
        url: new URL(UrlData + `RoleMaster`),
        // url: `https://localhost:44355/api/RoleMaster`,
        data: data, // Make sure to stringify the data object
      })
        .then((response) => {
          console.log(response, "add Role Master");
          if (id !== null && id !== undefined) {
            alert("Role updated successfully!");
          } else {
            alert("Role added successfully!");
          }
          console.log(menuDataArray, "menu data array");
          navigate("/roleMaster");
        })
        .catch((error) => {
          console.log(error);
          alert("Something went wrong");
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
                    <h4 className="card-title fw-bold">Add Role Master</h4>
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
                      title="Back"
                      onClick={() => {
                        navigate("/roleMaster");
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
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-2 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Role Name:
                      </label>{" "}
                      <span className="text-danger fw-bold">*</span>
                      <input
                        type="text"
                        id="roleName"
                        name="roleName"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Role Name"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-lg-0 mt-4">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Description:
                      </label>{" "}
                      {/* <span className="text-danger fw-bold">*</span> */}
                      <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        placeholder="Enter Description"
                        value={roleDescription}
                        onChange={(e) => setRoleDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mt-0 mt-lg-0">
                    <div className="form-group form-group-sm">
                      <label className="control-label fw-bold">
                        Enter Module:
                      </label>{" "}
                      {/* <span className="text-danger fw-bold">*</span> */}
                      <input
                        type="text"
                        id="module"
                        name="module"
                        className="form-control "
                        autoComplete="off"
                        placeholder="Enter Module"
                        value={module}
                        onChange={(e) => setModule(e.target.value)}
                      />
                    </div>
                  </div>
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
                <Table striped hover responsive className="border text-left">
                  <thead>
                    <tr>
                      <th scope="col" style={headerCellStyle}></th>
                      <th scope="col" style={headerCellStyle}>
                        Screen Name
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Add
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Update
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        View
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Delete
                      </th>
                      <th scope="col" style={headerCellStyle}>
                        Workflow
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allScreens.map((item) => (
                      <tr key={item.a_menuid}>
                        <td className="pl-4 text-center">
                          <input
                            className="form-check-input flexCheckDefault"
                            type="checkbox"
                            value=""
                            onChange={(e) =>
                              handleCheckboxChange1(e, item.a_menuid)
                            }
                          />
                        </td>
                        <td style={{ display: "none" }} id="a_menuid">
                          {item.a_menuid}
                        </td>
                        <td id="m_menuname">{item.m_menuname}</td>
                        <td className="pl-4 text-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked={menuDataArray.some(
                              (data) =>
                                data.a_menuid === item.a_menuid &&
                                data.a_addaccess === "1"
                            )}
                            id="a_addaccess"
                            onChange={(e) =>
                              handleCheckboxChange(e, item.a_menuid)
                            }
                          />
                        </td>

                        <td className="pl-4 text-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked={menuDataArray.some(
                              (data) =>
                                data.a_menuid === item.a_menuid &&
                                data.a_editaccess === "1"
                            )}
                            id="a_editaccess"
                            onChange={(e) =>
                              handleCheckboxChange(e, item.a_menuid)
                            }
                          />
                        </td>
                        <td className="pl-4 text-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked={menuDataArray.some(
                              (data) =>
                                data.a_menuid === item.a_menuid &&
                                data.a_viewaccess === "1"
                            )}
                            id="a_viewaccess"
                            onChange={(e) =>
                              handleCheckboxChange(e, item.a_menuid)
                            }
                          />
                        </td>
                        <td className="pl-4 text-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked={menuDataArray.some(
                              (data) =>
                                data.a_menuid === item.a_menuid &&
                                data.a_deleteaccess === "1"
                            )}
                            id="a_deleteaccess"
                            onChange={(e) =>
                              handleCheckboxChange(e, item.a_menuid)
                            }
                          />
                        </td>
                        <td className="pl-4 text-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked={menuDataArray.some(
                              (data) =>
                                data.a_menuid === item.a_menuid &&
                                data.a_workflow === "1"
                            )}
                            id="a_workflow"
                            onChange={(e) =>
                              handleCheckboxChange(e, item.a_menuid)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className="card-footer">
                <div className="row">
                  <div className="col-lg-12 text-end">
                    <button
                      className="btn btn-md text-light"
                      type="button"
                      style={{ backgroundColor: "#1B5A90" }}
                      onClick={() => {
                        addRoleMaster();
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

export default AddRoleMaster;
