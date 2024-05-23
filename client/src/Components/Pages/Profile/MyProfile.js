import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProfilePhotoPopup from './ProfilePhotoPopup';
import { Card, Typography, Button, Input, List, message, Modal } from 'antd';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

function MyProfile() {
  const [user, setUser] = useState({});
  const [books, setBooks] = useState([]);
  const [joinedClubs, setJoinedClubs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('id');

    axios.get(`http://localhost:3001/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setBio(response.data.description);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });

    axios.get(`http://localhost:3001/users/${id}/read-books`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching books data:', error);
      });

    axios.get(`http://localhost:3001/users/${id}/joined-bookclubs`)
      .then((response) => {
        setJoinedClubs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching joined book clubs data:', error);
      });
  }, []);

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleSubmitClick() {
    const id = localStorage.getItem('id');
    axios.put(`http://localhost:3001/users/${id}/description`, { description: bio })
      .then((response) => {
        setUser(response.data);
        setIsEditing(false);
        message.success('Bio updated successfully');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating bio:', error);
        message.error('Failed to update bio');
      });
  }

  function handleTextChange(event) {
    setBio(event.target.value);
  }

  function handlePhotoClick() {
    setIsPopupOpen(true);
  }

  function handleClosePopup() {
    setIsPopupOpen(false);
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
              style={{ height: '100%', objectFit: 'cover', cursor: 'pointer', width: '100%', maxWidth: '300px' }}
            />
          </div>
        }
      >
        <Card.Meta
          title={<Title level={3}>{user.username}</Title>}
          description={
            isEditing ? (
              <>
                <TextArea
                  maxLength={300}
                  value={bio}
                  onChange={handleTextChange}
                  autoSize={{ minRows: 3 }}
                />
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={handleSubmitClick}
                  style={{ marginTop: '10px' }}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <Paragraph>{bio}</Paragraph>
                <Button
                  type="default"
                  icon={<EditOutlined />}
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
              </>
            )
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
            user.profilePicture || require('../../../assets/images/defaultProfilePhoto.jpeg')
          }
        />
      </Modal>
    </div>
  );
}

export default MyProfile;
