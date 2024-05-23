import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Typography, message } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/swiper-bundle.min.css';

const { Title } = Typography;

function SwiperBookClub() {
  const [bookClubs, setBookClubs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/bookclubs')
      .then((res) => {
        setBookClubs(res.data);
      })
      .catch((err) => {
        console.log('Error fetching book clubs:', err);
        message.error('Failed to fetch book clubs');
      });
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Title level={2}>Book Club Carousel</Title>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={30}
        slidesPerView={6}
        navigation
        pagination={{ clickable: true }}
      >
        {Array.isArray(bookClubs) && bookClubs.map((bookClub) => (
          <SwiperSlide key={bookClub.id} style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to={`/bookclub/${bookClub.id}`}>
              <Card
                hoverable
                cover={
                  <img
                    alt={`${bookClub.name} image`}
                    src={bookClub.bookclubimg}
                    onError={(e) => { e.target.src = 'path/to/default-image.png'; }}
                    style={{ height: '200px', objectFit: 'cover', padding: '10px' }}
                  />
                }
                style={{ width: 150 }}
              >
                <Card.Meta title={bookClub.name} description={bookClub.description} />
              </Card>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperBookClub;
