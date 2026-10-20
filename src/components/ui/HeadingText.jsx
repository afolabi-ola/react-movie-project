function HeadingText({ heading, subHeading }) {
  return (
    <div className='mb-5'>
      <p className='mb-1 text-sm font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-blue-400'>
        {heading}
      </p>
      <h2 className='text-3xl font-black'>{subHeading}</h2>
    </div>
  );
}

export default HeadingText;
