function Field({ label, id, error, children }) {
  return (
    <div className='space-y-2'>
      <label htmlFor={id} className='block font-semibold'>
        {label}
      </label>

      {children}

      {error && <p className='text-sm font-semibold text-red-500'>{error}</p>}
    </div>
  );
}

export default Field;
