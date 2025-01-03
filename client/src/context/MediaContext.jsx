import React, { createContext, useState, useCallback } from "react";
import axios from "axios";

// Create the MediaContext
export const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
  const [allMedia, setAllMedia] = useState([]);
  const [digitalMedia, setDigitalMedia] = useState([]);
  const [physicalMedia, setPhysicalMedia] = useState([]);

  // Function to reset media state on logout
  const resetMedia = useCallback(() => {
    console.log("Resetting media state...");
    setAllMedia([]);
    setDigitalMedia([]);
    setPhysicalMedia([]);
  }, []);

  // Fetch media for a specific user
  const fetchMediaForUser = useCallback((userId) => {
    console.log("Fetching media for user:", userId);
    axios
      .get(`http://localhost:3000/auth/${userId}/movies`)
      .then((response) => {
        const movies = response.data;
        console.log("Fetched movies from database:", movies);

        resetMedia();
        setAllMedia(movies);
        setDigitalMedia(movies.filter((movie) => movie.category === "digital"));
        setPhysicalMedia(
          movies.filter((movie) => movie.category === "physical")
        );

        console.log("Updated media context with fetched movies.");
      })
      .catch((error) => {
        console.error("Error fetching media:", error);
      });
  }, [resetMedia]);

  // Add media to context
  const addMedia = (item, category) => {
    const mediaWithCategory = { ...item, category };

    console.log("Adding media:", mediaWithCategory);

    setAllMedia((prev) => [...prev, mediaWithCategory]);

    if (category === "digital") {
      setDigitalMedia((prev) => [...prev, mediaWithCategory]);
    } else if (category === "physical") {
      setPhysicalMedia((prev) => [...prev, mediaWithCategory]);
    }
  };

  // Remove media
  const removeMedia = (movieId) => {
    console.log("Removing media:", movieId);

    axios
      .delete(`http://localhost:3000/auth/movies/${movieId}`)
      .then(() => {
        setAllMedia((prev) => prev.filter((movie) => movie.id !== movieId));
        setDigitalMedia((prev) =>
          prev.filter((movie) => movie.id !== movieId)
        );
        setPhysicalMedia((prev) =>
          prev.filter((movie) => movie.id !== movieId)
        );
        console.log("Media removed successfully.");
      })
      .catch((error) => {
        console.error("Error removing media:", error);
      });
  };

  return (
    <MediaContext.Provider
      value={{
        allMedia,
        digitalMedia,
        physicalMedia,
        addMedia,
        removeMedia,
        resetMedia,
        fetchMediaForUser,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};
