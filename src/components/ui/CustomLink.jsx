function CustomLink({ text, loc }) {
  return (
    <li>
      <a
        href={loc}
        className='hover:text-red-400 hover:text-lg transition-all ease-in-out duration-500'
      >
        {text}
      </a>
    </li>
  );
}

export default CustomLink;
