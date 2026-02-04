import styles from "./bookingForm.module.css";

function BookingForm({ setShowBookForm }) {
  return (
    <form className={styles.form}>
      <h2>Reserve your tickets</h2>
      <label htmlFor="name">
        Name
        <input type="text" name="name" id="name" placeholder="John Smith" />
      </label>
      <label htmlFor="phone">
        Phone
        <input type="tel" name="phone" id="phone" placeholder="555-0212921" />
      </label>
      <button type="submit">Submit</button>
      <button type="button" onClick={() => setShowBookForm(false)}>
        Cancel
      </button>
    </form>
  );
}

export default BookingForm;
