import { useEffect, useState } from 'react';
import BackButton from '../components/ui/BackButton';
import { getImageUrl, getSeriesDetailsUrl, OPTIONS } from '../constants';
import { useParams } from 'react-router';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import DetailsHero from '../components/layout/DetailsHero';
import { formatDate, getYearRange } from '../utils';
import InfoItem from '../components/ui/InfoItem';
import { HiClock } from 'react-icons/hi';
import RatingBadge from '../components/ui/RatingBadge';
import { HiTv } from 'react-icons/hi2';
import HeadingText from '../components/ui/HeadingText';
import Trailer from '../components/layout/Trailer';
import Cast from '../components/layout/Cast';
import Gallery from '../components/layout/Gallery';
import Clips from '../components/layout/Clips';
import RelatedSeries from '../components/layout/RelatedSeries';

function SeriesDetails() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [seriesDetails, setSeriesDetails] = useState(null);



  useEffect(() => {
    window.scroll(0, 0);

    const fetchSeriesDetails = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const response = await fetch(getSeriesDetailsUrl(id), OPTIONS);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.status_message || 'Unable to load this series.');
        }

        setSeriesDetails(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeriesDetails();
  }, [id]);

  if (isLoading) {
    return <Loader resource='series' />;
  }

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
  }

  const videos = seriesDetails?.videos?.results || [];

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
    poster_path,
    title,
    name,
    vote_average,
    vote_count,
    genres,
    overview,
    homepage,
    tagline,
    first_air_date,
    last_air_date,
    status,
    number_of_episodes: numberOfEpisodes,
    number_of_seasons: numberOfSeasons,
    type,
    production_countries: productionCountries = [],
    production_companies: productionCompanies = [],
    spoken_languages: spokenLanguages = [],
    usRating,
    created_by: creators = [],
    networks = [],
    seasons = [],
    origin_country: originCountries = [],
    recommendations = [],
  } = seriesDetails;

  const language = spokenLanguages[0]?.english_name || 'English';

  const countryNames = productionCountries.map((country) => country.name);

  const countries = countryNames.length
    ? countryNames.join(', ')
    : originCountries.join(', ');

  const airedSeasons = seasons.filter((season) => season.season_number > 0);

  const cast = seriesDetails?.credits.cast.slice(0, 10) || [];

  const gallery = (seriesDetails?.images?.backdrops || []).slice(0, 6);

  const relatedSeries = (recommendations?.results || [])
    .filter((series) => series.media_type === 'tv' || !series.media_type)
    .slice(0, 6);

  return (
    <div className='mx-auto max-w-7xl space-y-12 pb-12'>
      <BackButton placeholder='Back to home' />

      <DetailsHero
        details={{
          backdrop_path,
          title: name || title,
          overview,
          releaseYear: getYearRange(first_air_date, last_air_date),
          vote_average,
          vote_count,
          poster_path,
          formattedRuntime: status,
          genres,
          homepage,
          mediaType: 'Series',
          tagline,
        }}
      />

      <section className='grid gap-8 '>
        <div>
          <HeadingText
            heading={'Production notes'}
            subHeading={'The series at a glance'}
          />
          <dl className='grid gap-x-8 gap-y-6 rounded-2xl border border-slate-200 bg-slate-100 p-6 sm:grid-cols-2 dark:border-slate-800 dark:bg-slate-900'>
            <InfoItem
              label='Production years'
              value={getYearRange(first_air_date, last_air_date)}
            />
            <InfoItem label='First aired' value={formatDate(first_air_date)} />
            <InfoItem label='Seasons' value={numberOfSeasons} />
            <InfoItem label='Episodes' value={numberOfEpisodes} />
            <InfoItem label='Format' value={type} />
            <InfoItem label='Country' value={countries} />
            <InfoItem label='Language' value={language} />
            <InfoItem label='Age rating' value={usRating || 'Not rated'} />
          </dl>
        </div>

        <div>
          <HeadingText
            heading={'Behind the show'}
            subHeading={'Creators & networks'}
          />
          <div className='space-y-5 rounded-2xl border border-slate-200 bg-slate-100 p-6 dark:border-slate-800 dark:bg-slate-900'>
            <div>
              <p className='mb-3 text-sm font-bold text-slate-500 dark:text-slate-400'>
                Created by
              </p>
              <div className='flex flex-wrap gap-3'>
                {creators.length > 0 ? (
                  creators.map((creator) => (
                    <span
                      key={creator.credit_id}
                      className='rounded-full bg-indigo-100 px-3 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-blue-300'
                    >
                      {creator.name}
                    </span>
                  ))
                ) : (
                  <span className='text-sm text-slate-500'>Not listed</span>
                )}
              </div>
            </div>
            <div>
              <p className='mb-3 text-sm font-bold text-slate-500 dark:text-slate-400'>
                Networks
              </p>
              <div className='flex flex-wrap items-center gap-4'>
                {networks.length > 0 ? (
                  networks.map((network) => (
                    <div key={network.id} className='flex items-center gap-2'>
                      {network.logo_path && (
                        <img
                          src={getImageUrl(network.logo_path, 'w92')}
                          alt=''
                          className='max-h-7 w-12 object-contain'
                        />
                      )}
                      <span className='text-sm font-semibold'>
                        {network.name}
                      </span>
                    </div>
                  ))
                ) : (
                  <span className='text-sm text-slate-500'>Not listed</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <HeadingText heading={'Season guide'} subHeading={'Every season'} />
        <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {airedSeasons.map((season) => (
            <article
              key={season.id}
              className='overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900'
            >
              {season.poster_path ? (
                <img
                  src={getImageUrl(season.poster_path)}
                  alt={`${season.name} poster`}
                  className='aspect-2/3 w-full object-cover sm:aspect-video'
                />
              ) : (
                <div className='flex aspect-video items-center justify-center bg-slate-200 text-slate-500 dark:bg-slate-800'>
                  No season artwork
                </div>
              )}
              <div className='p-5'>
                <div className='flex items-start justify-between gap-3'>
                  <h3 className='text-xl font-black'>{season.name}</h3>
                  <RatingBadge rating={season.vote_average} />
                </div>
                <p className='mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400'>
                  <HiClock />
                  {season.episode_count} episodes ·{' '}
                  {formatDate(season.air_date)}
                </p>
                {season.overview && (
                  <p className='mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300'>
                    {season.overview}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <HeadingText
          heading={'Production companies'}
          subHeading={'Who makes it'}
        />
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {productionCompanies.map((company) => (
            <div
              key={company.id}
              className='flex min-h-28 min-w-0 flex-col items-start gap-3 rounded-2xl border border-slate-200 bg-slate-100 p-5 dark:border-slate-800 dark:bg-slate-900'
            >
              {company.logo_path ? (
                <img
                  src={getImageUrl(company.logo_path, 'w92')}
                  alt=''
                  className='h-12 w-20 shrink-0 object-contain'
                />
              ) : (
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-blue-300'>
                  <HiTv />
                </div>
              )}
              <div className='min-w-0 w-full'>
                <h3 className='wrap-break-word font-bold'>{company.name}</h3>
                <p className='mt-1 text-sm text-slate-500 dark:text-slate-400'>
                  {company.origin_country || 'International'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Trailer trailer={trailer} title={title || name} />

      <Cast cast={cast} />

      {gallery.length > 0 && <Gallery gallery={gallery} />}

      {clips.length > 0 && <Clips clips={clips} />}

      {relatedSeries.length > 0 && (
        <RelatedSeries relatedSeries={relatedSeries} />
      )}
    </div>
  );
}

export default SeriesDetails;
