import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Navigation, Pagination, A11y } from 'swiper';
import  './Profile.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function ClubsImIn() {
    const [width, setWidth] = useState(0);
    const [bookClubs, setbookClubs] = useState([]);
    const carousel = useRef();

  
    useEffect(() => {
      axios ('https://dummyjson.com/products?limit=20')
      .then((res) =>{ 
        setbookClubs(res.data.products)
      })
    }, [])

  return (

    <Swiper 
    modules={[Navigation, Pagination, A11y]}
    spaceBetween={50}
    slidesPerView={6}
    navigation
    pagination={{ clickable: true }}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log('slide change')}
    >
      {bookClubs.map(bookClub => {
        return(
      <SwiperSlide  key={bookClub.id}>
        <Link to={`/bookClub/${bookClub.id}`}>
          <img className='clubsImIn' src={bookClub.images[0]} alt="Resim Çalışmıyor!"/>
        </Link>
      </SwiperSlide>
    )})}
    </Swiper>
  )
}
  export default ClubsImIn;
