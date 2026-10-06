export const TRENDING_API_URL =
  'https://api.themoviedb.org/3/trending/all/day?language=en-US';

export const OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjA1NTI1YWYwNTM4ZGM3YTU5YTI5NTZmYjhmMWFjNyIsIm5iZiI6MTcwMjI5MzE4My4wNzYsInN1YiI6IjY1NzZlZWJmZWM4YTQzMDBmZDdkYTBmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-o5UxeRockVDzqOr_7ro3P0afzISD6ttdMalummK6bM',
  },
};

export const DISCOVER_API_URL =
  'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
