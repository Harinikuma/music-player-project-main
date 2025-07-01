import React, { useState } from 'react';
import './menu.css';
import { Link } from 'react-router-dom';
const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="left">
      <div className="small-screen-menu" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div>
        <img src="logo1.png" alt="Logo" id="logo" />
        <ul className={`menu ${isOpen ? "open" : ""}`}>
          {isOpen && (
            <li className="close-menu" onClick={toggleMenu}>
              <a href="#">&times;</a>
            </li>
          )}
          <li>
            <a href="#Playlists">Playlists</a>
          </li>
          <li>
            <a href="#artists">Artists</a>
          </li>
          <li>
            <a href="#album">Album</a>
          </li>

          {/* <Link to='./fetchlikedSongs'>
          <li><a href="#">Library</a></li>
          </Link> */}
          <Link to="./contact">
            <li>
              <a href="#">Contact</a>
            </li>
          </Link>
          <li>
            <a>Others</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
