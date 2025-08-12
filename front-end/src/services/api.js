import axios from 'axios'

const API = axios.create(
    {
        baseURL:'http://localhost:5000',
        withCredentials: true, // allow cookies for refresh token
    }
);

API.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("accesstoken")
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config
    },
    (error)=>{
     return Promise.reject(error);
    }

);

export default API