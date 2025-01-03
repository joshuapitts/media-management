import React, { useState, useContext } from "react";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar";
import Navbar from "../../components/navbar/Navbar";
import { MediaContext } from "../../context/MediaContext";
import "./addmovie.css";

export default function AddMovie() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState("movie");
  const { addMedia } = useContext(MediaContext);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);

  const API_KEY = "766d50fb15183076b206e84e1b7202fb";
  const TMDB_BASE_URL = "https://api.themoviedb.org/3";

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length > 2) {
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/search/${searchType}`,
          {
            params: {
              api_key: API_KEY,
              query: query,
            },
          }
        );
        setResults(response.data.results);
      } catch (error) {
        console.error("Error fetching data from TMDB", error);
      }
    } else {
      setResults([]);
    }
  };

  const handleSelectMedia = async (item) => {
    setSelectedMedia(item);

    if (searchType === "tv") {
      // Fetch seasons for the selected TV show
      try {
        const response = await axios.get(`${TMDB_BASE_URL}/tv/${item.id}`, {
          params: { api_key: API_KEY },
        });
        setSeasons(response.data.seasons);
      } catch (error) {
        console.error("Error fetching seasons", error);
      }
    } else {
      setSeasons([]);
    }
  };

  const handleAddMedia = (category) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please log in to add movies.");
      return;
    }

    const mediaToAdd = {
      title: selectedMedia.title || selectedMedia.name,
      category,
      posterPath: selectedMedia.poster_path,
      releaseDate: selectedMedia.release_date || selectedMedia.first_air_date,
      season:
        searchType === "tv" && selectedSeason
          ? `Season ${selectedSeason.season_number}`
          : null,
    };

    axios
      .post(`http://localhost:3000/auth/${user.id}/movies`, mediaToAdd)
      .then((response) => {
        addMedia(response.data, category);
        alert(
          `${mediaToAdd.title} added to All Media and ${category} ${
            mediaToAdd.season ? `(${mediaToAdd.season})` : ""
          }!`
        );
        setSelectedMedia(null);
        setSelectedSeason(null);
      })
      .catch((error) => {
        console.error("Error adding movie:", error);
        alert("Failed to add movie.");
      });
  };

  return (
    <div className="addMovieContainer">
      <Topbar />
      <Navbar />
      <div className="addMovieContent">
        <h2>Search for {searchType === "movie" ? "Movies" : "TV Shows"}</h2>
        <div className="toggleSearchType">
          <button
            className={`toggleButton ${
              searchType === "movie" ? "active" : ""
            }`}
            onClick={() => setSearchType("movie")}
          >
            Movies
          </button>
          <button
            className={`toggleButton ${
              searchType === "tv" ? "active" : ""
            }`}
            onClick={() => setSearchType("tv")}
          >
            TV Shows
          </button>
        </div>
        <div className="addSearchBar">
          <input
            type="text"
            placeholder={`Search for ${
              searchType === "movie" ? "movies" : "TV shows"
            }...`}
            value={searchTerm}
            onChange={handleSearch}
            className="addSearchInput"
          />
        </div>
        <div className="resultsGrid">
          {results.map((item) => (
            <div
              key={item.id}
              className="resultItem"
              onClick={() => handleSelectMedia(item)}
            >
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={item.title || item.name}
                className="resultPoster"
              />
              <div className="resultDetails">
                <h3>{item.title || item.name}</h3>
                <p>{item.release_date || item.first_air_date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Category Selection Modal */}
        {selectedMedia && (
          <div className="categoryModal">
            <div className="modalContent">
              <h3>
                Select Category for {selectedMedia.title || selectedMedia.name}
              </h3>
              {searchType === "tv" && seasons.length > 0 && (
                <div className="seasonsDropdown">
                  <h4>Select a Season:</h4>
                  {seasons.map((season) => (
                    <button
                      key={season.id}
                      className={`seasonButton ${
                        selectedSeason?.season_number ===
                        season.season_number
                          ? "active"
                          : ""
                      }`}
                      onClick={() => setSelectedSeason(season)}
                    >
                      Season {season.season_number}
                    </button>
                  ))}
                </div>
              )}
              <button
                className="categoryButton"
                onClick={() => handleAddMedia("digital")}
              >
                Digital
              </button>
              <button
                className="categoryButton"
                onClick={() => handleAddMedia("physical")}
              >
                Physical
              </button>
              <button
                className="cancelButton"
                onClick={() => {
                  setSelectedMedia(null);
                  setSelectedSeason(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
