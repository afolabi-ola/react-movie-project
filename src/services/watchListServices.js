const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/`;

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

    if (response.status === 401) {
      window.dispatchEvent(new Event('app:unauthorised'));
      throw new Error('Unauthorized access. Please log in again.');
    }

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error('Error during request:', error);

    // return { message: error.message || 'Request failed', success: false };
    throw error; // Rethrow the error to be handled by the caller
  }
};

export const addToWatchListService = async (movie) => {
  return await request('add-to-watchlist', {
    method: 'POST',
    body: JSON.stringify(movie),
  });
};

export const getAllWatchListService = async () => {
  return await request('view-watchlists', {
    method: 'GET',
  });
};

export const removeFromWatchListService = async (movieId) => {
  return await request(`delete-watchlist/${movieId}`, {
    method: 'DELETE',
  });
};
