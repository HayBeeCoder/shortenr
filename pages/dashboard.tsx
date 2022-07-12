import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Router, { useRouter } from 'next/router'
import React, { useDebugValue, useEffect, useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Skeleton from '../components/Skeleton/Skeleton'
// import { mutate } from 'swr'
import { useAppContext } from '../context/state'
import useFetchLinks from '../hooks/useFetchLinks'
import useFetchUser from '../hooks/useFetchUser'
import axiosInstance from '../Services/axios.services'

interface ITableRow {
  long_url: string,
  short_url: string,
  date_created: string
}

const TableRow = ({ long_url, short_url, date_created, }: ITableRow) => {

  return (
    <tr className='border-b-[1px] border-b-[#D9D9D9]'>
      <td>{long_url}</td>
      <td>{short_url}</td>
      <td>{date_created}</td>
      <td className='flex gap-2'>
        <Button classname=' bg-[#F8EAE6] !text-[#BD2C00] !p-0 '>Delete</Button>
        <Button classname='!p-0 flex-grow-0 flex-shrink bg-[#E6F0FF] !text-[#2B7FFF]'>View</Button>
      </td>
    </tr>
  )
}


const Dashboard = () => {
  const router = useRouter()
  const { state: { accessToken, email }, setState: { setEmail } } = useAppContext()
  const { user_id }: { user_id: string | null } = accessToken == '' ? { user_id: null } : jwtDecode(accessToken)

  const { data, isLoading, mutate } = useFetchLinks(email)
  console.log(data)
  const [url, setUrl] = useState('')
  const [shortenedUrl, setShortenedUrl] = useState('')

  const handleInput = (e: React.FormEvent) => {
    const { value } = e.target as HTMLInputElement
    setUrl(value)
  }

  const handleSubmit = () => {
    console.log(url.trim().length)
    if (url.trim().length != 0) {
      const formData = {
        long_link: url
      }
      axiosInstance.post('links/', formData)
        .then(res => {
          if (res.status == 200 || res.status == 201 || res.status == 208) {
            // console.log(res.data)

            setShortenedUrl(res.data.short_link)
            mutate()
          }
        })
        .catch(e => console.log('error in dashboard: ', e))
    }
  }



  useEffect(() => {
    // console.log(user_id)
    if (accessToken != '') {

      axiosInstance.get(`auth/users/${user_id}/`)
        .then(res => {
          if (res.status == 200) {
            setEmail(res.data.email)
          }
        })
        .catch(e => console.log(e))
    }
  }, [accessToken])


  return (
    <section className=' min-h-screen px-2'>
      <div className='w-full bg flex flex-col md:flex-row gap-2 my-3 max-w-lg mx-auto md:max-w-5xl md:my-6 items-stretch px-3'>
        <Input
          className='pr-2'
          handleChange={e => handleInput(e)}
          labelFor='url'
          label=''
          type='text'
          value={url}
          showRedBorder={false}

          placeholder="Enter that long URL you've got"


        />
        {/* <div className=' w-96'> */}

        <Button classname=' bg-[#2B7FFF] md:w-96 self-stretch' onClick={handleSubmit}>
          Shorten URL
        </Button>
        {/* </div> */}
      </div>
      {
        shortenedUrl != ''
        &&
        <div className='border-solid border-[1px] bg-[#FAFBFB] rounded-[8px] p-4 '>
          <p className='text-sm md:inline-block'>Here you go:</p>
          <p className='text-base underline md:inline-block'>{shortenedUrl}</p>
        </div>
      }

      <div className='px-3 mt-10 py-5 flex justify-between'>
        <p className='font-regular tracking-wide'>GENERATED LINKS</p>

        <p>Total: {isLoading ? <Skeleton className='w-4 h-3 inline-block' /> : data?.count}</p>

      </div>


      <div className='w-full'>
        {
          data &&

          <table className='w-full px-3 text-left' >
            <colgroup>
            <col  className='w-[42/100] min-w-[300px]'/>
            <col  className='w-[100px] min-w-[300px]'/>
            <col  className='w-[42/100] min-w-[300px]'/>
            <col  className='w-[42/100] min-w-[300px]'/>
            </colgroup>
            {/* <colgroup span={20}>
              <col span={6} />
              <col span={4} />
              <col span={4} />
              <col span={6} />
            </colgroup> */}
            <thead>
              <tr>
                <th className='max-w-[4/10] '>
                  {/* <span className='text-white'>

                  -------------------------------
                  </span> */}
                  Long Url
                  {/* <span className='text-white'>

                  -------------------------------
                  </span> */}
                  {/* ------------------------------- */}
                </th>
                <th className=' '>
                  
                  Short Url

                </th>
                <th className='w-[1/10] '>
                  {/* <span className="text-white">

                  ----------
                  </span> */}
                  Created On
                  {/* <span className="text-white">
                  ----------
                  </span> */}
                </th>
                <th className='w-[2/10]  text-white' >
                  {/* {"                            "} */}
                  {/* ------------------------------------------------ */}
                </th>
              </tr>
            </thead>
            <tbody>
              {
                data?.results?.map((link, index) => (

                  <TableRow
                    key={index}
                    long_url={link.long_link}
                    short_url={link.short_link}
                    date_created={link.date_created}
                  />
                ))
              }
            </tbody>
          </table>
        }

      </div>


    </section>
  )
}

export default Dashboard