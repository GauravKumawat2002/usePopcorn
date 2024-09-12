import { Movie } from "../interfaces";

export default function MovieCard({
  movie,
  handleSelected,
}: {
  movie: Movie;
  handleSelected: (id: string) => void;
}) {
  return (
    <li onClick={() => handleSelected(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
