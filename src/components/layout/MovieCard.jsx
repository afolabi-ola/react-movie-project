import { Link } from 'react-router';
import ImageOne from '../../assets/images/img3.jpg';
import Button from '../ui/Button';
import RatingBadge from '../ui/RatingBadge';
import Badge from '../ui/Badge';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';


function MovieCard({
  image = ImageOne,
  title = 'Movie One',
  rating = 5.8,
  id,
  mediaType = 'movie',
  addToWatchList,
  movie,
  isMovieInWatchList,
}) {
  const isAddedToWatchList = isMovieInWatchList(id);

  return (
    <div className='w-62.5 min-h-125 h-full  overflow-hidden space-y-3 shadow-2xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-tr-2xl rounded-b-2xl'>
      <div className='w-full max-h-80 h-[70%]'>
        <img src={image} alt='movie image' className='w-full h-full' />
      </div>

      <div className='px-2 space-x-0.5 space-y-4'>
        <div className='flex gap-2 capitalize'>
          <RatingBadge rating={rating} />
          <Badge text={mediaType === 'tv' ? 'series' : mediaType} />
        </div>
        <h1 className='font-bold'>{title}</h1>

        <button
          onClick={() => addToWatchList(movie)}
          type='button'
          aria-pressed={isAddedToWatchList}
          className='flex items-center gap-2 text-sm font-semibold text-indigo-500 hover:text-indigo-600 dark:text-blue-400 dark:hover:text-blue-300'
        >
          {isAddedToWatchList ? <FaBookmark /> : <FaRegBookmark />}
        </button>
        <Link
          to={`/${mediaType === 'movie' ? 'movie' : 'series'}-details/${id}`}
        >
          <Button variant='primary'>View More</Button>
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;
