import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "./rafflemovies.css";
import "./MovieGrid.css";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [movieObject, setMovieObject] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const query = searchParams.get("q");

  const objects = [
    "mystery", "adventure", "drama", "action", "romance", "conflict", "enemies", "hero", "villain", "trauma", "friendship", 
    "ancient mysteries", "discovery", "exploration", "sacrifice", "pursuit", "secrets", "hope", "escape", "rescue", "superpowers", 
    "destiny", "intrigue", "revelation", "redemption", "overcoming", "time travel", "future", "past", "safety", "danger", "betrayal", 
    "friendly", "power", "society", "war", "conquest", "battle", "strategy", "survival", "peace", "relationship", "challenges", 
    "romantic", "family conflict", "psychological trauma", "justice", "revenge", "rage", "tragedy", "psychological mystery", "supernatural mystery", 
    "detective", "conspiracy", "secret society", "heist", "epic adventure", "legacy", "fantasy", "another world", "unexpected betrayal", "plot twist", 
    "mafia", "political intrigue", "kidnapping", "duel", "secret identity", "spy", "historical mystery", "puzzle", "army", "journey", "dystopian future", 
    "lost souls", "fight for survival", "magic", "rivalry", "combat", "revolution", "tough decision", "race against time", "scientific discovery", "genius", 
    "labyrinth", "empire building", "secret key", "dual role", "darkness", "schizophrenia", "immortality", "uprising", "anti-hero", "pact", "supreme power", 
    "Greek tragedy", "legend", "ghost", "artifact", "tension", "farewell", "eclipse", "visions", "illusion", "psychological drama", "evolution", "rebirth", 
    "aristocracy", "rebellion", "ambition", "self-overcoming", "espionage", "ancestry", "corruption", "salvation", "hunt", "forbidden romance", "will to power", 
    "return", "success", "character development", "complex plot", "family secrets", "generation conflict", "dream", "supernatural help", "arranged marriage", 
    "murder", "press", "overcoming fear", "paradox", "power play", "modern art", "collective trauma", "outlaw", "apocalypse", "regret", "crisis", "temptation", 
    "divine wrath", "mythology", "spiritual redemption", "self-determination", "renunciation", "isolation", "reluctant hero", "lost innocence", "guilt", 
    "impossible mission", "balance", "liberation", "coup", "altered perception"
  ];

  const getSearchedMovies = async (searchQuery) => {
    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${searchQuery}`;
    const res = await fetch(searchWithQueryURL);
    const data = await res.json();
  
    // Filtra os filmes com vote_average maior que 6.0
    const filteredMovies = data.results.filter((movie) => movie.vote_average > 6.0);
  
    setMovies(filteredMovies);
  };

  useEffect(() => {
    if (query) {
      getSearchedMovies(query);
    }
  }, [query]);

  useEffect(() => {
    if (movies.length === 0) {
      document.body.classList.add('no-movies');
    } else {
      document.body.classList.remove('no-movies');
    }
  }, [movies]);

  const handleRaffle = async () => {
    setIsLoading(true);
    
    // Simula o efeito de "girando"
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const randomIndex = Math.floor(Math.random() * objects.length);
    const selectedObject = objects[randomIndex];
    setMovieObject(selectedObject);

    await getSearchedMovies(selectedObject);

    setIsLoading(false);
  };

  return (
    <div className="container">
      <h2 className="title">Filme</h2>

      <div className="raffle-container">
        <button onClick={handleRaffle} disabled={isLoading}>
          {isLoading ? (
            <>
              Sorteando...
            </>
          ) : (
            "Sortear"
          )}
        </button>

        {isLoading && (
          <AiOutlineLoading3Quarters className="circle" />
        )}

        {!isLoading && movieObject && (
          <h1>
            Filmes sorteados contendo<br />
            "<strong>{movieObject}</strong>"
          </h1>
        )}
      </div>

      <div className="movies-container">
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Search;
