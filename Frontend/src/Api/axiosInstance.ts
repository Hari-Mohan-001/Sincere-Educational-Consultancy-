import axios from "axios";
import {URL} from "../Constants/Constants"

const BASE_URL = URL

//creating instance of the axios to use globally

const axiosInstance = axios.create({
    baseURL:BASE_URL,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json"
    },
})

// request interceptor to make chnages before sending request
axiosInstance.interceptors.request.use((config)=>{
    return config
},
(error)=>{
    return Promise.reject(error)
}
);

//response interceptor
axiosInstance.interceptors.response.use((response)=>{
    return response
},
(error)=>{

    if (error.response && error.response.status === 401) {
        // Perform logout or redirect to login
        console.log(error.response);
        
      }

    return Promise.reject(error)
}
)

export default axiosInstance