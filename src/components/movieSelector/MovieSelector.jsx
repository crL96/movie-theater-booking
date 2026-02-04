import styles from "./movieSelector.module.css";
import { useEffect, useState } from "react";
import Movie from "../../classes/Movie";
const API_URL = import.meta.env.VITE_API_URL;

function MovieSelector({ setSelectedMovie }) {
  const [movieList, setMovieList] = useState([
    new Movie(1, "The Lion King", 100, []),
  ]);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(API_URL + "/movie");
        if (res.status === 200) {
          const data = await res.json();
          const movies = data.map((item) => {
            return new Movie(item.id, item.title, item.price, item.bookedSeats);
          });
          setMovieList(movies);

          if (movies.length > 0) {
            setSelectedId(movies[0].id);
            setSelectedMovie(movies[0]);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchMovies();
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
