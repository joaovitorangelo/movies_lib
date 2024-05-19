import React, { useState, useEffect } from "react";
import db from "../db"; // Importe seus dados aqui

import "./Downloads.css"

import { FaGoogleDrive } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";



const Downloads = () => {
  const [movies, setMovies] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    setMovies(db); 
  }, []);

  
  const toggleSynopsis = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className="download-container">
      {movies.map((movie, index) => (
        <div key={index} className="movie-container">
          <div className="info-container">          
            <img src={movie.image} alt={movie.title} />
            <div className="info">
              <h2>{movie.title}</h2>
              <button className="expanded" onClick={() => toggleSynopsis(index)}>
                {expandedIndex === index ? "Fechar sinopse" : "Ver sinopse" }
                {expandedIndex === index ? <span className="eyes"><FaEyeSlash /></span> : <span className="eyes"><FaEye /></span> }
              </button>
              <p className={`synopsis ${expandedIndex === index ? "active" : ""}`}>
                {movie.description}
              </p>
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
