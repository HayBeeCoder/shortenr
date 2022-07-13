import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Router, { useRouter } from 'next/router'
import React, { useDebugValue, useEffect, useState } from 'react'
import { KeyedMutator, mutate } from 'swr'
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
  date_created: string,
  id: number,
  mutate: KeyedMutator<IUserLinks>
}

const TableRow = ({ long_url, short_url, date_created, id, mutate }: ITableRow) => {
  const handleDelete = (id: number) => {
    axiosInstance.delete(`links/${id}`)
      .then(res => {
        if (res.status == 204) {
          mutate()
        }
      }).catch(e => console.log("error on deletion: ", e))
  }

  return (
    <tr className='border-b-[1px] border-b-[#D9D9D9]'>
      <td>{long_url}</td>
      <td>{short_url}</td>
      <td>{date_created}</td>
      <td className='flex flex-col  lg:flex-row gap-2 items-center basis-16 pr-0'>
        <Button classname='  bg-[#F8EAE6] !text-[#BD2C00] py-[5px] px-4 text-sm font-normal border-[#bd2c00] border-[1px] hidden md:block' onClick={() => handleDelete(id)}>Delete</Button>
        <Button classname='  bg-[#F8EAE6] !text-[#BD2C00] py-[5px] px-4 text-sm font-normal border-[#bd2c00] border-[1px] md:hidden' onClick={() => handleDelete(id)}>Del</Button>
        <Button classname='  bg-[#E6F0FF] !text-[#2B7FFF] border-[#2b7fff]  border-[1px] py-[5px] px-4 text-sm font-normal '>View</Button>
      </td>
    </tr>
  )
}


const Dashboard = () => {
  const router = useRouter()
  const { state: { accessToken, email }, setState: { setEmail } } = useAppContext()
  const { user_id }: { user_id: string | null } = accessToken == '' ? { user_id: null } : jwtDecode(accessToken)

  const { data, isLoading, mutate } = useFetchLinks(email)
  // console.log(data)
  const [url, setUrl] = useState('')
  const [shortenedUrl, setShortenedUrl] = useState('')

  const handleInput = (e: React.FormEvent) => {
    setShortenedUrl('')
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
      <div className='w-full px-3 flex flex-col items-center'>
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
        </div>
        {
          shortenedUrl != ''

          &&
          <div className='border-solid border-[1px] bg-[#FAFBFB] rounded-[8px] px-4 py-1 w-full md:max-w-max relative flex items-center gap-2'>
            <p className='text-sm md:inline-block mr-2 font-semibold'>Here you go:</p>
            <p className='text-base p-2 bg-white inline-block text-[#2B7FFF]'>{shortenedUrl}</p>
            <button className='inline-block  relative top-1/2 text-[#6B788E] hover:text-inherit'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </button>
          </div>
        }
      </div>

      <div className='px-3 mt-10 py-5 flex justify-between'>
        <p className='font-regular tracking-wide'>GENERATED LINKS</p>

        <p>Total: {isLoading ? <Skeleton className='w-4 h-3 inline-block' /> : data?.count}</p>

      </div>


      {
        data && data.results.length > 0

          ?
          <div className='w-full  px-3 overflow-x-scroll lg:overflow-x-auto'>

            <table className='w-full min-w-[600px] px-3 text-left' >
              <colgroup>
                {/* <col  className='w-[40/100] min-w-[300px]'/>
            <col  className=' '/>
            <col  className='w-[8/100] '/>
            <col  className='w-[8/100] '/> */}

                <col span={1} className="w-[40%]" />
                <col span={1} className="w-[22%]" />
                <col span={1} className="w-[13%]" />
                <col span={1} className="w-[15%]" />
                {/* </colgroup> */}
              </colgroup>
              {/* <colgroup span={20}>
              <col span={6} />
              <col span={4} />
              <col span={4} />
              <col span={6} />
            </colgroup> */}
              <thead className='bg-[#EBECEF] text-sm'>
                <tr className='px-2'>
                  <th className='max-w-[4/10] '>
                    {/* <span className='text-white'>

                  -------------------------------
                  </span> */}
                    Original Url
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
                    {/* miscella */}
                  </th>
                </tr>
              </thead>
              <tbody className='text-sm'>
                {
                  data?.results?.map((link, index) => (

                    <TableRow
                      key={index}
                      id={link.id}
                      long_url={link.long_link}
                      short_url={link.short_link}
                      date_created={link.date_created}
                      mutate={mutate}
                    />
                  ))
                }
              </tbody>
            </table>

          </div> :
          <p className='text-center'>
            :( Seems you haven&apos;t generated a short link at all.
          </p>
      }


    </section>
  )
}

export default Dashboard