import React from 'react'
interface IProps{
    children?: JSX.Element
    title: string
}

const SubAnalytic = ({title,children}: IProps) => {
  return (
    
    <div className='px-3 py-6 min-h-[320px] md:min-h-full bg-[#F9F9FC] rounded-md  mb-3'>
    <p className='text-sm font-semibold text-center '>{title}</p>
    {children}
  </div>
  
  )
}

export default SubAnalytic