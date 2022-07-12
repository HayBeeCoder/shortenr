import React from 'react'

const Skeleton = ({className}: {className: string}) => {
  return (
    <div className={`bg-orange-500 ${className}`}></div>
  )
}

export default Skeleton