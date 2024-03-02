import React, { useState, useEffect } from "react";
import {
  Speedometer2,
  Puzzle,
  Grid3x3GapFill,
  ListUl,
  ThreeDotsVertical,
  GearFill,
  PersonFill,
  BellFill,
  FileReport,
  Book,
  BookFill,
  Calendar,
  Chat,
  Wallet,
  ClipboardCheck, 
  GearWideConnected,
  Badge3d,
  CheckCircleFill
} from "react-bootstrap-icons";
import { NavLink, Navigate } from "react-router-dom";
import TheContent from "../TheContent";
import '../Components/Css/Profile.css';


const Home = (props) => {
  const [sidebar, setSidebar] = useState({ data: true });
  const [content, setContent] = useState(true);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };
  const name = !sidebar;
  useEffect(() => {
    const styles = {
      content: {
        width: "80px",
      },
    };
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setSidebar(false);
    } else {
      setSidebar(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const sidebarCollapse = () => {
    setSidebar(name);
  };

  const MoreButton = () => {
    setSidebar(!sidebar);
  };

  const logout = () =>{
    localStorage.removeItem("loginId");
    Navigate("/login")
  }

  return (
    <>
      <div className="wrapper">
        <div className="body-overlay"></div>
        {sidebar && (
          <nav className="sidebar" id="sidebar">
            <div className="sidebar-header">
              <h3>       
                <span text-align="center" className="text-light">{/*  <img src="https://static.vecteezy.com/system/resources/previews/009/123/201/non_2x/lms-logo-lms-letter-lms-letter-logo-design-initials-lms-logo-linked-with-circle-and-uppercase-monogram-logo-lms-typography-for-technology-business-and-real-estate-brand-vector.jpg" alt="" style={{"width":"20%", "height":"3%"}}/> */} LMS Dashboard</span>
              </h3>
            </div>
            <ul className="list-unstyled components">
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
              <br />
              
                <li className="dropdown">
                <NavLink
                  to="/homeSubmenu1"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                  data-bs-target="#homeSubmenu1"
                  role="button"
                  aria-controls="homeSubmenu1"
                >
                  <GearWideConnected style={{ fontSize: "22px" }} />

                  <span className="ms-3">Masters</span>
                </NavLink>
                <ul className="collapse list-unstyled menu" id="homeSubmenu1">
                  <li>
                    <NavLink
                      to="/employeeMaster"
                      onClick={() => setSidebar(!sidebar)}
                    >
                      Employee Master
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/topicMaster" onClick={() => setSidebar(!sidebar)}>
                      Topic Master
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/kpiMaster"
                      onClick={() => setSidebar(!sidebar)}
                    >
                      KPI Master
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/competencyMaster"
                      onClick={() => setSidebar(!sidebar)}
                    >
                      Competency Master
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/designationMaster"
                      onClick={() => setSidebar(!sidebar)}
                    >
                      Designation Master
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/departmentMaster"
                      onClick={() => setSidebar(!sidebar)}
                    >
                      Department Master
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/roleMaster"
                      onClick={() => setSidebar(!sidebar)}
                    >
                      Role Master
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <NavLink
                  to="/pageSubmenu2"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                  data-bs-target="#pageSubmenu2"
                  role="button"
                  aria-controls="#pageSubmenu2"
                >
                  <BookFill style={{ fontSize: "22px" }} />

                  <span className="ms-3">Transaction</span>
                </NavLink>
                <ul className="collapse list-unstyled menu" id="pageSubmenu2">
              
                  <li>
                    <NavLink
                      to="/trainingForm"
                      onClick={() => setSidebar(!sidebar)}
                    >
                      Training Form
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/trainingSchedule"
                      onClick={() => setSidebar(!sidebar)}
                    >
                     Training Schedule
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/trainingFeedback"
                      onClick={() => setSidebar(!sidebar)}
                    >
                     Training Feedback
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/trainingView"
                      onClick={() => setSidebar(!sidebar)}
                    >
                     Training View
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <NavLink
                  to="/reports"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                  data-bs-target="#reports"
                  role="button"
                  aria-controls="#reports"
                >
                  <ClipboardCheck style={{ fontSize: "22px" }} />

                  <span className="ms-3">Reports</span>
                </NavLink>
                <ul className="collapse list-unstyled menu" id="reports">
              
                  <li>
                    <NavLink
                      to="/competencyChart"
                      onClick={() => setSidebar(!sidebar)}
                    >
                      Competency chart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/employeeCompetency"
                      onClick={() => setSidebar(!sidebar)}
                    >
                      Employee Competency 
                    </NavLink>
                  </li>

                </ul>
              </li>
              <li className="dropdown">
                <NavLink
                  to="/approval"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                  data-bs-target="#approval"
                  role="button"
                  aria-controls="#approval"
                >
                  <CheckCircleFill style={{ fontSize: "22px" }} />

                  <span className="ms-3">Approval</span>
                </NavLink>
                <ul className="collapse list-unstyled menu" id="approval">
              
                  <li>
                    <NavLink
                      to="/trainingApprovalForm"
                      onClick={() => setSidebar(!sidebar)}
                    >
                      Training Approval
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink
                      to="/employeeCompetency"
                      onClick={() => setSidebar(!sidebar)}
                    >
                      Employee Competency 
                    </NavLink>
                  </li> */}

                </ul>
              </li>
            </ul>
          </nav>
        )}

        <div id="content" style={{ width: sidebar ? content : "100%" }}>
          {content && (
            <div className="top-navbar ">
              <nav className="navbar navbar-expand-lg sticky-top " style={{ backgroundColor: '#1B5A90' }}>
                <button
                  type="button"
                  id="sidebar-collapse"
                  className="d-xl-block d-lg-block d-md-none d-none mx-2"
                >
                  {/* <span className="material-icons" onClick={sidebarCollapse}>
                    toc
                  </span> */}
                  <ListUl style={{ fontSize: '24px', marginBottom: '5px', transform: 'rotate(180deg)', color: 'white' }} onClick={sidebarCollapse} />
                </button>
                <NavLink className="navbar-brand text-white" to="/">
                  {/* Dashboard */}
                </NavLink>
                <button
                  id="exnavbar"
                  className="collapse d-inline-block d-lg-none d-sm-block d-block ms-auto more-button"
                  type="button"
                  data-bs-toggle="collapse" /* onClick={()=>setSidebarShow(true)} */
                  // data-bs-target="#navbarSupportedContent"
                  // aria-controls="navbarSupportedContent"
                  data-bs-target="#sidebar"
                  aria-controls="sidebar"
                  aria-expanded="true" /* aria-label="Toggle navigation" */
                >
                  {/* <span className="material-icons" onClick={MoreButton}>
                    more_vert
                  </span> */}
                  <ThreeDotsVertical style={{ fontSize: '22px', color: 'white' }} onClick={MoreButton} />
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
                        {/* <span className="material-icons">notifications</span> */}
                        <BellFill style={{ fontSize: '20px', color: 'white' }} />
                        <span className="notification text-white">4</span>
                      </NavLink>
                      <ul
                        className="dropdown-menu"
                        style={{ marginRight: "auto" }}
                      >
                        <li>
                          <NavLink to="/">You have 4 New Message</NavLink>
                        </li>
                        <li>
                          <NavLink to="/">You have 4 New Message</NavLink>
                        </li>
                        <li>
                          <NavLink to="/">You have 4 New Message</NavLink>
                        </li>
                        <li>
                          <NavLink to="/" className="nMsg">
                            You have 4 New Message
                          </NavLink>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item">
                      <NavLink className="nav-link" to="/">
                        {/* <span className="material-icons">apps</span> */}
                        <Grid3x3GapFill style={{ fontSize: '22px', color: 'white' }} />

                      </NavLink>
                    </li>
                    <li className="nav-item ">
                      <div className="nav-link" onClick={toggleMenu} >
                        {/* <span className="material-icons">person</span> */}

                        <PersonFill style={{ fontSize: '24px', color: 'white' }} />

                        <div className={`sub-menu-wrap ${isSubMenuOpen ? 'open-menu' : ''}`} id="subMenu" style={{ "backgroundColor": "rgb(27, 90, 144)" }}>
                          <div className='sub-menu'>
                            <div className='user-info'>
                              <img src='Images/user.png' alt='User' />
                              <h4></h4>
                            </div>
                          </div>
                          <hr className="sub-menu-hr"/>
                          <NavLink to="/profile" className='sub-menu-link'>
                            <img src='Images/profile.png' alt='Profile' />
                            <p>Edit Profile</p>
                            <span></span>
                          </NavLink>
                          <NavLink to="/" className='sub-menu-link'>
                            <img src='Images/setting.png' alt='Settings' />
                            <p>Setting & Privacy</p>
                            <span></span>
                          </NavLink>
                          <NavLink to="/" className='sub-menu-link'>
                            <img src='Images/help.png' alt='Help' />
                            <p>Help & Support</p>
                            <span></span>
                          </NavLink>
                          <NavLink to="/" className='sub-menu-link'>
                            <img src='Images/logout.png' alt='Logout' />
                            <p onClick={logout}>Logout</p>
                            <span></span>
                          </NavLink>
                        </div>
                      </div>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/">
                        {/*<span className="material-icons">settings</span>*/}
                        <GearFill style={{ fontSize: '24px', color: 'white' }} />

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
