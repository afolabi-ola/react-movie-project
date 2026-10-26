import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { getMultiSearchUrl, OPTIONS } from '../constants';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import SearchResult from '../components/layout/SearchResult';

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('userSearch') || '';
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchResponse, setSearchResponse] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    const controller = new AbortController();

    const fetchSearchResults = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const response = await fetch(getMultiSearchUrl(query), {
          ...OPTIONS,
          signal: controller.signal,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.status_message ||
              `Search request failed with status ${response.status}`,
          );
        }

        setSearchResponse(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching search results:', err);
          setSearchResponse(null);
          setErrorMessage(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchSearchResults();

    return () => controller.abort();
  }, [query]);

  if (isLoading && !searchResponse) {
    return <Loader resource='search' />;
  }

  if (errorMessage) {
    return <ErrorMessage errorMessage={errorMessage} />;
  }

  return (
    <section className='space-y-8'>
      <div>
        <h1 className='text-3xl font-bold'>Search results</h1>
        {query ? (
          <p className='mt-2 text-slate-600 dark:text-slate-400'>
            Showing results for <strong>&quot;{query}&quot;</strong>
          </p>
        ) : (
          <p className='mt-2 text-slate-600 dark:text-slate-400'>
            Enter a movie, series, or actor name in the search bar to search.
          </p>
        )}
      </div>

      {searchResponse?.results?.length > 0 ? (
        searchResponse.results.map((result) => (
          <SearchResult result={result} key={result.id} />
        ))
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </section>
  );
}

export default Search;
