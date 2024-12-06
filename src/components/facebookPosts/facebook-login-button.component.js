import React from 'react';

const FacebookLoginButton = () => {
    const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID;
    const REDIRECT_URI = 'https://pawpages-b4034.web.app/redirect'; // Replace with your redirect URI
    const SCOPES = 'pages_read_engagement,pages_read_user_content,pages_show_list,pages_manage_posts';

  const handleLogin = () => {
    const facebookLoginUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES}`;
    window.location.href = facebookLoginUrl; // Redirect to Facebook login
  };

  return (
    <button className='button' onClick={handleLogin} target="_blank">
      Download More Posts
    </button>
  );
};


export default FacebookLoginButton;
