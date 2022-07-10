import React from 'react'

const Loader = ({}) => {
    return (
        <div className= " mx-auto container w-[75px] h-[15px]  flex relative anima">
            <span className="circle absolute top-0 left-0 animate-grow "></span>
            <span className="circle"></span>
            <span className="circle"></span>
            <span className="circle absolute top-0 right-0 mr-0 animate-grow"></span>
        </div>
    )
}

export default Loader