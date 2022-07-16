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
        <div className='text-[15px] md:py-2 md:px-4 sm:flex items-center  '>
            <p className='font-semibold  inline-block  mr-1  tracking-wide'>
                {property}:
            </p>
            {
                isLoading ?
                    <Skeleton className='block w-full h-4' /> :
                    <span className={`block text-[14px] truncate tracking-wide ${ colored ? 'text-blue-600' : ''}`}>

                        {value}
                    </span>
            }
        </div >
    )
}

export default MiniCard