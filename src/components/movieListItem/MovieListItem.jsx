import styles from "./movieListItem.module.css";
import { deleteMovieById, fetchAllMovies } from "../../services/api";
import MovieForm from "../movieForm/MovieForm";
import { useState } from "react";

function MovieListItem({ movie, setMovies }) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  async function handleDelete() {
    try {
      await deleteMovieById(movie.id);
      setMovies(await fetchAllMovies());
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <>
      <div className={styles.movie}>
        <div className={styles.left}>
          <p>
            <strong>{movie.title}</strong>
          </p>
          <p>Price: {movie.price}kr</p>
          <p>Seats booked: {movie.bookedSeats.length}/48</p>
        </div>
        <div className={styles.btnContainer}>
          <button onClick={() => setShowUpdateForm(true)}>Edit</button>
          <button onClick={handleDelete} className={styles.btnDelete}>
            Delete
          </button>
        </div>
      </div>
      {showUpdateForm ? (
        <MovieForm
          setShowForm={setShowUpdateForm}
          setMovies={setMovies}
          movieToUpdate={movie}
        />
      ) : null}
    </>
  );
}

export default MovieListItem;
