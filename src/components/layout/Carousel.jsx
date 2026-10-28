import Button from '../ui/Button';
import { useState, useEffect } from 'react';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import RatingBadge from '../ui/RatingBadge';
import { getImageUrl } from '../../constants';
import { Link } from 'react-router';

function Carousel({ sliderMovies }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? sliderMovies.length - 1 : prev - 1,
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) =>
      prev === sliderMovies.length - 1 ? 0 : prev + 1,
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextSlide();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentSlide]);

  return (
    <div className='border border-indigo-500 dark:border-slate-900 overflow-hidden w-full sm:h-[70vh] flex  rounded-2xl relative text-slate-100 min-h-112 h-[62vh]'>
      {sliderMovies.map((slide) => {
        const imageUrl = getImageUrl(slide.backdrop_path, 'w1280');
        return (
          <div
            key={slide.id}
            className={`w-full h-full bg-cover bg-no-repeat bg-center shrink-0 text-slate-100 flex justify-end flex-col items-start transition-all duration-1000`}
            style={{
              backgroundImage: `url(${imageUrl})`,
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            <div className='sm:p-8 p-3 space-y-2 w-full flex justify-between items-end '>
              <div className='max-w-3xl space-y-2 bg-[rgba(0,0,0,0.5)] rounded-xl p-2 sm:p-5'>
                <h1 className='text-3xl sm:text-6xl'>{slide.title}</h1>
                <p className='text-base sm:text-2xl'>
                  {slide.overview.slice(0, 50)}...
                </p>

                {/* <div className='flex gap-2'>
                  <div className='flex'>
                    <BiStar fontSize={24} />
                    <span className='text-xl'>{slide.vote_average}</span>
                  </div>
                  <span className='text-xl'>({slide.vote_count}k)</span>
                </div> */}

                <RatingBadge
                  rating={slide.vote_average}
                  voteCount={slide.vote_count}
                />

                <Link to={`/movie-details/${slide.id}`}>
                  <Button>View Details</Button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      <div className='absolute bottom-2 right-2 sm:bottom-0 sm:right-0'>
        <button
          className='text-3xl sm:text-5xl cursor-pointer'
          onClick={handlePrevSlide}
        >
          <RxCaretLeft />
        </button>
        <button
          className='text-3xl sm:text-5xl cursor-pointer'
          onClick={handleNextSlide}
        >
          <RxCaretRight />
        </button>
      </div>
    </div>
  );
}

export default Carousel;

