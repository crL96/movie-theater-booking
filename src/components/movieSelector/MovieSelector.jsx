import styles from "./movieSelector.module.css";
import { useEffect, useState } from "react";
import Movie from "../../classes/Movie";
import { fetchAllMovies } from "../../services/movieService";

function MovieSelector({ handleMovieChange }) {
  const [movieList, setMovieList] = useState([
    new Movie(1, "The Lion King", 100, []),
  ]);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    async function setMovies() {
      try {
        const movies = await fetchAllMovies();
        setMovieList(movies);
        if (movies.length > 0) {
          setSelectedId(movies[0].id);
          handleMovieChange(movies[0]);
        }
      } catch (err) {
        console.log(err);
      }
    }

    setMovies();
  }, [handleMovieChange]);

  function handleSelection(event) {
    const id = event.target.value;
    const movie = movieList.find((movie) => movie.id === id);
    setSelectedId(id);
    handleMovieChange(movie);
  }

  return (
    <div className={styles.movieSelector}>
      <label htmlFor="movie">Pick a movie:</label>
      <select
        name="movie"
        id="movie"
        onChange={handleSelection}
        value={selectedId}
      >
        {movieList.map((movie) => (
          <option
            key={movie.id}
            value={movie.id}
          >{`${movie.title} - ${movie.price}kr`}</option>
        ))}
      </select>
    </div>
  );
}

export default MovieSelector;
