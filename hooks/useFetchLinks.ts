import useSWR, { Fetcher } from "swr";
import axiosInstance from "../Services/axios.services";

// const fetcher = (url: string,userEmail: string) => axiosInstance.get(url,null,{
//     owner: userEmail
// })

export default function useFetchLinks(userEmail: string){
    const fetcher: Fetcher<IUserLinks,string> = (url: string) => axiosInstance.get(url,{params: {
        owner: userEmail
    }}).then(res => res.data)

    // const fetcher: Fetcher<string, User> = (id) => getUserById(id)
    const {data,error} = useSWR(`links/`, fetcher)

    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}