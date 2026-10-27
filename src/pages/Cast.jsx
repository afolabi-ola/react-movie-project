import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { getImageUrl, getPersonDetailsUrl, OPTIONS } from '../constants';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import HeadingText from '../components/ui/HeadingText';
import BackButton from '../components/ui/BackButton';

function Cast() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [person, setPerson] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
    const fetchPerson = async () => {
      setIsLoading(true);
      setPerson(null);
      setErrorMessage('');

      try {
        const response = await fetch(getPersonDetailsUrl(id), {
          ...OPTIONS,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.status_message ||
              `Cast request failed with status ${response.status}`,
          );
        }

        setPerson(data);
      } catch (err) {
        console.error('Error fetching cast member:', err);
        setPerson(null);
        setErrorMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  if (isLoading) {
    return <Loader resource='person' />;
  }

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
  }

  const credits = (person.combined_credits?.cast || [])
    .filter((credit) => credit.id && (credit.title || credit.name))
    .sort((firstCredit, secondCredit) => {
      const firstDate =
        firstCredit.release_date || firstCredit.first_air_date || '';
      const secondDate =
        secondCredit.release_date || secondCredit.first_air_date || '';

      return secondDate.localeCompare(firstDate);
    })
    .filter(
      (credit, index, allCredits) =>
        allCredits.findIndex(
          (candidate) =>
            candidate.id === credit.id &&
            candidate.media_type === credit.media_type,
        ) === index,
    )
    .slice(0, 24);

  return (
    <section className='space-y-10'>
      <BackButton placeholder='Go back' navigate={navigate} />

      <div className='grid gap-8 md:grid-cols-[16rem_1fr] md:items-start'>
        <div className='overflow-hidden rounded-2xl bg-slate-200 shadow-md dark:bg-slate-800'>
          {person.profile_path ? (
            <img
              src={getImageUrl(person.profile_path)}
              alt={person.name}
              className='aspect-3/4 w-full object-cover'
            />
          ) : (
            <div className='flex aspect-3/4 items-center justify-center text-center text-sm text-slate-500 dark:text-slate-400'>
              No photo available
            </div>
          )}
        </div>

        <div className='space-y-5'>
          <div>
            <HeadingText heading='Cast member' subHeading={person.name} />
            {person.known_for_department && (
              <p className='mt-2 text-slate-500 dark:text-slate-400'>
                {person.known_for_department}
              </p>
            )}
          </div>

          {person.biography && (
            <div className='max-w-3xl space-y-2'>
              <h2 className='text-xl font-bold'>Biography</h2>
              <p className='whitespace-pre-line leading-7 text-slate-600 dark:text-slate-300'>
                {person.biography}
              </p>
            </div>
          )}

          <div className='flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400'>
            {person.birthday && <span>Born {person.birthday}</span>}
            {person.place_of_birth && <span>{person.place_of_birth}</span>}
          </div>
        </div>
      </div>

      <section>
        <div className='mb-5'>
          <HeadingText heading='On screen' subHeading='Known for' />
        </div>

        {credits.length > 0 ? (
          <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
            {credits.map((credit) => {
              const title = credit.title || credit.name;
              const detailsPath =
                credit.media_type === 'movie'
                  ? `/movie-details/${credit.id}`
                  : `/series-details/${credit.id}`;

              return (
                <Link
                  key={`${credit.media_type}-${credit.id}`}
                  to={detailsPath}
                  className='group'
                >
                  {credit.poster_path ? (
                    <img
                      src={getImageUrl(credit.poster_path)}
                      alt={`${title} poster`}
                      className='aspect-2/3 w-full rounded-2xl object-cover shadow-md transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl'
                    />
                  ) : (
                    <div className='flex aspect-2/3 items-center justify-center rounded-2xl bg-slate-200 p-4 text-center text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400'>
                      No poster
                    </div>
                  )}
                  <h3 className='mt-3 truncate font-bold'>{title}</h3>
                  <p className='truncate text-sm text-slate-500 dark:text-slate-400'>
                    {credit.character || 'Cast member'}
                  </p>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className='text-slate-500 dark:text-slate-400'>
            Filmography information is not available yet.
          </p>
        )}
      </section>
    </section>
  );
}

export default Cast;
