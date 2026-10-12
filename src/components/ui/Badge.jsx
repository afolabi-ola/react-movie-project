function Badge({ text, variant = '' }) {
  const colors =
    variant === 'primary'
      ? 'text-indigo-600 dark:text-blue-300 dark:bg-indigo-500/20 bg-indigo-100'
      : 'border border-slate-300 px-3 py-1 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300';

  return <span className={`rounded-full px-3 py-1 ${colors}`}>{text}</span>;
}

export default Badge;
