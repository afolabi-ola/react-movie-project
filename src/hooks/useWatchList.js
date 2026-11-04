import { useContext } from 'react';
import WatchListContext from '../context/WatchListContext';

function useWatchList() {
  const context = useContext(WatchListContext);

  if (!context) {
    throw new Error('useWatchList must be used within a WatchListProvider');
  }

  return context;
}

export default useWatchList;
