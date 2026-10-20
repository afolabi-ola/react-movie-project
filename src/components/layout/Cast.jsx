import { Link } from 'react-router';
import HeadingText from '../ui/HeadingText';
import { getImageUrl } from '../../constants';

function Cast({ cast }) {
  return (
    <section>
      <HeadingText subHeading={'Top cast'} heading={'Meet the cast'} />

      {cast.length > 0 ? (
        <div className='flex snap-x gap-4 overflow-x-auto pb-4 '>
          {cast.map((person) => (
            <Link
              key={person.credit_id || person.id}
              to={`/cast/${person.id}`}
              className='group w-36 shrink-0 snap-start sm:w-40'
            >
              {person.profile_path ? (
                <img
                  src={getImageUrl(person.profile_path, 'w500')}
                  alt={person.name}
                  className='aspect-3/4 w-full rounded-2xl object-cover shadow-md transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl'
                />
              ) : (
                <div className='flex aspect-3/4 items-center justify-center rounded-2xl bg-slate-200 text-center text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400'>
                  No photo
                </div>
              )}
              <h3 className='mt-3 truncate font-bold'>
                {person.name || person.original_name}
              </h3>
              <p className='truncate text-sm text-slate-500 dark:text-slate-400'>
                {person.character || 'Cast member'}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className='text-slate-500 dark:text-slate-400'>
          Cast information is not available yet.
        </p>
      )}
    </section>
  );
}

export default Cast;
