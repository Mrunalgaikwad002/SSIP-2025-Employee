import React, { useState } from "react";
import styles from "./WorkLogProjects.module.css";

const WorkLogProjects = () => {
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [workHours, setWorkHours] = useState("00:00:00");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [selectedStat, setSelectedStat] = useState(null);

  const handleCheckInOut = () => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();

    if (!isCheckedIn) {
      setCheckInTime(now); // Store as Date object
      setCheckOutTime(null);
      setWorkHours("00:00:00");
    } else {
      setCheckOutTime(formattedTime);
      if (checkInTime) calculateWorkHours(checkInTime, now);
    }

    setIsCheckedIn(!isCheckedIn);
  };

  const calculateWorkHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return;

    const diff = checkOut - checkIn;
    const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
    const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

    setWorkHours(`${hours}:${minutes}:${seconds}`);
  };

  const projectData = {
    assigned: 50,
    completed: 42,
    inProcess: 5,
    pending: 3,
    teamsAssigned: 6,
  };

  const projectDetails = {
    assigned: ["Project A", "Project B", "Project C", "Project D"],
    completed: ["Project X", "Project Y", "Project Z"],
    inProcess: ["Project P", "Project Q"],
    pending: ["Project M", "Project N"],
    teamsAssigned: ["Team Alpha", "Team Beta"],
  };

  return (
    <div className={`${styles.container} ${isCheckedIn ? styles.shifted : ""}`}>
      {/* Work Log Section */}
      <div className={`${styles.card} ${styles.workLog}`}>
        <p className={styles.date}>{new Date().toDateString()}</p>
        <h2 className={styles.workTime}>{workHours}</h2>
        <p>Work Time</p>

        <div className={styles.timeRow}>
          <div className={styles.timeBox}>
            <p>Check In</p>
            <span>{checkInTime ? checkInTime.toLocaleTimeString() : "--:--:--"}</span>
          </div>
          <div className={styles.timeBox}>
            <p>Check Out</p>
            <span>{checkOutTime || "--:--:--"}</span>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.checkButton} onClick={handleCheckInOut}>
            {isCheckedIn ? "Check Out" : "Check In"}
          </button>
        </div>
      </div>

      {/* Projects Section */}
      <div className={`${styles.card} ${styles.projects}`}>
        <p className={styles.projectsTitle}>PROJECTS OVERVIEW</p>

        {/* Assigned Projects Section */}
        <div className={styles.statBox} onClick={() => setSelectedStat("assigned")}>
          <p>Projects Assigned</p>
          <span className={`${styles.statValue} ${styles.blue}`}>{projectData.assigned}</span>
        </div>

        <div className={styles.projectStats}>
          <div className={styles.statBox} onClick={() => setSelectedStat("completed")}>
            <p>Projects Completed</p>
            <span className={`${styles.statValue} ${styles.yellow}`}>{projectData.completed}</span>
          </div>
          <div className={styles.statBox} onClick={() => setSelectedStat("inProcess")}>
            <p>Projects In Process</p>
            <span className={`${styles.statValue} ${styles.orange}`}>{projectData.inProcess}</span>
          </div>
          <div className={styles.statBox} onClick={() => setSelectedStat("pending")}>
            <p>Projects Pending</p>
            <span className={`${styles.statValue} ${styles.orange}`}>{projectData.pending}</span>
          </div>
          <div className={styles.statBox} onClick={() => setSelectedStat("teamsAssigned")}>
            <p>Teams Assigned</p>
            <span className={`${styles.statValue} ${styles.orange}`}>{projectData.teamsAssigned}</span>
          </div>
        </div>
      </div>

      {/* Popup Modal for Stats Details */}
      {selectedStat && (
        <div className={styles.modalOverlay} onClick={() => setSelectedStat(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>{selectedStat.replace(/([A-Z])/g, " $1").trim()}</h3>
            <ul>
              {(projectDetails[selectedStat] || []).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button className={styles.closeButton} onClick={() => setSelectedStat(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkLogProjects;





