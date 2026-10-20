import { HiPlay } from 'react-icons/hi';

function Clips({ clips }) {
  return (
    <section>
      <div className='mb-5'>
        <p className='mb-1 text-sm font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-blue-400'>
          More to watch
        </p>
        <h2 className='text-3xl font-black'>Clips & featurettes</h2>
      </div>
      <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
        {clips.map((video) => (
          <a
            key={video.key}
            href={`https://www.youtube.com/watch?v=${video.key}`}
            target='_blank'
            rel='noreferrer'
            className='group overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900'
          >
            <div className='relative aspect-video overflow-hidden bg-slate-200 dark:bg-slate-800'>
              <img
                src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                alt=''
                className='h-full w-full object-cover transition duration-300 group-hover:scale-105'
              />
              <span className='absolute inset-0 flex items-center justify-center bg-slate-950/30'>
                <span className='rounded-full bg-white p-3 text-indigo-500 shadow-lg'>
                  <HiPlay />
                </span>
              </span>
            </div>
            <div className='p-4'>
              <p className='mb-1 text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-blue-400'>
                {video.type}
              </p>
              <h3 className='line-clamp-2 font-bold'>{video.name}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Clips;
