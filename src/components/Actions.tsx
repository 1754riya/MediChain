import React from "react";
const Actions = () => {
  const handleDecline = () => {
    alert("Appointment Declined");
  };
  const handleApprove = () => {
    alert("Appointment Approved");
  };
  return (
    <div className="actions">
      <button className="decline" onClick={handleDecline}>
        Decline
      </button>
      <button className="approve" onClick={handleApprove}>
        Approve
      </button>
    </div>
  );
};

export default Actions;
