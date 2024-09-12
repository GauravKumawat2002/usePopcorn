import { useEffect, useState } from "react";
import { KEY, Movie, WatchedMovie } from "./interfaces";
import Navbar from "./components/nav";
import Logo from "./components/logo";
import Search from "./components/search";
import NumResult from "./components/num-results";
import Main from "./components/main";
import ListBox from "./components/list-box";
import MovieCard from "./components/movie-card";
import WatchedBox from "./components/watched-box";
import WatchedMovieCard from "./components/watched-movie-card";
import Summary from "./components/summary";
import MovieDetails from "./components/movie-details";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watched, setWatched] = useState<WatchedMovie[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  // query would be passed down to search component (lifting state up)
  const [query, setQuery] = useState("");
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // handler functions

  // This function is responsible to set the selected movie id
  // which will then be passed to the MovieDetails component
  // which will then display the details of the selected movie
  // based on the id
  function handleSelected(id: string) {
    setSelectedMovieId(selectedMovieId => (selectedMovieId === id ? null : id));
  }
  // This function is responsible to close the movie details
  function onCloseMovie() {
    setSelectedMovieId(null);
  }

  // This function is responsible to add a movie to the watched list
  function handleAddWatched(movie: WatchedMovie) {
    setWatched(watched => {
      if (watched.some(watchedMovie => watchedMovie.imdbID === movie.imdbID)) {
        return watched;
      }
      return [...watched, movie];
    });
  }

  // This function is responsible to remove a movie from the watched list
  function removeWatchedMovie(id: string) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  }

  // fetch movies
  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      isLoading(true);
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?i=tt1375666&apikey=${KEY}&s=${query}`,
          { signal: controller.signal, method: "GET" }
        );

        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();

        if (data.Response === "False") throw new Error(data.Error);
        setMovies(data.Search);
      } catch (err) {
        // Ignore abort errors
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err instanceof Error ? err.message : "An unknown error occurred");
        }
      } finally {
        isLoading(false);
      }
    }

    if (!query.length) {
      setError("");
      setMovies([]);
      return;
    }

    fetchMovies();
    return () => {
      setError("");
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <Navbar>
        <Logo>
          <span className="img">🍿</span>
          <h1>usePopcorn</h1>
        </Logo>
        <Search query={query} setQuery={setQuery} />
        {movies && <NumResult movies={movies} />}
      </Navbar>

      <Main>
        <ListBox>
          {loading && <h2 className="loader">Loading...</h2>}
          {!loading && !error && (
            <ul className="list list-movies">
              {movies?.map(movie => (
                <MovieCard
                  movie={movie}
                  key={movie.imdbID}
                  handleSelected={() => handleSelected(movie.imdbID)}
                />
              ))}
            </ul>
          )}
          {error && <h2 className="error">{error}</h2>}
        </ListBox>
        <WatchedBox>
          {selectedMovieId ? (
            <MovieDetails
              selectedMovieId={selectedMovieId}
              onCloseMovie={() => onCloseMovie()}
              onAddWatched={watched => handleAddWatched(watched)}
              watched={watched}
            />
          ) : (
            <>
              <Summary watchedMovies={watched} />
              <ul className="list">
                {watched.map(movie => (
                  <WatchedMovieCard
                    movie={movie}
                    key={movie.imdbID}
                    removeWatchedMovie={() => removeWatchedMovie(movie.imdbID)}
                  />
                ))}
              </ul>
            </>
          )}
        </WatchedBox>
      </Main>
    </>
  );
}
