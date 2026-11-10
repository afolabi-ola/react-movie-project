function AuthFormLayout({ eyebrow, title, footer, children }) {
  return (
    <section className='mx-auto w-full max-w-md py-8'>
      <div className='rounded-2xl bg-slate-100 p-6 shadow-xl dark:bg-slate-900 sm:p-8'>
        <p className='mb-2 text-sm font-bold uppercase tracking-[0.2em] text-indigo-500'>
          {eyebrow}
        </p>

        <h1 className='mb-8 text-3xl font-black'>{title}</h1>

        {children}

        <p className='mt-6 text-center text-sm text-slate-500 dark:text-slate-400'>
          {footer}
        </p>
      </div>
    </section>
  );
}

export default AuthFormLayout;
