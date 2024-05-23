import './Books.css';
import { useNavigate } from 'react-router-dom';
import SwiperBook from '../../Components/Functions/Swiper/SwiperBook';

function Books() {
  const navigate = useNavigate();

  const handleAddBookClick = () => {
    navigate('/bookadd');
  };

  return (
    <div className='booksContainer'>
      <div className='header'>
        <h1>My Books</h1>
        <button className='addBookButton' onClick={handleAddBookClick}>Add New Book</button>
      </div>
      <SwiperBook />
    </div>
  );
}

export default Books;
