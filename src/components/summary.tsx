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
          <span>{watchedMovies.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}
