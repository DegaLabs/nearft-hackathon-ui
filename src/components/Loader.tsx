import React from 'react'

import loaderImg from '../assets/loader_new.gif'

const Loader = () => {
  return (
    <div className="flexCenter w-full my-4">
      <img src={loaderImg} alt="loader" width={120} />
    </div>
  )
}

export default Loader
