import React, { useState, useEffect } from "react";
import db from "../db"; // Importe seus dados aqui

import "./Downloads.css"

import { FaGoogleDrive } from "react-icons/fa";

const Downloads = () => {
  const [movies, setMovies] = useState([]);

  // Simule um efeito de montagem para carregar os dados
  useEffect(() => {
    setMovies(db); // Define os dados iniciais
  }, []);

  return (
    <div className="download-container">
      {movies.map((movie, index) => (
        <div key={index} className="movie-container">
          <div className="info-container">          
            <img src={movie.image} alt={movie.title} />
            <div className="info">
              <h2>{movie.title}</h2>
              <p>{movie.description}</p>
              {movie.drive_link.includes("drive.google.com") ? (
                <iframe
                  src={movie.drive_link.replace("/view?usp=drive_link", "/preview")}
                  title={movie.title}
                  allowFullScreen
                ></iframe>
              ) : (
                <video controls>
                  <source src={movie.video} type="video/mp4" />
                </video>
              )}
              <a href={movie.drive_link} target="_blank" rel="noopener noreferrer">Link do Google Drive
              <span className="drive-icon"><FaGoogleDrive /></span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Downloads;
