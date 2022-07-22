import Link from 'next/link'
import React from 'react'
import { useAppContext } from '../context/state'

const Confirmation = () => {
    const { state: { confirmationEmail } } = useAppContext()
    return (
        <div className='fixed top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 bg-[#fafefa] text-lg px-6 py-4  text-center' >
            {
                confirmationEmail == '' ?
                    <>
                        <p>There is nothing to see here :).</p>
                        <p>Return to <Link href="/">
                        <span className='text-[#2b7fff] cursor-pointer'>
                                Homepage
                            </span>
                        </Link>
                        </p>
                    </> :
                    <>
                        <p>

                            A mail has been sent to the email address{" "}
                            <span className='text-[#2B7FFF] '>
                                {confirmationEmail}.
                            </span>
                        </p>
                        <p>

                            Kindly click the link in the mail sent to activate your account.
                        </p>
                    </>
            }



        </div>
    )
}

export default Confirmation