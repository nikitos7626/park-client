import axios from "axios";
import config from "../config";

const $host = axios.create({
    baseURL:config.REACT_APP_API_URL
})


const $authHost = axios.create({
    baseURL:config.REACT_APP_API_URL
})

const authInterceptor =config=>{
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)


export{
    $host,
    $authHost
}