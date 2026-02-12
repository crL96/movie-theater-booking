import styles from "./admin.module.css";
import { useEffect, useState } from "react";
import { fetchAllMovies } from "../../services/movieService";
import MovieListItem from "../movieListItem/MovieListItem";
import MovieForm from "../movieForm/MovieForm";
import { Link } from "react-router-dom";

function Admin() {
  const [movies, setMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [movieToUpdate, setMovieToUpdate] = useState(null);

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

  function openForm(movie = null) {
    if (showForm) return;
    setMovieToUpdate(movie);
    setShowForm(true);
  }

  function closeForm() {
    setMovieToUpdate(null);
    setShowForm(false);
  }

  return (
    <>
      <Link to="/" className="navBtn">
        Home
      </Link>
      <main className={styles.main}>
        <h1>Admin</h1>
        <button onClick={() => setShowForm(true)} className={styles.addBtn}>
          Add movie
        </button>
        {movies.map((movie) => (
          <MovieListItem
            movie={movie}
            key={movie.id}
            setMovies={setMovies}
            openForm={openForm}
          />
        ))}
        {showForm ? (
          <MovieForm
            closeForm={closeForm}
            setMovies={setMovies}
            movieToUpdate={movieToUpdate}
          />
        ) : null}
      </main>
    </>
  );
}

export default Admin;
