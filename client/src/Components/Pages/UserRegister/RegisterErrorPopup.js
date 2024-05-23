import React, { useRef, useEffect } from 'react';
import './registerErrorPopup.css';
import { useEffect } from 'react';

export default function RegisterErrorPopup({ onClose, errorMessage }) {
  const popupRef = useRef(null);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, popupRef]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="register-error-popup">
      <div className="popup-content" ref={popupRef}>
        <h2 className="popup-title">Kayıt Hatası</h2>
        <p className="popup-message">{errorMessage}</p>
        <button className="popup-close" onClick={handleClose}>
          Tamam
        </button>
      </div>
    </div>
  );
}
