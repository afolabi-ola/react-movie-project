// import Logo from './../../assets/images/logo.jpg';


// import ThemeToggle from '../theme/ThemeToggle';
import { useState } from 'react';
import Button from '../ui/Button';
import CustomLink from '../ui/CustomLink';
import Logo from '../ui/Logo';
import Modal from '../ui/Modal';
import ThemeToggle from '../ui/ThemeToggle';
import { FiMenu, FiSearch, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router';

function Navbar() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div className='hidden md:block'>
          <Button>Sign In</Button>
        </div>
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
