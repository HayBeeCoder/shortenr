import React from 'react'

const Skeleton = ({className}: {className: string}) => {
  return (
    <span className={`bg-gray-300 ${className}`}></span>
  )
}

export default Skeleton