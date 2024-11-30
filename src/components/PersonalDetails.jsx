import React from "react";
import patientImage from "../assets/patient.jpeg";

const PersonalDetails = () => {
  return (
    <div className="personal-detail">
      <div className="profile">
        <img src={patientImage} alt="Profile" />
        <div className="info">
          <h3>Riya Mehta</h3>
          <p>+91 9999333422 • riruu93@mail.com</p>
        </div>
      </div>
      <div className="reason">
        <h4>Reason</h4>
        <p>
          Eating sweet foods, not brushing your teeth regularly. Often drink
          cold water when eating food that is still hot.
        </p>
      </div>
      <div className="diagnosis">
        <div>
          <h4>Diagnose</h4>
          <p>Cavities, Exposed nerves causing pain, Tartar teeth</p>
        </div>
        <div>
          <h4>Preferred Pharmacy</h4>
          <div className="pharmacy">
            <span>Cataflam 50 mg</span>
            <span>Ponstan 500 mg</span>
            <span>Mefinal 500 mg</span>
            <span>Ibuprofen 400 mg</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
