import { apiRequest } from "./api";
import { updateMovie } from "./movieService";

async function createBooking(booking) {
    await apiRequest("/booking", {
        method: "POST",
        body: JSON.stringify({
            name: booking.name,
            phone: booking.phone,
            movieId: booking.movie.id,
            seats: booking.seats,
            cost: booking.seats.length * booking.movie.price,
        }),
    });

    //With a proper backend api connecting bookings to
    // a movies booked seats would be handled there
    booking.movie.bookedSeats = booking.movie.bookedSeats.concat(booking.seats);
    await updateMovie(booking.movie);
}

export { createBooking };
