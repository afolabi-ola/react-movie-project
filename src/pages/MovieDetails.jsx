import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getMovieDetailsUrl, OPTIONS } from '../constants';
import BackButton from '../components/ui/BackButton';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import DetailsHero from '../components/layout/DetailsHero';
import Trailer from '../components/layout/Trailer';
import Cast from '../components/layout/Cast';
import Clips from '../components/layout/Clips';


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


  const releaseYear = release_date ? release_date.slice(0, 4) : 'N/A';

  const formattedRuntime = runtime
    ? `${Math.floor(runtime / 60)}h ${runtime % 60}m`
    : 'Runtime unavailable';

    return (
      <div className='mx-auto max-w-7xl space-y-12 pb-12'>
        <BackButton />

        <DetailsHero
          details={{
            backdrop_path,
            title,
            overview,
            releaseYear: releaseYear,
            vote_average,
            vote_count,
            poster_path,
            formattedRuntime: formattedRuntime,
            genres,
            homepage,
          }}
        />

        <Trailer trailer={trailer} title={title} />

        <Cast cast={cast} />

        {clips.length > 0 && <Clips clips={clips} />}
      </div>
    );
}

export default MovieDetails;
