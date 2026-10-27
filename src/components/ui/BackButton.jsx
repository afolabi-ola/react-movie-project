import { HiArrowLeft } from 'react-icons/hi';
import { Link } from 'react-router';

function BackButton({
  location = null,
  placeholder = 'Back to all movies',
  navigate,
}) {
  if (location) {
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

  return (
    <button
      type='button'
      className='inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-500 dark:text-slate-400 dark:hover:text-blue-400 cursor-pointer'
      onClick={() => navigate(-1)}
    >
      <HiArrowLeft />
      {placeholder}
    </button>
  );
}

export default BackButton;
