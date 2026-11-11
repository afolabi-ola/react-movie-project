const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/`;
console.log(API_URL);

const request = async (endpoint, options) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });


    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error('Error during request:', error);
    console.log('returning error');
    return { message: error.message || 'Request failed', success: false };
  }
};

export const signup = async (userData) => {
  return await request('signup', {
    method: 'Post',
    body: JSON.stringify(userData),
  });
};

export const login = async (userData) => {
  return await request('login', {
    method: 'Post',
    body: JSON.stringify(userData),
  });
};

export const logout = async () => {
  return await request('logout');
};

export const forgotPassword = async (email) => {
  return await request('forgot-password', {
    method: 'Post',
    body: JSON.stringify({ email }),
  });
};

export const resetPassword = async (newPassword, token) => {
  return await request('reset-password', {
    method: 'POST',
    body: JSON.stringify({ newPassword, token }),
  });
};

// export

/*
GET=> COLLECT SOMETHING FROM THE SERVER
POST=> CREATE SOMETHING ON THE SERVER I.E SENDING DATA TO THE SERVER
PUT=> UPDATE SOMETHING ON THE SERVER=>YOU SEND THE FULL DATA TO THE SERVER
PATCH=> UPDATE SOMETHING ON THE SERVER=>YOU SEND ONLY THE PARTIAL DATA TO THE SERVER
DELETE=> DELETE SOMETHING ON THE SERVER
*/
