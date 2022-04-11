import React, { Component } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Drinks from './components/Drinks/Drinks';
import FAQ from './components/FAQ/FAQ';
import Food from './components/Food/Food';
import ItemDetail from './components/ItemDetail/ItemDetail';
import Admin from './components/Admin/Admin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class App extends Component{
  render() {
    return (
      <div>
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
          </ul>
        </nav>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/getraenke" element={<Drinks />} />
            <Route path="/speisen" element={<Food />} />
            <Route path="/speisen/:catName" element={<Food />} />
            <Route exact path="/items/detail/:id" element={<ItemDetail />} />
            <Route path="/faq" element={<FAQ />} />
            <Route exact path="/admin" element={<Admin />} />
        </Routes>
      </div>
    )
  }
}

export default App;
