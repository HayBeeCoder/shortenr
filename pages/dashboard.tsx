import jwtDecode from 'jwt-decode'
import React, { useEffect } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
// import { mutate } from 'swr'
import { useAppContext } from '../context/state'
import useFetchLinks from '../hooks/useFetchLinks'
import useFetchUser from '../hooks/useFetchUser'
import axiosInstance from '../Services/axios.services'

const Dashboard = () => {
  const { state: { accessToken, email }, setState: { setEmail } } = useAppContext()

  // const {user_id} = jwtDecode(accessToken)  as {user_id: string}
  // const {data : user,mutate} = useFetchUser(user_id as string)
  // console.log(user)
  // const{data: links} = useFetchLinks(user?.email as string)
  // console.log(links)

  // useEffect(
  //   () => {
  //    axiosInstance.get(`auth/users/${user_id}`)
  //         .then(res => setEmail(res.data.email))

  //   },  
  // [accessToken])

  // useEffect(() => {
  //   mutate(user)
  // },[user])

  useEffect(() => {
    const { user_id } = jwtDecode(accessToken) as { user_id: string }
    console.log(user_id)
    axiosInstance.get(`auth/users/${user_id}/`)
      .then(res => {
        setEmail(res.data.email)
      })
  }, [accessToken])

  return (
    <section className=' min-h-screen px-2'>
      <div className='w-full bg flex flex-col md:flex-row gap-2 my-3 max-w-lg mx-auto md:max-w-5xl md:my-6 items-stretch'>
        <Input
        className=''
        handleChange={() => {}}
        labelFor='url'
        label=''
        type='text'
        value=''
        showRedBorder={false}
        
        placeholder="Enter that long URL you've got"


        />
        {/* <div className=' w-96'> */}

        <Button classname=' bg-[#2B7FFF] md:w-96 self-stretch'>
          Shorten URL
        </Button>
        {/* </div> */}
      </div>

      <div className='px-3 mt-10 py-5 '> 
        <p className='font-regular tracking-wide'>RECENTLY GENERATED LINKS</p>
      </div>


    </section>
  )
}

export default Dashboard