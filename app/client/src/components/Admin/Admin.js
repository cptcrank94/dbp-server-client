import React, { useEffect, useState } from 'react';
import store from "../../store";
import TokenService from "../../services/token.service";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Admin() {
  const [isLoading, setLoading] = useState(true);
  const isLoggedIn = store.getState().auth;
  const accessToken = TokenService.getLocalAccessToken();
  const refreshToken = TokenService.getLocalRefreshToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn.isLoggedIn) {
      navigate("/");
    }
    setLoading(false);
  })

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("Logout");
  }

  if(isLoading) return ('Loading...');

  return (
    <nav className="admin-navigation">
      <ul className="admin-nav-list">
        <li>
          <Link to={"/admin/articles"} className="admin-nav-item">
            <FontAwesomeIcon icon="fa-solid fa-list" /> Artikel
          </Link>
        </li>
        <li>
          <Link to={"/admin/categorys"} className="admin-nav-item">
            <FontAwesomeIcon icon="fa-champagne-glasses" /> Kategorien
          </Link>
        </li>
        <li onClick={handleLogout}>
          <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /> Abmelden
        </li>
      </ul>
    </nav>
  )
}

export default Admin