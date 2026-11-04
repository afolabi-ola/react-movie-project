import { useState } from 'react';
import WatchListContext from './WatchListContext';

function WatchListProvider({ children }) {
  const [watchListData, setWatchListData] = useState([]);

  const isMovieInWatchList = (movieId) => {
    return watchListData.some(
      (movie) => parseInt(movie.id) === parseInt(movieId),
    );
  };

  const addToWatchList = (movie) => {
    const movieId = movie.id;

    if (isMovieInWatchList(movieId)) {
      setWatchListData((prevWatchList) =>
        prevWatchList.filter((movie) => movie.id !== movieId),
      );
      return;
    }

    setWatchListData([movie, ...watchListData]);
  };

  return (
    <WatchListContext.Provider
      value={{ watchListData, addToWatchList, isMovieInWatchList }}
    >
      {children}
    </WatchListContext.Provider>
  );
}

export default WatchListProvider;
