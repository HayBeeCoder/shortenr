import axios from "axios";
import { useContext } from "react";
import {BASE_URL} from "../constants"
// import { useAppContext } from "../context/state";

//  const {state: {accessToken}} = useAppContext()


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    // headers: {
    //     Authorization: `Bearer ${accessToken}`
    // }

})

export default axiosInstance