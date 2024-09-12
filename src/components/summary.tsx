import { WatchedMovie } from "../interfaces";

export default function Summary({ watchedMovies }: { watchedMovies: WatchedMovie[] }) {
  const average = (array: number[]): number =>
    array.reduce((acc: number, cur: number) => acc + cur / array.length, 0);

  const avgImdbRating = average(watchedMovies.map(movie => parseFloat(movie.imdbRating)));
  const avgUserRating = average(watchedMovies.map(movie => parseFloat(movie.userRating)));
  const avgRuntime = average(watchedMovies.map(movie => parseFloat(movie.runtime)));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>
            {watchedMovies.length} {watchedMovies.length > 0 ? "movies" : "movie"}
          </span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating > 0 ? avgImdbRating.toFixed(2) : avgImdbRating.toFixed(0)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating > 0 ? avgUserRating.toFixed(2) : avgUserRating.toFixed(0)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime > 0 ? avgRuntime.toFixed(2) : avgRuntime.toFixed(0)} min</span>
        </p>
      </div>
    </div>
  );
}
