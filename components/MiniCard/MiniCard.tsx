import React from 'react'
import Skeleton from '../Skeleton/Skeleton'

interface IMiniCard {
    property: string,
    value: string,
    isLoading: boolean

}

const MiniCard = ({ property, value, isLoading }: IMiniCard) => {
    return (
        <div className='text-[12px] md:p-2 md:bg-[#F9F9FC]'>
            <p className='font-semibold  inline-block mr-1 md:mb-2 tracking-wide'>
                {property}:
            </p>
            {
                isLoading ?
                    <Skeleton className='block w-full h-4' /> :
                    <span >

                        {value}
                    </span>
            }
        </div >
    )
}

export default MiniCard