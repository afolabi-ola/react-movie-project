import Navbar from './components/layout/Navbar';
import Carousel from './components/layout/Carousel';
import MovieCard from './components/layout/MovieCard';
import AllTrendingMovies from './components/layout/AllTrendingMovies';



function App() {
  return (
    <>
      <header className='h-28 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative'>
        <Navbar />
      </header>
      <main className='bg-slate-50 dark:bg-slate-950 w-full min-h-lvh h-full text-slate-900 dark:text-slate-100 p-6 space-y-8'>
        <Carousel />
        <AllTrendingMovies />
      </main>
    </>
  );
}

export default App;
