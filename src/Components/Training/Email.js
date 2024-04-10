import React, { useState } from "react";
import { Alert } from "react-bootstrap";

function Email({ trainingDetails }) {
  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(true);
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
  return (
    // <div className="container-fluid">
    //   <div className="row">
    //     <div className="col-lg-4"></div>
    //     <div className="col-lg-5">
    //       <div className="card p-5 m-3 shadow">
    //         <div style={{ fontFamily: "Arial, sans-serif" }}>
    //           <h2 className="text-center">Training Schedule</h2>
    //           {show ? (
    //             <Alert
    //               variant="success"
    //               onClose={() => setShow(false)}
    //               dismissible
    //               className="mt-5 text-center fw-bold"
    //             >
    //               <h4 className="fw-bold">Training Scheduled Approved</h4>
    //             </Alert>
    //           ) : null}
    //            {show1 ? (
    //             <Alert
    //               variant="danger"
    //               onClose={() => setShow1(false)}
    //               dismissible
    //               className="mt-5 text-center fw-bold"
    //             >
    //               <h4 className="fw-bold">The following users did not attend the training session</h4>
    //             </Alert>
    //           ) : null}
    //           <h5 className="mt-5 fw-bold">Dear XYZ,</h5>
    //           <p className="fw-bold mt-4">
    //             Please note the following details for an training schedule{" "}
    //           </p>
    //           <p>
    //             <strong>Date:</strong> {"February 20, 2024"}
    //           </p>
    //           <p>
    //             <strong>Time:</strong> {"9:00 AM - 12:00 PM"}
    //           </p>
    //           <p>
    //             <strong>Location:</strong> {"Training Room 1"}
    //           </p>
    //           <p>
    //             <strong>Trainer:</strong> {"John Doe"}
    //           </p>
    //           <p>
    //             <strong>Agenda:</strong> {"Introduction to ReactJS"}
    //           </p>
    //           <p>
    //             <strong>Note:</strong>{" "}
    //             {"Please bring your laptop for hands-on exercises."}
    //           </p>
    //           <div className="text-center mt-5">
    //             <button className="btn btn-success" type="button">
    //               Accept
    //             </button>
    //             <button
    //               className="btn btn-danger"
    //               type="button"
    //               style={{ marginLeft: "0.5rem" }}
    //             >
    //               Reject
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-lg-4"></div>
    //   </div>
    // </div>
    <div className="container-fluid">
    <div className="row">
      <div className="col-lg-4"></div>
      <div className="col-lg-5">
        <div className="card p-5 m-3 shadow">
          <div style={{ fontFamily: "Arial, sans-serif" }}>
            <h2 className="text-center">Training Schedule</h2>
            <h5 className="mt-5 fw-bold">Dear XYZ,</h5>
            <p className="fw-bold mt-4">
              Please note the following details for an training schedule{" "}
            </p>
            <p>
              <strong>Date:</strong> {"February 20, 2024"}
            </p>
            <p>
              <strong>Time:</strong> {"9:00 AM - 12:00 PM"}
            </p>
            <p>
              <strong>Location:</strong> {"Training Room 1"}
            </p>
            <p>
              <strong>Trainer:</strong> {"John Doe"}
            </p>
            <p>
              <strong>Agenda:</strong> {"Introduction to ReactJS"}
            </p>
            <p>
              <strong>Note:</strong>{" "}
              {"Please bring your laptop for hands-on exercises."}
            </p>
            <div className="text-center mt-5">
              <button className="btn btn-success" type="button">
                Accept
              </button>
              <button
                className="btn btn-danger"
                type="button"
                style={{ marginLeft: "0.5rem" }}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4"></div>
    </div>
  </div>
  );
}


export default Email;
