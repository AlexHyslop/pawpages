import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/chiffchaff.svg';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import Button from '../components/shared/button.component';


const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Demo', path: '/demo' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'FAQs', path: '/faq' },
];

const loginLink = { name: 'Login', path: '/login' }; // Update to an object instead of an array
const freeTrailLink = { name: 'Free Trial', path: '/register' }; // Update to an object instead of an array


export default function NavBar(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);


  useEffect(() => {
    const body = document.querySelector('body');
    const button = document.querySelector('svg');
    const line = document.querySelector('line');
  
    const handleClick = () => {
      const auth = getAuth();
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });

      if (document.body.classList.contains('menu-open')) {
        body.classList.remove('menu-open');
        return;
      }
      body.classList.add('menu-open');
    };
  
    button.addEventListener('click', handleClick);
  
    return () => {
      button.removeEventListener('click', handleClick);
    };
  }, []);

  const handleCTAButtonClick = (event, path) => {
    console.log('clicked')
    navigate(path)
  }

  const handleButtonClick = (event, path) => {
    const body = document.querySelector('body');
    if (document.body.classList.contains('menu-open')) {
      body.classList.remove('menu-open');
      return;
    }
    navigate(path);
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('User signed out');
      })
      .catch((error) => {
        // An error happened.
        console.log('Error signing out:', error);
      });
  };

  return (
    <header className="main-header container">
      <div className="logo-container">
        <Link to={"/"}>
          <img src={Logo} alt='logo'></img>
        </Link>      
      </div>
      <div className={'nav-items'}>
        <ul className='nav-list'>
          {navItems.map((item, index) => (
            <li
              key={index}
              onClick={(e) => handleButtonClick(e, item.path)}
              className={location.pathname === item.path ? 'active' : ''}
            >
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <div className='nav-login'>
          {user ? (
            <Button onClick={handleLogout} className='button'>Logout</Button>
          ) : (
            <>
              <Button to="/login" className='button'>Login</Button>
              <Button to="/register" className='cta'>Free Trial</Button>
              {/* <Button onClick={handleLogout} className='button'>Logout</Button> */}
            </>
          )}
        </div>
      </div>
      <div className='burger-menu'>
      <svg className="vbp-header-menu-button__svg">
        <line x1="0" y1="50%" x2="100%" y2="50%" className="top" shapeRendering="crispEdges" />
        <line x1="0" y1="50%" x2="100%" y2="50%" className="middle" shapeRendering="crispEdges" />
        <line x1="0" y1="50%" x2="100%" y2="50%" className="bottom" shapeRendering="crispEdges" />
      </svg>
      </div>
      <div className='menu-overlay'>
        <ul className='mob-nav-list'>
            {navItems.map((item, index) => (
              <li
                key={index}
                onClick={(e) => handleButtonClick(e, item.path)}
                className={location.pathname === item.path ? 'active' : ''}
              >
                <Link className='mob-item' to={item.path}>{item.name}</Link>
              </li>
            ))}
            <li onClick={(e) => handleButtonClick(e, loginLink.path)}>
              <Link to='/login' className='button'>{loginLink.name}</Link>
            </li>
            <li onClick={(e) => handleButtonClick(e, freeTrailLink.path)}>
              <Link to="/register" className='cta-button'>
                {freeTrailLink.name}
              </Link>
            </li>
          </ul>
      </div>
    </header>
  );
}
