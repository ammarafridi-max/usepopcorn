import { useEffect, useState } from "react";

const KEY = "f67ad6c";

export function useMovies(query) {
  const [movies, setMovies] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function getData() {
      try {
        setIsLoading(true);
        setError("");
        console.log(`Fetching data for query: ${query}`);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Movie data could not be fetched");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");
        console.log("Fetched data:", data);
        setMovies(data.Search);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching movies:", error);
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setIsLoading(false);
      setError("");
      return;
    }

    getData();

    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
