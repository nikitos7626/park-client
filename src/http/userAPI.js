import { $authHost,$host } from "./index";
import { jwtDecode } from "jwt-decode";


export const registration = async(email,password) =>{
    const {data} = await $host.post('api/user/registration',{email,password,role:'USER'})
    localStorage.setItem('token',data.token)
    return jwtDecode(data.token)
}

export const login = async(email,password) =>{
    const {data} = await $host.post('api/user/login',{email,password})
     localStorage.setItem('token',data.token)   
    return  jwtDecode(data.token)
}

export const check = async() =>{
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token',data.token)   
    return  jwtDecode(data.token)
   
}
export const getUsers =async () => {
    const { data } = await $authHost.get('api/user/getAllUsers')
    return data;
}

export const banUser = async (email) => {
    const { data } = await $authHost.post('api/user/banUser', { email })
    return data;
}
