import RatingBadge from '../ui/RatingBadge';
import { Link } from 'react-router';
import { getImageUrl } from '../../constants';
import HeadingText from '../ui/HeadingText';

function RelatedSeries({ relatedSeries }) {
  return (
    <section>
      <HeadingText heading={'Keep exploring'} subHeading={'Related series'} />
      <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
        {relatedSeries.map((series) => (
          <Link
            key={series.id}
            to={`/series-details/${series.id}`}
            className='group min-w-0'
          >
            {series.poster_path ? (
              <img
                src={getImageUrl(series.poster_path)}
                alt={`${series.name} poster`}
                className='aspect-2/3 w-full rounded-2xl object-cover shadow-md transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl'
              />
            ) : (
              <div className='flex aspect-2/3 items-center justify-center rounded-2xl bg-slate-200 text-center text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400'>
                No poster
              </div>
            )}
            <h3 className='mt-3 line-clamp-2 font-bold'>{series.name}</h3>
            <RatingBadge rating={series.vote_average} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RelatedSeries;
