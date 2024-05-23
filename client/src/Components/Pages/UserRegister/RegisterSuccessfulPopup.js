import React, { useRef, useEffect } from 'react';
import './RegisterSuccessfulPopup.css';
import { useNavigate } from 'react-router-dom';

export default function RegisterSuccessfulPopup({ isOpen, onClose }) {
  const navigate = useNavigate();
  const popupRef = useRef(null);

  const handleClose = () => {
    onClose();
    navigate('/login');
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    const timeoutId = setTimeout(() => {
      if (isOpen) {
        handleClose();
      }
    }, 3000);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(timeoutId);
    };
  }, [isOpen, onClose, popupRef]);

  return (
    <div className="register-successful-popup">
      <div className="popup-content" ref={popupRef}>
        <h2 className="popup-title">Kaydın başarıyla tamamlandı</h2>
        <p className="popup-message">Şimdi Giriş Yapabilirsin🙂</p>
        <button className="popup-close" onClick={handleClose}>
          Tamam
        </button>
      </div>
    </div>
  );
}
