import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import store from "../../store";

function Navbar() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const loggedIn = store.getState().auth;

    useEffect(() => {
      if (loggedIn.isLoggedIn) {
        setLoggedIn(true);
      }
    }, [isLoggedIn])

  return (
    <nav className="navigation-container">
          <ul className="navigation">
            <li>
              <Link to={"/"} className="nav-item">
                <FontAwesomeIcon icon="fa-house" />
              </Link>
            </li>
            <li>
              <Link to={"/getraenke"} className="nav-item">
                <FontAwesomeIcon icon="fa-champagne-glasses" />
              </Link>
            </li>
            <li>
              <Link to={"/speisen"} className="nav-item">
                <FontAwesomeIcon icon="fa-burger" />
              </Link>
            </li>
            <li>
              <Link to={"/faq"} className="nav-item">
                <FontAwesomeIcon icon="fa-question" />
              </Link>
            </li>
            { isLoggedIn &&
              <li>
                <Link to={"/admin"} className="nav-item">
                  <FontAwesomeIcon icon="fa-user" />
                </Link>
              </li>
            }
          </ul>
        </nav>
  )
}

export default Navbar