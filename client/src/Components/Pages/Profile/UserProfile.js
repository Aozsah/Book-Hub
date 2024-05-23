import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ProfilePhotoPopup from './ProfilePhotoPopup';
import { Card, Typography, List, Modal } from 'antd';

const { Title, Paragraph } = Typography;

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [books, setBooks] = useState([]);
  const [joinedClubs, setJoinedClubs] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem('id');

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });

    axios
      .get(`http://localhost:3001/users/${id}/read-books`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching books data:', error);
      });

    axios
      .get(`http://localhost:3001/users/${id}/joined-bookclubs`)
      .then((response) => {
        setJoinedClubs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching joined book clubs data:', error);
      });
  }, [id]);

  function handlePhotoClick() {
    if (currentUserId === id) {
      setIsPopupOpen(true);
    }
  }

  function handleClosePopup() {
    setIsPopupOpen(false);
    window.location.reload();
  }

  function handleBookClick(bookId) {
    navigate(`/book/${bookId}`);
  }

  function handleClubClick(clubId) {
    navigate(`/bookclub/${clubId}`);
  }

  return (
    <div style={{ padding: '20px' }}>
      <Card
        style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
        cover={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              alt="Profile"
              src={user.profilePicture || require('../../../assets/images/defaultProfilePhoto.jpeg')}
              onClick={handlePhotoClick}
              style={{ 
                height: '100%', 
                objectFit: 'cover', 
                cursor: currentUserId === id ? 'pointer' : 'default', 
                width: '100%', 
                maxWidth: '300px' 
              }}
            />
          </div>
        }
      >
        <Card.Meta
          title={<Title level={3}>{user.username}</Title>}
          description={
            <Paragraph>{user.description}</Paragraph>
          }
        />
      </Card>
      <div style={{ marginTop: '20px' }}>
        <Title level={4}>Books I've Read</Title>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={books}
          renderItem={book => (
            <List.Item>
              <Card
                hoverable
                cover={
                  <img
                    alt={book.Book.name}
                    src={book.Book.cover}
                    onClick={() => handleBookClick(book.Book.id)}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                }
              >
                <Card.Meta title={book.Book.name} />
              </Card>
            </List.Item>
          )}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Title level={4}>Joined Book Clubs</Title>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={joinedClubs}
          renderItem={club => (
            <List.Item>
              <Card
                hoverable
                cover={
                  <img
                    alt={club.BookClub.name}
                    src={club.BookClub.bookclubimg}
                    onClick={() => handleClubClick(club.BookClub.id)}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                }
              >
                <Card.Meta title={club.BookClub.name} />
              </Card>
            </List.Item>
          )}
        />
      </div>
      <Modal
        open={isPopupOpen}
        footer={null}
        onCancel={handleClosePopup}
      >
        <ProfilePhotoPopup
          onClose={handleClosePopup}
          currentPhoto={
            user.profilePicture ||
            require('../../../assets/images/defaultProfilePhoto.jpeg')
          }
        />
      </Modal>
    </div>
  );
}

export default UserProfile;
