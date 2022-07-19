import React from 'react'
import Skeleton from '../Skeleton/Skeleton'

interface IMiniCard {
    property: string,
    value: string,
    isLoading: boolean
    colored?: boolean
    

}

const MiniCard = ({ property, value, isLoading ,colored = false}: IMiniCard) => {
    return (
        <div className='text-[15px] py-2 md:px-4 flex flex-wrap items-baseline  '>
            <p className='font-semibold  inline-block  mr-1  tracking-wide'>
                {property}:
            </p>
            {
                isLoading ?
                    <Skeleton className='block w-full h-4' /> :
                    (
                    colored ? 
                    <span className='text-blue-600 underline'>

                    <a href={value} target="_blank">
                        {value}
                    </a>
                    </span>
                     :
                    <span className={` text-[14px] truncate tracking-wide `}>

                        {value}
                    </span>
                    )
            }
        </div >
    )
}

export default MiniCard