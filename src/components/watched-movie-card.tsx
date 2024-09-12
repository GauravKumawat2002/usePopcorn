import { WatchedMovie } from "../interfaces";

export default function WatchedMovieCard({
  movie,
  removeWatchedMovie,
}: {
  movie: WatchedMovie;
  removeWatchedMovie: (id: string | null) => void;
}) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} </span>
        </p>
        <button className="btn-delete" onClick={() => removeWatchedMovie(movie.imdbID)}>
          X
        </button>
      </div>
    </li>
  );
}
