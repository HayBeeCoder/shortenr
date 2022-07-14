import jwtDecode from 'jwt-decode'
import React, { useLayoutEffect } from 'react'
import RouteGuard from '../../components/RouteGuard/RouteGuard'
import { useAppContext } from '../../context/state'
import useFetchLinks from '../../hooks/useFetchLinks'
import axiosInstance from '../../Services/axios.services'

const Page = () => {
  // const {data} = use
  const {state: {email,accessToken},setState:{setEmail}} = useAppContext()
  const { data, isLoading, mutate } = useFetchLinks(!!email.length ? email : null)

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
    <div>[slug]</div>
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
  