import { useState } from "react";
import styles from "./movieForm.module.css";
import Movie from "../../classes/Movie";
import {
  addMovie,
  fetchAllMovies,
  updateMovie,
} from "../../services/movieService";

function MovieForm({ setShowForm, setMovies, movieToUpdate }) {
  const isUpdateMode = movieToUpdate != null;

  const [title, setTitle] = useState(isUpdateMode ? movieToUpdate.title : "");
  const [price, setPrice] = useState(isUpdateMode ? movieToUpdate.price : "");

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
      setShowForm(false);
      setMovies(await fetchAllMovies());
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <dialog open className={styles.dialog} id="dialog">
      <h3>
        {isUpdateMode ? `Update "${movieToUpdate.title}"` : "Add a new movie"}
      </h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <button className={styles.closeBtn} onClick={() => setShowForm(false)}>
        Close
      </button>
    </dialog>
  );
}

export default MovieForm;
