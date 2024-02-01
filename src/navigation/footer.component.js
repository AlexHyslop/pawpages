import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom";

 
const navItems = [
 {name:'Home', path:"/home"}, 
 {name:'How it works', path:"/how-it-works"},
  {name:'lost Account', path:"/login"},
 {name:'Shop', path:"/home"},
  {name:'Help', path:'/contact'}
];

  
export default function Footer(props) {
  const currentPageTitle = useSelector(redux => redux.state.currentFormTitle);


  return (
    <footer className='main-footer'>
        <div className='container'>
            <p>©2023 ChiffChaff All rights reserved.</p>
        </div>
    </footer>
    
  );
}
