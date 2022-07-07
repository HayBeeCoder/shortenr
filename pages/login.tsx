import Link from 'next/link'
import React, { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'

const Login = () => {
  const [input, setInput] = useState({
    username: '',
    password: '',
  })

  const handleInput = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement
    setInput({ ...input, [name]: value })
  }

  return (
    <section className='flex items-center justify-center  h-screen'>

      <div className='w-11/12 max-w-[600px] mx-auto flex flex-col gap-4 ' >
        <h1 className='font-bold text-[24px] text-center'>Log In</h1>

        <div className='justify-self-stretch space-y-5'>
          <Input
            className=" text-base pr-3 border-[#C3C0C3]"
            label="Username"
            labelFor='username'
            handleChange={handleInput}
            placeholder="JohnDoe@gmail.com"
            showRedBorder={false}
            type="text"

            value={input.username}

          />
          <Input
            className=" text-base pr-3 border-[#C3C0C3]"
            label="Password"
            labelFor='password'
            handleChange={handleInput}
            //   placeholder="https://Enterthatlongurlandshortenit.com"
            showRedBorder={false}
            type="password"

            value={input.password}

          />

          <Button classname='bg-[#0B1A30] text-white my-2 '  >
            Submit
          </Button>
          <p className='text-center text-sm'>Are you a new user ? {" "}
          <span className='font-bold underline underline-offset-2 '>
           <Link href='/signup'> 

                  Sign Up
          </Link>
          </span>
          </p>
        </div>

      </div>
    </section>
  )
}

export default Login