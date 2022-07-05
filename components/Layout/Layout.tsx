import React from 'react'
import Logo from '../Logo'

interface ILayout {
    children: JSX.Element
}

const Layout:React.FC<ILayout> = ({children}) => {
  return (
    <div className='w-full'>
        <header className= 'fixed top-0  w-full px-2 py-3'>
            <Logo/>
        </header>
            {children}
    </div>
  )
}

export default Layout