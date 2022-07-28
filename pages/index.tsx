import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useDebugValue, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import ListItem from "../components/ListItem/ListItem";
import Loader from "../components/Loader/Loader";
import ShortenedUrlBanner from "../components/ShortenedUrlBanner/ShortenedUrlBanner";
import UrlBanners from "../components/UrlBanners/UrlBanners";
import { BASE_URL, MAX_URL_CHARACTERS_POSSIBLE, REGEX_URL, SERVER_DOMAIN } from "../constants";
import { validateURL } from "../helpers/validateURL";


const Home: NextPage = () => {
  const [isURLVeryLong, setIsURLVeryLong] = useState(false);
  const [isURLValid, setIsURLValid] = useState(true)
  const [input, setInput] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e: React.FormEvent) => {
    const { value } = e.target as HTMLInputElement;

    setShortenedUrl(null);
     // sdfa 

     setShortenedUrl("");
     let isValidURL;
     try {
       isValidURL = validateURL(value);
       // console.log("is url valid: ?" , isValidURL)
     } catch (e) {
       isValidURL = false;
     }
 
 
     if (value.length > MAX_URL_CHARACTERS_POSSIBLE) {
       setIsURLVeryLong(true);
     } else setIsURLVeryLong(false);
 
     if (isValidURL) setIsURLValid(true);
     else setIsURLValid(false);
 
     setInput(value);
 
 
     // sdaf 


    // if (value.length > MAX_URL_CHARACTERS_POSSIBLE) {
    //   setIsURLVeryLong(true);
    // } else setIsURLVeryLong(false);
    // setInput(value);
  };

  // console.log("email" , email)
  
  const handleSubmit = () => {

   
    
    const formData = {
      long_link: input,
    };
    const isValidURL = validateURL(input)
    console.log("Is url valid really?" , validateURL(input))
    setIsURLValid(isValidURL)
    // const canSubmit = (
      
    //   REGEX_URL.test(input.trim()) &&
    //   !input.trim().includes(SERVER_DOMAIN) && 


    // )


    if (input.trim() != "" && !isURLVeryLong && isValidURL) {
      setIsLoading(true);
      axios
        .post(`${BASE_URL}links/`, formData)
        .then((res) => {
          // console.log(res.data)
          setShortenedUrl(res.data.short_link);
        })
        .catch((e) => console.log("error on shortening in homepage: ", e))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div>
      <Head>
        <title>Shortenr</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <section className="flex items-center justify-center  h-screen">
        <div className="w-11/12 max-w-[600px] mx-auto flex flex-col gap-4 ">
          <h1 className="font-bold text-[24px] text-center">
            A simple URL shortener{" "}
            <span className="text-[#2B7FFF] block">and more...</span>
          </h1>
          <ul>
            <ListItem>Copy that long URL</ListItem>
            <ListItem>Paste into the input box below</ListItem>
            <ListItem>Generate a short URL</ListItem>
            <ListItem>Optionally, Track shortened URL by signing up :)</ListItem>
          </ul>
          <div className="justify-self-stretch">
            <Input
              className=" text-base pr-3 border-[#C3C0C3] h-[46px]"
              labelFor="original_url"
              handleChange={handleInput}
              placeholder="https://enterthatlongurlandshortenit.com"
              showRedBorder={false}
              type="text"
              value={input}
            />
            <button
              className='bg-[#0B1A30] my-2 mini-btn text-[#fff] py-3  w-full h-[46px]'
              onClick={handleSubmit}
            >
              {isLoading ? <Loader /> : "Generate short URL"}
            </button>
           {/* <UrlBanners isURLVeryLong={isURLVeryLong} isURLValid={isURLValid} /> */}
           <UrlBanners isURLValid={isURLValid} isURLVeryLong={isURLVeryLong} url={input}/>
      
            {shortenedUrl && !isURLVeryLong && isURLValid && (
              <ShortenedUrlBanner shortenedUrl={shortenedUrl} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
