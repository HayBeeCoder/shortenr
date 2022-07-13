import jwtDecode from 'jwt-decode'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import path from 'node:path/win32'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/state'
import useFetchUser from '../../hooks/useFetchUser'
import Button from '../Button'
import Logo from '../Logo'

interface ILayout {
  children: JSX.Element
}



const Layout: React.FC<ILayout> = ({ children }) => {
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
    setAccessToken('')
    setEmail('')
    push('/')
  }

//   useEffect(() => {
//     // setLoggedInUser(user.email as string)
//   },
// [user]
//   )
  // console.log(router)
  // console.log(pathname)
  return (
    <div className='w-ful'>
      <header className=' top-0  w-full px-2 py-3  flex justify-between gap-10 items-center'>
        <Logo />
        {

            // user?.email &&
            (

              pathname.includes("/dashboard") ||
              pathname.includes("/analytics")
              )
            ?
            <p className='text-[14px] md:block hidden'> 
            <span className='font-semibold'>
            Logged In as:

            </span>{"  "}
             <span className='text-[#2B7FFF] text-[18px]'>
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


            <div className=' flex flex-auto md:flex-none justify-end items-center gap-1 '>
              {
                pathname.includes("/dashboard") ||
                  pathname.includes("/analytics")
                  ?
                  // <Link href="">
                  <Button  classname='basis-24 sm:basis-36  py-2 px-2 md:px-5 text-sm !text-[#0B1A30] border-[1px] border-solid border-[#0B1A30] bg-transparent inline hover:bg-[#0B1A30] hover:text-white hover:opacity-100' onClick={handleLogout}>
                    Log Out
                  </Button>
                  :
                  <>
                    <Link href="/login">
                      <Button classname='basis-24 sm:basis-36 py-2 px-2 md:px-5 text-sm border-[1px] border-solid border-[#0B1A30] bg-[#0B1A30] inline'>
                        Log In
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button classname='basis-24 sm:basis-36  py-2 px-2 md:px-5 text-sm text-[#0B1A30] border-[1px] border-solid border-[#0B1A30] bg-transparent inline hover:bg-[#0B1A30] hover:text-white hover:opacity-100'>
                        Sign Up
                      </Button>
                    </Link>
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
            <p className='font-semibold'>
            Logged In as:

            </p>{"  "}
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