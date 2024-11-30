import React from "react";

const PlanningSchedule = () => {
  return (
    <div className="planning-schedule">
      <h4>Planning Schedule</h4>
      <div className="schedule-item">
        <p>
          <strong>12 Oct 2023 • 10:30 AM</strong>
        </p>
        <p>Check up tooth</p>
        <p>
          <strong>Doctor:</strong> Drg. Dianne Rachel
        </p>
        <p>
          <strong>Room:</strong> Dental A12
        </p>
      </div>
      <div className="schedule-item">
        <p>
          <strong>12 Oct 2023 • 10:30 AM</strong>
        </p>
        <p>Prosthetic Tooth Fabrication</p>
        <p>
          <strong>Doctor:</strong> Drg. Dianne Rachel
        </p>
        <p>
          <strong>Room:</strong> Laboratorium Tooth 1
        </p>
      </div>
    </div>
  );
};

export default PlanningSchedule;
