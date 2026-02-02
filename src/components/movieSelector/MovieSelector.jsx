import styles from "./movieSelector.module.css";
import { useEffect, useState } from "react";
import Movie from "../../classes/Movie";
const API_URL = import.meta.env.VITE_API_URL;

function MovieSelector() {
  const [movieList, setMovieList] = useState([
    new Movie(1, "The Lion King", 100, []),
  ]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(API_URL + "/movie");
        if (res.status === 200) {
          const data = await res.json();
          const movies = data.map((item) => {
            return new Movie(
              item.id,
              item.title,
              item.price,
              item.bookedStatus,
            );
          });
          setMovieList(movies);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className={styles.movieSelector}>
      <label htmlFor="movie">Pick a movie:</label>
      <select name="movie" id="movie">
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
