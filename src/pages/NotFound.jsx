import { Link } from 'react-router';

function NotFound() {
  return (
    <section className='grid min-h-screen place-items-center bg-slate-100 dark:bg-slate-900 p-8 text-center text-slate-900 dark:text-slate-100'>
      <p className='m-0 text-8xl font-extrabold text-red-500'>404</p>
      <h1 className='my-2 text-3xl'>Page not found</h1>
      <p className='mb-6 text-slate-300'>
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link
        to='/'
        className='inline-block rounded-lg bg-indigo-400 px-5 py-3 font-bold text-sky-950 no-underline'
      >
        Back to home
      </Link>
    </section>
  );
}

export default NotFound;
