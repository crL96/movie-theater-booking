import styles from "./movieTheater.module.css";
import Seat from "../seat/Seat";

function MovieTheater({ size, movie }) {
  const seating = [];

  function generateSeating() {
    let currSeatNr = 1;
    for (let row = 1; row <= size[0]; row++) {
      const rowSeats = [];

      for (let seat = 1; seat <= size[1]; seat++) {
        const isOccupied = movie.bookedSeats.includes(currSeatNr);
        rowSeats.push(
          <Seat key={currSeatNr} seatNr={currSeatNr} isOccupied={isOccupied} />,
        );
        currSeatNr++;
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
