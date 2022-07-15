import jwtDecode from 'jwt-decode'
import React, { useLayoutEffect } from 'react'
import MiniCard from '../../components/MiniCard/MiniCard'
import RouteGuard from '../../components/RouteGuard/RouteGuard'
import SubAnalytic from '../../components/SubAnalytic/SubAnalytic'
import Subanalytics from '../../components/SubAnalytics/SubAnalytics'
import ViewBanner from '../../components/ViewBanner/ViewBanner'
import { useAppContext } from '../../context/state'
import useFetchLinks from '../../hooks/useFetchLinks'
import axiosInstance from '../../Services/axios.services'
import  dayjs from "dayjs"


const Page = () => {
  // const {data} = use
  const {state: {email,accessToken,link},setState:{setEmail,}} = useAppContext()
  console.log("link Id: " , link)
  // const { data, isLoading, mutate } = useFetchLinks(!!email.length ? email : null)
  // const { data, isLoading, mutate } = useFetchLinks(email)
  // console.log(data)

  // console.log(data)
  useLayoutEffect(() => {
    // console.log(user_id)
    
    if (accessToken && accessToken != '' ) {
      const {user_id} = jwtDecode(accessToken) as {user_id: string}

      axiosInstance.get(`auth/users/${user_id}/`)
        .then(res => {
          if (res.status == 200) {
            setEmail(res.data.email)
          }
        })
        .catch(e => console.log(e))
    }
  }, [accessToken])
  return (
    <section className='md:h-screen  w-full md:grid grid-cols-12 px-[20px] gap-2 grid-rows-6 my-5'>
      
  
        <div className='col-start-4 col-span-6  row-start-1  md:flex items-end'>

    <div className='mb-3 space-y-3 md:space-y-0 p-4 md:p-0 rounded-md md:rounded-none bg-[#F9F9FC] md:bg-transparent bg-opacity-70 md:grid grid-cols-8 gap-1 grid-rows-1 w-full' >
      <div className='col-start-1 col-span-2 row-start-1 row-span-1'>

      <MiniCard
      property='Original URL'
      value={link?.long_link as string}
      isLoading={false}
      />
      </div>
      
        <div className='col-start-3 col-span-4'>
      <MiniCard
      property='Shortened URL'
      value={link?.short_link as string}
      isLoading={false}
      colored
      />
      </div>
      <div className='col-start-7 col-span-2'>
      <MiniCard
      property='Date Created'
      value= {dayjs(link?.date_created as string).format('MMM D, YYYY')}
      isLoading={false}
      />
      </div>
      
      </div>
  </div>

     <div className='col-start-5 col-span-4  row-start-2 row-span-2 md:flex justify-around items-center'>
    

     <ViewBanner view_count={ (link?.visit_count as number).toString()} isLoading={false}/>
    </div>
<Subanalytics/>
    </section>
  )
}

export default RouteGuard(Page)

// export async function getStaticPath(){
    
// }
// export async function getServerSideProps(){
//     return{
//         props: {

//         }
//     }

// }

// // export async function getStaticProps() {
// //     return {
// //       props: {
// //         protected: true,
// //       },
// //     }
// //   }
  