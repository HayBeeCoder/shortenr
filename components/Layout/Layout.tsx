import Link from 'next/link'
import { useRouter } from 'next/router'
import path from 'node:path/win32'
import React from 'react'
import Button from '../Button'
import Logo from '../Logo'

interface ILayout {
  children: JSX.Element
}

const Layout: React.FC<ILayout> = ({ children }) => {
  const { pathname } = useRouter()
  // console.log(router)
  console.log(pathname)
  return (
    <div className='w-ful'>
      <header className='fixed top-0  w-full px-2 py-3  flex justify-between gap-10'>
        <Logo />
        {
          pathname.includes("/login") || 
          pathname.includes("/signup") ||
          pathname.includes("/confirmation") || 
          pathname.includes("/activate")
            ?
            <></>
            :
            <div className=' flex flex-auto justify-end items-center gap-1 '>
              <Link href="/login">
                <Button classname='basis-24 sm:basis-36 py-2 px-2 text-sm border-[1px] border-solid border-[#0B1A30] bg-[#0B1A30] inline'>
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button classname='basis-24 sm:basis-36  py-2 px-2 text-sm text-[#0B1A30] border-[1px] border-solid border-[#0B1A30] bg-transparent inline hover:bg-[#0B1A30] hover:text-white hover:opacity-100'>
                  Sign Up
                </Button>
              </Link>
            </div>

        }
      </header>
      {children}
    </div>
  )
}

export default Layout