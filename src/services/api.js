const API_URL = import.meta.env.VITE_API_URL;
import Movie from "../classes/Movie";

async function fetchAllMovies() {
    const res = await fetch(API_URL + "/movie");

    if (res.status != 200) {
        throw new Error("Failed to fetch movies");
    }

    const data = await res.json();
    const movies = data.map((item) => {
        return new Movie(item.id, item.title, item.price, item.bookedSeats);
    });
    return movies;
}

export { fetchAllMovies };
