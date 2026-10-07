import { Route, Routes } from 'react-router';
import Navbar from './components/layout/Navbar';
import About from './pages/About';
import Faqs from './pages/Faqs';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import SeriesDetails from './pages/SeriesDetails';

function App() {
  return (
    <>
      <header className='h-28 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative'>
        <Navbar />
      </header>
      <main className='bg-slate-50 dark:bg-slate-950 w-full min-h-lvh h-full text-slate-900 dark:text-slate-100 p-6 space-y-8'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/faqs' element={<Faqs />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/movie-details/:id' element={<MovieDetails />} />
          <Route path='/series-details/:id' element={<SeriesDetails />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
