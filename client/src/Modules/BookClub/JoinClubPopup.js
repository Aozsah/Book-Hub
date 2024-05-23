import React from 'react';
import './JoinClubPopup.css';

const JoinClubPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Joined Club</h2>
        <p>You have successfully joined this book club.</p>
        <button onClick={onClose} className="close-popup-button">Close</button>
      </div>
    </div>
  );
};

export default JoinClubPopup;
