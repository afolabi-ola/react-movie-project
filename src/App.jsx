import { Route, Routes } from 'react-router';
import Navbar from './components/layout/Navbar';
import About from './pages/About';
import Faqs from './pages/Faqs';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import SeriesDetails from './pages/SeriesDetails';
import Search from './pages/Search';
import Cast from './pages/Cast';
import NotFound from './pages/NotFound';
import WatchListPage from './pages/WatchListPage';
import WatchListProvider from './context/WatchListProvider';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import AuthContextProvider from './context/AuthContextProvider';

function App() {
  return (
    <AuthContextProvider>
      <WatchListProvider>
        <header className='h-28 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative'>
          <Navbar />
        </header>

        <main className='bg-slate-50 dark:bg-slate-950 w-full min-h-lvh h-full text-slate-900 dark:text-slate-100 p-6 space-y-8'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/about' element={<About />} />
            <Route path='/faqs' element={<Faqs />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/movie-details/:id' element={<MovieDetails />} />
            <Route path='/series-details/:id' element={<SeriesDetails />} />
            <Route path='/search' element={<Search />} />
            <Route path='/cast/:id' element={<Cast />} />
            <Route path='/watchlist' element={<WatchListPage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </WatchListProvider>
    </AuthContextProvider>
  );
}

export default App;
