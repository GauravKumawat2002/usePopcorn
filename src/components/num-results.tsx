import { Movie } from "../interfaces";

export default function NumResult({ movies }: { movies: Movie[] }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
