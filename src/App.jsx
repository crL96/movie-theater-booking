import { useState } from "react";
import Movie from "./classes/Movie";
import MovieSelector from "./components/movieSelector/MovieSelector";
import MovieTheater from "./components/movieTheater/MovieTheater";
import SelectionSummary from "./components/selectionSummary/SelectionSummary";
import SeatExplaination from "./components/seatExplaination/SeatExplaination";
import BookingForm from "./components/bookingForm/BookingForm";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(
    new Movie(1, "The Lion King", 100, []),
  );
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showBookForm, setShowBookForm] = useState(false);

  return (
    <>
      <MovieSelector setSelectedMovie={setSelectedMovie} />
      <SeatExplaination />
      <MovieTheater
        size={[6, 8]}
        movie={selectedMovie}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
      />
      <SelectionSummary
        price={selectedMovie.price}
        seats={selectedSeats.length}
      />
      {!showBookForm ? (
        <button onClick={() => setShowBookForm(!showBookForm)}>
          Reserve seats
        </button>
      ) : null}
      {showBookForm ? <BookingForm setShowBookForm={setShowBookForm} /> : null}
    </>
  );
}

export default App;
