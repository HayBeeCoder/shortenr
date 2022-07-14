import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import React, { useDebugValue, useEffect, useLayoutEffect, useState } from 'react'
import { KeyedMutator, mutate } from 'swr'
import Button from '../../components/Button'
import Input from '../../components/Input'
import RouteGuard from '../../components/RouteGuard/RouteGuard'
import ShortenedUrlBanner from '../../components/ShortenedUrlBanner/ShortenedUrlBanner'
import Skeleton from '../../components/Skeleton/Skeleton'
// import { mutate } from 'swr'
import { useAppContext } from '../../context/state'
import useFetchLinks from '../../hooks/useFetchLinks'
import useFetchUser from '../../hooks/useFetchUser'
import axiosInstance from '../../Services/axios.services'

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
      <td className='pl-2'>{long_url}</td>
      <td>{short_url}</td>
      <td>{date_created}</td>
      <td className='flex flex-col  lg:flex-row gap-2 items-stretch basis-16 pr-2'>
        <button className='mini-btn bg-[#F8EAE6] text-[#BD2C00] border-[#bd2c00] hidden md:block' onClick={() => handleDelete(id)}>Delete</button>
        <button className='mini-btn bg-[#F8EAE6] text-[#BD2C00] border-[#bd2c00] md:hidden' onClick={() => handleDelete(id)}>Del</button>
        <Link href='/dashboard/analytics'>
        <button className='mini-btn  border-[#2b7fff] bg-[#E6F0FF] text-[#2B7fff] '>View</button>
        </Link>
      </td>
    </tr>
  )
}


const Dashboard = () => {
  const router = useRouter()
  const { state: { accessToken, email }, setState: { setEmail } } = useAppContext()
  const { user_id }: { user_id: string | null } = accessToken == ''  || !accessToken ? { user_id: null } : jwtDecode(accessToken)

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
    // console.log(url.trim().length)
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



  useLayoutEffect(() => {
    // console.log(user_id)
    // console.log(accessToken)
    if (accessToken && accessToken != '' ) {
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
        <div className='w-full bg flex flex-col md:flex-row gap-2 my-3 max-w-lg mx-auto md:max-w-5xl md:my-6 items-stretch '>
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
          // <div className='border-solid border-[1px] bg-[#FAFBFB] rounded-[8px]  px-2 md:px-4 pt-2 md:pt- py-1 w-full md:max-w-max relative md:flex items-center gap-2 max-w-lg mx-auto md:mx-w-none'>
          //   <p className='text-sm flex-grow md:inline-block mb-2 md:mb-0  font-semibold'>Here you go:</p>
            
          //   <div className='flex flex-col  md:flex-row space-y-2 md:space-y-0 md:space-x-2 md:items-center'>


          //   <p className='text-base p-2 bg-white  text-[#2B7FFF]'>{shortenedUrl}</p>
          //   <button className='inline-block  relative top-1/2 text-[#6B788E] hover:text-inherit p-2 self-end'>
          //     <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
          //       <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          //     </svg>
          //   </button>
          //   </div>
          // </div>
          <ShortenedUrlBanner shortenedUrl={shortenedUrl}/>
        }
      </div>

      <div className='px-3 mt-10 py-5 flex justify-between'>
        <p className='font-regular tracking-wide'>GENERATED LINKS</p>

        <p>Total: {isLoading ? <Skeleton className='w-4 h-3 inline-block' /> : data?.count}</p>

      </div>


      {
        data && data.results.length > 0

        &&
        <div className='w-full  px-3 overflow-x-scroll lg:overflow-x-auto'>

          <table className='w-full min-w-[600px] px-3 text-left' >
            <colgroup>
              {/* <col  className='w-[40/100] min-w-[300px]'/>
            <col  className=' '/>
            <col  className='w-[8/100] '/>
            <col  className='w-[8/100] '/> */}

              <col span={1} className="w-[40%] " />
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
                <th className='max-w-[4/10] pl-2 '>
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
                <th className='w-[2/10]  text-white pr-2' >
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

        </div>
      }
      {
        data && data.results.length == 0 &&
        <p className='text-center'>
          :( Seems you haven&apos;t generated a short link at all.
        </p>
      }


    </section>
  )
}

export default RouteGuard(Dashboard)


// export async function getStaticProps() {
//   return {
//     props: {
//       protected: true,
//     },
//   }
// }
