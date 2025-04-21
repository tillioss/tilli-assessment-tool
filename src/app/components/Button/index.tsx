import React, { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  handleClick?: () => void
  disabled?: boolean
}
const Button = ({ children, handleClick, disabled }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`button m-4 w-32 h-10 ${
        disabled ? 'bg-gray-400' : 'bg-primary-800 '
      }  cursor-pointer select-none rounded-full`}
      onClick={handleClick}
    >
      <span className="flex flex-col justify-center items-center h-full text-white font-medium text-lg ">
        {children}
      </span>
    </button>
  )
}

export default Button
