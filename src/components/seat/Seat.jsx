import styles from "./seat.module.css";

function Seat({ seatNr, isOccupied }) {
  return (
    <div
      className={`${styles.seat} ${isOccupied ? styles.occupied : ""}`}
    ></div>
  );
}

export default Seat;
