import { Link } from 'react-router';
import LogoImage from '../../assets/images/Movie Explorer Compass Reel Logo.png';

function Logo() {
  return (
    <Link to='/' className='flex items-center gap-2'>
      <div className='w-10 h-10 rounded-full overflow-hidden'>
        <img src={LogoImage} alt='logo' className='w-full h-full' />
      </div>
    </Link>
  );
}

export default Logo;
