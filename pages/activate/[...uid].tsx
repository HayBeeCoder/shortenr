import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { BASE_URL } from '../../constants'
import axios from 'axios'
import Link from 'next/link'

const index = ({ uid }: { uid: string[] }) => {
    // console.log(uid)
    const [show, setShow] = useState(false)
    // const router = useRouter()
    // console.log(router.query)
    // const { params } = router.query as {params: string[]}
    console.log(uid)
    const formData = {
        uid: uid[0],
        token: uid[1]
    }


    useEffect(() => {
        axios.post(BASE_URL + "auth/users/activation/", formData)
            .then(res => res.data)
            .then(data => {
                if (data.uid && data.token) setShow(true)
            })
    }, [])
    return (
        <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fafefa] w-full text-lg md:px-6 py-4 text-center' >
      
            <p>Your account has been activated successfully.</p>
            <p> You can now {" "}
                 <span className="underline underline-offset-2 text-[#2B7FFF]">
                <Link href="/login">
                    Log in
                </Link>
            </span>
            </p>
        </div>
    )
}

export default index

export const getServerSideProps = async ({ params }: any) => {
    const { uid } = params
    // const formData = {
    //     uid: uid[0],
    //     token: uid[1]
    // }

    // const  res = await axios.post( BASE_URL + "auth/" ,formData).then(res => res.data)
    return {
        props: {
            uid
        }
    }
}