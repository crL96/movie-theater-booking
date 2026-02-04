import styles from "./selectionSummary.module.css";

function SelectionSummary({ price, seats }) {
  return (
    <p className={styles.text}>
      You have selected <span className={styles.highlight}>{seats}</span> seats
      for a price of <span className={styles.highlight}>{price * seats}kr</span>
    </p>
  );
}

export default SelectionSummary;
