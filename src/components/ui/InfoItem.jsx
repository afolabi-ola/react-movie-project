function InfoItem({ label, value }) {
  return (
    <div>
      <dt className='text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500'>
        {label}
      </dt>
      <dd className='mt-1 font-semibold text-slate-700 dark:text-slate-200'>
        {value || 'Not available'}
      </dd>
    </div>
  );
}

export default InfoItem;
