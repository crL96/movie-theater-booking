import styles from "./admin.module.css";
import { useEffect, useState } from "react";
import { fetchAllMovies } from "../../services/api";
import MovieListItem from "../movieListItem/MovieListItem";

function Admin() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getAllMovies() {
      try {
        setMovies(await fetchAllMovies());
      } catch (err) {
        console.log(err);
      }
    }
    getAllMovies();
  }, []);

  return (
    <main className={styles.main}>
      <h1>Admin</h1>
      {movies.map((movie) => (
        <MovieListItem movie={movie} key={movie.id} setMovies={setMovies} />
      ))}
    </main>
  );
}

export default Admin;
