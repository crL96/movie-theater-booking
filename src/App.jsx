import { useState } from "react";
import Movie from "./classes/Movie";
import MovieSelector from "./components/movieSelector/MovieSelector";

function App() {
  const [selectedMovie, setSelectedMovie] = useState([
    new Movie(1, "The Lion King", 100, []),
  ]);

  return (
    <>
      <MovieSelector setSelectedMovie={setSelectedMovie} />
    </>
  );
}

export default App;
