import { HiCalendar, HiClock, HiHeart, HiTicket } from 'react-icons/hi';
import { getImageUrl } from '../../constants';
import Badge from '../ui/Badge';
import MetaDataIcon from '../ui/MetaDataIcon';
import { HiTv } from 'react-icons/hi2';
import RatingBadge from '../ui/RatingBadge';

function DetailsHero({ details }) {
  const {
    backdrop_path,
    poster_path,
    title,
    releaseYear,
    formattedRuntime,
    vote_average,
    vote_count,
    genres,
    overview,
    homepage,
    mediaType = 'Movie',
    tagline,
  } = details;

  return (
    <section className='relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-xl dark:border-slate-800 dark:bg-slate-900 h-full'>
      {backdrop_path && (
        <img
          src={getImageUrl(backdrop_path, 'w1280')}
          alt=''
          className='absolute inset-0 h-full w-full object-cover opacity-10 dark:opacity-20'
        />
      )}

      <div className='relative grid gap-8 p-5 sm:p-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10 lg:p-10'>
        <div className='mx-auto w-full max-w-65'>
          {poster_path ? (
            <img
              src={getImageUrl(poster_path, 'w500')}
              alt={`${title} poster`}
              className='aspect-2/3 w-full rounded-2xl object-cover shadow-2xl'
            />
          ) : (
            <div className='flex aspect-2/3 items-center justify-center rounded-2xl bg-slate-200 text-center text-slate-500 dark:bg-slate-800 dark:text-slate-400'>
              No poster available
            </div>
          )}

          <button className='mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/80 py-3 font-semibold transition hover:border-indigo-400 hover:text-indigo-500 dark:border-slate-700 dark:bg-slate-950/70 dark:hover:border-blue-400 dark:hover:text-blue-400'>
            <HiHeart />
            Add to watchlist
          </button>
        </div>

        <div className='min-w-0'>
          <div className='mb-5 flex flex-wrap items-center gap-3 text-sm font-medium text-slate-500 dark:text-slate-400'>
            <Badge text={mediaType} variant='primary' />
            <MetaDataIcon icon={HiCalendar} text={releaseYear} />
            <MetaDataIcon
              icon={mediaType === 'Movie' ? HiClock : HiTv}
              text={formattedRuntime}
            />
          </div>

          <h1 className='max-w-3xl text-4xl font-black tracking-tight text-slate-900 sm:text-6xl dark:text-white'>
            {title}
          </h1>

          {tagline && (
            <p className='mt-3 text-lg font-medium italic text-slate-500 dark:text-slate-400'>
              “{tagline}”
            </p>
          )}

          <div className='mt-5 flex flex-wrap items-center gap-4'>
            <RatingBadge rating={vote_average} vote_count={vote_count} />
            {genres.map((genre) => (
              <Badge key={genre.id} text={genre.name} />
            ))}
          </div>

          <p className='mt-7 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300'>
            {overview || 'No overview is available for this movie yet.'}
          </p>

          {homepage && (
            <a
              href={homepage}
              target='_blank'
              rel='noreferrer'
              className='mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 font-bold text-white transition hover:bg-indigo-600 dark:bg-blue-500 dark:hover:bg-blue-600'
            >
              <HiTicket />
              Official website
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default DetailsHero;
