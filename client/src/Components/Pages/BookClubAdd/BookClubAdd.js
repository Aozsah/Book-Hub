import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookClubAdd.css';

function BookClubAdd() {
  const [logo, setLogo] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleLogoChange(event) {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (file && allowedTypes.includes(file.type)) {
      setLogo(file);
      setError('');
    } else {
      setError('Invalid file type. Only JPG, JPEG, PNG, and WEBP are allowed.');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('logo', logo);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('meetinglink', meetingLink);

    try {
      const response = await axios.post("http://localhost:3001/bookclubadd", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Success:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error:", error.message);
      setError("Failed to add book club. Please try again.");
    }
  }

  return (
    <form className="book-club-add-form" onSubmit={handleSubmit}>
      <div className="book-club-add-form-cover">
        <label>
          Book Club Logo:
          <input type="file" onChange={handleLogoChange} />
        </label>
        {logo && <img src={URL.createObjectURL(logo)} alt="Book club logo" className="cover-img" />}
      </div>
      <div className="book-club-add-form-name">
        <label>
          Book Club Name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
      </div>
      <div className="book-club-add-form-description">
        <label>
          Description:
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
        </label>
      </div>
      <div className="book-club-add-form-meeting-link">
        <label>
          Meeting Link:
          <input type="text" value={meetingLink} onChange={(event) => setMeetingLink(event.target.value)} />
        </label>
      </div>
      {error && <p className="error-message">{error}</p>}
      <button className="book-club-add-form-submit" type="submit">Add Book Club</button>
    </form>
  );
}

export default BookClubAdd;
