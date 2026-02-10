import styles from "./movieListItem.module.css";
import { deleteMovieById } from "../../services/api";

function MovieListItem({ movie }) {
  async function handleDelete() {
    try {
      await deleteMovieById(movie.id);
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div className={styles.movie}>
      <div className={styles.left}>
        <p>
          <strong>{movie.title}</strong>
        </p>
        <p>Price: {movie.price}kr</p>
        <p>Seats booked: {movie.bookedSeats.length}/48</p>
      </div>
      <div className={styles.btnContainer}>
        <button>Edit</button>
        <button onClick={handleDelete} className={styles.btnDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default MovieListItem;
