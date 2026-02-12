import { useState } from "react";
import styles from "./movieForm.module.css";
import Movie from "../../classes/Movie";
import {
  addMovie,
  fetchAllMovies,
  updateMovie,
} from "../../services/movieService";

function MovieForm({ closeForm, setMovies, movieToUpdate }) {
  const isUpdateMode = movieToUpdate != null;
  const [title, setTitle] = useState(isUpdateMode ? movieToUpdate.title : "");
  const [price, setPrice] = useState(isUpdateMode ? movieToUpdate.price : "");
  const [errorMessage, setErrorMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (isUpdateMode) {
        await updateMovie(
          new Movie(movieToUpdate.id, title, price, movieToUpdate.bookedSeats),
        );
      } else {
        await addMovie(new Movie(null, title, price, []));
      }
      closeForm();
      setMovies(await fetchAllMovies());
    } catch (err) {
      setErrorMessage("Something went wrong, please try again later.");
    }
  }

  return (
    <dialog open className={styles.dialog} id="dialog">
      <h3>
        {isUpdateMode ? `Update "${movieToUpdate.title}"` : "Add a new movie"}
      </h3>
      {errorMessage ? (
        <p className={styles.errorMessage}>{errorMessage}</p>
      ) : null}
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          minLength={1}
          maxLength={50}
          required
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min={50}
          max={300}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <button className={styles.closeBtn} onClick={closeForm}>
        Close
      </button>
    </dialog>
  );
}

export default MovieForm;
