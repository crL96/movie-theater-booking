import styles from "./movieTheater.module.css";

function MovieTheater({ size }) {
  const seating = [];

  function generateSeating() {
    for (let row = 1; row <= size[0]; row++) {
      const rowSeats = [];

      for (let seat = 1; seat <= size[1]; seat++) {
        rowSeats.push(<div className={styles.seat} key={[row, seat]}></div>);
      }

      seating.push(
        <div className={styles.row} key={row}>
          {rowSeats}
        </div>,
      );
    }
  }
  generateSeating();

  return (
    <div className={styles.movieTheater}>
      <div className={styles.screen}></div>
      <div className={styles.seatContainer}>{seating}</div>
    </div>
  );
}

export default MovieTheater;
