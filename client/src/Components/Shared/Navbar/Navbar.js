import './Navbar.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Stack } from '@chakra-ui/react';
import BookHubLogo from '../../../assets/images/BookHubLogo.png';
import jwt_decode from 'jwt-decode';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className='nav'>
      <div className='nav-left'>
        <div className='logo'>
          <Link to='/'>
            <img src={BookHubLogo} alt='BookHub Logo' />
          </Link>
        </div>
      </div>
      <div className='nav-right'>
        <Stack direction='row' spacing={3}>
          <Link to='/books'>
            <Button className='navButtons' colorScheme='blue'>
              Kitaplar
            </Button>
          </Link>
          <Link to='/bookclubs'>
            <Button className='navButtons' colorScheme='teal'>
              Kitap Kulüpleri
            </Button>
          </Link>
          {isLoggedIn ? (
            <>
              <Link to='/contactus'>
                <Button className='navButtons' colorScheme='twitter'>
                  İletişim
                </Button>
              </Link>
              <Link to='/my-profile'>
                <Button className='navButtons' colorScheme='twitter'>
                  Profil
                </Button>
              </Link>
              <Button className='navButtons' colorScheme='red' onClick={handleLogout}>
                Çıkış Yap
              </Button>
            </>
          ) : (
            <>
              <Link to='/register'>
                <Button className='navButtons' colorScheme='teal'>
                  Kaydol
                </Button>
              </Link>
              <Link to='/login'>
                <Button className='navButtons' colorScheme='blue'>
                  Giriş Yap
                </Button>
              </Link>
            </>
          )}
        </Stack>
      </div>
    </nav>
  );
}

export default Navbar;
