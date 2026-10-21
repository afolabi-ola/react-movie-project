import { IoIosMoon, IoIosSunny } from 'react-icons/io';
import { useEffect, useState } from 'react';

function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

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
