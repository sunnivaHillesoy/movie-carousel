import React from "react";
import { IMovie } from "../Models/IMovie";
import "../App.css";

const MovieList = (props: {
  movies: IMovie[];
  favoriteComponent: Function;
  handleFavoritesClick: Function;
}) => {
  const FavoriteComponent = props.favoriteComponent;
  return (
    <>
      {props.movies.map((movie: IMovie, index: number) => (
        <div className="movie" key={movie.imdbID}>
          <img src={movie.Poster} alt={movie.Title} />
          <div
            onClick={() => props.handleFavoritesClick(movie)}
            className="overlay"
          >
            <FavoriteComponent />
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
