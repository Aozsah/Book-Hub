import React, { useRef, useEffect } from 'react';
import './LoginErrorPopup.css';

export default function LoginErrorPopup({ onClose, errorMessage }) {
  const popupRef = useRef(null);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      onClose();
    }, 3000);
    
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(timeoutId);
    };
  }, [onClose, popupRef]);

  return (
    <div className="login-error-popup">
      <div className="popup-content" ref={popupRef}>
        <h2 className="popup-title">Giriş Hatası</h2>
        <p className="popup-message">{errorMessage}</p>
        <button className="popup-close" onClick={handleClose}>
          Tamam
        </button>
      </div>
    </div>
  );
}
