import styles from "./movieSelector.module.css";

function MovieSelector({ movieList }) {
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
