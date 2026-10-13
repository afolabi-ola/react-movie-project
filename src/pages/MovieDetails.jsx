import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { getImageUrl, getMovieDetailsUrl, OPTIONS } from '../constants';
import BackButton from '../components/ui/BackButton';
import { HiCalendar, HiClock, HiHeart, HiPlay, HiTicket } from 'react-icons/hi';
import Badge from '../components/ui/Badge';
import MetaDataIcon from '../components/ui/MetaDataIcon';
import RatingBadge from '../components/ui/RatingBadge';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';


function MovieDetails() {
  const { id } = useParams();

  const [movieDetails, setMovieDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
    const url = getMovieDetailsUrl(id);

    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(url, OPTIONS);

        if (!res.ok) {
          const errorData = await res.json();

          throw new Error(errorData.status_message);
        }

        const data = await res.json();

        setMovieDetails(data);
      } catch (error) {
        console.log(`Error: Error Fetching Movie Details: ${error}`);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <ErrorMessage errorMessage={errorMessage} />;
  }

  const videos = movieDetails?.videos?.results || [];

  const trailer = videos
    ? videos.find(
        (video) =>
          video.site === 'YouTube' &&
          video.type === 'Trailer' &&
          video.official,
      ) ||
      videos.find(
        (video) => video.site === 'YouTube' && video.type === 'Trailer',
      ) ||
      videos.find((video) => video.site === 'YouTube')
    : [];
  
  const seenKeys = new Set();

  const clips = videos
    .filter(
      (video) =>
        video.site === 'YouTube' &&
        ['Clip', 'Featurette', 'Teaser', 'Behind the Scenes'].includes(
          video.type,
        ),
    )
    .filter((video) => {
      if (seenKeys.has(video.key)) return false;
      seenKeys.add(video.key);
      return video.key !== trailer?.key;
    })
    .slice(0, 5);



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

  const cast = movieDetails?.credits?.cast.slice(0, 10) || [];
  console.log(cast);

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

        <section>
          <div className='mb-5'>
            <p className='mb-1 text-sm font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-blue-400'>
              Meet the cast
            </p>
            <h2 className='text-3xl font-black'>Top cast</h2>
          </div>

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

        {clips.length > 0 && (
          <section>
            <div className='mb-5'>
              <p className='mb-1 text-sm font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-blue-400'>
                More to watch
              </p>
              <h2 className='text-3xl font-black'>Clips & featurettes</h2>
            </div>
            <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
              {clips.map((video) => (
                <a
                  key={video.key}
                  href={`https://www.youtube.com/watch?v=${video.key}`}
                  target='_blank'
                  rel='noreferrer'
                  className='group overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900'
                >
                  <div className='relative aspect-video overflow-hidden bg-slate-200 dark:bg-slate-800'>
                    <img
                      src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                      alt=''
                      className='h-full w-full object-cover transition duration-300 group-hover:scale-105'
                    />
                    <span className='absolute inset-0 flex items-center justify-center bg-slate-950/30'>
                      <span className='rounded-full bg-white p-3 text-indigo-500 shadow-lg'>
                        <HiPlay />
                      </span>
                    </span>
                  </div>
                  <div className='p-4'>
                    <p className='mb-1 text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-blue-400'>
                      {video.type}
                    </p>
                    <h3 className='line-clamp-2 font-bold'>{video.name}</h3>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    );
}

export default MovieDetails;
