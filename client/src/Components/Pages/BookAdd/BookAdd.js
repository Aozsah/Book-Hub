import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookAdd.css';
import axios from 'axios';

function BookAdd() {
  const [cover, setCover] = useState(null);
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  function handleCoverChange(event) {
    const file = event.target.files[0];
    setCover(file);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('cover', cover);
    formData.append('name', name);
    formData.append('author', author);
    formData.append('description', description);

    try {
      const response = await axios.post("http://localhost:3001/bookadd", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Success:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <form className="book-add-form" onSubmit={handleSubmit}>
      <div className="book-add-form-cover">
        <label>
          Book Cover:
          <input type="file" onChange={handleCoverChange} />
        </label>
        {cover && <img src={URL.createObjectURL(cover)} alt="Book cover" className="cover-img" />}
      </div>
      <div className="book-add-form-name">
        <label>
          Book Name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
      </div>
      <div className="book-add-form-author">
        <label>
          Author:
          <input type="text" value={author} onChange={(event) => setAuthor(event.target.value)} />
        </label>
      </div>
      <div className="book-add-form-summary">
        <label>
          Description:
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
        </label>
      </div>
      <button className="book-add-form-submit" type="submit">Add Book</button>
    </form>
  );
}

export default BookAdd;
