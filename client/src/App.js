import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Shared/Navbar/Navbar.js';
import Homepage from './Components/Pages/Homepage/Homepage.js';
import Footer from './Components/Shared/Footer/Footer';
import Book from './Modules/Book/Book';
import Books from './Modules/Book/Books';
import UserLogin from './Components/Pages/UserLogin/UserLogin';
import ContactUs from './Components/Pages/ContactUs/ContactUs';
import Register from './Components/Pages/UserRegister/Register';
import { Mail } from './Components/Pages/ResetPassword/Mail';
import Reset from './Components/Pages/ResetPassword/ResetPassword';
import BookClub from './Modules/BookClub/BookClub';
import PageNotFound from './Components/Pages/PageNotFound/PageNotFound';
import BookClubs from './Modules/BookClub/BookClubs';
import MyProfile from './Components/Pages/Profile/MyProfile';
import UserProfile from './Components/Pages/Profile/UserProfile.js';
import Swiper from './Components/Functions/Swiper/SwiperBook';
import Validation from './Components/Pages/Validation/Validation';
import BookAdd from './Components/Pages/BookAdd/BookAdd';
import BookClubAdd from './Components/Pages/BookClubAdd/BookClubAdd';
import RegisterSuccessfulPopup from './Components/Pages/UserRegister/RegisterSuccessfulPopup';
function App() {
  return (
    <Router>
      <div id="root">
        <div className="container-fluid">
          <Navbar />
          <div className="col-sm-12 col-md-8">
            <Routes>
              <Route exact path='/' element={<Homepage />} />
              <Route path='/login' element={<UserLogin />} />
              <Route path='/register' element={<Register />} />
              <Route path='/contactus' element={<ContactUs />} />
              <Route path='/books' element={<Books />} />
              <Route path='/bookclubs' element={<BookClubs />} />
              <Route path='/book/:id' element={<Book />} />
              <Route path='/bookclub/:id' element={<BookClub />} />
              <Route path='/resetpassword' element={<Mail />} />
              <Route path='/reset' element={<Reset />} />
              <Route path='*' element={<PageNotFound />} />
              <Route path='/my-profile' element={<MyProfile />} />
              <Route path='/profile/:id' element={<UserProfile />} />
              <Route path='/swiper' element={<Swiper />} />
              <Route path='/validation' element={<Validation />} />
              <Route path='/bookadd' element={<BookAdd />} />
              <Route path='/bookclubadd' element={<BookClubAdd />} />
              <Route path='/success' element={<RegisterSuccessfulPopup />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
