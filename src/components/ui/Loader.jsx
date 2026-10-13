function Loader({ resource = 'movie' }) {
  return (
    <div className='mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center '>
      <div className='text-center'>
        <div className='mx-auto mb-4 h-12 w-12  border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin dark:border-slate-700 dark:border-t-blue-400' />
        <p className='text-slate-500 dark:text-slate-400'>
          Loading {resource} details...
        </p>
      </div>
    </div>
  );
}

export default Loader;
