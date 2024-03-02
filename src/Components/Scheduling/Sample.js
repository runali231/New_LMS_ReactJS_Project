// import React, { useState, useEffect } from 'react';

// const Sample = () => {
//     const [trainingSchedule, setTrainingSchedule] = useState([]);
//     const [alertMessage, setAlertMessage] = useState('');

//     // Function to simulate changes in the training schedule
//     const makeChangesToSchedule = () => {
//         // Simulating changes to the schedule
//         const updatedSchedule = [...trainingSchedule];
//         // For demonstration, let's assume we add a new training session
//         updatedSchedule.push({ date: '2024-02-20', time: '10:00 AM', topic: 'New Topic' });
//         setTrainingSchedule(updatedSchedule);

//         // Alerting users about the change
//         setAlertMessage('Training schedule has been updated. Please check the new schedule.');
//     };

//     useEffect(() => {
//         // Simulate fetching training schedule from an API
//         const fetchTrainingSchedule = () => {
//             // Assume the training schedule is fetched from an API
//             const fetchedSchedule = [
//                 { date: '2024-02-18', time: '9:00 AM', topic: 'Topic 1' },
//                 { date: '2024-02-19', time: '11:00 AM', topic: 'Topic 2' }
//             ];
//             setTrainingSchedule(fetchedSchedule);
//         };

//         fetchTrainingSchedule();
//     }, []);

//     return (
//         <div>
//             <h1>Training Schedule</h1>
//             <button onClick={makeChangesToSchedule}>Make Changes to Schedule</button>
//             <ul>
//                 {trainingSchedule.map((session, index) => (
//                     <li key={index}>{session.date} - {session.time} - {session.topic}</li>
//                 ))}
//             </ul>
//             {alertMessage && <div className="alert">{alertMessage}</div>}
//         </div>
//     );
// };

// export default Sample;


import React, { useState, useEffect } from 'react';

const Sample = () => {
    const [sessions, setSessions] = useState([]);
    const [users, setUsers] = useState([]);
    const [hodEmails, setHodEmails] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Simulated data for demonstration
    const initialSessions = [
        { id: 1, date: '2024-02-16', time: '10:00', attendance: [] },
        { id: 2, date: '2024-02-17', time: '11:00', attendance: [] },
        { id: 3, date: '2024-02-18', time: '14:00', attendance: [] }
    ];

    const initialUsers = [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
        { id: 3, name: 'User 3' }
    ];

    const initialHodEmails = ['hod1@example.com', 'hod2@example.com'];

    useEffect(() => {
        // Simulate fetching sessions, users, and HOD emails
        setSessions(initialSessions);
        setUsers(initialUsers);
        setHodEmails(initialHodEmails);
    }, []);

    useEffect(() => {
        // Check attendance after a delay to simulate real-time updates
        const checkAttendance = setTimeout(() => {
            sessions.forEach(session => {
                const attendedUsers = session.attendance.map(user => user.id);
                const absentUsers = users.filter(user => !attendedUsers.includes(user.id));

                if (absentUsers.length > 0) {
                    const message = `The following users did not attend the training session on ${session.date} at ${session.time}: ${absentUsers.map(user => user.name).join(', ')}`;
                    
                    // Notify HODs about absent users
                    hodEmails.forEach(email => {
                        alert(`HOD Alert: ${message}`);
                        // In a real-world scenario, you would send an email to each HOD using an email service
                    });
                }
            });
        }, 5000); // Check attendance every 5 seconds

        return () => clearTimeout(checkAttendance); // Clear timeout on component unmount
    }, [sessions, users, hodEmails]);

    return (
        <div>
            <h2>Training Attendance and Alerts</h2>
            <p>Current Time: {currentTime.toLocaleString()}</p>
            <p>Sessions:</p>
            <ul>
                {sessions.map(session => (
                    <li key={session.id}>
                        Date: {session.date}, Time: {session.time}
                    </li>
                ))}
            </ul>
            <p>Users:</p>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name}
                    </li>
                ))}
            </ul>
            <p>HOD Emails:</p>
            <ul>
                {hodEmails.map((email, index) => (
                    <li key={index}>
                        {email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sample;

