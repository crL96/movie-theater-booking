import { useState } from "react";
import styles from "./bookingForm.module.css";
import { createBooking } from "../../services/bookingService";
import Booking from "../../classes/Booking";
import { getMovieById } from "../../services/movieService";

function BookingForm({ setShowBookForm, seats, movie, refreshSeating }) {
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));
    const booking = new Booking(
      data.name.trim(),
      data.phone.trim(),
      movie,
      seats,
    );

    const validationMsg = validateInput(booking);
    if (validationMsg != "") {
      setMessage(validationMsg);
      return;
    }

    try {
      await createBooking(booking);
      setMessage("Success! Your seats are now reserved.");
      setTimeout(() => setMessage(null), 5000);
      e.target.reset();
      refreshSeating();
    } catch {
      setMessage("Something went wrong, please try again later.");
    }
  }

  function validateInput(userInput) {
    if (userInput.seats.length < 1) {
      return "Please select atleast one seat";
    }
    const namePattern = /^\p{L}{2,20} \p{L}{2,20}$/u;
    if (!namePattern.test(userInput.name)) {
      return "Invalid name format. Enter a first and last name, each 2-20 letters long, using only letters. Separate them with a single space.";
    }
    const phonePattern = /^(?=.{8,20}$)\+?[0-9]+(?:[ ][0-9]+|-[0-9]+)*$/;
    if (!phonePattern.test(userInput.phone)) {
      return "Invalid phone number format. 8-20 characters. May only include numbers, hyphens, spaces or optional + at beginning";
    }
    return "";
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Reserve your tickets</h2>
      <label htmlFor="name">
        Name
        <input
          type="text"
          name="name"
          id="name"
          placeholder="John Smith"
          maxLength={41}
        />
      </label>
      <label htmlFor="phone">
        Phone
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="555-0212921"
          minLength={8}
          maxLength={20}
        />
      </label>
      {message ? <p className={styles.message}>{message}</p> : null}
      <button type="submit">Submit</button>
      <button type="button" onClick={() => setShowBookForm(false)}>
        Cancel
      </button>
    </form>
  );
}

export default BookingForm;
