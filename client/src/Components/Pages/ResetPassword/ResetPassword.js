import React, { useRef } from "react";
import './ResetPassword.css'
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import axios from "axios";



const Reset = () => {
  let navigate = useNavigate();
  const [pass, setPass] = useState()
  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios(``)
    .then((result) => {
    console.log("basarılı")
  })
  .finally(() => navigate('/'))
};

  return (
    <div className="resetpass">
        <label>Yeni Şifreni Gir</label>
        <input type="text" />
        <label>Yeni Şifreni Tekrar Gir</label>
        <input type="text" />
        <input type="submit" value="Sıfırla"  onClick={handleSubmit}/>
    </div>
  );
};

export default Reset;
