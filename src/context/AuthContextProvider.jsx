import { useState } from 'react';
import { login, signup, logout } from '../services/authServices';
import AuthContext from './AuthContext';

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

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
    await logout();
    setUser(null);
    return { message: 'User logged out successfully' };
  };

  return (
    <AuthContext
      value={{
        user,
        loginUser,
        signupUser,
        logoutUser,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext>
  );
}

export default AuthContextProvider;
