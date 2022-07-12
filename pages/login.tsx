import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Loader from '../components/Loader/Loader'
import { BASE_URL } from '../constants'
import { useAppContext } from '../context/state'
import axiosInstance from '../Services/axios.services'
import { login } from '../Services/user.services'

const Login = () => {
  const router = useRouter()
  const { setState: { setAccessToken }, state: { accessToken } } = useAppContext()

  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const [input, setInput] = useState({
    email: '',
    password: '',
  })

  const handleInput = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement
    setInput({ ...input, [name]: value })
  }

  const handleSubmit = () => {
    const formData = {
      email: input.email,
      password: input.password
    }
    
    if (input.email != '' || input.password != '') {
      setIsLoggingIn(true)
      login(formData)
        .then(tokens => {
          // console.log(tokens)
          setAccessToken(tokens.access)
      
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${tokens.access}`
          const returnUrl = (router.query.returnUrl as string) || '/dashboard';
          // console.log(returnUrl)
          router.push(returnUrl);
          // console.log(accessToken)
        })
        .catch(e => console.log(e))
        .finally(() => 
        
        {
          router.query.returnUrl = ''
          setIsLoggingIn(false)
        })
      // axios.post(BASE_URL + "auth/jwt/create/", formData)
      //   .then(res => {
      //     if(res.status == 200){
      //       const {access,refresh} = res.data
      //       axios.defaults.headers.common["Authorization"] = `Bearer ${access}`
      //     }
      //     console.log(res.status)
      //     // console.log('ahdhdh')
      //   })
    }
  }


  useEffect(() => {
    // redirect to home if already logged in
    if (accessToken.length > 0) {
      // router.push('/dashboard');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='flex items-center justify-center  h-screen'>

      <div className='w-11/12 max-w-[600px] mx-auto flex flex-col gap-4 ' >
        <h1 className='font-bold text-[24px] text-center'>Log In</h1>

        <div className='justify-self-stretch space-y-5'>
          <Input
            className=" text-base pr-3 border-[#C3C0C3]"
            label="Email"
            labelFor='email'
            handleChange={handleInput}
            placeholder="JohnDoe@gmail.com"
            showRedBorder={false}
            type="text"

            value={input.email}

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
          <Button classname='bg-[#0B1A30] text-white my-2 ' onClick={handleSubmit} >
            {
              isLoggingIn
                ?
                <Loader />
                :
                'Submit'
            }
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