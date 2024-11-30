// App.js
import React from "react";

import "./index.css";

const Dashboard = () => {
  return (
    <div className="appointment-container">
      <Header />
      <PersonalDetails />
      <BookingInfo />
      <PlanningSchedule />
      <Actions />
    </div>
  );
};

export default Dashboard;
