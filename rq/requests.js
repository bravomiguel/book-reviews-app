import { API_ENDPOINT } from '../settings';
import axios from 'axios';

export const fetchBooks = async () => {
  const response = await axios({
    url: `${API_ENDPOINT}`,
    baseURL: '/',
  });
  console.log(response.data);
  return response.data;
};

export const fetchBook = async (id) => {
  const response = await axios({
    url: `${API_ENDPOINT}${id}`,
    baseURL: '/',
  });
  return response.data;
};

export const addBook = async (data) => {
  console.log("about to add", data);
  const response = await axios({
    method: "POST",
    url: `${API_ENDPOINT}`,
    baseURL: '/',
    data,
  });
  return response.data;
};

export const updateBook = async ({ id, data }) => {
  console.log("in api", id, data);
  const response = await axios({
    method: "PUT",
    url: `${API_ENDPOINT}${id}`,
    baseURL: '/',
    data,
  });
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await axios({
    method: "DELETE",
    url: `${API_ENDPOINT}${id}`,
    baseURL: '/',
  });
  return response.data;
};