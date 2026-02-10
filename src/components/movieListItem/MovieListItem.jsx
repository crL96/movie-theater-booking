import styles from "./movieListItem.module.css";

function MovieListItem({ movie }) {
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
        <button className={styles.btnDelete}>Delete</button>
      </div>
    </div>
  );
}

export default MovieListItem;
