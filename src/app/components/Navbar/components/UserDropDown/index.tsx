import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const UserDropDown = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const logout = () => {}

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsUserDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="flex items-center relative justify-end" ref={dropdownRef}>
      <p
        className="text-xl font-medium rounded-full p-2 cursor-pointer uppercase w-10 h-10 text-center text-white bg-pink-800"
        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
      >
        John
      </p>

      {isUserDropdownOpen && (
        <div className="absolute mt-64 rounded-xl shadow-lg bg-white w-80 z-40 p-2 border-primary-800 border-2">
          <div className="flex bg-primary-200 p-2 rounded-xl">
            <div className="self-center">
              <p className="text-xl font-medium rounded-full p-2 mr-2 uppercase cursor-pointer w-10 h-10 text-center text-white bg-pink-800">
                John
              </p>
            </div>
            <div className="self-center">
              <p className="font-medium">John Doe</p>
            </div>
          </div>
          <div className="py-2 flex justify-center">
            <Link
              href="/settings"
              onClick={() => setIsUserDropdownOpen(false)}
              className="block rounded-2xl text-lg text-center px-4 py-2 text-white font-medium bg-primary-400 w-2/3"
            >
              Settings
            </Link>
          </div>

          <div className="py-1 flex justify-center">
            <button
              className="block rounded-2xl text-lg text-center px-4 py-2 text-white font-medium bg-pink-800 w-2/3"
              onClick={() => {
                setIsUserDropdownOpen(false)
                logout()
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDropDown
