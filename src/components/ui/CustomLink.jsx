import { NavLink } from 'react-router';

function CustomLink({ text, loc }) {
  return (
    <li>
      <NavLink
        to={loc}
        className={({ isActive }) =>
          isActive
            ? 'text-indigo-500 dark:text-blue-400'
            : 'hover:text-indigo-400 transition-all ease-in-out duration-500'
        }
      >
        {text}
      </NavLink>
    </li>
  );
}

export default CustomLink;
