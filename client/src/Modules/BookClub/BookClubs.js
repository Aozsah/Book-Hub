import './BookClubs.css';
import { useNavigate } from 'react-router-dom';
import SwiperBookClub from '../../Components/Functions/Swiper/SwiperBookClub';

function BookClubs() {
  const navigate = useNavigate();

  const handleAddBookClubClick = () => {
    navigate('/bookclubadd');
  };

  return (
    <div className='bookClubsContainer'>
      <div className='header'>
        <h1>My Book Clubs</h1>
        <button className='addBookClubButton' onClick={handleAddBookClubClick}>Add New Book Club</button>
      </div>
      <SwiperBookClub />
    </div>
  );
}

export default BookClubs;
