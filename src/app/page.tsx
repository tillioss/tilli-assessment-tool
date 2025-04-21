'use client'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <>
      <div className="bg-primary-400 w-full px-4">
        <div className="flex justify-center w-full">
          <Link href="/">
            <div className="flex">
              <img
                src="/logo.png"
                width={40}
                height={300}
                alt="logo"
                className="self-center"
              />
              <p className="text-md md:text-xl text-white font-semibold p-3">
                Assessment
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="absolute left-2 bottom-0 w-32 xl:w-auto">
        <img src="/tilli.png" alt="" width={180} />
      </div>
      <div className="justify-center items-center flex flex-col h-[90vh]">
        <p className="text-primary-700 text-6xl font-semibold my-6 md:my-12 text-center">
          Hello!
        </p>
        <p className="md:my-12 my-6 font-medium">
          Welcome to your emotional assessment :)
        </p>
        <Link
          href="/login"
          className="rounded-2xl bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800"
        >
          Start
        </Link>
      </div>
    </>
  )
}
export default Home
