import axios from 'axios';


const baseURL = import.meta.env.PROD
    ? 'https://trip-nest-five.vercel.app' // Your live backend URL
    : import.meta.env.VITE_API_BASE_URL;
const API = axios.create({
    baseURL,
    withCredentials: true,
});

export default API;
