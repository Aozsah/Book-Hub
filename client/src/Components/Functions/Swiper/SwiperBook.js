import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Typography, message } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/swiper-bundle.min.css';

const { Title } = Typography;

function SwiperBook() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/books')
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error('Error fetching books:', err);
        message.error('Failed to fetch books');
      });
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Title level={2}>Book Carousel</Title>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={30}
        slidesPerView={6}
        navigation
        pagination={{ clickable: true }}
      >
        {Array.isArray(books) && books.map((book) => (
          <SwiperSlide key={book.id} style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to={`/book/${book.id}`}>
              <Card
                hoverable
                cover={
                  <img
                    alt={`${book.name} cover`}
                    src={`${book.cover}?${new Date().getTime()}`}
                    onError={(e) => { e.target.src = 'path/to/default-image.png'; }}
                    style={{ height: '200px', objectFit: 'cover', padding: '10px' }}
                  />
                }
                style={{ width: 150 }}
              >
                <Card.Meta title={book.name} description={`by ${book.author}`} />
              </Card>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperBook;
