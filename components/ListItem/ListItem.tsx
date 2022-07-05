import React from 'react'

interface IProps {
    children: string
}

const ListItem: React.FC<IProps> = ({ children }) => {
    return (
        <li className='flex gap-2 items-center'>
            <span className='inline-block'>
                <svg width="12" height="12" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="4" fill="#E6F0FF" />
                    <circle cx="7.99996" cy="8.5" r="2" fill="#091E42" />
                </svg>



            </span>
            <p className='text-[14px] font-regular'>
                {children}
            </p>

        </li>
    )
}

export default ListItem