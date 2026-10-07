import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getMovieDetailsUrl, OPTIONS } from '../constants';

function MovieDetails() {
  const { id } = useParams();

  const [movieDetails, setMovieDetails] = useState();

  console.log(movieDetails);

  useEffect(() => {
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

  return (
    <div>
      <h1>Movie Details</h1>
    </div>
  );
}

export default MovieDetails;
