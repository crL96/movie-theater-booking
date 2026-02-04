import styles from "./seat.module.css";

function Seat({ seatNr, isOccupied, selectedSeats, setSelectedSeats }) {
  const isSelected = selectedSeats.includes(seatNr);

  function toggleSelected() {
    if (!isSelected) setSelectedSeats([...selectedSeats, seatNr]);
    else {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNr));
    }
  }

  return (
    <div
      className={`${styles.seat} ${isOccupied ? styles.occupied : ""} ${isSelected ? styles.selected : ""}`}
      onClick={toggleSelected}
    ></div>
  );
}

export default Seat;
