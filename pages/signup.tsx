import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
// import { isModuleNamespaceObject } from 'util/types'
import Button from '../components/Button'
import Input from '../components/Input'
import { BASE_URL, REGEX_EMAIL } from '../constants'
import { fieldValidator } from '../helpers/signUpValidator'
import validateForm from '../helpers/validateForm'
import useUser from '../hooks/useUser'


const Signup = () => {
  // const {data,isDone,isLoading,mutate} = useUser()
  const [serverResponse, setServerResponse] = useState('')
  const [showEmptyFieldError, setShowEmptyFieldError] = useState(false)
  const [showInputErrors, setShowInputErrors] = useState(false)
  const [input, setInput] = useState<IUser>({
    email: '',
    password: '',
    confirm_password: '',
  })
  const [error, setError] = useState<IUser>({
    email: '',
    password: '',
    confirm_password: ''
  })


  console.log(error)

  const handleInput = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement
    setError({ ...error, [name]: fieldValidator(name, value, input) })
    setInput({ ...input, [name]: value })


  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // if
    if (input.email == '' || input.confirm_password || input.password) setShowEmptyFieldError(true)

    // console.log(validateForm(error,input))
    if (!validateForm(error, input)) {
      setShowInputErrors(true)
    } else {
      //else block beginning

      setShowInputErrors(false)

      const formData = {
        email: input.email,
        password: input.password,
        re_password: input.confirm_password
      }

      try {
        // console.log(formDat)
        const result = await axios.post(BASE_URL + "auth/users/", formData)
        if (result.status == 400 && result.data) {
          setServerResponse(result.data?.email[0])
        }else if(result.status == 200)
        {
            console.log(result.data)
        }
        // console.log(result)
      } catch (err) {
        console.log("error on sign up: ", err)
      }


      //else block ending
    }
  }


  return (
    <section className='flex items-center justify-center  h-screen'>

      <div className='w-11/12 max-w-[600px] mx-auto flex flex-col gap-4 ' >
        <h1 className='font-bold text-[24px] text-center'>Create an account</h1>

        <div className='justify-self-stretch space-y-5'>
          <div>
            <Input
              className=" text-base pr-3 border-[#C3C0C3]"
              label="Email"
              labelFor='email'
              handleChange={handleInput}
              placeholder="JohnDoe@gmail.com"
              showRedBorder={showInputErrors}
              type="text"


              value={input.email}

            />
            {showInputErrors && error.email != "" && <p className='text-xs text-red-500 '>Enter a valid email !</p>}

          </div>
          <div>

            <Input
              className=" text-base pr-3 border-[#C3C0C3]"
              label="Password"
              labelFor='password'
              handleChange={handleInput}
              //   placeholder="https://Enterthatlongurlandshortenit.com"
              showRedBorder={showInputErrors}
              type="password"

              value={input.password}

            />

            { 
            showInputErrors &&
             error.password != '' &&
              <p className='text-xs text-red-500 '>Password must be at least six characters long!</p>
              }

          </div>

          <div>

            <Input
              className=" text-base pr-3 border-[#C3C0C3]"
              label="Confirm password"
              labelFor='confirm_password'
              handleChange={handleInput}
              //   placeholder="https://Enterthatlongurlandshortenit.com"
              showRedBorder={showInputErrors}
              type="password"

              value={input.confirm_password}

            />
            {
              showInputErrors &&
              error.confirm_password != '' &&
              <p className='text-xs text-red-500 '>Passwords do not match!</p>
            }

          </div>
          <div className='my-2'>

            {serverResponse != '' && <p className='text-xs text-red-500 '>{serverResponse}</p>}
            <Button classname='bg-[#0B1A30] text-white mb-2  mt-1' onClick={(e) => handleSubmit(e)} >


              Submit
            </Button>
            <p className='text-center text-sm'>Already have an account ? {" "}
              <span className='font-bold underline underline-offset-2 '>
                <Link href='/login'>

                  Log In
                </Link>
              </span>
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Signup