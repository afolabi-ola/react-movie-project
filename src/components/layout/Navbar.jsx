import { useRef, useState } from 'react';
import Button from '../ui/Button';
import CustomLink from '../ui/CustomLink';
import Logo from '../ui/Logo';
import Modal from '../ui/Modal';
import ThemeToggle from '../ui/ThemeToggle';
import { FiMenu, FiSearch, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import useWatchList from '../../hooks/useWatchList';
import useAuth from '../../hooks/useAuth';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import toast from 'react-hot-toast';

function Navbar() {
  const { isAuthenticated, user, logoutUser, isCurrentUserLoading } = useAuth();
  const { watchListData } = useWatchList();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toastId = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle search submission logic here
    navigate(`/search?userSearch=${query}`);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      toastId.current = toast.loading('Logging out...');
      const res = await logoutUser();
      navigate('/login');
      toast.success(res.message || 'Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error(error.message || 'Logout failed');
    } finally {
      toast.dismiss(toastId.current); // Dismiss the loading toast after logout is complete
      setIsLoading(false);
    }
  };

  return (
    <nav className='bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex justify-between items-center p-3 md:rounded-2xl md:w-[80%] fixed md:top-8 md:right-1/2 md:translate-x-1/2 md:shadow-lg dark:shadow-2xl shadow-slate-600 dark:shadow-black z-9999 w-full border-b border-slate-500 dark:border-slate-400 md:border-0'>
      <Logo />

      <ul
        className={`${isMenuOpen ? 'grid' : 'hidden'} md:flex md:gap-6 absolute bg-slate-100 dark:bg-slate-900 md:static top-full left-0 w-full md:w-auto  p-4 md:p-0 gap-2 rounded-b-2xl  shadow-2xl md:shadow-none mt-1`}
      >
        <CustomLink text='Home' loc='/' />
        <CustomLink text='About' loc='/about' />
        <CustomLink text='FAQs' loc='/faqs' />
        <CustomLink text='Movies' loc='/movies' />
        <CustomLink
          text={`Watchlist(${watchListData.length})`}
          loc='/watchlist'
        />
        {isCurrentUserLoading ? (
          <li className='border-t border-slate-300 pt-3 dark:border-slate-700 md:hidden flex justify-between items-center gap-3'>
            <div
              className='flex items-center justify-center gap-3'
              aria-label='Loading user'
            >
              <div className='h-10 w-10 animate-pulse rounded-full bg-slate-300 dark:bg-slate-700'></div>
              <div className='h-4 w-20 animate-pulse rounded bg-slate-300 dark:bg-slate-700'></div>
            </div>

            <div className='flex items-center justify-center gap-3'>
              <div className='h-4 w-4 animate-pulse rounded bg-slate-300 dark:bg-slate-700'></div>
              <div className='h-4 w-20 animate-pulse rounded bg-slate-300 dark:bg-slate-700'></div>
            </div>
          </li>
        ) : (
          <li className='mt-2 border-t border-slate-300 pt-2 dark:border-slate-700 md:hidden'>
            {isAuthenticated ? (
              <div className='flex items-center justify-between gap-3'>
                <button
                  type='button'
                  onClick={() => {
                    navigate('/profile');
                    setIsMenuOpen(false);
                  }}
                  aria-label={`Open ${user.username}'s profile`}
                  title={user.username}
                  className='flex items-center gap-2 rounded-xl p-2 text-left hover:bg-slate-200 dark:hover:bg-slate-800'
                >
                  <span className='flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-sm font-black text-white'>
                    {user.username.slice(0, 2).toUpperCase()}
                  </span>
                  <span>{user.username}</span>
                </button>

                <button
                  type='button'
                  className='flex items-center gap-2 rounded-xl p-2 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-800'
                  onClick={handleLogout}
                  aria-label='Logout'
                  disabled={isLoading}
                >
                  <FaArrowRightFromBracket />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Button
                type='button'
                className='w-full justify-center'
                onClick={() => {
                  navigate('/login');
                  setIsMenuOpen(false);
                }}
              >
                Sign In
              </Button>
            )}
          </li>
        )}
      </ul>

      {/* className='md:hidden rounded-xl p-2 hover:bg-slate-200 dark:hover:bg-slate-800' */}
      <div className='flex gap-4 items-center cursor-pointer'>
        <button
          type='button'
          aria-label='Open menu'
          className='md:hidden'
          onClick={handleMenuToggle}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
        <button
          type='button'
          aria-label={isSearchOpen ? 'Close search' : 'Open search'}
          className='rounded-xl p-2 hover:bg-slate-200 dark:hover:bg-slate-800'
          onClick={() => setIsSearchOpen(true)}
        >
          <FiSearch />
        </button>
        <ThemeToggle />
        {isCurrentUserLoading ? (
          <div className='hidden md:block'>
            <div className='flex items-center justify-center gap-3'>
              <div className='h-10 w-10 animate-pulse rounded-full bg-slate-300 dark:bg-slate-700'></div>
              <div className='h-4 w-4 animate-pulse rounded bg-slate-300 dark:bg-slate-700'></div>
            </div>
          </div>
        ) : (
          <div className='hidden items-center gap-4 md:flex'>
            {isAuthenticated ? (
              <>
                <button
                  type='button'
                  onClick={() => navigate('/profile')}
                  aria-label={`Open ${user.username}'s profile`}
                  title={user.username}
                  className='flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-sm font-black text-white transition hover:bg-indigo-600'
                >
                  {user.username.slice(0, 2).toUpperCase()}
                </button>
                <button
                  type='button'
                  className='cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
                  onClick={handleLogout}
                  aria-label='Logout'
                  disabled={isLoading}
                >
                  <FaArrowRightFromBracket />
                </button>
              </>
            ) : (
              <Button type='button' onClick={() => navigate('/login')}>
                Sign In
              </Button>
            )}
          </div>
        )}
      </div>

      <Modal isOpen={isSearchOpen} title='Search' onClose={handleCloseSearch}>
        <form className='flex items-center gap-2' onSubmit={handleSubmit}>
          <input
            type='search'
            placeholder='Search movies, series, or people'
            aria-label='Search movies, series, or people'
            autoFocus
            className='min-w-0 flex-1 rounded-xl bg-slate-200 px-4 py-3 outline-none placeholder:text-slate-500 dark:bg-slate-800 dark:placeholder:text-slate-400'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type='submit'
            aria-label='Submit search'
            className='rounded-xl bg-indigo-500 p-3 text-white hover:bg-indigo-600'
          >
            <FiSearch aria-hidden='true' />
          </button>
        </form>
      </Modal>
    </nav>
  );
}

export default Navbar;
