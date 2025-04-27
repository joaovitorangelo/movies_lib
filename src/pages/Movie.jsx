import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill } from "react-icons/bs";
import MovieCard from "../components/MovieCard";
import { storage } from "../components/FireBase";
import { ref, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dbRef, get } from "firebase/database";
import "./Movie.css";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [movies, setMovies] = useState([]);

    const getMovie = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setMovie(data);
    };

    const formatCurrency = (number) => {
        return number.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    useEffect(() => {
        const movieURL = `${moviesURL}${id}?${apiKey}`;
        getMovie(movieURL);
    }, [id]);

    useEffect(() => {
        const fetchMovies = async () => {
            const db = getDatabase();
            const moviesRef = dbRef(db, 'movies');
            
            try {
                const snapshot = await get(moviesRef);
                if (snapshot.exists()) {
                    const moviesData = await Promise.all(
                        Object.entries(snapshot.val()).map(async ([key, value]) => {
                            try {
                                const url = await getDownloadURL(ref(storage, value.href)); 
                                return {
                                    id: key,
                                    url: url,
                                    branding: value.branding,
                                    sinopse: value.sinopse,
                                    title: value.title
                                };
                            } catch (error) {
                                console.error(`Error fetching URL for ${key}:`, error);
                                return { id: key, url: null, branding: value.branding, sinopse: value.sinopse, title: value.title }; 
                            }
                        })
                    );
                    setMovies(moviesData.filter(movie => movie.url)); 
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
    
        fetchMovies();
    }, []);

    return (
        <div className="movie-page">
            {movie && (
                <>
                    <MovieCard movie={movie} showLink={false} />
                    <p className="tagline">
                        {movie.genres.map(genre => genre.name).join(', ')}
                    </p>
                    <div className="info">
                        <h3>
                            <BsWallet2 /> Budget:
                        </h3>
                        <p>{formatCurrency(movie.budget)}</p>
                    </div>
                    <div className="info">
                        <h3>
                            <BsGraphUp /> Revenue:
                        </h3>
                        <p>{formatCurrency(movie.revenue)}</p>
                    </div>
                    <div className="info">
                        <h3>
                            <BsHourglassSplit /> Duration:
                        </h3>
                        <p>{movie.runtime} minutes</p>
                    </div>
                    <div className="info description">
                        <h3>
                            <BsFillFileEarmarkTextFill /> Description
                        </h3>
                        <p>{movie.overview}</p>
                    </div>
                    
                    {/* Renderização do vídeo correspondente */}
                    {movies.length > 0 && movies.some(m => m.title === movie.title) && (
                        <div className="movie">
                            {movies.find(m => m.title === movie.title).url ? (
                                <video width="100%" controls>
                                    <source src={movies.find(m => m.title === movie.title).url} type="video/mp4" />
                                    Seu navegador não suporta a tag de vídeo.
                                </video>
                            ) : (
                                <p>Video not available</p>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Movie;