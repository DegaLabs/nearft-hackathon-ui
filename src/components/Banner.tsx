import React from 'react'

interface IBannerProps {
  name?: any
  childStyles?: string
  parentStyles?: string
}

const Banner = (props: IBannerProps): JSX.Element => {
  const { name, childStyles, parentStyles } = props
  return (
    <div className={`relative w-full flex items-center z-0 overflow-hidden nft-gradient ${parentStyles && parentStyles}`}>
      {name && <p className={`font-bold text-white text-5xl font font-poppins leadinfg-70 ${childStyles && childStyles}`}>{name}</p>}
      <div className="absolute w-48 h-48 sm:w-32 sm:h-32 rounded-full white-bg -top-9 -left-16 -z-5" />
      <div className="absolute w-72 h-72 sm:w-56 sm:h-56 rounded-full white-bg -bottom-24 -right-14 -z-5" />
    </div>
  )
}

export default Banner
