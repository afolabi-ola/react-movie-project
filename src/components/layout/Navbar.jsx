// import Logo from './../../assets/images/logo.jpg';
import Logo from '../../assets/images/logo.jpg';

// import ThemeToggle from '../theme/ThemeToggle';
import Button from '../ui/Button';
import CustomLink from '../ui/CustomLink';
import ThemeToggle from '../ui/ThemeToggle';

function Navbar() {
  return (
    <nav className='bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex justify-between items-center p-3 rounded-2xl w-[80%] fixed top-8 right-1/2 translate-x-1/2 shadow-lg dark:shadow-2xl shadow-slate-600 dark:shadow-black z-9999'>
      <div className='w-10 h-10 rounded-full overflow-hidden'>
        <img src={Logo} alt='logo' className='w-full h-full' />
      </div>

      <ul className='flex gap-6'>
        <CustomLink text='Home' loc='#' />
        <CustomLink text='About' loc='#' />
        <CustomLink text='FAQs' loc='#' />
        <CustomLink text='Movies' loc='#' />
      </ul>

      <div className='flex gap-4 items-center'>
        <ThemeToggle />
        <Button>Sign In</Button>
      </div>
    </nav>
  );
}

export default Navbar;
