import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Avatar, Button, Typography, List, message, Modal, Space, Spin } from 'antd';
import { UserOutlined, LoadingOutlined } from '@ant-design/icons';
import JoinClubPopup from './JoinClubPopup';

const { Title, Paragraph, Text, Link } = Typography;

const BookClub = () => {
  const { id } = useParams();
  const [bookClub, setBookClub] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/bookclub/${id}`)
      .then(response => {
        setBookClub(response.data);
      })
      .catch(error => {
        console.error('Error fetching book club:', error);
      });

    axios.get(`http://localhost:3001/bookclubs/${id}/joined-users`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, [id]);

  const handleJoinClick = () => {
    const userId = localStorage.getItem('id');
    if (userId && bookClub && bookClub.id) {
      axios.post('http://localhost:3001/joined-bookclubs', {
        userId: parseInt(userId, 10),
        bookClubId: bookClub.id
      })
      .then(response => {
        message.success('Joined book club successfully!');
        setIsJoined(true);
        setIsPopupOpen(true);
      })
      .catch(error => {
        console.error('Error joining book club:', error);
        message.error('Failed to join book club.');
      });
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    window.location.reload();  // Reload the page after joining the club
  };

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  if (!bookClub) {
    return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '40px' }}>
      <Card
        style={{ width: '100%', maxWidth: '800px' }}
        cover={<img alt="Book Club Cover" src={bookClub.bookclubimg} style={{ height: '300px', objectFit: 'cover', padding: '10px' }} />}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={2}>{bookClub.name}</Title>
          <Paragraph>
            <Text strong>Description:</Text> {bookClub.description}
          </Paragraph>
          <Paragraph>
            <Text strong>Meeting Link:</Text> <Link href={bookClub.meetinglink} target="_blank">{bookClub.meetinglink}</Link>
          </Paragraph>
          {!isJoined && (
            <Button type="primary" onClick={handleJoinClick} size="large">Join Club</Button>
          )}
          <div>
            <Title level={3}>Members:</Title>
            {users.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={users}
                renderItem={user => (
                  <List.Item onClick={() => handleUserClick(user.userId)} style={{ cursor: 'pointer' }}>
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={user.User.username}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Paragraph>No members yet.</Paragraph>
            )}
          </div>
        </Space>
      </Card>
      <Modal visible={isPopupOpen} onCancel={handleClosePopup} footer={null}>
        <JoinClubPopup onClose={handleClosePopup} />
      </Modal>
    </div>
  );
};

export default BookClub;
