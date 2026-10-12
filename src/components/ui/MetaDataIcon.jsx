function MetaDataIcon({ icon: Icon, text }) {
  return (
    <span className='flex items-center gap-1'>
      {Icon && <Icon />}
      {text}
    </span>
  );
}

export default MetaDataIcon;
