import { Navigate, Outlet, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import Loader from '../components/ui/Loader';

function ProtectedRoute() {
  const { isAuthenticated, isCurrentUserLoading } = useAuth();
  const location = useLocation();
  console.log({ location });

  if (isCurrentUserLoading) {
    return (
      <Loader
        resource={location.pathname === '/watchlist' ? 'watchlist' : 'profile'}
      />
    );
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
