import React from 'react'
import SwiperBook from '../../Functions/Swiper/SwiperBook'
import SwiperBookClub from '../../Functions/Swiper/SwiperBookClub'

import './Homepage.css'


function Homepage() {
  return (
    <div className='homepage'>
      <SwiperBook />
      <hr className='homepageHr' />
      <SwiperBookClub />

    </div>
  )
}

export default Homepage
