import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbarWrapper">
        <ul className="navbarList">
          <li className="navbarListItem">
            <Link to="/allmovies" className="navbarListItemLink">
              <span className="navbarListItemText">All Media</span>
            </Link>
          </li>
          <li className="navbarListItem">
            <Link to="/digital" className="navbarListItemLink">
              <span className="navbarListItemText">Digital Media</span>
            </Link>
          </li>
          <li className="navbarListItem">
            <Link to="/physical" className="navbarListItemLink">
              <span className="navbarListItemText">Physical Media</span>
            </Link>
          </li>
          <li className="navbarListItem">
            <span className="navbarListItemText">Watchlist</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
