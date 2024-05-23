import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Form, Button, Input, message, Avatar, Card, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import './bookComment.css';

const { TextArea } = Input;

function BookComment({ bookId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [bookId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/books/${bookId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    const userId = localStorage.getItem('id');

    if (!userId) {
      message.error('You must be logged in to post a comment.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post(`http://localhost:3001/comments/${bookId}`, {
        userId,
        bookId,
        comment: newComment,
      });

      setComments([...comments, response.data]);
      setNewComment('');
      window.location.reload(); // Reload the page after posting a comment
    } catch (error) {
      console.error('Error posting comment:', error);
      message.error('Failed to post comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="book-comment-section">
      <h3>Comments</h3>
      <Form.Item>
        <TextArea
          rows={4}
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={handleCommentSubmit}
          type="primary"
        >
          Post Comment
        </Button>
      </Form.Item>
      <List
        className="comments-list"
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(item) => (
          <li>
            <Card className="comment-item">
              <Card.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={item.User?.username || 'Unknown'}
                description={
                  <div>
                    <p>{item.comment}</p>
                    <Tooltip title={moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                      <span>{moment(item.createdAt).fromNow()}</span>
                    </Tooltip>
                  </div>
                }
              />
            </Card>
          </li>
        )}
      />
    </div>
  );
}

export default BookComment;
