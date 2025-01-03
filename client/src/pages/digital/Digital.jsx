import React, { useContext, useEffect, useState } from "react";
import { MediaContext } from "../../context/MediaContext";
import Topbar from "../../components/topbar/Topbar";
import Navbar from "../../components/navbar/Navbar";
import "./digital.css";

export default function Digital() {
  const { digitalMedia, fetchMediaForUser, removeMedia } =
    useContext(MediaContext);
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
    <div className="digitalMediaContainer">
      <Topbar />
      <Navbar />
      <div className="digitalMediaContent">
        <h2>Digital Media</h2>
        <div className="mediaGrid">
          {digitalMedia.length === 0 ? (
            <p>No digital media added yet.</p>
          ) : (
            digitalMedia.map((item, index) => (
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
