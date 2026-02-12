import { useCallback, useState } from "react";
import Movie from "./classes/Movie";
import MovieSelector from "./components/movieSelector/MovieSelector";
import MovieTheater from "./components/movieTheater/MovieTheater";
import SelectionSummary from "./components/selectionSummary/SelectionSummary";
import SeatExplaination from "./components/seatExplaination/SeatExplaination";
import BookingForm from "./components/bookingForm/BookingForm";
import { Link } from "react-router-dom";
import { getMovieById } from "./services/movieService";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(
    new Movie(1, "The Lion King", 100, [10, 11, 25, 26, 37]),
  );
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showBookForm, setShowBookForm] = useState(false);

  async function refreshSeating() {
    setSelectedMovie(await getMovieById(selectedMovie.id));
    setSelectedSeats([]);
  }

  const handleMovieChange = useCallback((movie) => {
    setSelectedMovie(movie);
    setSelectedSeats([]);
  }, []);

  return (
    <>
      <Link to="/admin" className="navBtn">
        Admin
      </Link>
      <MovieSelector handleMovieChange={handleMovieChange} />
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
      {showBookForm ? (
        <BookingForm
          setShowBookForm={setShowBookForm}
          seats={selectedSeats}
          movie={selectedMovie}
          refreshSeating={refreshSeating}
        />
      ) : null}
    </>
  );
}

export default App;
