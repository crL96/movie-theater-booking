const API_URL = import.meta.env.VITE_API_URL;
import Movie from "../classes/Movie";
import { apiRequest } from "./api";

async function fetchAllMovies() {
    const data = await apiRequest("/movie");
    const movies = data.map((item) => {
        return new Movie(item.id, item.title, item.price, item.bookedSeats);
    });
    return movies;
}

async function getMovieById(id) {
    const data = await apiRequest("/movie/" + id);
    return new Movie(data.id, data.title, data.price, data.bookedSeats);
}

async function deleteMovieById(id) {
    await apiRequest("/movie/" + id, {
        method: "DELETE",
    });
}

async function addMovie(movie) {
    await apiRequest("/movie", {
        method: "POST",
        body: JSON.stringify({
            title: movie.title,
            price: movie.price,
            bookedSeats: [],
        }),
    });
}

async function updateMovie(movie) {
    await apiRequest("/movie/" + movie.id, {
        method: "PUT",
        body: JSON.stringify(movie),
    });
}

export { fetchAllMovies, deleteMovieById, addMovie, updateMovie, getMovieById };
