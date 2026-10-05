import { BiStar } from 'react-icons/bi';
import SlideOneImg from '../../assets/images/img5.PNG';
import SlideTwoImg from '../../assets/images/img1.jpg';
import SlideThreeImg from '../../assets/images/img2.jpg';
import SlideFourImg from '../../assets/images/img3.jpg';
import Button from '../ui/Button';
import { useState, useEffect } from 'react';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';

const allSlidesData = [
  {
    id: 1,
    title: 'Game Of Thrones',
    description: 'A war for the throne of westros',
    rating: 8.1,
    ratingCount: 401,
    image: SlideOneImg,
  },
  {
    id: 2,
    title: 'Avengers: Endgame',
    description: 'The epic conclusion to the Avengers saga',
    rating: 10.0,
    ratingCount: 800,
    image: SlideTwoImg,
  },
  {
    id: 3,
    title: 'Matrix Resurrections',
    description: 'A new chapter in the Matrix universe',
    rating: 5.1,
    ratingCount: 600,
    image: SlideThreeImg,
  },

  {
    id: 4,
    title: 'Bahubali: The Beginning',
    description: 'An epic tale of love and war',
    rating: 3.1,
    ratingCount: 601,
    image: SlideFourImg,
  },
];

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? allSlidesData.length - 1 : prev - 1,
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) =>
      prev === allSlidesData.length - 1 ? 0 : prev + 1,
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextSlide();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='border border-indigo-500 dark:border-slate-900 overflow-hidden w-full h-[70vh] flex  rounded-2xl relative text-slate-100'>
      {allSlidesData.map((slide) => {
        return (
          <div
            key={slide.id}
            className={`w-full h-full bg-cover bg-no-repeat bg-center shrink-0 text-slate-100 flex justify-end flex-col items-start transition-all duration-1000`}
            style={{
              backgroundImage: `url(${slide.image})`,
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            <div className='p-8 space-y-2 w-full flex justify-between items-end '>
              <div className='space-y-2 bg-[rgba(0,0,0,0.5)] rounded-xl p-2'>
                <h1 className='text-6xl'>{slide.title}</h1>
                <p className='text-2xl'>{slide.description}</p>

                <div className='flex gap-2'>
                  <div className='flex'>
                    <BiStar fontSize={24} />
                    <span className='text-xl'>{slide.rating}</span>
                  </div>
                  <span className='text-xl'>({slide.ratingCount}k)</span>
                </div>

                <Button>View Details</Button>
              </div>
            </div>
          </div>
        );
      })}

      <div className='absolute bottom-0 right-0'>
        <button className='text-5xl cursor-pointer' onClick={handlePrevSlide}>
          <RxCaretLeft />
        </button>
        <button className='text-5xl cursor-pointer' onClick={handleNextSlide}>
          <RxCaretRight />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
/*
   flex justify-end flex-col items-start gap-4 transition-all duration-1000 */
