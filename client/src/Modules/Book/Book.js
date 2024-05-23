import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Book.css';
import ReadBookPopup from './readBookPopup';
import BookComment from './bookComment';

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [nextBookId, setNextBookId] = useState(undefined);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [readers, setReaders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/book/${id}`)
      .then(response => {
        console.log('Book data:', response.data);
        setBook(response.data);
      })
      .catch(error => {
        console.error('Error fetching book:', error);
      });
  }, [id]);

  useEffect(() => {
    if (!book || !book.id) {
      return;
    }

    axios.get(`http://localhost:3001/book/${book.id}`)
      .then(response => {
        console.log('Next book ID data:', response.data);
        setNextBookId(response.data.id);
      })
      .catch(error => {
        console.error('Error fetching next book ID:', error);
      });

    axios.get(`http://localhost:3001/books/${book.id}/users`)
      .then(response => {
        console.log('Readers data:', response.data);
        setReaders(response.data);
      })
      .catch(error => {
        console.error('Error fetching readers:', error);
      });
  }, [book]);

  const handleNextClick = () => {
    if (book && book.id) {
      const nextId = book.id + 1;
      window.location.href = `/book/${nextId}`;
    }
  };

  const handleReadClick = () => {
    const userId = localStorage.getItem('id');
    if (userId && book && book.id) {
      axios.post('http://localhost:3001/read-books', {
        userId: parseInt(userId, 10), 
        bookId: book.id
      })
      .then(response => {
        console.log('Book marked as read:', response.data);
        setIsPopupOpen(true);
      })
      .catch(error => {
        console.error('Error marking book as read:', error);
      });
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="book-container">
      {book ? (
        <>
          <h1 className="book-title">{book.name}</h1>
          <div className="book-content">
            <img className="book-cover" src={book.cover} alt="Book Cover" />
            <div className="book-details">
              <p className="book-author"><strong>Author:</strong> {book.author}</p>
              <p className="book-description"><strong>Description:</strong> {book.description}</p>
              <div className="book-buttons">
                <button className="next-book-button" onClick={handleNextClick}>Next Book</button>
                <button className="read-book-button" onClick={handleReadClick}>I've Read This Book</button>
              </div>
              <div className="book-readers">
                <h3>Readers:</h3>
                {readers.length > 0 ? (
                  readers.map(reader => (
                    <p 
                      key={reader.id} 
                      className="book-reader clickable" 
                      onClick={() => navigate(`/profile/${reader.id}`)}
                    >
                      {reader.username || "Default Username"}
                    </p>
                  ))
                ) : (
                  <p>No readers yet.</p>
                )}
              </div>
            </div>
          </div>
          <BookComment bookId={book.id} /> {/* Yorum bileşenini burada kullanıyoruz */}
        </>
      ) : (
        <p>Loading...</p>
      )}
      {isPopupOpen && <ReadBookPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default Book;
