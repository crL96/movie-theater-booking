import { useState } from "react";
import styles from "./bookingForm.module.css";
const API_URL = import.meta.env.VITE_API_URL;

function BookingForm({ setShowBookForm, seats, movie }) {
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (message != null && message.startsWith("Success")) return;

    const data = Object.fromEntries(new FormData(e.target));
    data.phone = data.phone.trim();
    data.name = data.name.trim();
    data.movieId = movie.id;
    data.seats = seats;
    data.cost = seats.length * movie.price;

    const validationMsg = validateInput(data);
    if (validationMsg != "") {
      setMessage(validationMsg);
      return;
    }

    try {
      const res = await fetch(API_URL + "/booking", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (res.status !== 201) {
        setMessage("Something went wrong, please try again later.");
        return;
      }

      //With a proper backend api connecting bookings to
      // a movies booked seats would be handled there
      await fetch(API_URL + "/movie/" + movie.id, {
        method: "PATCH",
        body: JSON.stringify({
          bookedSeats: movie.bookedSeats.concat(seats),
        }),
      });
      setMessage("Success! Your seats are now reserved.");
      e.target.reset();
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
