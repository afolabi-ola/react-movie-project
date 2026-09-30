function Button({ children, variant }) {
  const buttonClass =
    variant === 'primary'
      ? 'bg-blue-500 text-white'
      : variant === 'secondary'
        ? 'bg-gray-500 text-black'
        : variant === 'danger'
          ? 'bg-red-500 text-white'
          : variant === 'success'
            ? 'bg-green-500 text-white'
            : 'bg-purple-400 text-white';

  return (
    <button
      className={`${buttonClass} px-4 py-2 cursor-pointer font-bold rounded-xl hover:-translate-y-1 transition-all duration-500 ease-in flex items-center gap-2`}
    >
      {children}
    </button>
  );
}

export default Button;
