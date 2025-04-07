'use client'
import React from 'react'

const Home = () => {
  return (
    <>
      <img
        src="/hat.png"
        alt=""
        className="w-32 absolute right-0 top-10 hidden md:block"
      />
      <img
        src="/leaf.png"
        alt=""
        className="w-28 absolute right-1/2 z-0 hidden md:block"
      />
      <div className="md:hidden block"></div>
      <div className="" style={{ height: `calc(100% - 130px)` }}></div>
    </>
  )
}
export default Home
