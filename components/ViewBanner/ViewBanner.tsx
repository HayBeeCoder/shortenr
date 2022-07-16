import React from 'react'
import Skeleton from '../Skeleton/Skeleton'

interface IProps {
    isLoading: boolean,
    view_count: string
}

const ViewBanner = ({ isLoading, view_count }: IProps) => {
    return (
        <div className='bg-[#fff] rounded-md p-3 py-6 md:p-3 text-center mb-3 md:mb-0 max-w-[350px]  mx-auto md:max-w-none aspect-square md:aspect-auto md:h-full relative'>
            <p className='text-[14px] mb-2 font-bold '>Total Views Count</p>
            {
                isLoading ?
                    <Skeleton className='w-32 aspect-square absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' /> :

                    <p className='font-bold text-9xl text-[#2B7FFF] px-9 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        {view_count}
                    </p>
            }


        </div>
    )
}

export default ViewBanner