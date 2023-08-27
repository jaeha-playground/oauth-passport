import axios, { AxiosInstance } from 'axios';

const baseURL = `http://localhost:4000`;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
