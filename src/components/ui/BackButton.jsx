import { HiArrowLeft } from 'react-icons/hi';
import { Link } from 'react-router';

function BackButton({ location = '/', placeholder = 'Back to all movies' }) {
  return (
    <Link
      to={location}
      className='inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-500 dark:text-slate-400 dark:hover:text-blue-400'
    >
      <HiArrowLeft />
      {placeholder}
    </Link>
  );
}

export default BackButton;
