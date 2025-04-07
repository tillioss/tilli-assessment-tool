import React, { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import Dropdown from '@/app/components/Dropdown'
import { BackIcon, Divider, HamburgerIcon } from '@/assets/svg'
import { usePathname } from 'next/navigation'
import UserDropDown from '@/app/components/Navbar/components/UserDropDown'

const Navbar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const path = usePathname()

  return (
    <div className="bg-primary-400 w-full px-4">
      <div className="flex justify-between w-full">
        <Link
          href="/"
          className={`${isMobileNavOpen ? 'block' : 'hidden'} md:block`}
        >
          <div className="flex">
            <img
              src="/logo.png"
              width={50}
              height={500}
              alt="logo"
              className="self-center"
            />
            <p className="text-lg md:text-2xl text-white font-semibold p-3">
              Teacher&apos;s Dashboard
            </p>
          </div>
        </Link>

        {isMobileNavOpen ? (
          <>
            <div className="w-4/5 h-full bg-white z-50 rounded-tr-2xl left-0 fixed">
              <span
                className="w-16 absolute top-1/2 -right-8"
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              >
                <BackIcon />
              </span>
              <div className="flex mx-2">
                <img
                  src="/logo.png"
                  width={50}
                  height={500}
                  alt="logo"
                  className="self-center"
                />
                <p className="text-lg md:text-2xl text-primary-400 font-semibold p-3">
                  Assessment Tool
                </p>
              </div>
              <Divider />
            </div>
            <div className="opacity-25 fixed z-40 inset-0 bg-black"></div>
          </>
        ) : null}

        <UserDropDown />
      </div>
    </div>
  )
}

export default Navbar
