import axios, { AxiosRequestHeaders } from "axios";
import { useContext } from "react";
import {BASE_URL} from "../constants"
// import { useAppContext } from "../context/state";

//  const {state: {accessToken}} = useAppContext()

// let authToken: any

// console.log(this)
// if(  typeof window !== “undefined” && window.localStorage ){
// authToken = localStorage.getItem('access_token') ? JSON.parse(localStorage.getItem('access_token') as string) : null

// }
// console.log(authToken)


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    // headers: {
    //     Authorization: `Bearer ${accessToken}`
    // }

})

axiosInstance.interceptors.request.use(async req =>{
    let authToken = localStorage.getItem('access_token') ? JSON.parse(localStorage.getItem('access_token') as string) : null

    if(authToken){
        // const isValid = await axios.post(BASE_URL +'auth/jwt/verify/', {token: `${authToken}`})
        // console.log('I am inside an interceptor: ', isValid)
        if(req.headers){
        
            req.headers.Authorization = `Bearer ${authToken}`
        }
        return req
    }
    if(
        !localStorage.getItem('refresh')
    ){
        return req
    }

    const response = await axios.post(BASE_URL + 'auth/jwt/refresh' , {refresh: JSON.parse(localStorage.getItem("refresh") as string)})
    // console.log(refresh)
    localStorage.setItem("access_token", JSON.stringify(response.data.access))

    if(req.headers){
        
        req.headers.Authorization = `Bearer ${response.data.access}`
    }

    return req


    

    return req
})

export default axiosInstance