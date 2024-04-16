import React from "react";

function TrainingEmailView({ }) {

  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-5">
          <div className="card p-5 m-3 shadow">
            <div style={{ fontFamily: "Arial, sans-serif" }}>
              <h2 className="text-center">Approval for Attending Training</h2>
              <h5 className="mt-5">March, 2024</h5>
              <p className="fw-bold mt-4">
               Rachel McFarlin{" "}
              </p>
              <p className=" " style={{marginTop:"-7px"}}>
               HR Assistant
              </p>
              <p style={{marginTop:"-7px"}}>Email: rachel@gmail.com</p>
              <h5 className="mt-5 fw-bold">Dear  Ms. McFarlin,</h5>
              <p>
                I am pleased to inform you that your request to attend the training program has been approved. We recognize the value of professional development and are confident that this opportunity will enhance your skills and contribute to your continued growth within our organization.
              </p>
              <p>The approval of your attendance is subject to the following conditions and instructions:</p>
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


export default TrainingEmailView;
