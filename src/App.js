import './App.scss';
import NavBar from './navigation/nav-bar.component';
import Footer from './navigation/footer.component.js';
import LandingPage from './components/landing-page.component.js';
import { Box } from '@mui/system';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth"; 
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
     <div className='App container mx-auto py-8 flex flex-col min-h-screen' component="main">
      
        <Routes>
          {/* no auth routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="" element={<LandingPage />} />
        </Routes>
        <Outlet></Outlet>
      </div>
      
      <Footer/>
    </div>
   
  );
}

export default App;
