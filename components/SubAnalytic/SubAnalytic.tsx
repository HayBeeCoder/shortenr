import React, { useEffect, useState } from 'react'
interface IProps {
    children?: JSX.Element,
    title: string,
    toolTipMessage: string
}

const SubAnalytic = ({toolTipMessage, title, children }: IProps) => {
        const [showToolTip,setShowToolTip] = useState(false)

        useEffect(
            () => {

            }
        )

        useEffect(()=>{
            let timeout:NodeJS.Timeout
            if(showToolTip){
                timeout = setTimeout(()=>{
                    setShowToolTip(false)
                },1000)
            }
            return () => clearInterval(timeout)
        })
        
        
    

    return (

        <div className=' py-3 min-h-[320px] md:min-h-full bg-[#F9F9FC] rounded-md  mb-3'>
            <div className='flex justify-center gap-2 items-center  mb-3 relative'>

                <span className={` absolute w-full bg-gray-700 bg-opacity-50 text-white -top-12 rounded-sm p-2 text-[14px] max-w-[350px] text-center ${showToolTip ? "block" : "hidden"}`} >
                    {toolTipMessage}

                </span>
                <p className='block font-black text-center  '>{title}</p>
                <button className='p-[4px] ' onClick={() => setShowToolTip(!showToolTip)}  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="9" stroke="#0B1A30" />
                        <path d="M12.5 7.5C12.5 7.77614 12.2761 8 12 8C11.7239 8 11.5 7.77614 11.5 7.5C11.5 7.22386 11.7239 7 12 7C12.2761 7 12.5 7.22386 12.5 7.5Z" fill="#0B1A30" />
                        <path d="M12 17V10" stroke="#0B1A30" />
                    </svg>

                </button>
            </div>
            {children}
        </div>

    )
}

export default SubAnalytic