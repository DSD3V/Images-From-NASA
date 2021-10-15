import axios from 'axios';
import { DEFAULT_SEARCH_TERM, CURRENT_YEAR } from '../constants';
import dotenv from 'dotenv';
dotenv.config();

export const getListViewSearchResults = searchTerm =>
  axios
    .get(`https://images-api.nasa.gov/search?title=${searchTerm}`)
    .then(results => results.data.collection)
    .catch(err => console.log(err));

export const getDefaultListViewSearchResults = () =>
  axios
    .get(`https://images-api.nasa.gov/search?q=${DEFAULT_SEARCH_TERM}`)
    .then(results => results.data.collection)
    .catch(err => console.log(err));

export const getMoreListViewSearchResults = nextReq =>
  axios
    .get(nextReq.slice(0, 4) + 's' + nextReq.slice(4, nextReq.length))
    .then(results => results.data.collection)
    .catch(err => console.log(err));

export const getGalleryViewSearchResults = year => {
  const endDate =
    year === CURRENT_YEAR
      ? `${year}-0${Math.min(3, new Date().getMonth() + 1)}-01`
      : `${year}-03-01`;

  return axios
    .get(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}&start_date=${year}-01-01&end_date=${endDate}`
    )
    .then(results => results.data)
    .catch(err => console.log(err));
};
