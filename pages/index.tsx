import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import ListItem from '../components/ListItem/ListItem'
import Loader from '../components/Loader/Loader'
import Logo from '../components/Logo'
import ShortenedUrlBanner from '../components/ShortenedUrlBanner/ShortenedUrlBanner'
import { BASE_URL } from '../constants'
import { useAppContext } from '../context/state'
import axiosInstance from '../Services/axios.services'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const {state: {email}}  = useAppContext()
  const [input, setInput] = useState('')
  const [shortenedUrl, setShortenedUrl] = useState<string | null> (null)
  const [isLoading ,setIsLoading] = useState(false)

  const handleInput = (e: React.FormEvent) => {
    const { value } = e.target as HTMLInputElement

  setShortenedUrl(null)
    setInput(value)
  }
  // console.log("email" , email)

  const handleSubmit = () => {
    const formData = {
      long_link: input
    }
    if(input.trim() != ''){
      setIsLoading(true)
        axios.post(`${BASE_URL}links/`,formData)
            .then(res => {
              console.log(res.data)
              setShortenedUrl(res.data.short_link)
            })
            .catch(
              e => console.log("error on shortening in homepage: " , e)
            )
            .finally(() => setIsLoading(false))

    }
  }

  return (
    <div >
      <Head>
        <title>Shortenr</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className='flex items-center justify-center  h-screen'>

        <div className='w-11/12 max-w-[600px] mx-auto flex flex-col gap-4 ' >
          <h1 className='font-bold text-[24px] text-center'>A simple URL shortener {" "}
           <span className='text-[#2B7FFF] block'>and more...</span></h1>
          <ul>
            <ListItem>
              Copy that long URL
            </ListItem>
            <ListItem>
              Paste into the input box below
            </ListItem>
            <ListItem>
               Generate a short URL
            </ListItem>
            <ListItem>
              Optionally, Track this URL by signing up :)
            </ListItem>
          </ul>
          <div className='justify-self-stretch'>
            <Input
              className=" text-base pr-3 border-[#C3C0C3]"
              labelFor='original_url'
              handleChange={handleInput}
              placeholder="https://Enterthatlongurlandshortenit.com"
              showRedBorder={false}
              type="text"
              value={input}

            />
            <Button classname='bg-[#0B1A30] text-white my-2 '  onClick={handleSubmit}>
              {
                isLoading ?
                <Loader/> :
                'Shorten URL'

              } 
            </Button>
            
            {
              shortenedUrl

              &&
              <ShortenedUrlBanner shortenedUrl={shortenedUrl} />

            }
            
          </div>

        </div>
      </section>
    </div>
  )
}

export default Home
