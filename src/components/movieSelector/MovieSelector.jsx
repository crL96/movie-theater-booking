import styles from "./movieSelector.module.css";
import { useEffect, useState } from "react";
import Movie from "../../classes/Movie";
import { fetchAllMovies } from "../../services/movieService";

function MovieSelector({ setSelectedMovie }) {
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
          setSelectedMovie(movies[0]);
        }
      } catch (err) {
        console.log(err);
      }
    }

    setMovies();
  }, [setSelectedMovie]);

  function handleSelection(event) {
    const id = event.target.value;
    const movie = movieList.find((movie) => movie.id === id);
    setSelectedId(id);
    setSelectedMovie(movie);
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
