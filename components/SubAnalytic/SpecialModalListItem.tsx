import React from 'react'

interface IProps{
    isSelected: boolean
    setSelected: React.Dispatch<React.SetStateAction<number>>
    index: number
    children: string
}

const SpecialModalListItem = ({isSelected,setSelected, index,children}: IProps) => {
    



  return (
        <li><button className= {`px-4 py-2 w-full ${isSelected ? "bg-[#0B1A30] text-white" : "" }`} onClick={() => setSelected(index)}>{children}</button></li>
  )
}

export default SpecialModalListItem