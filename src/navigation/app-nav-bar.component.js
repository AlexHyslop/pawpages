import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/chiffchaff.svg';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import Button from '../components/common/button.component';


const navItems = [
  { name: 'Home', path: '/dashboard' },
  { name: 'Upload Data', path: '/demo' },
  { name: 'Chatbots', path: '/chatbots' },
  { name: 'Integrations', path: '/pricing' },
  { name: 'Settings', path: '/faq' },
  { name: 'Support', path: '/faq' }
];



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
    <header className="app-main-header">
      <div className="logo-container">
        Logo Here   
      </div>
      <div className={'nav-items'}>
        <div className='nav-login'>
          {user ? (
            <Button onClick={handleLogout} className='button'>Logout</Button>
          ) : (
            <>
              <Button onClick={handleLogout} className='button'>Logout</Button>
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
            <li><Button onClick={handleLogout} className='button'>Logout</Button></li>
          </ul>
      </div>
    </header>
  );
}
