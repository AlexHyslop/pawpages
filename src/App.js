import './App.scss';
import NavBar from './navigation/nav-bar.component';
import { Box } from '@mui/system';
import { Routes, Route, Navigate } from 'react-router-dom';
import Account from './components/account/account.component';
import Dashboard from './components/dashboard.component.js';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth"; 
 
function LoadingScreen() {
  document.body.style.backgroundColor = '#E9F5F1'
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
    <Box>
      <NavBar /> 
      <Box component="main">
        <Routes>
          {/* no auth routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="" element={<Dashboard />} />

          {/* authed routes */}
          {/* <Route path="/account" element={authed ? <Account /> : <Login />} />  */}
           {/* 404 page */}
           {/* <Route path="/*" element={<NotFound />} /> */}
        </Routes>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
}

export default App;
