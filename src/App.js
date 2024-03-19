import './App.scss';
import NavBar from './navigation/nav-bar.component';
import Footer from './navigation/footer.component.js';
import { Box } from '@mui/system';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Account from './components/account/account.component';
import LandingPage from './components/landing-page.component.js';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth"; 
import QuoteDashboard from './components/quotes/quote-dashboard.component.js';
import BookingDashboard from './components/booking/booking-dashboard.component.js';
import ContactPage from './components/page-sections/contact/contact-page.component.js';
import Login from './components/page-sections/login/login-page.component.js';
import Terms from './components/page-sections/terms/terms-page.component.js';
import ForgottenPassword from './components/page-sections/login/forgotten-password.component.js';
import '@fortawesome/fontawesome-svg-core/styles.css'; 
import { config } from '@fortawesome/fontawesome-svg-core';

function LoadingScreen() {

  return (
    <Box>
      <NavBar />
      <div className='loading-container'>
          <div className="loading-spinner"></div>
      </div>
    </Box>
  );
}
function App() {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const logOut = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthed(true);
      } else {
        setAuthed(false);
      }
      setLoading(false);
    });

    return () => {
      logOut();
    };
  }, []);

  // Render loading screen while loading authentication
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
     <NavBar /> 
     <div className='App' component="main">
      
        <Routes>
          {/* no auth routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="" element={<LandingPage />} />
          <Route path="/quote" element={<QuoteDashboard />} />
          <Route path="/booking" element={<BookingDashboard />} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/terms" element={<Terms/>} />
          <Route path="/login/forgotten-password" element={<ForgottenPassword />} />
          {/* authed routes */}
          {/* <Route path="/account" element={authed ? <Account /> : <Login />} />  */}
          {/* 404 page */}
          {/* <Route path="/*" element={<NotFound />} /> */}
        </Routes>
        <Outlet></Outlet>
      </div>
      
      <Footer/>
    </div>
   
  );
}

export default App;
