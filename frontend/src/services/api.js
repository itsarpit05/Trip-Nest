import axios from 'axios'

const API = axios.create(
    {
        baseURL:'http://localhost:5000',
        withCredentials: true, // allow cookies for refresh token
    }
);

export default API