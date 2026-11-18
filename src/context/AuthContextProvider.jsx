import { useEffect, useState } from 'react';
import {
  login,
  signup,
  logout,
  getCurrentMe,
  getProfile,
} from '../services/authServices';
import AuthContext from './AuthContext';

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setIsLoading(true);
        const data = await getCurrentMe();

        setUser(data.data.user);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const loginUser = async (userData) => {
    const currentUser = await login(userData);

    if (currentUser.success) {
      setUser(currentUser.data.user);
    }

    return currentUser;
  };

  const signupUser = async (userData) => {
    const currentUser = await signup(userData);
    return currentUser;
  };

  const logoutUser = async () => {
    const res = await logout();
    setUser(null);
    return res;
  };

  const getUserProfile = async () => {
    const res = await getProfile();

    return res;
  };

  return (
    <AuthContext
      value={{
        user,
        loginUser,
        signupUser,
        logoutUser,
        isAuthenticated: Boolean(user),
        isCurrentUserLoading: isLoading,
        getUserProfile,
      }}
    >
      {children}
    </AuthContext>
  );
}

export default AuthContextProvider;
