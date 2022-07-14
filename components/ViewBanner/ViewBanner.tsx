import React from 'react'
import Skeleton from '../Skeleton/Skeleton'

interface IProps {
    isLoading: boolean,
    view_count: string
}

const ViewBanner = ({ isLoading, view_count }: IProps) => {
    return (
        <div className='bg-[#F2F7FF] rounded-md p-3 py-6 md:p-3 text-center mb-3 md:mb-0'>
            <p className='text-[14px] mb-2 font-bold'>Total Views Count</p>
            {
                isLoading ?
                    <Skeleton className='w-32 h-12' /> :

                    <p className='font-bold text-5xl text-[#2B7FFF] px-9 inline'>
                        {view_count}
                    </p>
            }


        </div>
    )
}

export default ViewBanner