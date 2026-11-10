function SubmitButton({ isSubmitting, children }) {
  return (
    <button
      type='submit'
      disabled={isSubmitting}
      className='w-full rounded-xl bg-indigo-500 px-4 py-3 font-bold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60'
    >
      {isSubmitting ? 'Please wait...' : children}
    </button>
  );
}

export default SubmitButton;
