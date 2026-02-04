import styles from "./bookingForm.module.css";
const API_URL = import.meta.env.VITE_API_URL;

function BookingForm({ setShowBookForm, seats, movie }) {
  async function handleSubmit(e) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));
    data.movieId = movie.id;
    data.seats = seats;
    data.cost = seats.length * movie.price;

    try {
      const res = await fetch(API_URL + "/booking", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (res.status !== 201) return;

      //With a proper backend api connecting bookings to
      // a movies booked seats would be handled there
      await fetch(API_URL + "/movie/" + movie.id, {
        method: "PATCH",
        body: JSON.stringify({
          bookedSeats: movie.bookedSeats.concat(seats),
        }),
      });
    } catch {
      console.log("Something went wrong in the communication with the API");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
