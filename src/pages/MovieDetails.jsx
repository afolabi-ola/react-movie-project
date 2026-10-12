import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getImageUrl, getMovieDetailsUrl, OPTIONS } from '../constants';
import BackButton from '../components/ui/BackButton';
import { HiCalendar, HiClock, HiHeart, HiPlay, HiTicket } from 'react-icons/hi';
import Badge from '../components/ui/Badge';
import MetaDataIcon from '../components/ui/MetaDataIcon';
import RatingBadge from '../components/ui/RatingBadge';


function MovieDetails() {
  const { id } = useParams();

  const [movieDetails, setMovieDetails] = useState();

  console.log(movieDetails);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
    const url = getMovieDetailsUrl(id);

    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(url, OPTIONS);

        if (!res.ok) {
          const errorData = await res.json();

          throw new Error(errorData.status_message);
        }

        const data = await res.json();

        setMovieDetails(data);
      } catch (error) {
        console.log(`Error: Error Fetching Movie Details: ${error}`);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const trailer = movieDetails?.videos?.results
    ? movieDetails.videos.results.find(
        (video) =>
          video.site === 'YouTube' &&
          video.type === 'Trailer' &&
          video.official,
      ) ||
      movieDetails.videos.results.find(
        (video) => video.site === 'YouTube' && video.type === 'Trailer',
      ) ||
      movieDetails.videos.results.find((video) => video.site === 'YouTube')
    : [];

  const {
    backdrop_path,
    title,
    overview,
    release_date,
    vote_average,
    vote_count,
    poster_path,
    runtime,
    genres = [],
    homepage,
  } = movieDetails || {};

  const releaseYear = release_date ? release_date.slice(0, 4) : 'N/A';

  const formattedRuntime = runtime
    ? `${Math.floor(runtime / 60)}h ${runtime % 60}m`
    : 'Runtime unavailable';

    return (
      <div className='mx-auto max-w-7xl space-y-12 pb-12'>
        <BackButton />

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
                <Badge text={'Movie'} variant='primary' />
                <MetaDataIcon icon={HiCalendar} text={releaseYear} />
                <MetaDataIcon icon={HiClock} text={formattedRuntime} />
              </div>

              <h1 className='max-w-3xl text-4xl font-black tracking-tight text-slate-900 sm:text-6xl dark:text-white'>
                {title}
              </h1>

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

        <section>
          <div className='mb-5 flex items-end justify-between gap-4'>
            <div>
              <p className='mb-1 text-sm font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-blue-400'>
                Watch now
              </p>
              <h2 className='text-3xl font-black'>Official trailer</h2>
            </div>
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
      </div>
    );
}

export default MovieDetails;
