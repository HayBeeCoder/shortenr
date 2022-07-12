import useSWR, { Fetcher } from "swr";
import axiosInstance from "../Services/axios.services";

// const fetcher = (url: string,userEmail: string) => axiosInstance.get(url,null,{
//     owner: userEmail
// })

export default function useFetchLinks(userEmail: string | null){
    const fetcher: Fetcher<IUserLinks,string | null> = (url: string ) => axiosInstance.get(url).then(res => res.data)

    // const fetcher: Fetcher<string, User> = (id) => getUserById(id)
    const {data,error,mutate} = useSWR(userEmail ? `links/?owner=${userEmail}` : userEmail, fetcher)

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate
    }
}