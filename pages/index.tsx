import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import ListItem from '../components/ListItem/ListItem'
import Logo from '../components/Logo'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [input, setInput] = useState('')

  const handleInput = (e: React.FormEvent) => {
    const { value } = e.target as HTMLInputElement
    setInput(value)
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
              Copy that Long URL
            </ListItem>
            <ListItem>
              Paste into the input box below
            </ListItem>
            <ListItem>
              And Generate a short URL
            </ListItem>
            <ListItem>
              Optionally, Track this URL by signing up :)
            </ListItem>
          </ul>
          <div className='justify-self-stretch'>
            <Input
              className=" text-base pr-3"
              labelFor='original_url'
              handleChange={handleInput}
              placeholder="https://Enterthatlongurlandshortenit.com"
              showRedBorder={false}
              type="text"
              value={input}

            />
            <Button classname='bg-[#2B7FFF] text-white my-4 '  >
              Shorten URL
            </Button>
          </div>

        </div>
      </section>
    </div>
  )
}

export default Home
