import React, { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import AddToFavorites from "./components/AddToFavorites";
import { IMovie } from "./Models/IMovie";
import RemoveFromFavorites from "./components/RemoveFromFavorites";

function App() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [favorites, setFavorites] = useState<IMovie[]>([]);

  const getMovieRequest = async () => {
    let movieList: IMovie[] = [];
    let page = 1;
    const words = [
      "drama",
      "action",
      "thriller",
      "horror",
      "musical",
      "fantasy",
    ];
    const searchWord = words[Math.floor(Math.random() * words.length)];

    while (movieList.length < 20) {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${searchWord}&apikey=15f21ab&page=${page}`
      );
      const responseJson = await response.json();
      movieList = movieList.concat(responseJson.Search);
      page += 1;
    }

    setMovies(movieList);
  };

  useEffect(() => {
    getMovieRequest();
  }, []);

  const saveToLocalStorage = (favorites: IMovie[]) => {
    localStorage.setItem("movie-carousel-favorites", JSON.stringify(favorites));
  };

  useEffect(() => {
    const localStorageFavorites = localStorage.getItem(
      "movie-carousel-favorites"
    );

    let favoriteMovies: IMovie[] = [];

    if (localStorageFavorites) {
      favoriteMovies = JSON.parse(localStorageFavorites);
    }

    setFavorites(favoriteMovies);
  }, []);

  const addToFavorites = (movie: IMovie) => {
    if (
      favorites.filter((favorite: IMovie) => favorite.imdbID === movie.imdbID)
        .length === 0
    ) {
      const newFavoritesList = [...favorites, movie];
      setFavorites(newFavoritesList);
      saveToLocalStorage(newFavoritesList);
    }
  };

  const removeFromFavorites = (movie: IMovie) => {
    const newFavoritesList = favorites.filter(
      (favorite: IMovie) => favorite.imdbID !== movie.imdbID
    );

    setFavorites(newFavoritesList);
    saveToLocalStorage(newFavoritesList);
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    saveToLocalStorage([]);
  };

  return (
    <div className="movies">
      <div className="heading">
        <h1>Movies</h1>
        <button onClick={() => getMovieRequest()}>Load other movies</button>
      </div>
      <div className="movie-list">
        <MovieList
          movies={movies}
          favoriteComponent={AddToFavorites}
          handleFavoritesClick={addToFavorites}
        ></MovieList>
      </div>
      <div className="heading">
        <h1>Favorites</h1>
        <button onClick={() => clearAllFavorites()}>Clear all favorites</button>
      </div>
      <div className="movie-list">
        <MovieList
          movies={favorites}
          favoriteComponent={RemoveFromFavorites}
          handleFavoritesClick={removeFromFavorites}
        ></MovieList>
      </div>
    </div>
  );
}

export default App;
