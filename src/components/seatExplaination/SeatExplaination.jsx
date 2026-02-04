import seatStyles from "../seat/seat.module.css";
import styles from "./seatExplaination.module.css";

function SeatExplaination() {
  return (
    <ul className={styles.explainer}>
      <li>
        <div className={seatStyles.seat}></div>
        <p>N/A</p>
      </li>
      <li>
        <div className={`${seatStyles.seat} ${seatStyles.selected}`}></div>
        <p>Selected</p>
      </li>
      <li>
        <div className={`${seatStyles.seat} ${seatStyles.occupied}`}></div>
        <p>Occupied</p>
      </li>
    </ul>
  );
}

export default SeatExplaination;
