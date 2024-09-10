import { useEffect, useState } from "react";
import { Movie, WatchedMovie } from "./interfaces";
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

const KEY = "f9a2e728";
const query = "Assassin's Creed";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watched] = useState<WatchedMovie[]>([]);
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    isLoading(true);
    async function fetchMovies() {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?i=tt1375666&apikey=${KEY}&s=${query}`,
          { signal: controller.signal, method: "GET" }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        console.log(data);
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
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
    fetchMovies();
    return () => {
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
        <Search />
        {movies && <NumResult movies={movies} />}
      </Navbar>

      <Main>
        <ListBox>
          {loading && <h2 className="loader">Loading...</h2>}
          {!loading && !error && (
            <ul className="list">
              {movies?.map(movie => (
                <MovieCard movie={movie} key={movie.imdbID} />
              ))}
            </ul>
          )}
          {error && <h2 className="error">{error}</h2>}
        </ListBox>
        <WatchedBox>
          <Summary watchedMovies={watched} />
          <ul className="list">
            {watched.map(movie => (
              <WatchedMovieCard movie={movie} key={movie.imdbID} />
            ))}
          </ul>
        </WatchedBox>
      </Main>
    </>
  );
}
