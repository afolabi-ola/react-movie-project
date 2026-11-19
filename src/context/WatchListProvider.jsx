import { useEffect, useRef, useState } from 'react';
import WatchListContext from './WatchListContext';
import {
  addToWatchListService,
  getAllWatchListService,
  removeFromWatchListService,
} from '../services/watchListServices';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';

function WatchListProvider({ children }) {
  const [watchListData, setWatchListData] = useState([]);
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const toastId = useRef(null);
  const { isAuthenticated, user } = useAuth(); // Ensure the user is authenticated before fetching the watchlist

  const userId = user?.id || user?._id || user?.email; // Get the user ID from the authenticated user

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchWatchList = async () => {
      try {
        const data = await getAllWatchListService();

        setWatchListData(data.data.watchlistDatabase || []);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
        toast.error(`Failed to fetch watchlist: ${error.message}`);
      }
    };

    fetchWatchList();
  }, [refetchTrigger, isAuthenticated, userId]); // Refetch when refetchTrigger changes or when authentication status changes

  const currentWatchListData = isAuthenticated ? watchListData : [];

  const isMovieInWatchList = (movieId) => {
    if (!isAuthenticated) return;

    return currentWatchListData.some(
      (movie) => parseInt(movie.tmdbId) === parseInt(movieId),
    );
  };

  const addToWatchList = async (movie) => {
    // if (isMovieInWatchList(tmdbId)) {
    //   setWatchListData((prevWatchList) =>
    //     prevWatchList.filter((movie) => movie.tmdbId !== tmdbId),
    //   );
    //   return;
    // }

    const {
      id: tmdbId,
      poster_path: posterPath,
      vote_average: rating,
      overview,
      media_type: mediaType,
    } = movie;

    const title =
      movie.title ||
      movie.name ||
      movie.original_name ||
      movie.original_title ||
      'Untitled';

    try {
      toastId.current = toast.loading(`Adding ${title} to watchlist...`);
      await addToWatchListService({
        tmdbId,
        title,
        posterPath,
        rating,
        overview,
        mediaType: mediaType === 'tv' ? 'series' : mediaType,
      });

      toast.success(`${title} added to watchlist successfully!`);
      setRefetchTrigger((prev) => prev + 1);
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      toast.error(`Failed to add ${title} to watchlist: ${error.message}`);
    } finally {
      toast.dismiss(toastId.current);
    }

    // setWatchListData([movie, ...watchListData]);
  };

  const removeFromWatchList = async (movieId) => {
    try {
      toastId.current = toast.loading(`Removing movie from watchlist...`);
      const response = await removeFromWatchListService(movieId);

      toast.success(
        `${response.data.media.title} removed from watchlist successfully!`,
      );
      setRefetchTrigger((prev) => prev + 1);
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      toast.error(`Failed to remove movie from watchlist: ${error.message}`);
    } finally {
      toast.dismiss(toastId.current);
    }
  };

  return (
    <WatchListContext.Provider
      value={{
        watchListData: currentWatchListData,
        addToWatchList,
        isMovieInWatchList,
        removeFromWatchList,
      }}
    >
      {children}
    </WatchListContext.Provider>
  );
}

export default WatchListProvider;
