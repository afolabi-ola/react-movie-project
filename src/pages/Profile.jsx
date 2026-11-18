import { useNavigate } from 'react-router';
import Button from '../components/ui/Button';
import useAuth from '../hooks/useAuth';
import { useEffect, useRef, useState } from 'react';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import toast from 'react-hot-toast';

function Profile() {
  const navigate = useNavigate();
  const { getUserProfile, logoutUser } = useAuth(); // Ensure the user is authenticated before accessing the profile page
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const toastId = useRef(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const profileData = await getUserProfile();
        console.log('User profile data:', profileData);
        setUserProfile(profileData.data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setErrorMessage(error.message || 'Failed to fetch user profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (isLoading) {
    return <Loader resource='profile' />;
  }

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
  }

  const initials = userProfile?.username.slice(0, 2).toUpperCase() || 'NA';

  const handleLogout = async () => {
    try {
      setIsLogoutLoading(true);
      toastId.current = toast.loading('Logging out...');
      const res = await logoutUser();
      navigate('/login');
      toast.success(res.message || 'Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error(error.message || 'Logout failed');
    } finally {
      toast.dismiss(toastId.current); // Dismiss the loading toast after logout is complete
      setIsLogoutLoading(false);
    }
  };

  return (
    <section className='mx-auto w-full max-w-2xl py-8'>
      <div className='rounded-2xl bg-slate-100 p-6 shadow-xl dark:bg-slate-900 sm:p-10'>
        <p className='mb-2 text-sm font-bold uppercase tracking-[0.2em] text-indigo-500'>
          Your account
        </p>
        <div className='flex items-center gap-4'>
          <div className='flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-2xl font-black text-white'>
            {initials}
          </div>
          <div>
            <h1 className='text-3xl font-black capitalize'>
              {userProfile.username}
            </h1>
            <p className='text-slate-500 dark:text-slate-400'>
              Manage your Movie Explorer account
            </p>
          </div>
        </div>
        <dl className='mt-8 space-y-4 rounded-xl bg-slate-200 p-5 dark:bg-slate-800'>
          <div>
            <dt className='text-sm font-semibold text-slate-500 dark:text-slate-400'>
              Username
            </dt>
            <dd className='mt-1 font-semibold capitalize'>
              {userProfile.username}
            </dd>
          </div>
          <div>
            <dt className='text-sm font-semibold text-slate-500 dark:text-slate-400'>
              Email
            </dt>
            <dd className='mt-1 font-semibold'>{userProfile.email}</dd>
          </div>
        </dl>
        <div className='mt-6 flex flex-wrap gap-3'>
          <Button type='button' onClick={() => navigate('/forgot-password')}>
            Change password
          </Button>
          <Button
            disabled={isLogoutLoading}
            type='button'
            variant='secondary'
            onClick={handleLogout}
          >
            Sign out
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Profile;
