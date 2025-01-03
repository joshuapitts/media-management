import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { MediaContext } from "../../context/MediaContext";
import "./topbar.css";

export default function Topbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { resetMedia } = useContext(MediaContext);

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("user");
    resetMedia();
    // Redirect to home page
    navigate("/");
    alert("You have been logged out.");
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" className="logoLink">
          <span className="logo">Movies App</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search for a movie in your collection"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <Link to="/movie" className="addLink">
          <AddBoxIcon className="addIcon" />
        </Link>
        {user ? (
          <button className="logoutButton" onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          <Link to="/registration" className="loginLink">
            Log In
          </Link>
        )}
      </div>
    </div>
  );
}
