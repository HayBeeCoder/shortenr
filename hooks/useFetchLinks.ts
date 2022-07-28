import { json } from "stream/consumers";
import useSWR, { Fetcher } from "swr";
import axiosInstance from "../Services/axios.services";

// const fetcher = (url: string,userEmail: string) => axiosInstance.get(url,null,{
//     owner: userEmail
// })

export default function useFetchLinks(userEmail: string | null){
    const fetcher: Fetcher<IUserLinks,string | null> = (url: string ) => axiosInstance.get(url).then(res => res.data)
    let compare
    let sorteddata;
    // const fetcher: Fetcher<string, User> = (id) => getUserById(id)
    let duplicate;
    const {data,error,mutate} = useSWR(userEmail ? `links/?owner=${userEmail}` : userEmail, fetcher)
    console.log( "the data: " , data)
    if( data && (!duplicate || (JSON.stringify(duplicate) !== JSON.stringify(data)))){
        duplicate = data 
        sorteddata = Object.assign({} , data)
        console.log("sorted data is:  ", sorteddata)
        // console.log(sorteddata)
        sorteddata?.results.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return a.id - b.id;
        })
    }
  

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate
    }
}