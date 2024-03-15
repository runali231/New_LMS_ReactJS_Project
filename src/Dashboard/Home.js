import React, { useState, useEffect } from "react";
import {
  Speedometer2,
  GearWideConnected,
  BellFill,
  Grid3x3GapFill,
  GearFill,
  PersonFill,
  ListUl,
  ThreeDotsVertical,
  CheckCircleFill,
  ClipboardCheck,
  BookFill // Import the BookFill icon
} from "react-bootstrap-icons";
import axios from "axios";
import { NavLink, Navigate } from "react-router-dom";
import TheContent from "../TheContent";
import "../Components/Css/Profile.css";
import UrlData from "../Components/UrlData";

const Home = () => {
  const [sidebarData, setSidebarData] = useState([]);
  const [sidebar, setSidebar] = useState(true);
  const [content, setContent] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 720) {
        setSidebar(false);
      } else {
        setSidebar(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = () => {
    const getLoginId = localStorage.getItem("loginId");
    axios({
      method: "get",
      url: new URL(
        UrlData + `GetWebMenu/GetAll?RoleId=${getLoginId}`
      ),
    })
      .then((response) => {
        console.log("response get sidebar menu", response.data.data);
        setSidebarData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleDropdown = (menuId) => {
    setOpenDropdown(openDropdown === menuId ? null : menuId);
  };

  const logout = () => {
    localStorage.removeItem("loginId");
    Navigate("/login");
  };

  return (
    <>
      <div className="wrapper">
        <div className="body-overlay"></div>
        {sidebar && (
          <nav className="sidebar" id="sidebar">
            <div className="sidebar-header">
              <h3>
                <span className="text-light">LMS Dashboard</span>
              </h3>
            </div>
            <ul className="list-unstyled components">
              {/* Filter and sort the sidebarData array */}
              <li className="active">
                <div className="dashboard">
                  <NavLink to="/" className="dashboard">
                    <Speedometer2 style={{ fontSize: "22px" }} />
                    <span className="ms-3">dashboard</span>
                    <span className="badge bg-primary ms-5">New</span>
                  </NavLink>
                </div>
              </li>
              <div className="small-screen navbar-display d-lg-none d-md-none d-xl-none d-none">
                {/* Rest of your small screen navigation */}
              </div>
              {/* <br /> */}
              {sidebarData
                .filter(item => ["Master", "Transaction", "Reports", "Approval"].includes(item.m_menuname))
                .sort((a, b) => {
                  const menuOrder = ["Master", "Transaction", "Reports", "Approval"];
                  return menuOrder.indexOf(a.m_menuname) - menuOrder.indexOf(b.m_menuname);
                })
                .map((menuItem, index) => (
                  <li className="dropdown" key={index}>
                    <NavLink
                      to={menuItem.m_action}
                      onClick={() => toggleDropdown(menuItem.m_id)}
                      data-bs-toggle="collapse"
                      aria-expanded={
                        openDropdown === menuItem.m_id ? "true" : "false"
                      }
                      className="dropdown-toggle"
                      data-bs-target={`#menu-${menuItem.m_id}`}
                      role="button"
                      aria-controls={`menu-${menuItem.m_id}`}
                    >
                      {menuItem.m_menuname === "Transaction" ? ( // Check if dropdown name is "Transaction"
                        <BookFill style={{ fontSize: "22px" }} /> // Use BookFill icon
                      ) 
                      : menuItem.m_menuname === "Approval" ? (
                        <CheckCircleFill style={{ fontSize: "22px" }} />
                      )
                      : menuItem.m_menuname === "Reports" ? (
                        <ClipboardCheck style={{ fontSize: "22px" }} />
                      )
                      : (
                        <GearWideConnected style={{ fontSize: "22px" }} />
                      )}
                      <span className="ms-3">{menuItem.m_menuname}</span>
                    </NavLink>
                    {/* Submenu */}
                    <ul
                      className={`collapse list-unstyled menu ${
                        openDropdown === menuItem.m_id ? "show" : ""
                      }`}
                      id={`menu-${menuItem.m_id}`}
                    >
                      {sidebarData
                        .filter(
                          (subMenuItem) =>
                            subMenuItem.ParentId !== menuItem.ParentId
                        )
                        .map((subMenuItem, subIndex) => (
                          <li key={subIndex}>
                            <NavLink to={subMenuItem.m_action}>
                              {subMenuItem.m_menuname}
                            </NavLink>
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
            </ul>
          </nav>
        )}

        <div id="content" style={{ width: sidebar ? content : "100%" }}>
          {content && (
            <div className="top-navbar ">
              <nav
                className="navbar navbar-expand-lg sticky-top "
                style={{ backgroundColor: "#1B5A90" }}
              >
                <button
                  type="button"
                  id="sidebar-collapse"
                  className="d-xl-block d-lg-block d-md-none d-none mx-2"
                >
                  <ListUl
                    style={{
                      fontSize: "24px",
                      marginBottom: "5px",
                      transform: "rotate(180deg)",
                      color: "white",
                    }}
                    onClick={() => setSidebar(!sidebar)}
                  />
                </button>
                <NavLink className="navbar-brand text-white" to="/">
                  {/* Dashboard */}
                </NavLink>
                <button
                  id="exnavbar"
                  className="collapse d-inline-block d-lg-none d-sm-block d-block ms-auto more-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#sidebar"
                  aria-controls="sidebar"
                  aria-expanded="true"
                >
                  <ThreeDotsVertical
                    style={{ fontSize: "22px", color: "white" }}
                    onClick={() => setSidebar(!sidebar)}
                  />
                </button>

                <div
                  className="collapse navbar-collapse d-lg-block d-xl-block d-sm-none d-md-none d-none"
                  id="navbarSupportedContent"
                >
                  <ul className="nav navbar-nav ms-auto">
                    <li className="nav-item dropdown active">
                      <NavLink
                        className="nav-link"
                        to="/"
                        data-toggle="dropdown"
                      >
                        <BellFill
                          style={{ fontSize: "20px", color: "white" }}
                        />
                        <span className="notification text-white">4</span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/">
                        <Grid3x3GapFill
                          style={{ fontSize: "22px", color: "white" }}
                        />
                      </NavLink>
                    </li>
                    <li className="nav-item ">
                      <div
                        className="nav-link"
                        onClick={() => setSidebar(!sidebar)}
                      >
                        <PersonFill
                          style={{ fontSize: "24px", color: "white" }}
                        />
                        <div className="sub-menu-wrap">
                          <div className="sub-menu">
                            <div className="user-info">
                              <img src="Images/user.png" alt="User" />
                              <h4></h4>
                            </div>
                          </div>
                          <hr className="sub-menu-hr" />
                          <NavLink to="/profile" className="sub-menu-link">
                            <img src="Images/profile.png" alt="Profile" />
                            <p>Edit Profile</p>
                            <span></span>
                          </NavLink>
                          <NavLink to="/" className="sub-menu-link">
                            <img src="Images/setting.png" alt="Settings" />
                            <p>Setting & Privacy</p>
                            <span></span>
                          </NavLink>
                          <NavLink to="/" className="sub-menu-link">
                            <img src="Images/help.png" alt="Help" />
                            <p>Help & Support</p>
                            <span></span>
                          </NavLink>
                          <NavLink to="/" className="sub-menu-link">
                            <img src="Images/logout.png" alt="Logout" />
                            <p onClick={logout}>Logout</p>
                            <span></span>
                          </NavLink>
                        </div>
                      </div>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/">
                        <GearFill
                          style={{ fontSize: "24px", color: "white" }}
                        />
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          )}
          <TheContent />
        </div>
      </div>
    </>
  );
};

export default Home;
