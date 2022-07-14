import jwtDecode from 'jwt-decode'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import path from 'node:path/win32'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/state'
import useFetchUser from '../../hooks/useFetchUser'
import { logout } from '../../Services/user.services'
import Button from '../Button'
import Logo from '../Logo'

interface ILayout {
  children: JSX.Element
}



const Layout: React.FC<ILayout> = ({ children }) => {
  const router = useRouter()
  const { state: { email,accessToken }, setState: { setAccessToken,setEmail } } = useAppContext()
  // const [loggedInUser,setLoggedInUser] = useState('')
  // const decode: {user_id: string | undefined} = accessToken != '' ? jwtDecode(accessToken)  : {user_id: undefined}con
  // console.log(accessToken)
  // const {user_id} =  accessToken != '' ? jwtDecode(accessToken) as { user_id: string} : {user_id: undefined}
  // const {data : user, isError} =  useFetchUser(undefined) 
  // console.log(user)
  // console.log(isError)
  
  const { push, pathname } = useRouter()
  const handleLogout = () => {
    
    push('/')
    setAccessToken('')
    setEmail('')
    logout()
  }

//   useEffect(() => {
//     // setLoggedInUser(user.email as string)
//   },
// [user]
//   )
  // console.log(router)
  // console.log(pathname)
  // console.log( 'inside ', router.asPath, email)
  // console.log('accesstoken: ' , accessToken)
  return (
    <div className='w-full'>
      <header className=' top-0  w-full px-2 py-3  flex justify-between gap-5 items-center'>
        <Logo />
        {

            // user?.email &&
            (

              pathname.includes("/dashboard") 
              // ||
              // pathname.includes("/analytics")
              )
            ?
            <p className='text-[14px] md:block hidden'> 
            <span className='font-semibold '>
            Logged In as:

            </span>{"  "}
             <span className='text-[#2B7FFF] text-[18px] '>
              {email}
            </span>
            </p>
            :
            ''


        }

        {
          pathname.includes("/login") ||
            pathname.includes("/signup") ||
            pathname.includes("/confirmation") ||
            pathname.includes("/activate")
            ?
            <></>
            :


            <div className='  md:flex-none  items-center  relative'>
              {
                pathname.includes("/dashboard") ||
                  pathname.includes("/analytics")
                  ?
                  // <Link href="">
                  <button  className='mini-btn text-[#0B1A30] hover:text-[#fff] border-[#0B1A30] bg-transparent  hover:bg-[#0B1A30] relative right-0' onClick={handleLogout}>
                    Log Out
                  </button>
                  :
                  <>
                  <div className='flex justify-end  flex-grow md:w-80 gap-1 items-center'>

                    <Link href="/login">
                      <button className='  sm:basis-36 mini-btn border-[#0B1A30] border-[1px] bg-[#0B1A30] text-white '>
                        Log In
                      </button>
                    </Link>
                    <Link href="/signup">
                      <button className=' sm:basis-36  mini-btn text-[#0B1A30] border-[1px] border-solid border-[#0B1A30] bg-transparent hover:opacity-100'>
                        Sign Up
                      </button>
                    </Link>
                  </div>
                  </>
              }
            </div>

        }
      </header>
      {   
        // user?.email &&
        (
          pathname.includes("/dashboard") ||
            pathname.includes("/analytics")
        )
            ?
            <p className='text-[14px] md:hidden block text-center'> 
            <span className='font-semibold block'>
            Logged In as:

            </span>{"  "}
             <span className='text-[#2B7FFF] text-[18px]'>
              {email }
            </span>
            </p>
            :
            ''


        }
      {children}
    </div>
  )
}

export default Layout