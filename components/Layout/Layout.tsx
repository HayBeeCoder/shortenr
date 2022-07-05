import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Button from '../Button'
import Logo from '../Logo'

interface ILayout {
  children: JSX.Element
}

const Layout: React.FC<ILayout> = ({ children }) => {
  const { pathname } = useRouter()
  // console.log(router)
  return (
    <div className='w-ful'>
      <header className='fixed top-0  w-full px-2 py-3  flex justify-between gap-10'>
        <Logo />
        {
          (pathname == "/login" || pathname == "/signup")
            ?
            <></>
            :
            <div className=' flex flex-auto   gap-1'>
              <Link href="/login">
                <Button classname=' basis-36 py-2 px-2 text-sm border-[1px] border-solid border-[#2b7fff] bg-[#2b7fff] inline'>
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button classname='basis-36 flex-grow py-2 px-2 text-sm text-[#2b7fff] border-[1px] border-solid border-[#2b7fff] bg-transparent inline'>
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