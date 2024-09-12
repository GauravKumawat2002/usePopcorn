import { useEffect, useState } from "react";
import { KEY, SelectedMovie, WatchedMovie } from "../interfaces";
import StarRating from "./star-rating";

export default function MovieDetails({
  selectedMovieId,
  onCloseMovie,
  onAddWatched, //handleAddWatched function will be passed as a prop to the MovieDetails component in this prop
}: {
  selectedMovieId: string;
  onCloseMovie: () => void;
  onAddWatched: (movie: WatchedMovie) => void;
}) {
  const [selectedMovie, setSelectedMovie] = useState<SelectedMovie | {}>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    Actors: actors,
    Poster: posters,
    Title: title,
    Runtime: runtime,
    Released: released,
    imdbRating,
    Director: director,
    Genre: genre,
    Plot: plot,
  } = selectedMovie as SelectedMovie;
  useEffect(() => {
    const controller = new AbortController();
    async function getMoviesDetails() {
      try {
        setLoading(true);
        const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieId}`, {
          signal: controller.signal,
          method: "GET",
        });

        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();
        if (data.Response === "False") throw new Error(data.Error);
        setSelectedMovie(data);
      } catch (err) {
        // Ignore abort errors
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err instanceof Error ? err.message : "An unknown error occurred");
        }
      } finally {
        setError(null);
        setLoading(false);
      }
    }
    selectedMovieId && getMoviesDetails();
    return () => {
      controller.abort();
    };
  }, [selectedMovieId]);
  console.log(selectedMovie);

  const newWatchedMovie: WatchedMovie = {
    imdbID: selectedMovieId,
    Poster: posters,
    Title: title,
    imdbRating: imdbRating,
    runtime: runtime,
    userRating: "0",
    Year: released,
  };
  // thsi function will take the onAddWatched function prop and pass the newWatchedMovie to it which will add the movie to the watched list
  function handleWatched() {
    onAddWatched(newWatchedMovie);
  }
  return (
    <div className="details">
      {loading && <h2 className="loader">Loading...</h2>}
      {!loading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={posters} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>

              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <StarRating numStars={10} />
            <button
              className="btn-add"
              onClick={() => {
                handleWatched();
                onCloseMovie();
              }}>
              Add to Watched
            </button>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors} </p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
      {error && <h2 className="error">{error}</h2>}
    </div>
  );
}
