import React, { useContext, useEffect, useState } from "react";
import { MediaContext } from "../../context/MediaContext";
import Topbar from "../../components/topbar/Topbar";
import Navbar from "../../components/navbar/Navbar";
import "./allmovies.css";

export default function AllMedia() {
  const { allMedia, fetchMediaForUser, removeMedia } = useContext(MediaContext);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      fetchMediaForUser(user.id);
    }
  }, [fetchMediaForUser]);

  const handleEditClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleConfirmRemove = () => {
    if (selectedMovie) {
      removeMedia(selectedMovie.id);
      setSelectedMovie(null);
    }
  };

  return (
    <div className="allMediaContainer">
      <Topbar />
      <Navbar />
      <div className="allMediaContent">
        <h2>All Media</h2>
        <div className="mediaGrid">
          {allMedia.length === 0 ? (
            <p>No media found.</p>
          ) : (
            allMedia.map((item, index) => (
              <div key={index} className="mediaItem">
                <img
                  src={
                    item.posterPath
                      ? `https://image.tmdb.org/t/p/w200${item.posterPath}`
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={item.title}
                  className="mediaPoster"
                />
                <div className="mediaDetails">
                  <h3>{item.title}</h3>
                  <p>{item.releaseDate}</p>
                  <p>Category: {item.category}</p>
                </div>
                <button
                  className="editButton"
                  onClick={() => handleEditClick(item)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedMovie && (
        <div className="modal">
          <div className="modalContent">
            <h3>Are you sure you want to remove this movie?</h3>
            <p>{selectedMovie.title}</p>
            <div className="modalActions">
              <button onClick={handleConfirmRemove} className="confirmButton">
                Yes, Remove
              </button>
              <button
                onClick={() => setSelectedMovie(null)}
                className="cancelButton"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
