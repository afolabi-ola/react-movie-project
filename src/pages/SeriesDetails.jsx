import { useEffect, useState } from 'react';
import BackButton from '../components/ui/BackButton';
import {
  getImageUrl,
  getSeriesDetailsUrl,
  IMAGE_BASE_URL,
  OPTIONS,
} from '../constants';
import { useParams } from 'react-router';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import DetailsHero from '../components/layout/DetailsHero';
import { formatDate, getYearRange } from '../utils';
import InfoItem from '../components/ui/InfoItem';

function SeriesDetails() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [seriesDetails, setSeriesDetails] = useState(null);

  useEffect(() => {
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
    spoken_languages: spokenLanguages = [],
    usRating,
    created_by: creators = [],
    networks = [],

    origin_country: originCountries = [],
  } = seriesDetails;

  const language = spokenLanguages[0]?.english_name || 'English';

  const countryNames = productionCountries.map((country) => country.name);

  const countries = countryNames.length
    ? countryNames.join(', ')
    : originCountries.join(', ');

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
          <div className='mb-5'>
            <p className='mb-1 text-sm font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-blue-400'>
              Production notes
            </p>
            <h2 className='text-3xl font-black'>The series at a glance</h2>
          </div>
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
          <div className='mb-5'>
            <p className='mb-1 text-sm font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-blue-400'>
              Behind the show
            </p>
            <h2 className='text-3xl font-black'>Creators & networks</h2>
          </div>
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
    </div>
  );
}

export default SeriesDetails;
