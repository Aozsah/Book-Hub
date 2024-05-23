import React from 'react';
import './readBookPopup.css';

const ReadBookPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Book Read</h2>
        <p>This book has been marked as read.</p>
        <button onClick={onClose} className="close-popup-button">Close</button>
      </div>
    </div>
  );
};

export default ReadBookPopup;
