import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../Css/MeetingCalendar.css';
import { Modal, Button } from 'react-bootstrap';

const localizer = momentLocalizer(moment);

function MeetingCalendar() {
    const [events, setEvents] = useState([]); // Store scheduled meetings
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [meetingTitle, setMeetingTitle] = useState('');
    const [meetingDate, setMeetingDate] = useState(''); // Change to empty string
    const [meetingTime, setMeetingTime] = useState('');
    const [showModal, setShowModal] = useState(false)

    // Your Zoom API credentials
    const ZOOM_API_KEY = 'YOUR_ZOOM_API_KEY';
    const ZOOM_API_SECRET = 'YOUR_ZOOM_API_SECRET';


    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        // Function to create a Zoom meeting
        const createZoomMeeting = async () => {
            const startTime = new Date(`${meetingDate}T${meetingTime}`);
            const endTime = moment(startTime).add(1, 'hour').toDate();

            try {
                const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${ZOOM_API_SECRET}`,
                    },
                    body: JSON.stringify({
                        topic: meetingTitle,
                        type: 2, // Scheduled meeting
                        start_time: startTime.toISOString(),
                        duration: 60, // Meeting duration in minutes (1 hour)
                        timezone: 'UTC', // Timezone
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const newMeeting = {
                        title: meetingTitle,
                        start: startTime,
                        end: endTime,
                        desc: meetingTitle,
                        zoomMeetingId: data.id,
                    };
                    setEvents([...events, newMeeting]);
                    setIsModalOpen(false); // Close the modal after scheduling
                } else {
                    // Handle errors
                    alert('Failed to create a Zoom meeting. Please try again later.');
                }
            } catch (error) {
                console.error('Error creating Zoom meeting:', error);
                alert('An error occurred while creating the Zoom meeting.');
            }
        };

        if (isModalOpen && meetingTitle && meetingDate && meetingTime) {
            createZoomMeeting();
        }
    }, [isModalOpen, meetingTitle, meetingDate, meetingTime, events]);

    const handleSelectSlot = (slotInfo) => {
        setSelectedSlot(slotInfo);
        setIsModalOpen(true); // Open the modal for scheduling
    };

    const handleCreateMeeting = () => {
        if (meetingTitle && meetingDate && meetingTime) {
            const newMeeting = {
                title: meetingTitle,
                start: new Date(`${meetingDate}T${meetingTime}`),
                end: moment(`${meetingDate}T${meetingTime}`).add(1, 'hour').toDate(), // Meeting duration is 1 hour
                desc: meetingTitle,
            };
            setEvents([...events, newMeeting]);
            setIsModalOpen(false);
            // Close the modal after scheduling
            setMeetingTitle('');
            setMeetingDate('');
            setMeetingTime('');
        } else {
            // Handle validation or show an error message
            alert('Please fill in all fields.');
        }
    };

    const CustomModal = ({ isOpen, onClose }) => {
        return (
            <div className={`modal1 ${isOpen ? 'open' : ''}`}>
                <div className="modal1-dialog" >
                    <div className="modal-content">
                        <div className="modal-header">

                            <h5 className="modal-title">Schedule a New Meeting</h5>
                            <button type="button" className="close" onClick={onClose}>
                                &times;
                            </button>
                        </div>
                        <hr style={{ "backgroundColor": "black" }} />
                        <div className="modal-body">
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="meetingTitle" className="form-label">Meeting Title:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="meetingTitle"
                                                aria-describedby="meetingTitle"
                                                value={meetingTitle}
                                                onChange={(e) => setMeetingTitle(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="meetingDate" className="form-label">Date:</label>
                                            <input type="date" className="form-control" id="meetingDate" aria-describedby="meetingDate" value={meetingDate}
                                                onChange={(e) => setMeetingDate(e.target.value)} />

                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="meetingTime" className="form-label">Time:</label>
                                            <input type="time" className="form-control" id="meetingTime" aria-describedby="meetingTime" value={meetingTime}
                                                onChange={(e) => setMeetingTime(e.target.value)} />

                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                        <hr style={{ "backgroundColor": "black" }} />
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleCreateMeeting}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        //     <div
        //     className="modal fade"
        //     id="exampleModal3"
        //     tabIndex="-1"
        //     aria-labelledby="exampleModalLabel"
        //     aria-hidden="true"
        // >
        //     <div className="modal-dialog modal-md">
        //         <div className="modal-content">
        //             <div className="modal-header">
        //                 <h5 className="modal-title text-center" id="exampleModalLabel">
        //                 Schedule a New Meeting
        //                 </h5>
        //                 <button
        //                     type="button"
        //                     className="btn-close"
        //                     data-bs-dismiss="modal"
        //                     aria-label="Close"
        //                 ></button>
        //             </div>
        //             <div className="modal-body">
        //                 <div className='row'>
        //                     <div className='col-lg-12'>
        //                     <form>
        //                             <div className="mb-3">
        //                                 <label htmlFor="meetingTitle" className="form-label">Meeting Title:</label>
        //                                 <input
        //                                     type="text"
        //                                     className="form-control"
        //                                     id="meetingTitle"
        //                                     aria-describedby="meetingTitle"
        //                                     value={meetingTitle}
        //                                     onChange={(e) => setMeetingTitle(e.target.value)}
        //                                 />
        //                             </div>
        //                             <div className="mb-3">
        //                                 <label htmlFor="meetingDate" className="form-label">Date:</label>
        //                                 <input type="date" className="form-control" id="meetingDate" aria-describedby="meetingDate" value={meetingDate}
        //                                     onChange={(e) => setMeetingDate(e.target.value)} />

        //                             </div>
        //                             <div className="mb-3">
        //                                 <label htmlFor="meetingTime" className="form-label">Time:</label>
        //                                 <input type="time" className="form-control" id="meetingTime" aria-describedby="meetingTime" value={meetingTime}
        //                                     onChange={(e) => setMeetingTime(e.target.value)} />

        //                             </div>
        //                         </form>
                              
                               
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="modal-footer">
        //                 <button type="button" className="btn btn-secondary" /* onClick={onClose} */>
        //                     Close
        //                 </button>
        //                 <button type="button" className="btn btn-primary" /* onClick={handleCreateMeeting} */>
        //                     Save
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        );
    };

    return (
        <>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-lg-6'>
                        <h2>Calendar</h2>
                    </div>
                    {/* <div className='col-lg-6'>

                        <button type="button" className="btn btn-primary float-right  ml-3" data-bs-toggle="modal"
                            data-bs-target="#exampleModal3">New Meeting</button>
                        <button type="button" className="btn btn-primary float-right ml-3" data-bs-toggle="modal"
                            data-bs-target="#exampleModal2">Meet Now</button>
                        <button type="button" className="btn btn-primary float-right" data-bs-toggle="modal"
                            data-bs-target="#exampleModal">Join with an ID</button>
                    </div> */}
                </div>
            </div>
            <div style={{ height: '100vh', padding: '10px' }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    className='btn'
                    onSelectSlot={handleSelectSlot}
                    
                    
                />

                {isModalOpen && <CustomModal isOpen={isModalOpen} onClose={closeModal} />}
            </div>

            <div
                className="modal fade"
                id="exampleModal2"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="exampleModalLabel">
                                Meeting Name
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className="form-group form-group-sm">
                                        <input type="text" id="meetingName" name="meetingName" className="form-control mt-3" autoComplete="off" placeholder="Enter meeting name" required />
                                    </div>
                                    <button type="button" className="btn btn-light btn-block" style={{ "border": "1px solid navy" }}>Get link to share</button>
                                    <button type="button" className="btn btn-primary btn-block">Start meeting</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="exampleModalLabel">
                                Join a meeting with an ID
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <div className='col-lg-12'>
                                <div className="form-group form-group-sm">
                                            <label className="control-label">Meeting ID<span className="text-danger">*</span></label>
                                            <input type="text" id="courseName" name="courseName" className="form-control mt-3" autoComplete="off" placeholder="Type a meeting ID" required />
                                        </div>
                                        <div className="form-group form-group-sm">
                                            <label className="control-label">Meeting passcode<span className="text-danger">*</span></label>
                                            <input type="text" id="courseName" name="courseName" className="form-control mt-3" autoComplete="off" placeholder="Type a meeting passcode" required />
                                        </div>
                                  
                                    <button type="button" className="btn btn-primary btn-block">Join meeting</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
{/* 
            {
                isModalOpen === true ? */}
                <div
                className="modal fade"
                id="exampleModal3"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="exampleModalLabel">
                            Schedule a New Meeting
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <div className='col-lg-12'>
                                <form>
                                        <div className="mb-3">
                                            <label htmlFor="meetingTitle" className="form-label">Meeting Title:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="meetingTitle"
                                                aria-describedby="meetingTitle"
                                                value={meetingTitle}
                                                onChange={(e) => setMeetingTitle(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="meetingDate" className="form-label">Date:</label>
                                            <input type="date" className="form-control" id="meetingDate" aria-describedby="meetingDate" value={meetingDate}
                                                onChange={(e) => setMeetingDate(e.target.value)} />

                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="meetingTime" className="form-label">Time:</label>
                                            <input type="time" className="form-control" id="meetingTime" aria-describedby="meetingTime" value={meetingTime}
                                                onChange={(e) => setMeetingTime(e.target.value)} />

                                        </div>
                                    </form>
                                  
                                   
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary">
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* :
            <div/>
            } */}
           
        </>
    );
}

export default MeetingCalendar;
