import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from "react-router-dom"; 
import { AuthProvider } from './auth-provider.component';
import { store } from './store/redux-store'; 
import { Provider } from 'react-redux';

const theme = createTheme({
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <AuthProvider> 
        <BrowserRouter>
          <ThemeProvider theme={theme}> 
            <App />  
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider> 
    </Provider>
  </React.StrictMode>
 );
 
reportWebVitals();
