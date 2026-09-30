import { IoIosMoon, IoIosSunny } from 'react-icons/io';
import { useState } from 'react';

function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  const handleToggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div>
      {theme === 'dark' ? (
        <IoIosSunny
          className='text-3xl cursor-pointer'
          onClick={handleToggleTheme}
        />
      ) : (
        <IoIosMoon
          className='text-3xl cursor-pointer'
          onClick={handleToggleTheme}
        />
      )}
    </div>
  );
}

export default ThemeToggle;
