import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";
import { getDatabase, ref, onValue } from "firebase/database";

const imagesURL = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true }) => {
  const [movies, setMovies] = useState([]);
  const db = getDatabase();

  useEffect(() => {
    const moviesRef = ref(db, 'movies');
    onValue(moviesRef, (snapshot) => {
      const data = snapshot.val();
      const moviesArray = data ? Object.values(data) : [];
      setMovies(moviesArray);
    });
  }, [db]);

  const matchingMovie = movies.find(m => m.title === movie.title);

  return (
    <div className="movie-card">
      {matchingMovie && (
        <MdOutlineCloudUpload className='cloud-icon' />
      )}
      <img src={`${imagesURL}${movie.poster_path}`} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>
        <FaStar /> {movie.vote_average}
      </p>
      {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>
  );
}

export default MovieCard;
