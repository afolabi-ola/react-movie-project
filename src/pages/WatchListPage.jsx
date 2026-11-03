import { Link } from 'react-router';
import MovieCard from '../components/layout/MovieCard';
import { getImageUrl } from '../constants';

function WatchListPage({ watchlist, addToWatchList, isMovieInWatchList }) {
  return (
    <section className='mx-auto max-w-7xl space-y-8'>
      <div>
        <p className='mb-2 text-sm font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-blue-400'>
          Your collection
        </p>
        <h1 className='text-4xl font-black'>Watchlist</h1>
        <p className='mt-2 text-slate-500 dark:text-slate-400'>
          {watchlist.length} {watchlist.length === 1 ? 'title' : 'titles'} saved
        </p>
      </div>

      {watchlist.length > 0 ? (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {watchlist.map((movie) => {
            const {
              title,
              name,
              original_title,
              original_name,
              vote_average,
              poster_path,
              id,
              media_type,
            } = movie;

            const imageUrl = getImageUrl(poster_path, 'w500');

            const aprxVoteAvg = Math.round(vote_average * 10) / 10; // Round to one decimal place

            return (
              <MovieCard
                id={id}
                title={title || original_title || name || original_name}
                rating={aprxVoteAvg.toFixed(1)}
                image={imageUrl}
                key={id}
                mediaType={media_type || 'movie'}
                movie={movie}
                addToWatchList={addToWatchList}
                isMovieInWatchList={isMovieInWatchList}
              />
            );
          })}
        </div>
      ) : (
        <div className='rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700'>
          <p className='text-lg font-semibold'>Your watchlist is empty.</p>
          <p className='mt-2 text-slate-500 dark:text-slate-400'>
            Add movies or series from the home page or their details page.
          </p>
          <Link
            to='/'
            className='mt-6 inline-flex rounded-xl bg-indigo-500 px-5 py-3 font-semibold text-white hover:bg-indigo-600'
          >
            Explore titles
          </Link>
        </div>
      )}
    </section>
  );
}

export default WatchListPage;
