import { getImageUrl } from '../../constants';
import { Link } from 'react-router';
import { getResultDate, getResultTitle } from '../../utils';

function SearchResult({ result }) {
  const title = getResultTitle(result);
  const date = getResultDate(result);
  const isPerson = result.media_type === 'person';
   const detailsPath = isPerson
     ? `/cast/${result.id}`
     : result.media_type === 'movie'
       ? `/movie-details/${result.id}`
       : `/series-details/${result.id}`;

  return (
    <article className='flex gap-4 rounded-2xl bg-slate-100 p-3 shadow-md dark:bg-slate-900'>
      <div className='h-28 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-300 dark:bg-slate-700'>
        {result.poster_path || result.profile_path ? (
          <img
            src={getImageUrl(result.poster_path || result.profile_path, 'w500')}
            alt={`${title} poster`}
            className='h-full w-full object-cover'
          />
        ) : (
          <div className='flex h-full items-center justify-center p-2 text-center text-xs text-slate-500'>
            No image
          </div>
        )}
      </div>

      <div className='min-w-0 flex-1 space-y-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <h2 className='text-lg font-bold'>{title}</h2>
          <span className='rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold capitalize text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'>
            {isPerson
              ? result.known_for_department || 'person'
              : result.media_type}
          </span>
        </div>
        <p className='text-sm text-slate-500 dark:text-slate-400'>
          {date ||
            (isPerson
              ? result.known_for?.length
                ? 'Known for several titles'
                : 'Person'
              : 'Release date unavailable')}
          {!isPerson &&
            ` · Rating ${Number(result.vote_average || 0).toFixed(1)}`}
        </p>
        <p className='line-clamp-2 text-sm text-slate-600 dark:text-slate-300'>
          {result.overview || 'No description is available for this result.'}
        </p>

        <Link
          to={detailsPath}
          className='inline-block text-sm font-semibold text-indigo-500 hover:text-indigo-400'
        >
          View details
        </Link>
      </div>
    </article>
  );
}

export default SearchResult;
