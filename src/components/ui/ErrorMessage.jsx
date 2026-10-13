import { HiArrowLeft } from 'react-icons/hi';
import { Link } from 'react-router';

function ErrorMessage({
  errorMessage,
  location = '/',
  placeholder = 'Back to all movies',
}) {
  return (
    <div className='mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center text-center'>
      <div className='rounded-2xl border border-red-200 bg-red-50 p-8 dark:border-red-900/60 dark:bg-red-950/30'>
        <p className='mb-5 text-red-600 dark:text-red-300'>
          {errorMessage || 'The request failed. Please try again later.'}
        </p>
        <Link
          to={location}
          className='inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 font-semibold text-white transition hover:bg-indigo-600'
        >
          <HiArrowLeft />
          {placeholder}
        </Link>
      </div>
    </div>
  );
}

export default ErrorMessage;
