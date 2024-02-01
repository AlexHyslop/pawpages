import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from 'react-router-dom';
 import { Link } from "react-router-dom";
 
export default function Dashboard(props) {
  const userDoc = useSelector((state) => state.user.doc);
  const redirect = useSelector((state) => state.state.routeFromLogin);

  const navigate = useNavigate();

  useEffect(() => {  
    if (redirect) navigate(redirect);
  }, []);

  return (
    <div className="app-container">
       <div className="app-dashboard">
        <h1>Welcome to ChiffChaff</h1>
        <p>
          Browse our <Link to="/">developer docs</Link> or explore{" "}
          <Link to="/">all the ways</Link> to start using ChiffChaff.
        </p>
        <Outlet />
      </div>
    </div>
  );
}
