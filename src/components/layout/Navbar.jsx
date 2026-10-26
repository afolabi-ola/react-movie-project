// import Logo from './../../assets/images/logo.jpg';


// import ThemeToggle from '../theme/ThemeToggle';
import { useState } from 'react';
import Button from '../ui/Button';
import CustomLink from '../ui/CustomLink';
import Logo from '../ui/Logo';
import Modal from '../ui/Modal';
import ThemeToggle from '../ui/ThemeToggle';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router';

function Navbar() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle search submission logic here
    navigate(`/search?userSearch=${query}`);
  };

  return (
    <nav className='bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex justify-between items-center p-3 rounded-2xl w-[80%] fixed top-8 right-1/2 translate-x-1/2 shadow-lg dark:shadow-2xl shadow-slate-600 dark:shadow-black z-9999'>
      <Logo />

      <ul className='flex gap-6'>
        <CustomLink text='Home' loc='/' />
        <CustomLink text='About' loc='/about' />
        <CustomLink text='FAQs' loc='/faqs' />
        <CustomLink text='Movies' loc='/movies' />
      </ul>

      <div className='flex gap-4 items-center'>
        <button
          type='button'
          aria-label={isSearchOpen ? 'Close search' : 'Open search'}
          className='rounded-xl p-2 hover:bg-slate-200 dark:hover:bg-slate-800'
          onClick={() => setIsSearchOpen(true)}
        >
          <FiSearch />
        </button>
        <ThemeToggle />
        <Button>Sign In</Button>
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
