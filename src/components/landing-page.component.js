import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'; 
import DisplayPosts from './facebookPosts/display-posts.component';
import FacebookLogin from'./facebookPosts/facebook-login-button.component';




export default function LandingPage(props) {
  return ( 
    <>
      <FacebookLogin />
      <br></br>
      <DisplayPosts />
    </>
  );
}  
  