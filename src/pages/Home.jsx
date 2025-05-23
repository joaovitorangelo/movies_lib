import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard"

import "./MovieGrid.css"

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

const Home = () => {
    const [topMovies, setTopMovies] = useState([])

    const getTopRatedMovies = async (url) => {
        const res = await fetch(url)
        const data = await res.json()

        setTopMovies(data.results)
    }

    useEffect(() => {

        const topRatedUrl = `${moviesURL}top_rated?${apiKey}`

        getTopRatedMovies(topRatedUrl)

    }, [])

    // useEffect(() => {
    //     if (loading) {
    //       containerRef.current.classList.add('loading-active');
    //     } else {
    //       containerRef.current.classList.remove('loading-active');
    //     }
    //   }, [loading]);

    return (
        <div className="container">
            <h2 className="title">Best movies: </h2>
            <div className="movies-container">
                {topMovies.length === 0 && <p>Loading...</p>}
                {topMovies.length > 0 &&
                  topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    )
}

export default Home