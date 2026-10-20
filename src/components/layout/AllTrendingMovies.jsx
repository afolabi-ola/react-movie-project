import { getImageUrl } from '../../constants';
import MovieCard from './MovieCard';

function AllTrendingMovies({ trendingMovies }) {
  return (
    <div className=''>
      <h1 className='text-2xl font-bold mb-4'>Trending Movies</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {trendingMovies.map((movie) => {
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
            />
          );
        })}
      </div>
    </div>
  );
}

export default AllTrendingMovies;
