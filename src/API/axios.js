import axios from 'axios';
import { version } from 'react';
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5001/project-2ee43/us-central1/api",
});

export  {axiosInstance};
