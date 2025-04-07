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
        disabled
          ? 'bg-gray-400 [box-shadow:0_7px_0_0_#919498]'
          : 'bg-pink-800 [box-shadow:0_7px_0_0_#D52B8B]'
      }  cursor-pointer select-none active:translate-y-1 active:[box-shadow:0_0px_0_0_#D52B8B] active:border-b-[0px] transition-all duration-150 rounded-full`}
      onClick={handleClick}
    >
      <span className="flex flex-col justify-center items-center h-full text-white font-medium text-lg ">
        {children}
      </span>
    </button>
  )
}

export default Button
