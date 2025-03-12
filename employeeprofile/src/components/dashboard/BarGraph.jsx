import React from "react";
import { Bar } from "react-chartjs-2";
import styles from "./BarGraph.module.css"; // Import styles

const BarGraph = ({ workHoursData = {} }) => {
  // Ensure workHoursData is always an object with default empty values
  const validData = workHoursData && Object.keys(workHoursData).length > 0 ? workHoursData : {
    Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0
  };

  const data = {
    labels: Object.keys(validData),
    datasets: [
      {
        label: "Work Hours",
        data: Object.values(validData),
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue color
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 10, // Assuming max work hours per day is 10
      },
    },
  };

  return (
    <div className={styles.graphContainer}>
      <h2 className={styles.title}>Weekly Work Hours</h2>
      <div className={styles.barGraph}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarGraph;
