import React, { useState } from 'react'
import useCopyToClipboard from '../../hooks/useCopyToClipboard'
import Skeleton from '../Skeleton/Skeleton'

interface IMiniCard {
    property: string,
    value: string,
    isLoading: boolean
    colored?: boolean
    

}

const MiniCard = ({ property, value, isLoading ,colored = false}: IMiniCard) => {


    const [copiedText, copy] = useCopyToClipboard()
    const [timeout, setTime] = useState<null | NodeJS.Timeout>(null)
    const [showTooltip, setShowTooltip] = useState(false)
  
    const handleClick = () => {
        setShowTooltip(true)
        copy(value)
        setTime(
            setTimeout(() => {
                setShowTooltip(false)
            }, 500)
        )
        if (timeout) {
            return () => clearTimeout(timeout)
        }
    }
  
  



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
                    <button className='text-blue-600 relative underline' onClick={() =>handleClick()} >
                     {showTooltip && <span className='absolute  md:-left-0 -top-5 bg-gray-400 text-[#fefefe] p-1 text-[12px] w-[120px] right-0'>URL copied already</span>}
                   

                    {/* <a href={value} target="_blank"> */}
                        {value}
                    {/* </a> */}
                    </button>
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