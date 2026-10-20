import { HiPlay } from 'react-icons/hi';
import HeadingText from '../ui/HeadingText';

function Trailer({ trailer, title }) {
  return (
    <section>
      <div className='mb-5 flex items-end justify-between gap-4'>
        <HeadingText heading={'Watch now'} subHeading={'Official trailer'} />
        {trailer && (
          <a
            href={`https://www.youtube.com/watch?v=${trailer.key}`}
            target='_blank'
            rel='noreferrer'
            className='hidden items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-500 sm:flex dark:text-slate-400 dark:hover:text-blue-400'
          >
            Watch on YouTube <HiPlay />
          </a>
        )}
      </div>

      <div className='aspect-video overflow-hidden rounded-2xl bg-slate-200 shadow-xl dark:bg-slate-900'>
        {trailer ? (
          <iframe
            className='h-full w-full'
            src={`https://www.youtube.com/embed/${trailer.key}?rel=0&modestbranding=1`}
            title={`${title} trailer`}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          />
        ) : (
          <div className='flex h-full flex-col items-center justify-center gap-3 text-slate-500 dark:text-slate-400'>
            <HiPlay className='text-4xl' />
            <p>A trailer is not available for this movie yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Trailer;
