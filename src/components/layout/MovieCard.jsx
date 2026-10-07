import { Link } from 'react-router';
import ImageOne from '../../assets/images/img3.jpg';
import Button from '../ui/Button';
import RatingBadge from '../ui/RatingBadge';

function MovieCard({
  image = ImageOne,
  title = 'Movie One',
  rating = 5.8,
  id,
  mediaType = 'movie',
}) {
  console.log(mediaType);
  return (
    <div className='w-62.5 min-h-125 h-full  overflow-hidden space-y-4 shadow-2xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-tr-2xl rounded-b-2xl'>
      <div className='w-full max-h-80 h-[70%]'>
        <img src={image} alt='movie image' className='w-full h-full' />
      </div>

      <div className='px-2 space-x-0.5 space-y-4'>
        <div>
          <RatingBadge rating={rating} />
        </div>
        <h1 className='font-bold'>{title}</h1>
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
