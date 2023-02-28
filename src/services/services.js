import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=9111de4e27d4becc47ea870ea784f16f';
//get Popular movies
export const GetPopularMovies = async () => {
  const res = await axios({
    method: 'GET',
    url: `${apiUrl}/movie/popular?${apiKey}`,
  });
  return res.data.results;
};

//Get UPComing moives
export const GetUpcomingMovies = async () => {
  const res = await axios({
    method: 'GET',
    url: `${apiUrl}/movie/upcoming?${apiKey}`,
  });
  return res.data.results;
};

//get Popular TV
export const GetPopularTv = async () => {
  const res = await axios({
    method: 'GET',
    url: `${apiUrl}/tv/popular?${apiKey}`,
  });
  return res.data.results;
};

//get Family Movies
export const GetFamilyMovies = async () => {
  const res = await axios({
    method: 'GET',
    url: `${apiUrl}/discover/movie?${apiKey}&wtih_genres=10751`,
  });
  return res.data.results;
};

export const GetDocumentaryMovies = async () => {
  const res = await axios({
    method: 'GET',
    url: `${apiUrl}/discover/movie?${apiKey}&wtih_genres=99`,
  });
  return res.data.results;
};

export const GetDetail = async id => {
  const res = await axios({
    method: 'GET',
    url: `${apiUrl}/movie/${id}?${apiKey}`,
  });
  return res.data;
};

//get Family Movies
export const searchMovieTv = async (query, type) => {
  const res = await axios({
    method: 'GET',
    url: `${apiUrl}/search/${type}?${apiKey}&query=${query}`,
  });
  return res.data.results;
};
