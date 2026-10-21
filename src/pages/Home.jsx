import { useEffect, useState } from 'react';
import AllTrendingMovies from '../components/layout/AllTrendingMovies';
import Carousel from '../components/layout/Carousel';
import { DISCOVER_API_URL, OPTIONS, TRENDING_API_URL } from '../constants';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';

const urls = [DISCOVER_API_URL, TRENDING_API_URL];

function Home() {
  const [sliderMovies, setSliderMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      // 1. Map URLs into promises that fetch AND parse the JSON
      try {
        const dataPromises = urls.map(async (url) => {
          const response = await fetch(url, OPTIONS);

          if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error fetching data from ${url}:`, errorData);
            throw new Error(
              `HTTP error! status: ${response.status}, message: ${errorData.status_message}`,
            );
          }

          const data = await response.json();

          return data.results;
        });

        
        const [sliders, trending] = await Promise.all(dataPromises);
       

        setSliderMovies(sliders.slice(0, 3));
        setTrendingMovies(trending);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <ErrorMessage errorMessage={errorMessage} />;
  }

  return (
    <>
      <Carousel sliderMovies={sliderMovies} />
      <AllTrendingMovies trendingMovies={trendingMovies} />
    </>
  );
}

export default Home;
