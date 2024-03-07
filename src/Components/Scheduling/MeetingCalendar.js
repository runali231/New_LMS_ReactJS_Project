import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../Css/MeetingCalendar.css";
import { Modal, Button } from "react-bootstrap";
import UrlData from "../UrlData";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);

function MeetingCalendar() {
  const navigate = useNavigate();
  const [allTrainingSchedule, setAllTrainingSchedule] = useState([]);

  useEffect(() => {
    getAllTrainingSchedule();
  }, []);

  const getAllTrainingSchedule = () => {
    axios
      .get(new URL(UrlData + `TrainingSchedule/GetAllCalenderPlot`))
      .then((response) => {
        console.log("get all Schedule", response.data.data);
        setAllTrainingSchedule(
          response.data.data.map((event) => ({
            id: event.ts_id,
            title: event.ts_topic,
            start: new Date(event.ts_dt_tm_fromtraining), // Convert start time to Date object
            end: new Date(event.ts_dt_tm_totraining), // Convert end time to Date object
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelectEvent = (event) => {
    console.log("Selected event:", event);
    navigate(`/addTrainingSchedule/${event.id}`);
    // Handle the selected event
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-lg-6">
            <h2>Calendar</h2>
          </div>
        </div>
      </div>
      <div style={{ height: "100vh", padding: "10px" }}>
        <Calendar
          localizer={localizer}
          events={allTrainingSchedule}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
        />
      </div>
    </>
  );
}

export default MeetingCalendar;
