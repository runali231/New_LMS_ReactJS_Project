import React,{useEffect, useState} from "react";
import UserId from "../UserId";
import axios from "axios";
import UrlData from "../UrlData";

const ApprovalEmail = () => {
  const [empId, setEmpId] = useState("")
  const [trId, setTrId] = useState("")
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const trainingId = params.get("trainingId");
    const employeeId = params.get("employeeId");
    setEmpId(employeeId)
    setTrId(trainingId)
    console.log(trainingId, employeeId); // Check if values are correctly obtained
    // You can use trainingId and employeeId in your logic here
  }, []);
  const AcceptSchedule = () => {
    let data;

    data = {
      userId: UserId,
      ts_empid: empId,
      ts_tag: "Accepted",
      ts_id: trId,
    };

    axios({
      method: "post",
      url: new URL(UrlData + `TrainingSchedule/UpdateTag`),
      data: data,
    })
      .then((response) => {
        console.log(response, "add update tag");
        alert("Your response has been accepted!");
        window.close();
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong");
      });
  };
  const RejectSchedule = () => {
    let data;

    data = {
      userId: UserId,
      ts_empid: empId,
      ts_tag: "Rejected",
      ts_id: trId,
    };

    axios({
      method: "post",
      url: new URL(UrlData + `TrainingSchedule/UpdateTag`),
      data: data,
    })
      .then((response) => {
        console.log(response, "add update tag");
        alert("Your response has been Rejected!");
        window.close();
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong");
      });
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-5">
            <div className="card p-5 m-3 shadow">
              <div style={{ fontFamily: "Arial, sans-serif" }}>
                <h2 className="text-center">Approval for Attending Training</h2>
                <div className="text-center mt-5">
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={AcceptSchedule}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={RejectSchedule}
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
    </>
  );
};

export default ApprovalEmail;
